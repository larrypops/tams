import About from "@/src/pages/About";
import { buildPageMetadata } from "@/src/lib/seo";

export const metadata = buildPageMetadata({
  title: "À Propos",
  description:
    "En savoir plus sur TAM'S EMPIRE CONSTRUCTION SARL, notre expertise terrain et notre engagement qualité au Cameroun.",
  pathname: "/a-propos",
});

export default function AboutPage() {
  return <About />;
}
