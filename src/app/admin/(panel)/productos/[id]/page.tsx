import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditarProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!isSupabaseConfigured) notFound();
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();
  const product = data as Product;

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/productos" className="text-sm text-muted hover:text-primary transition">
          ← Productos
        </Link>
        <h1 className="font-display text-2xl font-bold text-ink mt-2">
          Editar producto
        </h1>
      </div>
      <ProductForm product={product} />
    </div>
  );
}
