import { CtaSection } from '@/components/cta-section';
import { JsonLd } from '@/components/json-ld';
import { PageHero } from '@/components/page-hero';
import { ProductCatalogClient } from '@/components/product-catalog-client';
import { Reveal } from '@/components/reveal';
import { SectionIntro } from '@/components/section-intro';
import { company, productCategories, products } from '@/lib/data';
import { buildMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Catalogue de toles, buses metalliques et pannes a Yaounde',
  description:
    "Catalogue de materiaux metalliques pour construction a Yaounde : toles galvanisees, toles acier noir, buses metalliques et pannes metalliques.",
  path: '/produits',
  keywords: [
    'toles galvanisees Cameroun',
    'toles acier noir Yaounde',
    'pannes metalliques Yaounde',
    'buses metalliques Cameroun',
    'devis toles Yaounde'
  ]
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Accueil', path: '/' },
          { name: 'Produits', path: '/produits' }
        ])}
      />

      <PageHero
        eyebrow="Produits"
        title="Catalogue de materiaux metalliques pour construction a Yaounde"
        description="Explorez les differentes references de toles, buses metalliques et pannes metalliques proposees par TAM'S Empire Construction, avec un parcours simple pour demander le prix ou un devis."
      />

      <section className="section-padding pb-8 pt-10">
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <SectionIntro
              eyebrow="SEO local"
              title="Des produits utiles pour la toiture, la structure et les besoins metalliques"
              description="Le catalogue est pense pour repondre aux recherches locales autour des toles a Yaounde, des pannes metalliques, des buses et des materiaux de construction metallique au Cameroun, sans surcharger le contenu de mots-clés."
            />
          </Reveal>

          <Reveal className="surface-panel p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              Contact rapide
            </p>
            <h2 className="mt-4 text-3xl text-slate-950">
              Un besoin precis pour votre chantier ?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Pour gagner du temps, preparez la quantite souhaitee, le type de
              produit, l epaisseur, le coloris et votre localisation. Vous pouvez
              ensuite ecrire directement a l equipe sur WhatsApp.
            </p>
            <a
              href={company.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="button-primary mt-6"
            >
              Contacter sur WhatsApp
            </a>
            <div className="mt-6 flex flex-wrap gap-2">
              {productCategories.map((category) => (
                <span
                  key={category.id}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <ProductCatalogClient categories={productCategories} products={products} />
      <CtaSection
        title="Besoin d un prix rapide ou d un devis detaille ?"
        description="Le catalogue vous aide a reperer les bonnes references. Pour finaliser votre besoin, le plus rapide reste d envoyer votre demande de chantier sur WhatsApp."
      />
    </>
  );
}
