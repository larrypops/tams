import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { getAdminSessionSecret } from "@/src/lib/admin/auth";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/src/lib/admin/session";

export function getAdminUsernameFromRequest(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = verifyAdminSessionToken(token, getAdminSessionSecret());
  return session?.username ?? null;
}

export async function getAdminUsernameFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = verifyAdminSessionToken(token, getAdminSessionSecret());
  return session?.username ?? null;
}

export async function requireAdminPageSession() {
  const username = await getAdminUsernameFromCookies();
  if (!username) redirect("/admin/login");
  return username;
}

