import { NextRequest, NextResponse } from "next/server";
import { getAdminUsernameFromRequest } from "@/src/lib/admin/guards";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const username = getAdminUsernameFromRequest(request);
    if (!username) {
      return NextResponse.json(
        { authenticated: false },
        {
          status: 401,
          headers: { "Cache-Control": "no-store" },
        },
      );
    }

    return NextResponse.json(
      { authenticated: true, username },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { authenticated: false },
      {
        status: 401,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}

