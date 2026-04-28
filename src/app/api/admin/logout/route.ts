import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/src/lib/admin/session";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ success: true });
  clearAdminSessionCookie(response);
  return response;
}

