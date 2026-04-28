import type { MetadataRoute } from "next";
import productCatalogData from "@/data/products.json";
import { absoluteUrl } from "@/src/lib/seo";
import type { Product } from "@/src/constants";

const STATIC_ROUTES = [
  "/",
  "/produits",
  "/a-propos",
  "/realisations",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const catalog = productCatalogData as { products: Product[] };

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));

  const productEntries: MetadataRoute.Sitemap = catalog.products.map((product) => ({
    url: absoluteUrl(`/produits/${product.id}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...productEntries];
}

