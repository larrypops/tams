import { NextRequest, NextResponse } from "next/server";
import { getAdminUsernameFromRequest } from "@/src/lib/admin/guards";
import { getMediaConfigOrNull } from "@/src/lib/env/server";
import { uploadMedia } from "@/src/lib/storage";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json(
    { success: false, error: "Non autorisé." },
    { status: 401 },
  );
}

function badRequest(error: string) {
  return NextResponse.json({ success: false, error }, { status: 400 });
}

export async function POST(request: NextRequest) {
  const username = getAdminUsernameFromRequest(request);
  if (!username) return unauthorized();

  try {
    const mediaConfig = getMediaConfigOrNull();
    if (!mediaConfig) {
      return badRequest("Upload média non configuré. Ajoutez MEDIA_PROVIDER.");
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const folderRaw = formData.get("folder");
    const folder = typeof folderRaw === "string" && folderRaw.trim() ? folderRaw.trim() : undefined;

    if (!(file instanceof File)) {
      return badRequest("Fichier manquant.");
    }

    const mimeType = file.type.toLowerCase();
    if (!mediaConfig.allowedTypes.includes(mimeType)) {
      return badRequest(`Type non autorisé: ${mimeType}`);
    }

    const maxBytes = mediaConfig.maxUploadMb * 1024 * 1024;
    if (file.size > maxBytes) {
      return badRequest(
        `Fichier trop volumineux. Limite: ${mediaConfig.maxUploadMb} MB.`,
      );
    }

    const result = await uploadMedia({ file, folder });
    return NextResponse.json({
      success: true,
      media: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Impossible de téléverser l'image.",
      },
      { status: 500 },
    );
  }
}

