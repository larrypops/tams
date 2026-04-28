import "server-only";

import type { UploadInput, UploadedMedia } from "@/src/lib/storage/types";

export async function uploadToS3(_input: UploadInput): Promise<UploadedMedia> {
  throw new Error("S3 upload is not implemented in this project yet.");
}

