import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { getAdminEnv } from "@/src/lib/env/server";

function sha256Hex(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function safeEquals(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

export function verifyAdminCredentials(username: string, password: string) {
  const env = getAdminEnv();
  if (!safeEquals(username.trim(), env.username)) return false;

  if (env.passwordHash) {
    const candidate = sha256Hex(password.trim()).toLowerCase();
    return safeEquals(candidate, env.passwordHash.toLowerCase());
  }

  if (!env.password) return false;
  return safeEquals(password.trim(), env.password);
}

export function getAdminSessionSecret() {
  return getAdminEnv().sessionSecret;
}

