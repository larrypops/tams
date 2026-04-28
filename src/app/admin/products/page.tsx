import type { Metadata } from "next";
import AdminProductsClient from "@/src/components/admin/AdminProductsClient";
import { requireAdminPageSession } from "@/src/lib/admin/guards";
import { getProductsCatalog } from "@/src/lib/content/products";

export const metadata: Metadata = {
  title: "Admin Produits | TAM'S EMPIRE",
  robots: { index: false, follow: false },
};

export default async function AdminProductsPage() {
  const username = await requireAdminPageSession();
  const catalog = await getProductsCatalog();

  return (
    <AdminProductsClient
      username={username}
      categories={catalog.categories}
      initialProducts={catalog.products}
    />
  );
}

