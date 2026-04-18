'use client';

import { motion } from 'motion/react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  MessageCircle,
  Phone,
  ShieldCheck,
  Users2,
} from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS, CONTACT_INFO } from '@/src/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 overflow-x-hidden"
    >
      <section className="relative min-h-[calc(100svh-82px)] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/realisations-01.jpeg"
            alt="Chantier professionnel"
            className="h-full w-full object-cover brightness-[0.38]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-brand-navy/70 to-brand-navy/35" />
          <div className="absolute inset-0 hero-grid opacity-60" />
          <div className="hero-glow absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-brand-gold/20 blur-[120px]" />
          <div className="hero-glow absolute -right-12 bottom-12 h-80 w-80 rounded-full bg-white/10 blur-[140px]" />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-82px)] max-w-7xl items-center gap-16 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-7"
          >
            <motion.span
              variants={fadeUp}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/15 px-5 py-2 text-sm font-bold uppercase tracking-[0.18em] text-brand-gold"
            >
              TAM&apos;S EMPIRE CONSTRUCTION SARL
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="headline-shine max-w-3xl text-5xl leading-[0.95] font-extrabold text-white md:text-7xl"
            >
              Grossiste en matériaux de <span className="text-brand-gold">construction</span> au Cameroun
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-gray-200 md:text-xl"
            >
              Approvisionnement fiable pour vos chantiers et projets. Nous accompagnons les entreprises BTP, mairies, revendeurs et artisans avec des matériaux métalliques de qualité.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <a
                href={`tel:${CONTACT_INFO.phone1.replace(/\s+/g, '')}`}
                className="rounded-xl bg-brand-gold px-8 py-4 font-bold text-white shadow-2xl shadow-yellow-900/30 transition-transform hover:-translate-y-0.5 hover:bg-yellow-600"
              >
                <span className="flex items-center gap-2">
                  <Phone size={20} />
                  Appeler maintenant
                </span>
              </a>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\s+/g, '')}`}
                className="rounded-xl bg-white px-8 py-4 font-bold text-brand-navy shadow-2xl transition-transform hover:-translate-y-0.5 hover:bg-gray-100"
              >
                <span className="flex items-center gap-2">
                  <MessageCircle size={20} className="text-[#25D366]" />
                  WhatsApp direct
                </span>
              </a>
              <Link
                href="/contact"
                className="w-full rounded-xl border border-white/25 px-8 py-4 text-center font-bold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  <FileText size={20} />
                  Demander un devis
                </span>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
              {['Stocks disponibles', 'Livraison chantier', 'Support WhatsApp 24/7'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:col-span-5 lg:block"
          >
            <div className="relative h-[560px]">
              <div className="absolute left-8 top-0 w-[72%] overflow-hidden rounded-[2.5rem] border border-white/15 shadow-2xl">
                <img
                  src="/images/realisations-03.jpeg"
                  alt="Réalisation chantier"
                  className="h-[420px] w-full object-cover"
                />
              </div>
              <div className="absolute right-0 top-40 w-[56%] overflow-hidden rounded-[2rem] border border-white/20 shadow-2xl">
                <img
                  src="/images/pannes-05.jpeg"
                  alt="Pannes métalliques"
                  className="h-[260px] w-full object-cover"
                />
              </div>
              <div className="absolute left-0 bottom-0 w-[48%] rounded-2xl border border-brand-gold/30 bg-brand-navy/85 p-6 backdrop-blur-md">
                <p className="text-5xl font-display font-black text-brand-gold">10+</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-white/90">
                  Années d&apos;expérience terrain
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-white py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-gold/10 blur-[110px]" />
          <div className="absolute bottom-6 left-8 h-56 w-56 rounded-full bg-brand-navy/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -34 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl font-display font-extrabold text-brand-navy md:text-5xl">
                La référence des bâtisseurs
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Chez TAM’S EMPIRE CONSTRUCTION SARL, nous sommes spécialisés dans la fourniture de matériaux de construction métalliques pour les projets professionnels et industriels.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                Nous mettons à votre disposition des solutions fiables, durables et adaptées aux réalités du terrain au Cameroun. Nous ne vendons pas seulement des matériaux, nous sécurisons vos projets et vos investissements.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { icon: Building2, title: 'BTP & Mairies', desc: 'Accompagnement institutionnel' },
                  { icon: Users2, title: 'Revendeurs', desc: 'Approvisionnement régulier' },
                  { icon: ShieldCheck, title: 'Qualité Pro', desc: 'Matériaux certifiés' },
                  { icon: Clock, title: 'Réactivité', desc: 'Service rapide' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * i }}
                    className="rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-md"
                  >
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gold/15 text-brand-gold">
                      <item.icon size={20} />
                    </div>
                    <h4 className="font-bold text-brand-navy">{item.title}</h4>
                    <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 34 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="overflow-hidden rounded-[2.7rem] border border-gray-100 shadow-2xl">
                <img
                  src="/images/pannes-05.jpeg"
                  alt="Matériaux de construction"
                  className="aspect-[5/6] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-6 rounded-2xl bg-brand-navy px-8 py-6 text-white shadow-2xl">
                <p className="text-4xl font-display font-black text-brand-gold">100%</p>
                <p className="text-xs font-bold uppercase tracking-[0.18em]">Fiabilité garantie</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f3eb] py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <h2 className="text-4xl font-display font-extrabold text-brand-navy md:text-5xl">
              Nos Produits Principaux
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Une gamme complète de solutions métalliques pour tous vos besoins de construction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-12">
            {featuredProducts.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * index }}
                className={`group overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl ${
                  index === 0 ? 'xl:col-span-6' : 'xl:col-span-2'
                } md:col-span-1`}
              >
                <div className={`relative overflow-hidden ${index === 0 ? 'h-80' : 'h-64'}`}>
                  <img
                    src={product.image}
                    alt={product.shortTitle}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-2xl font-display font-bold text-white">
                      {product.shortTitle}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-gray-600">
                    {product.description}
                  </p>
                  <Link
                    href={`/produits/${product.id}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-gold transition-all hover:gap-3"
                  >
                    En savoir plus
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-28 text-white">
        <div className="absolute inset-0">
          <img
            src="/images/buse-05.jpeg"
            alt="Matériaux de qualité"
            className="h-full w-full object-cover brightness-[0.32]"
          />
          <div className="absolute inset-0 bg-brand-navy/70" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <h2 className="text-4xl font-display font-extrabold md:text-5xl">
              Pourquoi nous choisir ?
            </h2>
            <div className="mt-10 space-y-6">
              {[
                { title: 'Approvisionnement fiable et régulier', desc: 'Nous garantissons une disponibilité constante de nos stocks.' },
                { title: 'Produits de qualité professionnelle', desc: 'Tous nos matériaux répondent aux normes les plus strictes.' },
                { title: 'Disponibilité en volume', desc: 'Capacité à fournir des chantiers de grande envergure.' },
                { title: 'Réactivité et service rapide', desc: 'Délais de livraison optimisés pour vos projets.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * i }}
                  className="flex items-start gap-4 rounded-xl border border-white/15 bg-white/8 p-4 backdrop-blur-sm"
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gold text-white">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    <p className="mt-1 text-sm text-gray-200">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] border border-white/15 bg-white/10 p-10 text-center backdrop-blur-md"
          >
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand-gold">Partenaire de confiance</p>
            <p className="mt-6 text-6xl font-display font-black text-brand-gold">TAM&apos;S</p>
            <p className="text-2xl font-bold tracking-[0.18em]">EMPIRE</p>
            <p className="mt-6 text-sm leading-relaxed text-gray-200">
              Qualité, disponibilité et performance pour accompagner vos projets de construction, du plus simple au plus exigeant.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[3rem] bg-brand-gold p-12 text-center text-white shadow-2xl shadow-yellow-200 md:p-20"
          >
            <div className="absolute -left-14 -top-16 h-52 w-52 rounded-full bg-white/12 blur-2xl" />
            <div className="absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-brand-navy/20 blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-4xl font-display font-extrabold md:text-5xl">
                Besoin d’un fournisseur fiable pour vos chantiers ?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-xl opacity-90">
                Contactez-nous dès maintenant pour un devis rapide et personnalisé. Nos experts sont à votre écoute.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-5 sm:flex-row">
                <a
                  href={`tel:${CONTACT_INFO.phone1.replace(/\s+/g, '')}`}
                  className="rounded-2xl bg-brand-navy px-10 py-5 text-lg font-bold text-white shadow-xl transition-transform hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-3">
                    <Phone size={24} />
                    {CONTACT_INFO.phone1}
                  </span>
                </a>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\s+/g, '')}`}
                  className="rounded-2xl bg-white px-10 py-5 text-lg font-bold text-brand-navy shadow-xl transition-transform hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-3">
                    <MessageCircle size={24} className="text-[#25D366]" />
                    WhatsApp Direct
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
