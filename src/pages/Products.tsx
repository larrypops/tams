'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Search,
  SlidersHorizontal,
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

  const categoryLookup = useMemo(
    () =>
      new Map(
        PRODUCT_CATEGORIES.map((category) => [category.id, category] as const),
      ),
    [],
  );
  const categoryFilters = useMemo(
    () => [
      { id: 'all', label: 'Toutes les catégories', emoji: '🧩' },
      ...PRODUCT_CATEGORIES,
    ],
    [],
  );
  const selectedCategoryLabel =
    selectedCategory === 'all'
      ? 'Toutes les catégories'
      : categoryLookup.get(selectedCategory)?.label ?? 'Toutes les catégories';

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

        <section className="relative mb-16 overflow-hidden rounded-[2rem] border border-brand-navy/10 bg-white p-5 shadow-[0_24px_60px_-36px_rgba(18,44,91,0.6)] md:p-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-brand-gold/20 via-brand-gold/5 to-brand-navy/10" />
          <div className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-brand-gold/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-brand-navy/15 blur-3xl" />

          <div className="relative space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_2fr] lg:items-end">
              <div>
                <label
                  htmlFor="product-search"
                  className="mb-3 block text-xs font-black uppercase tracking-[0.22em] text-brand-gold"
                >
                  Rechercher un produit
                </label>
                <div className="relative rounded-2xl border border-brand-navy/10 bg-white/95 shadow-sm transition-all duration-300 focus-within:border-brand-gold/60 focus-within:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]">
                  <Search
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/50"
                  />
                  <input
                    id="product-search"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ex: tôles, gabions, pannes..."
                    className="h-12 w-full rounded-2xl bg-transparent pr-20 pl-11 text-sm text-brand-navy outline-none placeholder:text-brand-navy/45"
                  />
                  {query.trim().length > 0 && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="absolute top-1/2 right-2 inline-flex -translate-y-1/2 items-center gap-1 rounded-full bg-brand-navy/90 px-3 py-1 text-xs font-semibold text-white transition-all hover:bg-brand-navy"
                    >
                      <X size={12} />
                      Effacer
                    </button>
                  )}
                </div>
              </div>

              <div>
                <p className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-brand-gold">
                  <SlidersHorizontal size={14} />
                  Filtrer par catégorie
                </p>
                <div className="relative">
                  <div className="pointer-events-none absolute top-0 bottom-1 left-0 w-8 bg-gradient-to-r from-white via-white/80 to-transparent md:hidden" />
                  <div className="pointer-events-none absolute top-0 right-0 bottom-1 w-8 bg-gradient-to-l from-white via-white/80 to-transparent md:hidden" />

                  <div className="flex snap-x gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible md:px-0">
                    {categoryFilters.map((category) => {
                      const isActive = selectedCategory === category.id;
                      return (
                        <motion.button
                          layout
                          key={category.id}
                          type="button"
                          onClick={() => setSelectedCategory(category.id)}
                          aria-pressed={isActive}
                          whileTap={{ scale: 0.97 }}
                          className={`relative isolate snap-start shrink-0 overflow-hidden rounded-full border px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-300 md:py-2 ${
                            isActive
                              ? 'border-brand-navy text-white shadow-[0_10px_24px_-14px_rgba(27,58,109,0.8)]'
                              : 'border-brand-navy/15 bg-white text-brand-navy/80 hover:-translate-y-0.5 hover:border-brand-gold/70 hover:text-brand-navy'
                          }`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="active-category-pill"
                              className="absolute inset-0 -z-10 rounded-full bg-brand-navy"
                              transition={{
                                type: 'spring',
                                stiffness: 380,
                                damping: 30,
                              }}
                            />
                          )}
                          <span className="flex items-center gap-2">
                            <span>{category.emoji}</span>
                            <span>{category.label}</span>
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-brand-navy/10 pt-4 text-sm text-brand-navy/70 sm:flex-row sm:items-center sm:justify-between">
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
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-navy/15 bg-white px-4 py-2 text-xs font-semibold tracking-wide text-brand-navy transition-all hover:border-brand-gold hover:text-brand-gold"
                >
                  <X size={13} />
                  Réinitialiser les filtres
                </button>
              )}
            </div>
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
