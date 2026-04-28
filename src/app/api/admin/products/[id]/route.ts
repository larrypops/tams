import { NextRequest, NextResponse } from "next/server";
import { getAdminUsernameFromRequest } from "@/src/lib/admin/guards";
import { deleteProduct, updateProduct } from "@/src/lib/content/products";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json(
    { success: false, error: "Non autorisé." },
    { status: 401 },
  );
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const username = getAdminUsernameFromRequest(request);
  if (!username) return unauthorized();

  try {
    const { id } = await context.params;
    const body = (await request.json()) as { product?: unknown };
    const updated = await updateProduct(id, body?.product);
    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Impossible de mettre à jour le produit.",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const username = getAdminUsernameFromRequest(request);
  if (!username) return unauthorized();

  try {
    const { id } = await context.params;
    await deleteProduct(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Impossible de supprimer le produit.",
      },
      { status: 400 },
    );
  }
}

