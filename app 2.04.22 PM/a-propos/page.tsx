import Image from 'next/image';

import { CtaSection } from '@/components/cta-section';
import { JsonLd } from '@/components/json-ld';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { SectionIntro } from '@/components/section-intro';
import { ArrowRightIcon, CheckIcon } from '@/components/icons';
import { aboutValues, company, serviceCommitments } from '@/lib/data';
import { buildMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'A propos de TAM\'S Empire Construction',
  description:
    "Decouvrez la vision, la mission et les engagements de TAM'S Empire Construction, fournisseur de materiaux metalliques pour construction a Yaounde.",
  path: '/a-propos',
  keywords: [
    'fournisseur de materiaux metalliques a Yaounde',
    'entreprise de toles Yaounde',
    'materiaux de construction metallique Cameroun'
  ]
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Accueil', path: '/' },
          { name: 'A propos', path: '/a-propos' }
        ])}
      />

      <PageHero
        eyebrow="A propos"
        title="Une entreprise orientee service, clarte et solidite pour vos projets"
        description="TAM'S Empire Construction construit sa relation client autour de la proximite, de la reactivite et d un catalogue de materiaux metalliques pense pour les besoins reels des chantiers a Yaounde."
      />

      <section className="section-padding pb-8 pt-10">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <Reveal>
            <SectionIntro
              eyebrow="Qui sommes-nous"
              title="Un interlocuteur local pour les toitures, structures et approvisionnements metalliques"
              description="Nous accompagnons les particuliers, artisans, entrepreneurs et responsables de chantier qui recherchent des toles, buses metalliques, pannes et materiaux fiables pour avancer dans de bonnes conditions."
            />
            <div className="mt-8 grid gap-4">
              {[
                'Positionnement clair dans les materiaux metalliques pour construction a Yaounde',
                'Accompagnement humain et professionnel du premier message au devis',
                'Approche terrain, utile pour les besoins de couverture et structure'
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
            <div className="grid gap-px bg-slate-200/80 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="flex items-center justify-center bg-white p-6">
                <Image
                  src="/assets/logo/logo.jpg"
                  alt="Logo TAM'S Empire Construction"
                  width={280}
                  height={280}
                  className="rounded-[2rem] object-cover shadow-soft"
                />
              </div>
              <div className="bg-slate-50 p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  Vision
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  Devenir une reference locale de confiance pour les materiaux
                  metalliques de construction a Yaounde, grace a un service clair,
                  rapide et tourne vers la durabilite des projets.
                </p>
                <p className="mt-6 text-xs uppercase tracking-[0.24em] text-slate-500">
                  Mission
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  Mettre a disposition des produits adaptes, expliquer les options
                  avec rigueur et rendre la prise de contact simple pour chaque
                  client, du particulier au professionnel du batiment.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-shell">
          <SectionIntro
            eyebrow="Valeurs"
            title="Des engagements simples, lisibles et rassurants"
            description="Notre approche commerciale repose sur des valeurs concretes qui renforcent la confiance et facilitent la decision."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {aboutValues.map((value, index) => (
              <Reveal
                key={value.title}
                delay={index * 0.06}
                className="surface-panel p-6"
              >
                <h3 className="text-2xl text-slate-950">{value.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {value.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-midnight text-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <SectionIntro
              eyebrow="Qualite et proximite"
              title="Une maniere de travailler qui reste utile au client"
              description="Notre engagement qualite passe autant par la pertinence du produit propose que par la clarté des informations donnees au bon moment."
              theme="dark"
            />
          </Reveal>

          <div className="grid gap-4">
            {serviceCommitments.map((item, index) => (
              <Reveal
                key={item}
                delay={index * 0.06}
                className="rounded-[1.8rem] border border-white/10 bg-white/5 px-5 py-4"
              >
                <div className="flex items-start gap-3">
                  <ArrowRightIcon className="mt-0.5 h-5 w-5 flex-none text-gold" />
                  <p className="text-sm leading-7 text-white/76">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Echangeons sur votre prochain besoin en toles ou structure metallique"
        description="Que votre projet soit residentiel ou professionnel, l equipe peut vous orienter rapidement sur le bon type de produit et le canal de commande le plus simple."
      />
    </>
  );
}
