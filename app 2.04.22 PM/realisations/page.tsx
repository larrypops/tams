import { CtaSection } from '@/components/cta-section';
import { JsonLd } from '@/components/json-ld';
import { PageHero } from '@/components/page-hero';
import { RealisationsShowcase } from '@/components/realisations-showcase';
import { Reveal } from '@/components/reveal';
import { SectionIntro } from '@/components/section-intro';
import { company, realisations } from '@/lib/data';
import { buildMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Realisations et chantiers metalliques a Yaounde',
  description:
    "Decouvrez un apercu des realisations et chantiers mettant en valeur les toles et materiaux metalliques de TAM'S Empire Construction a Yaounde.",
  path: '/realisations',
  keywords: [
    'realisations toiture Yaounde',
    'chantier metallique Cameroun',
    'toitures metalliques Yaounde'
  ]
});

export default function RealisationsPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Accueil', path: '/' },
          { name: 'Realisations', path: '/realisations' }
        ])}
      />

      <PageHero
        eyebrow="Realisations"
        title="Des projets et finitions qui renforcent la credibilite de l entreprise"
        description="Cette page est concue pour presenter les chantiers, couvertures et fournitures livres par TAM'S Empire Construction, avec une structure elegante prete a accueillir encore plus de photos reelles."
      />

      <section className="section-padding pb-8 pt-10">
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <SectionIntro
              eyebrow="Galerie"
              title="Une mise en valeur claire des chantiers residentiels et commerciaux"
              description="Le visiteur retrouve ici des projets de toiture, de structure et de fourniture de materiaux, avec un format pense pour rassurer et soutenir les demandes de devis."
            />
          </Reveal>

          <Reveal className="surface-panel p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              CTA chantier
            </p>
            <h2 className="mt-4 text-3xl text-slate-950">
              Vous avez un projet similaire ?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Envoyez une photo, un plan ou une description sur WhatsApp pour
              recevoir une orientation plus rapide sur les materiaux a prevoir.
            </p>
            <a
              href={company.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="button-primary mt-6"
            >
              Demander un devis sur WhatsApp
            </a>
          </Reveal>
        </div>
      </section>

      <RealisationsShowcase items={realisations} />
      <CtaSection
        title="Faites avancer votre projet avec un interlocuteur reactif"
        description="Qu il s agisse d une toiture residentielle, d une structure metallique ou d une fourniture de toles, un message WhatsApp suffit pour lancer la discussion."
      />
    </>
  );
}
