import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CtaSection } from '@/components/cta-section';
import { ArrowRightIcon, CheckIcon, WhatsAppIcon } from '@/components/icons';
import { JsonLd } from '@/components/json-ld';
import { ProductCard } from '@/components/product-card';
import {
  company,
  getProductBySlug,
  getRelatedProducts,
  productSlugs
} from '@/lib/data';
import { buildMetadata, getBreadcrumbSchema } from '@/lib/seo';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return buildMetadata({
      title: 'Produit introuvable',
      description:
        'Cette fiche produit est introuvable. Consultez le catalogue complet de TAM\'S Empire Construction.',
      path: '/produits'
    });
  }

  return buildMetadata({
    title: `${product.name} - fiche produit`,
    description: product.description,
    path: `/produits/${product.slug}`,
    image: product.image ?? product.images[0],
    keywords: [
      product.name,
      product.categoryName,
      'toles a Yaounde',
      'materiaux metalliques de construction a Yaounde'
    ]
  });
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 3);
  const hasOnlyPlaceholderImages = product.images.every((image) =>
    image.includes('/assets/placeholders/')
  );

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    category: product.categoryName,
    brand: {
      '@type': 'Brand',
      name: company.name
    }
  };

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Accueil', path: '/' },
          { name: 'Produits', path: '/produits' },
          { name: product.name, path: `/produits/${product.slug}` }
        ])}
      />
      <JsonLd data={productSchema} />

      <section className="relative overflow-hidden bg-midnight pb-16 pt-32 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,166,72,0.18),transparent_24%),radial-gradient(circle_at_10%_20%,rgba(76,116,156,0.24),transparent_24%)]" />
        <div className="container-shell relative">
          <Link
            href="/produits#catalogue"
            className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
          >
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
            Retour au catalogue
          </Link>

          <p className="mt-6 text-xs uppercase tracking-[0.26em] text-gold">
            {product.categoryName}
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl leading-tight sm:text-6xl">
            {product.name}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/74 sm:text-lg">
            {product.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={product.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="button-secondary"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Commander sur WhatsApp
            </a>
            <Link href="/contact#devis" className="button-primary">
              Demander un devis
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding pt-10">
        <div className="container-shell grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-3xl text-slate-950 sm:text-4xl">Galerie produit complete</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Cette fiche affiche toutes les photos disponibles pour cette
              reference.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {product.images.map((image, index) => (
                <div
                  key={`${product.slug}-${image}`}
                  className={`relative overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white ${
                    index === 0 ? 'md:col-span-2' : ''
                  }`}
                >
                  <div className={`relative ${index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                    <Image
                      src={image}
                      alt={`${product.name} - photo ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 50vw, (min-width: 768px) 60vw, 100vw"
                    />
                  </div>
                </div>
              ))}
            </div>

            {hasOnlyPlaceholderImages ? (
              <div className="mt-6 rounded-[1.4rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
                Cette fiche utilise actuellement un visuel placeholder code par
                categorie. Vous pourrez remplacer ces images par vos vraies
                photos produit a tout moment.
              </div>
            ) : null}
          </div>

          <aside className="surface-panel p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              Informations produit
            </p>
            <h2 className="mt-4 text-3xl text-slate-950">Elements techniques</h2>

            <div className="mt-6 rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                Finition
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{product.finish}</p>
            </div>

            <div className="mt-4 rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                Disponibilite
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {product.availability}
              </p>
            </div>

            <ul className="mt-6 space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-gold" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-slate-200 pt-6">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                Points importants
              </p>
              <ul className="mt-4 space-y-3">
                {product.keyDetails.map((detail) => (
                  <li key={detail} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-gold" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-shell">
          <div className="surface-panel p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              Description amelioree
            </p>
            <h2 className="mt-4 text-3xl text-slate-950">Presentation complete du produit</h2>
            <p className="mt-5 max-w-4xl text-sm leading-8 text-slate-700">
              {product.longDescription}
            </p>
          </div>
        </div>
      </section>

      {relatedProducts.length ? (
        <section className="section-padding pt-0">
          <div className="container-shell">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  Meme categorie
                </p>
                <h2 className="mt-4 text-3xl text-slate-950">Autres produits similaires</h2>
              </div>
              <Link href="/produits#catalogue" className="button-light">
                Retour catalogue
              </Link>
            </div>

            <div className="mt-10 grid gap-6 xl:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaSection
        title="Besoin d une confirmation de prix ou de stock ?"
        description="Envoyez votre quantite, votre coloris et votre localisation pour recevoir rapidement une reponse sur WhatsApp."
      />
    </>
  );
}
