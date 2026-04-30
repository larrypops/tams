import productCatalogData from "@/data/products.json";

export interface ProductCategory {
  id: string;
  label: string;
  emoji: string;
}

export interface Product {
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
  specs?: {
    label: string;
    value: string;
  }[];
  availability?: "available" | "coming-soon";
}

interface ProductCatalogData {
  categories: ProductCategory[];
  products: Product[];
}

const catalog = productCatalogData as ProductCatalogData;

export const PRODUCT_CATEGORIES: ProductCategory[] = catalog.categories;
export const PRODUCTS: Product[] = catalog.products;

export const CONTACT_INFO = {
  phone1: '+237 693 44 89 89',
  phone2: '+237 675 72 62 72',
  whatsapp: '+237 693 44 89 89',
  email: 'tamsempireconstruction50@gmail.com',
  address: 'Yaoundé, Cameroun',
};
