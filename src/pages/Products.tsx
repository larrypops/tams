'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, MessageCircle, ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS, CONTACT_INFO, PRODUCT_CATEGORIES } from '@/src/constants';

export default function Products() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.categoryId === selectedCategory;
      if (!matchesCategory) return false;

      if (!normalizedQuery) return true;

      const searchableContent = [
        product.title,
        product.shortTitle,
        product.description,
        ...product.features,
        ...product.applications,
      ]
        .join(' ')
        .toLowerCase();

      return searchableContent.includes(normalizedQuery);
    });
  }, [query, selectedCategory]);

  const categoryLookup = useMemo(
    () =>
      new Map(
        PRODUCT_CATEGORIES.map((category) => [category.id, category] as const),
      ),
    [],
  );

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
        <div className="mb-14 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-6">
            Nos Solutions <span className="text-brand-gold">Métalliques</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Retrouvez rapidement un produit grâce à la recherche et filtrez par
            catégorie selon vos besoins chantier.
          </p>
        </div>

        <section className="mb-16 rounded-3xl border border-yellow-100 bg-yellow-50 p-6 md:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.7fr] lg:items-end">
            <div>
              <label
                htmlFor="product-search"
                className="mb-3 block text-sm font-black uppercase tracking-widest text-brand-gold"
              >
                Rechercher un produit
              </label>
              <div className="relative">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  id="product-search"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ex: tôles, gabions, pannes..."
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-brand-navy outline-none transition-colors focus:border-brand-gold"
                />
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-widest text-brand-gold">
                Filtrer par catégorie
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-brand-navy text-white'
                      : 'bg-white text-brand-navy border border-gray-200 hover:border-brand-gold hover:text-brand-gold'
                  }`}
                >
                  Toutes les catégories
                </button>
                {PRODUCT_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-brand-navy text-white'
                        : 'bg-white text-brand-navy border border-gray-200 hover:border-brand-gold hover:text-brand-gold'
                    }`}
                  >
                    {category.emoji} {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-5 text-sm text-gray-600">
            {filteredProducts.length} produit
            {filteredProducts.length > 1 ? 's' : ''} trouvé
            {filteredProducts.length > 1 ? 's' : ''}.
          </p>
        </section>

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-sm">
            <p className="text-2xl font-display font-bold text-brand-navy">
              Aucun produit trouvé
            </p>
            <p className="mt-3 text-gray-500">
              Essayez un autre mot-clé ou changez de catégorie.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product, index) => {
              const category = categoryLookup.get(product.categoryId);
              return (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="group rounded-[2rem] bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all overflow-hidden flex flex-col"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {category && (
                      <span className="absolute top-4 left-4 rounded-full bg-brand-navy/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                        {category.emoji} {category.label}
                      </span>
                    )}
                    {product.availability === 'coming-soon' && (
                      <span className="absolute top-4 right-4 bg-brand-gold text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
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
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-brand-gold shrink-0 mt-0.5"
                          />
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
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
