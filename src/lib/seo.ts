import type { Metadata } from "next";

export const SITE_NAME = "TAM'S EMPIRE CONSTRUCTION SARL";
export const SITE_DESCRIPTION =
  "Grossiste en matériaux de construction métalliques au Cameroun. Produits, réalisations, devis et accompagnement technique.";
export const DEFAULT_OG_IMAGE = "/images/realisation-02.jpeg";
export const DEFAULT_KEYWORDS = [
  "TAM'S EMPIRE CONSTRUCTION",
  "matériaux de construction",
  "construction métallique",
  "buses métalliques",
  "pannes métalliques",
  "tôles de couverture",
  "Yaoundé",
  "Cameroun",
];

function normalizeUrl(value: string) {
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `https://${value}`;
}

export function getSiteUrl() {
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    process.env.VERCEL_URL?.trim();

  if (!explicit) return "http://localhost:3000";
  return normalizeUrl(explicit);
}

export function getMetadataBase() {
  return new URL(getSiteUrl());
}

export function absoluteUrl(pathname = "/") {
  const base = getMetadataBase();
  return new URL(pathname, base).toString();
}

function trimDescription(value: string, max = 160) {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1)}…`;
}

type BuildMetadataArgs = {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  pathname,
  image = DEFAULT_OG_IMAGE,
  keywords = DEFAULT_KEYWORDS,
  noIndex = false,
}: BuildMetadataArgs): Metadata {
  const normalizedDescription = trimDescription(description);
  const canonical = absoluteUrl(pathname);
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description: normalizedDescription,
    keywords,
    alternates: {
      canonical,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "fr_CM",
      url: canonical,
      siteName: SITE_NAME,
      title,
      description: normalizedDescription,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: normalizedDescription,
      images: [ogImage],
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: getSiteUrl(),
    image: absoluteUrl("/images/logo-01.jpeg"),
    logo: absoluteUrl("/images/logo-01.jpeg"),
    telephone: "+237693448989",
    email: "tamsempireconstruction50@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yaoundé",
      addressCountry: "CM",
    },
    sameAs: [absoluteUrl("/")],
  };
}
