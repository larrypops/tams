import { ContactForm } from '@/components/contact-form';
import { CtaSection } from '@/components/cta-section';
import { FaqSection } from '@/components/faq-section';
import { ArrowUpRightIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from '@/components/icons';
import { JsonLd } from '@/components/json-ld';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { contactFaqs, company } from '@/lib/data';
import { buildMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact et demande de devis',
  description:
    "Contactez TAM'S Empire Construction a Yaounde par telephone, email ou WhatsApp pour vos demandes de prix et devis en materiaux metalliques.",
  path: '/contact',
  keywords: [
    'contact toles Yaounde',
    'devis toles Yaounde',
    'WhatsApp materiaux metalliques Yaounde'
  ]
});

const contactCards = [
  {
    title: 'Telephone / WhatsApp',
    value: company.phone,
    href: company.phoneHref,
    icon: PhoneIcon
  },
  {
    title: 'Email',
    value: company.email,
    href: company.emailHref,
    icon: MailIcon
  },
  {
    title: 'Localisation',
    value: company.location,
    href: company.mapsHref,
    icon: MapPinIcon
  },
  {
    title: 'Messenger / Facebook',
    value: company.messengerLabel,
    href: company.messengerHref,
    icon: ArrowUpRightIcon
  }
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Accueil', path: '/' },
          { name: 'Contact', path: '/contact' }
        ])}
      />

      <PageHero
        eyebrow="Contact"
        title="Telephone, email, WhatsApp et devis rapide"
        description="Retrouvez tous les moyens de contacter TAM'S Empire Construction a Nkombassi, Yaounde, pour vos besoins en toles, buses metalliques, pannes et materiaux de construction metallique."
      />

      <section className="section-padding pb-8 pt-10">
        <div className="container-shell grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {contactCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <Reveal
                key={card.title}
                delay={index * 0.06}
                className="surface-panel p-6"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/5 text-navy">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.24em] text-slate-500">
                  {card.title}
                </p>
                <a
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="mt-3 block text-lg font-semibold text-slate-950"
                >
                  {card.value}
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-shell grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <div className="grid gap-8">
            <Reveal className="surface-panel overflow-hidden">
              <div className="grid gap-px bg-slate-200/80">
                <div className="bg-white p-6 sm:p-8">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    Carte et acces
                  </p>
                  <h2 className="mt-4 text-3xl text-slate-950">
                    Nkombassi, Yaounde, Cameroun
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    Une implantation pratique pour les clients de Yaounde qui
                    recherchent un fournisseur local de materiaux metalliques pour
                    construction.
                  </p>
                  <a
                    href={company.mapsHref}
                    target="_blank"
                    rel="noreferrer"
                    className="button-light mt-6"
                  >
                    Ouvrir l itineraire
                  </a>
                </div>
                <div className="bg-midnight p-8 text-white">
                  <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center gap-3">
                      <MapPinIcon className="h-5 w-5 text-gold" />
                      <p className="text-sm font-semibold">Zone de contact prioritaire</p>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-white/72">
                      Yaounde, Nkombassi et environs, avec une reponse rapide pour
                      les demandes de prix et de devis sur toles, buses ou pannes
                      metalliques.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="surface-panel p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/5 text-navy">
                  <ClockIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    Horaires
                  </p>
                  <h2 className="mt-2 text-3xl text-slate-950">Accueil et reponse</h2>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {company.openingHours.map((hour) => (
                  <div
                    key={hour}
                    className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700"
                  >
                    {hour}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="dark-panel p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                Contact direct
              </p>
              <h2 className="mt-4 text-3xl">WhatsApp reste le canal le plus rapide</h2>
              <p className="mt-4 text-sm leading-7 text-white/72">
                Envoyez simplement le produit recherche, la quantite souhaitee ou
                une photo de votre chantier. Cela permet d accelerer l echange.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={company.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="button-secondary"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp
                </a>
                <a href={company.emailHref} className="button-light">
                  Ecrire par email
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FaqSection
        items={contactFaqs}
        eyebrow="FAQ contact"
        title="Questions frequentes avant de nous contacter"
        description="Quelques reponses rapides pour choisir le meilleur canal de contact et preparer votre demande de devis."
      />
      <CtaSection
        title="Un message suffit pour lancer votre demande"
        description="Que vous preferiez appeler, envoyer un email ou ecrire sur WhatsApp, l objectif reste le meme : vous aider a avancer plus vite sur votre projet."
      />
    </>
  );
}
