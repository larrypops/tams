'use client';

import { motion } from 'motion/react';
import { CheckCircle2, MessageCircle, ArrowRight, ChevronRight, Settings, Target, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS, CONTACT_INFO } from '@/src/constants';
import { cn } from '@/src/lib/utils';

export default function Products() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-6">Nos Solutions <span className="text-brand-gold">Métalliques</span></h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez notre gamme complète de matériaux de construction de haute qualité, conçus pour la durabilité et la performance sur le terrain.
          </p>
        </div>

        <div className="space-y-32">
          {PRODUCTS.map((product, index) => (
            <section key={product.id} id={product.id} className="scroll-mt-32">
              <div className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center",
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              )}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={cn(index % 2 !== 0 ? "lg:order-2" : "")}
                >
                  <div className="relative">
                    <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute -bottom-6 -right-6 bg-brand-gold text-white p-6 rounded-2xl shadow-xl hidden sm:block">
                      <Shield size={32} className="mb-2" />
                      <p className="font-bold text-sm uppercase tracking-wider">Qualité Certifiée</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div>
                    <span className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-4 block">Produit {index + 1}</span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight">{product.title}</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="flex items-center gap-2 font-bold text-brand-navy">
                        <Settings size={20} className="text-brand-gold" />
                        Caractéristiques
                      </h4>
                      <ul className="space-y-2">
                        {product.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <ChevronRight size={16} className="text-brand-gold shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="flex items-center gap-2 font-bold text-brand-navy">
                        <Target size={20} className="text-brand-gold" />
                        Applications
                      </h4>
                      <ul className="space-y-2">
                        {product.applications.map((a, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
                    <h4 className="flex items-center gap-2 font-bold text-brand-navy mb-4">
                      <Zap size={20} className="text-brand-gold" />
                      Avantages
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {product.advantages.map((adv, i) => (
                        <span key={i} className="bg-white px-3 py-1 rounded-full text-xs font-bold text-brand-gold border border-yellow-200 shadow-sm">
                          {adv}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <Link 
                      href={`/produits/${product.id}`}
                      className="bg-brand-gold text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-yellow-600 transition-all shadow-lg"
                    >
                      Voir les détails
                      <ArrowRight size={20} />
                    </Link>
                    <a 
                      href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\s+/g, '')}?text=Bonjour, je souhaite avoir un devis pour : ${product.shortTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
                    >
                      <MessageCircle size={20} />
                      WhatsApp
                    </a>
                  </div>
                </motion.div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
