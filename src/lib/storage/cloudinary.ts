import "server-only";

import { createHash } from "node:crypto";
import { getCloudinaryEnv } from "@/src/lib/env/server";
import type { UploadInput, UploadedMedia } from "@/src/lib/storage/types";

function buildSignature(params: Record<string, string>, apiSecret: string) {
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return createHash("sha1").update(`${payload}${apiSecret}`).digest("hex");
}

type CloudinaryUploadResponse = {
  secure_url?: string;
  public_id?: string;
  width?: number;
  height?: number;
  bytes?: number;
  format?: string;
  error?: { message?: string };
};

export async function uploadToCloudinary({
  file,
  folder,
}: UploadInput): Promise<UploadedMedia> {
  const env = getCloudinaryEnv();
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const effectiveFolder = folder?.trim() || env.uploadFolder;

  const paramsToSign: Record<string, string> = { timestamp };
  if (effectiveFolder) paramsToSign.folder = effectiveFolder;
  const signature = buildSignature(paramsToSign, env.apiSecret);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", env.apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  if (effectiveFolder) {
    formData.append("folder", effectiveFolder);
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${env.cloudName}/image/upload`;
  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  const data = (await response.json()) as CloudinaryUploadResponse;
  if (!response.ok || !data.secure_url) {
    throw new Error(data.error?.message || "Cloudinary upload failed");
  }

  return {
    url: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
    bytes: data.bytes,
    format: data.format,
  };
}

