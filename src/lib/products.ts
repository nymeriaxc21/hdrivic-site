import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { SEED_PRODUCTS } from "@/data/seed-products";
import type { Product } from "@/lib/types";

/**
 * Capa de acceso a productos. Mientras Supabase no esté conectado (o si una
 * consulta falla durante el setup), devuelve datos de ejemplo locales para que
 * el sitio siga viéndose. Una vez conectado, lee de la base de datos.
 */

export async function getVisibleProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    return SEED_PRODUCTS.filter((p) => p.visible);
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("visible", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[products] getVisibleProducts:", error.message);
    return SEED_PRODUCTS.filter((p) => p.visible);
  }
  return (data as Product[]) ?? [];
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getVisibleProducts();
  return all.filter((p) => p.featured);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured) {
    return SEED_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("visible", true)
    .maybeSingle();

  if (error) {
    console.error("[products] getProductBySlug:", error.message);
    return SEED_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
  return (data as Product) ?? null;
}

/** Todos los productos (incluye ocultos) — para el panel admin. */
export async function getAllProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    return SEED_PRODUCTS;
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[products] getAllProducts:", error.message);
    return SEED_PRODUCTS;
  }
  return (data as Product[]) ?? [];
}
