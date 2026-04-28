export type ProductAvailability = "available" | "coming-soon";

export type ProductCategory = {
  id: string;
  label: string;
  emoji: string;
};

export type Product = {
  id: string;
  categoryId: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  gallery?: string[];
  videoUrl?: string;
  features: string[];
  applications: string[];
  advantages: string[];
  specs?: { label: string; value: string }[];
  availability?: ProductAvailability;
};

export type ProductCatalog = {
  categories: ProductCategory[];
  products: Product[];
};

export type ProductUpsertInput = Omit<Product, "id"> & {
  id?: string;
};
