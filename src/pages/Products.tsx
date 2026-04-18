'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Search,
  ListFilter,
  X,
} from 'lucide-react';
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

  const categoryFilters = useMemo(
    () => [
      { id: 'all', label: 'Toutes les catégories', emoji: '🧩' },
      ...PRODUCT_CATEGORIES,
    ],
    [],
  );
  const selectedCategoryLabel =
    categoryFilters.find((category) => category.id === selectedCategory)
      ?.label ?? 'Toutes les catégories';

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

        <section className="mb-12 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-[0_20px_48px_-36px_rgba(15,23,42,0.7)] md:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.15fr_1.85fr] md:gap-6">
            <div>
              <label
                htmlFor="product-search"
                className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.18em] text-brand-navy/70"
              >
                Rechercher un produit
              </label>
              <div className="relative">
                <Search
                  size={18}
                  className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-brand-navy/45"
                />
                <input
                  id="product-search"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ex: tôles, gabions, pannes..."
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white pr-20 pl-11 text-sm text-brand-navy outline-none transition-colors placeholder:text-brand-navy/45 focus:border-brand-gold"
                />
                {query.trim().length > 0 && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute top-1/2 right-2 -translate-y-1/2 rounded-lg px-3 py-1 text-xs font-semibold text-brand-navy/70 transition-colors hover:bg-slate-100 hover:text-brand-navy"
                  >
                    Effacer
                  </button>
                )}
              </div>
            </div>

            <div>
              <p className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-navy/70">
                <ListFilter size={14} />
                Catégorie
              </p>

              <div className="md:hidden">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-brand-navy outline-none transition-colors focus:border-brand-gold"
                >
                  {categoryFilters.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.emoji} {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="hidden flex-wrap gap-2 md:flex">
                {categoryFilters.map((category) => {
                  const isActive = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategory(category.id)}
                      aria-pressed={isActive}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                        isActive
                          ? 'border-brand-navy bg-brand-navy text-white'
                          : 'border-slate-200 bg-white text-brand-navy/80 hover:border-brand-gold hover:text-brand-navy'
                      }`}
                    >
                      {category.emoji} {category.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 text-sm text-brand-navy/70 sm:flex-row sm:items-center sm:justify-between">
            <p className="leading-relaxed">
              <span className="font-bold text-brand-navy">{filteredProducts.length}</span>{' '}
              produit{filteredProducts.length > 1 ? 's' : ''} trouvé
              {filteredProducts.length > 1 ? 's' : ''} dans{' '}
              <span className="font-semibold text-brand-navy">
                {selectedCategoryLabel}
              </span>
              .
            </p>
            {(query.trim().length > 0 || selectedCategory !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('all');
                }}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-brand-navy/80 transition-colors hover:border-brand-gold hover:text-brand-navy"
              >
                <X size={13} />
                Réinitialiser
              </button>
            )}
          </div>
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
              return (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 sm:aspect-[5/6] lg:aspect-[4/3]">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.availability === 'coming-soon' && (
                      <span className="absolute top-4 right-4 bg-brand-gold text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Bientôt disponible
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="mb-3 text-2xl leading-tight font-display font-bold text-brand-navy">
                      {product.shortTitle}
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-gray-600">
                      {product.description}
                    </p>

                    <ul className="mb-6 space-y-2">
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

                    <div className="mt-auto grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Link
                        href={`/produits/${product.id}`}
                        className="flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-yellow-600"
                      >
                        Voir détails
                        <ArrowRight size={16} />
                      </Link>
                      <a
                        href={buildProductWhatsAppLink(product.shortTitle)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
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
