'use client';

import { motion } from 'motion/react';
import { CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS, CONTACT_INFO, PRODUCT_CATEGORIES } from '@/src/constants';

export default function Products() {
  const productsByCategory = PRODUCT_CATEGORIES.map((category) => ({
    ...category,
    products: PRODUCTS.filter((product) => product.categoryId === category.id),
  })).filter((category) => category.products.length > 0);

  const buildProductWhatsAppLink = (productName: string) => {
    const message = encodeURIComponent(
      `Bonjour, je souhaite avoir un devis pour le produit : ${productName}.`,
    );
    return `https://wa.me/${CONTACT_INFO.whatsapp.replace(/\s+/g, '')}?text=${message}`;
  };

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

        <div className="mb-20 rounded-3xl border border-yellow-100 bg-yellow-50 p-8 md:p-10">
          <p className="mb-4 text-sm font-black uppercase tracking-widest text-brand-gold">🟧 Menu Produits (Détaillé)</p>
          <div className="space-y-8">
            {productsByCategory.map((category, categoryIndex) => (
              <div key={category.id}>
                <h2 className="mb-3 text-2xl font-display font-bold text-brand-navy">
                  {category.emoji} Catégorie {categoryIndex + 1} - {category.label}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {category.products.map((product) => (
                    <a
                      key={product.id}
                      href={`#${product.id}`}
                      className="rounded-full border border-yellow-200 bg-white px-4 py-2 text-sm font-semibold text-brand-navy transition-colors hover:text-brand-gold"
                    >
                      {product.shortTitle}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-32">
          {productsByCategory.map((category, categoryIndex) => (
            <section key={category.id} className="space-y-10">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
                <p className="text-sm font-black uppercase tracking-widest text-brand-gold mb-2">
                  Catégorie {categoryIndex + 1}
                </p>
                <h2 className="text-3xl md:text-4xl font-display font-extrabold text-brand-navy">
                  {category.emoji} {category.label}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {category.products.map((product, index) => (
                  <motion.article
                    key={product.id}
                    id={product.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className="group rounded-[2rem] bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all overflow-hidden flex flex-col scroll-mt-32"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.availability === 'coming-soon' && (
                        <span className="absolute top-4 right-4 bg-brand-navy text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          Bientôt disponible
                        </span>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-2xl font-display font-bold text-brand-navy mb-3 leading-tight">
                        {product.shortTitle}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-5">
                        {product.description}
                      </p>

                      <ul className="space-y-2 mb-6">
                        {product.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto flex flex-wrap gap-3">
                        <Link
                          href={`/produits/${product.id}`}
                          className="bg-brand-gold text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-yellow-600 transition-all"
                        >
                          Voir détails
                          <ArrowRight size={16} />
                        </Link>
                        <a
                          href={buildProductWhatsAppLink(product.shortTitle)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#25D366] text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:scale-105 transition-all"
                        >
                          <MessageCircle size={16} />
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
