import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminProductFormClient from "@/src/components/admin/AdminProductFormClient";
import { requireAdminPageSession } from "@/src/lib/admin/guards";
import { getProductById, getProductsCatalog } from "@/src/lib/content/products";

export const metadata: Metadata = {
  title: "Modifier un produit | Admin TAM'S EMPIRE",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditProductPage({ params }: PageProps) {
  const username = await requireAdminPageSession();
  const { id } = await params;
  const [catalog, product] = await Promise.all([getProductsCatalog(), getProductById(id)]);

  if (!product) notFound();

  return (
    <AdminProductFormClient
      mode="edit"
      username={username}
      categories={catalog.categories}
      initialProduct={product}
    />
  );
}

