import "server-only";

export const ADMIN_CONTENT_TYPES = {
  products: {
    path: "data/products.json",
    label: "Produits",
  },
} as const;

export type AdminContentType = keyof typeof ADMIN_CONTENT_TYPES;

export function isAdminContentType(value: string): value is AdminContentType {
  return value in ADMIN_CONTENT_TYPES;
}

