import type { Metadata } from "next";
import ProductDetail from "@/src/pages/ProductDetail";
import productCatalogData from "@/data/products.json";
import type { Product } from "@/src/constants";
import { absoluteUrl, buildPageMetadata, SITE_NAME } from "@/src/lib/seo";

type Params = { id: string };

function getProducts() {
  const catalog = productCatalogData as { products: Product[] };
  return catalog.products;
}

function getProductById(id: string) {
  return getProducts().find((product) => product.id === id);
}

export async function generateStaticParams(): Promise<Params[]> {
  return getProducts().map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Produit non trouvé",
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    title: product.shortTitle,
    description: product.description,
    pathname: `/produits/${product.id}`,
    image: product.image,
    keywords: [product.shortTitle, product.title, "produits métalliques", "BTP Cameroun"],
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  const productJsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.shortTitle,
        description: product.description,
        image: (product.gallery?.length ? product.gallery : [product.image]).map((img) =>
          img.startsWith("http") ? img : absoluteUrl(img),
        ),
        brand: {
          "@type": "Brand",
          name: SITE_NAME,
        },
        sku: product.id,
        url: absoluteUrl(`/produits/${product.id}`),
      }
    : null;

  return (
    <>
      {productJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      ) : null}
      <ProductDetail />
    </>
  );
}
