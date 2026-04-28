import { NextRequest, NextResponse } from "next/server";
import { getAdminUsernameFromRequest } from "@/src/lib/admin/guards";
import {
  createProduct,
  getProductsCatalog,
} from "@/src/lib/content/products";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json(
    { success: false, error: "Non autorisé." },
    { status: 401 },
  );
}

export async function GET(request: NextRequest) {
  const username = getAdminUsernameFromRequest(request);
  if (!username) return unauthorized();

  try {
    const catalog = await getProductsCatalog();
    return NextResponse.json(
      {
        success: true,
        categories: catalog.categories,
        products: catalog.products,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Impossible de charger les produits.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const username = getAdminUsernameFromRequest(request);
  if (!username) return unauthorized();

  try {
    const body = (await request.json()) as { product?: unknown };
    const created = await createProduct(body?.product);
    return NextResponse.json({ success: true, product: created });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Impossible de créer le produit.",
      },
      { status: 400 },
    );
  }
}

