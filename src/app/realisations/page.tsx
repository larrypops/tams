import Realisations from "@/src/pages/Realisations";
import { buildPageMetadata } from "@/src/lib/seo";

export const metadata = buildPageMetadata({
  title: "Réalisations",
  description:
    "Parcourez nos réalisations et projets livrés en matériaux de construction métalliques au Cameroun.",
  pathname: "/realisations",
});

export default function RealisationsPage() {
  return <Realisations />;
}
