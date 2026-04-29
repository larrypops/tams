import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { FloatingWhatsAppButton } from '@/components/floating-whatsapp-button';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { JsonLd } from '@/components/json-ld';
import { company } from '@/lib/data';
import { absoluteUrl, getLocalBusinessSchema, getWebsiteSchema } from '@/lib/seo';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl('/')),
  title: {
    default: "TAM'S Empire Construction | Materiaux metalliques pour construction a Yaounde",
    template: `%s | ${company.name}`
  },
  description: company.description,
  keywords: [
    'toles a Yaounde',
    'vente de toles a Yaounde',
    'materiaux metalliques de construction a Yaounde',
    'buses metalliques Cameroun',
    'pannes metalliques Yaounde',
    'toles galvanisees Cameroun',
    'toles acier noir Yaounde',
    'fournisseur de materiaux metalliques a Yaounde',
    'materiaux de construction metallique Cameroun',
    'devis toles Yaounde'
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_CM',
    siteName: company.name,
    title: "TAM'S Empire Construction | Materiaux metalliques pour construction a Yaounde",
    description: company.description,
    url: absoluteUrl('/'),
    images: [
      {
        url: absoluteUrl('/assets/realisations/IMG_4678.jpg'),
        width: 1200,
        height: 630,
        alt: "TAM'S Empire Construction a Yaounde"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "TAM'S Empire Construction | Materiaux metalliques pour construction a Yaounde",
    description: company.description,
    images: [absoluteUrl('/assets/realisations/IMG_4678.jpg')]
  },
  alternates: {
    canonical: '/'
  },
  icons: {
    icon: '/assets/logo/logo.jpg',
    apple: '/assets/logo/logo.jpg'
  }
};

export const viewport: Viewport = {
  themeColor: '#07111D'
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <JsonLd data={[getWebsiteSchema(), getLocalBusinessSchema()]} />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
