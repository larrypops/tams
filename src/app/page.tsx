import Home from "@/src/pages/Home";
import { buildPageMetadata } from "@/src/lib/seo";

export const metadata = buildPageMetadata({
  title: "Accueil",
  description:
    "TAM'S EMPIRE CONSTRUCTION SARL: grossiste en matériaux de construction métalliques au Cameroun. Demandez un devis rapide.",
  pathname: "/",
});

export default function HomePage() {
  return <Home />;
}
