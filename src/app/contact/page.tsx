import Contact from "@/src/pages/Contact";
import { buildPageMetadata } from "@/src/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contactez TAM'S EMPIRE CONSTRUCTION SARL pour vos devis, conseils techniques et approvisionnements en matériaux métalliques.",
  pathname: "/contact",
});

export default function ContactPage() {
  return <Contact />;
}
