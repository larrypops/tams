import Products from "@/src/pages/Products";
import { buildPageMetadata } from "@/src/lib/seo";

export const metadata = buildPageMetadata({
  title: "Produits",
  description:
    "Découvrez nos produits métalliques: buses, pannes, tôles, profilés et solutions de couverture pour vos chantiers.",
  pathname: "/produits",
});

export default function ProductsPage() {
  return <Products />;
}
