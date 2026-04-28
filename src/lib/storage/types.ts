import "server-only";

export type UploadedMedia = {
  url: string;
  publicId?: string;
  width?: number;
  height?: number;
  bytes?: number;
  format?: string;
};

export type UploadInput = {
  file: File;
  folder?: string;
};

