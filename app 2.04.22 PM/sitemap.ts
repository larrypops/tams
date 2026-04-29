import type { MetadataRoute } from 'next';

import { productSlugs } from '@/lib/data';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/produits', '/realisations', '/a-propos', '/contact'];
  const productPages = productSlugs.map((slug) => `/produits/${slug}`);
  const allPages = [...pages, ...productPages];

  return allPages.map((page) => ({
    url: absoluteUrl(page),
    lastModified: new Date(),
    changeFrequency: page === '/' ? 'weekly' : 'monthly',
    priority: page === '/' ? 1 : page.startsWith('/produits/') ? 0.7 : 0.8
  }));
}
