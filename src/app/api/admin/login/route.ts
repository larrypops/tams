import { NextResponse } from "next/server";
import {
  createAdminSessionToken,
  setAdminSessionCookie,
} from "@/src/lib/admin/session";
import {
  getAdminSessionSecret,
  verifyAdminCredentials,
} from "@/src/lib/admin/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      username?: string;
      password?: string;
    };

    const username = body?.username?.trim() ?? "";
    const password = body?.password?.trim() ?? "";

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Identifiants requis." },
        { status: 400 },
      );
    }

    const valid = verifyAdminCredentials(username, password);
    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Identifiants invalides." },
        { status: 401 },
      );
    }

    const token = createAdminSessionToken(username, getAdminSessionSecret());
    const response = NextResponse.json({ success: true });
    setAdminSessionCookie(response, token);
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erreur serveur lors de la connexion.",
      },
      { status: 500 },
    );
  }
}

