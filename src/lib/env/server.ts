import "server-only";

type RequiredAdminEnv = {
  username: string;
  sessionSecret: string;
};

export type AdminEnv = RequiredAdminEnv & {
  passwordHash?: string;
  password?: string;
};

export type GithubEnv = {
  token: string;
  owner: string;
  repo: string;
  branch: string;
};

export type MediaProvider = "cloudinary" | "s3";

export type MediaConfig = {
  provider: MediaProvider;
  maxUploadMb: number;
  allowedTypes: string[];
};

export type CloudinaryEnv = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  uploadFolder?: string;
};

export function getAdminEnv(): AdminEnv {
  const username = process.env.ADMIN_USERNAME?.trim() ?? "";
  const sessionSecret = process.env.ADMIN_SESSION_SECRET?.trim() ?? "";
  const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();

  if (!username) {
    throw new Error("Missing ADMIN_USERNAME");
  }
  if (!sessionSecret) {
    throw new Error("Missing ADMIN_SESSION_SECRET");
  }
  if (!passwordHash && !password) {
    throw new Error("Set ADMIN_PASSWORD_HASH or ADMIN_PASSWORD");
  }

  return {
    username,
    sessionSecret,
    passwordHash: passwordHash || undefined,
    password: password || undefined,
  };
}

export function getGithubEnvOrNull(): GithubEnv | null {
  const token = process.env.GITHUB_TOKEN?.trim();
  const owner = process.env.GITHUB_OWNER?.trim();
  const repo = process.env.GITHUB_REPO?.trim();
  const branch = process.env.GITHUB_BRANCH?.trim() || "main";

  if (!token || !owner || !repo) return null;
  return { token, owner, repo, branch };
}

export function getMediaConfigOrNull(): MediaConfig | null {
  const provider = process.env.MEDIA_PROVIDER?.trim().toLowerCase();
  if (!provider) return null;
  if (provider !== "cloudinary" && provider !== "s3") {
    throw new Error("MEDIA_PROVIDER must be 'cloudinary' or 's3'");
  }

  const maxUploadRaw = process.env.ADMIN_UPLOAD_MAX_MB?.trim();
  const maxUploadMb = maxUploadRaw ? Number(maxUploadRaw) : 8;
  if (!Number.isFinite(maxUploadMb) || maxUploadMb <= 0) {
    throw new Error("ADMIN_UPLOAD_MAX_MB must be a positive number");
  }

  const allowedTypesRaw =
    process.env.ADMIN_UPLOAD_ALLOWED_TYPES?.trim() ||
    "image/jpeg,image/png,image/webp,image/avif";
  const allowedTypes = allowedTypesRaw
    .split(",")
    .map((type) => type.trim().toLowerCase())
    .filter(Boolean);
  if (!allowedTypes.length) {
    throw new Error("ADMIN_UPLOAD_ALLOWED_TYPES must contain at least one MIME type");
  }

  return {
    provider,
    maxUploadMb,
    allowedTypes,
  };
}

export function getCloudinaryEnv(): CloudinaryEnv {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim() ?? "";
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim() ?? "";
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim() ?? "";
  const uploadFolder = process.env.CLOUDINARY_UPLOAD_FOLDER?.trim() || undefined;

  if (!cloudName) throw new Error("Missing CLOUDINARY_CLOUD_NAME");
  if (!apiKey) throw new Error("Missing CLOUDINARY_API_KEY");
  if (!apiSecret) throw new Error("Missing CLOUDINARY_API_SECRET");

  return { cloudName, apiKey, apiSecret, uploadFolder };
}
