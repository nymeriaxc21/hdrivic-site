/** Tipos del dominio HD RIVIC. */

export type ProductSpec = { label: string; value: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  badge: string | null;
  tagline: string | null;
  description: string | null;
  features: string[];
  specs: ProductSpec[];
  image_url: string | null;
  featured: boolean;
  visible: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

/** Campos editables desde el admin (sin id/timestamps). */
export type ProductInput = Omit<Product, "id" | "created_at" | "updated_at">;

export type QuoteStatus = "nueva" | "atendida" | "archivada";

export type Quote = {
  id: string;
  created_at: string;
  name: string;
  clinic: string | null;
  email: string;
  phone: string | null;
  product_id: string | null;
  product_name: string | null;
  message: string | null;
  status: QuoteStatus;
};

export const PRODUCT_CATEGORIES = [
  "Ozonoterapia",
  "PEMF",
  "DISSO3",
  "Accesorios",
] as const;
