import productsData from "@/data/products.json";

export interface Product {
  id: string;
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
}

export const PRODUCTS: Product[] = productsData as Product[];

export const CONTACT_INFO = {
  phone1: '+237 693 44 89 89',
  phone2: '+237 675 72 62 72',
  whatsapp: '+237 693 44 89 89',
  email: 'tamsempireconsrution50@gmail.com',
  address: 'Douala, Cameroun',
};
