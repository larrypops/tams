'use client';

import { motion } from 'motion/react';
import { ShieldCheck, Target, Users2, Award, History } from 'lucide-react';

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-6">À Propos de <span className="text-brand-gold">TAM'S EMPIRE</span></h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Votre partenaire de confiance pour l'approvisionnement en matériaux de construction métalliques au Cameroun.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 text-brand-gold rounded-full text-sm font-bold">
              <History size={18} />
              Notre Histoire
            </div>
            <h2 className="text-4xl font-display font-bold text-brand-navy">Plus qu'un simple fournisseur</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              TAM’S EMPIRE CONSTRUCTION SARL est née d'une volonté de moderniser le secteur du BTP au Cameroun en facilitant l'accès à des matériaux métalliques de haute performance. 
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Spécialisés dans les buses métalliques, les pannes Z & C et les tôles de couverture, nous nous sommes imposés comme un maillon essentiel de la chaîne de construction, travaillant main dans la main avec les mairies, les entreprises de génie civil et les artisans locaux.
            </p>
            <div className="pt-6 grid grid-cols-2 gap-8">
              <div>
                <p className="text-4xl font-display font-black text-brand-gold mb-1">100%</p>
                <p className="text-sm font-bold text-brand-navy uppercase tracking-wider">Engagement Qualité</p>
              </div>
              <div>
                <p className="text-4xl font-display font-black text-brand-gold mb-1">24/7</p>
                <p className="text-sm font-bold text-brand-navy uppercase tracking-wider">Support Technique</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/images/realisations-03.jpeg" 
                alt="Construction site" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-brand-navy text-white p-8 rounded-2xl shadow-xl">
              <Award size={40} className="text-brand-gold mb-2" />
              <p className="font-bold">Expertise Reconnue</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-brand-gray rounded-[3rem] p-12 md:p-20 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Nos Valeurs Fondamentales</h2>
            <p className="text-gray-600">Ce qui guide chacune de nos actions et décisions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: 'Intégrité', desc: 'Nous bâtissons des relations basées sur la transparence et le respect de nos engagements.' },
              { icon: Target, title: 'Excellence', desc: 'Nous ne transigeons jamais sur la qualité des matériaux que nous fournissons.' },
              { icon: Users2, title: 'Partenariat', desc: 'Votre succès est le nôtre. Nous vous accompagnons à chaque étape de vos projets.' },
            ].map((value, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-gold mx-auto shadow-lg">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-brand-navy">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team/Infrastructure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <img src="/images/buse-04.jpeg" alt="Factory" className="rounded-2xl shadow-lg" />
              <img src="/images/pannes-04.jpeg" alt="Materials" className="rounded-2xl shadow-lg mt-8" />
            </div>
          </div>
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-4xl font-display font-bold text-brand-navy">Une infrastructure solide pour vos projets</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Nous disposons de stocks importants et d'une logistique optimisée pour répondre aux demandes les plus urgentes sur l'ensemble du territoire camerounais.
            </p>
            <ul className="space-y-4">
              {[
                'Disponibilité immédiate en stock',
                'Accompagnement technique personnalisé',
                'Livraison sur site sécurisée',
                'Tarifs compétitifs de grossiste'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-semibold text-brand-navy">
                  <div className="w-6 h-6 bg-brand-gold rounded-full flex items-center justify-center text-white">
                    <ShieldCheck size={14} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
