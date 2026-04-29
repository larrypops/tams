import Image from 'next/image';
import Link from 'next/link';

import { CtaSection } from '@/components/cta-section';
import { FaqSection } from '@/components/faq-section';
import { FeaturedProductsSection } from '@/components/featured-products-section';
import { HeroSection } from '@/components/hero-section';
import { JsonLd } from '@/components/json-ld';
import { ProductCategoriesSection } from '@/components/product-categories-section';
import { RealisationsPreview } from '@/components/realisations-preview';
import { Reveal } from '@/components/reveal';
import { SectionIntro } from '@/components/section-intro';
import { TestimonialsSection } from '@/components/testimonials-section';
import { TrustBanner } from '@/components/trust-banner';
import { WhyChooseUsSection } from '@/components/why-choose-us-section';
import { ArrowRightIcon, CheckIcon, MapPinIcon } from '@/components/icons';
import { company, faqItems } from '@/lib/data';
import { buildMetadata, getBreadcrumbSchema, getFaqSchema } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Materiaux metalliques pour construction a Yaounde',
  description:
    "Vente de toles, buses metalliques et pannes metalliques a Yaounde. Contact rapide sur WhatsApp pour vos devis et demandes de prix.",
  path: '/',
  keywords: [
    'toles a Yaounde',
    'vente de toles a Yaounde',
    'materiaux metalliques de construction a Yaounde',
    'fournisseur de materiaux metalliques a Yaounde'
  ]
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={getFaqSchema(faqItems)} />
      <JsonLd data={getBreadcrumbSchema([{ name: 'Accueil', path: '/' }])} />

      <HeroSection />
      <TrustBanner />

      <section className="section-padding pt-8">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <SectionIntro
              eyebrow="Presentation"
              title="Une entreprise locale orientee fiabilite, disponibilite et accompagnement"
              description="TAM'S Empire Construction s adresse aux particuliers, professionnels du batiment et responsables de chantier qui recherchent un fournisseur serieux de materiaux metalliques pour construction a Yaounde."
            />

            <div className="mt-8 grid gap-4">
              {[
                'Expertise locale sur les besoins de couverture et structure',
                'Conseils adaptes au type de chantier et au budget',
                'Qualite des materiaux et clarte dans la reponse commerciale',
                'Proximite client a Nkombassi avec acces rapide sur WhatsApp'
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[1.6rem] border border-slate-200 bg-white px-5 py-4"
                >
                  <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-gold" />
                  <p className="text-sm leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="surface-panel overflow-hidden">
            <div className="grid gap-px bg-slate-200/80 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="bg-white p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  Implantation locale
                </p>
                <h2 className="mt-4 text-3xl text-slate-950">
                  Presence a Yaounde et service de proximite
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Basee a {company.location}, l entreprise facilite les echanges
                  pour les besoins de toiture, de structure et de materiaux
                  metalliques a Yaounde et dans ses environs.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-2 text-sm font-medium text-navy">
                  <MapPinIcon className="h-4 w-4" />
                  {company.location}
                </div>
              </div>

              <div className="relative min-h-[18rem] bg-midnight">
                <Image
                  src="/assets/products/tole-bleue-ardoise.jpg"
                  alt="Toles metalliques TAM'S Empire Construction"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 30vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/55">
                    Intervention
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-white/78">
                    Yaounde, Nkombassi et environs, avec un contact direct pour les
                    demandes de prix et les devis de chantier.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold"
                  >
                    Nous contacter
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ProductCategoriesSection />
      <WhyChooseUsSection />
      <FeaturedProductsSection />
      <RealisationsPreview />
      <TestimonialsSection />
      <FaqSection
        items={faqItems}
        eyebrow="FAQ SEO"
        title="Questions frequentes sur les toles et materiaux metalliques a Yaounde"
        description="Une base de reponses claire pour les recherches locales autour des toles, des buses metalliques, des pannes et des demandes de devis."
      />
      <CtaSection />
    </>
  );
}
