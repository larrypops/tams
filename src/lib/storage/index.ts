import "server-only";

import { getMediaConfigOrNull } from "@/src/lib/env/server";
import { uploadToCloudinary } from "@/src/lib/storage/cloudinary";
import { uploadToS3 } from "@/src/lib/storage/s3";
import type { UploadInput, UploadedMedia } from "@/src/lib/storage/types";

export async function uploadMedia(input: UploadInput): Promise<UploadedMedia> {
  const mediaConfig = getMediaConfigOrNull();
  if (!mediaConfig) {
    throw new Error("MEDIA_PROVIDER is not configured.");
  }

  if (mediaConfig.provider === "cloudinary") {
    return uploadToCloudinary(input);
  }
  return uploadToS3(input);
}

