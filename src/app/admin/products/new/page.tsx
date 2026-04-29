import type { Metadata } from "next";
import AdminProductFormClient from "@/src/components/admin/AdminProductFormClient";
import { requireAdminPageSession } from "@/src/lib/admin/guards";
import { getProductsCatalog } from "@/src/lib/content/products";

export const metadata: Metadata = {
  title: "Créer un produit | Admin TAM'S EMPIRE",
  robots: { index: false, follow: false },
};

export default async function AdminCreateProductPage() {
  const username = await requireAdminPageSession();
  const catalog = await getProductsCatalog();

  return (
    <AdminProductFormClient
      mode="create"
      username={username}
      categories={catalog.categories}
    />
  );
}

