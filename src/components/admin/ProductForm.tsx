"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  saveProduct,
  deleteProduct,
  type ProductFormState,
} from "@/app/admin/(panel)/productos/actions";
import { PRODUCT_CATEGORIES, type Product } from "@/lib/types";

const initial: ProductFormState = { status: "idle" };

const inputClass =
  "w-full h-11 px-3.5 rounded-lg border border-line bg-white text-ink placeholder:text-muted/70 focus-visible:border-cyan transition";
const areaClass =
  "w-full px-3.5 py-3 rounded-lg border border-line bg-white text-ink placeholder:text-muted/70 focus-visible:border-cyan transition resize-y";
const labelClass = "block text-sm font-medium text-ink mb-1.5";

export default function ProductForm({ product }: { product?: Product }) {
  const [state, formAction, pending] = useActionState(saveProduct, initial);
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const supabase = createClient();
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("product-images")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (error) throw error;
      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(path);
      setImageUrl(data.publicUrl);
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "No se pudo subir la imagen."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} className="space-y-6">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="image_url" value={imageUrl} />

      {state.status === "error" && state.message && (
        <p className="rounded-lg bg-rose-50 text-rose-700 border border-rose-200 px-4 py-3 text-sm">
          {state.message}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-2xl border border-line bg-white p-6 space-y-5">
            <div>
              <label htmlFor="name" className={labelClass}>
                Nombre <span className="text-rose-600">*</span>
              </label>
              <input id="name" name="name" required defaultValue={product?.name} className={inputClass} placeholder="Generador de Ozono Medical Pro" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="slug" className={labelClass}>
                  Slug (URL)
                </label>
                <input id="slug" name="slug" defaultValue={product?.slug} className={inputClass} placeholder="Se genera del nombre si lo dejas vacío" />
              </div>
              <div>
                <label htmlFor="category" className={labelClass}>
                  Categoría
                </label>
                <select id="category" name="category" defaultValue={product?.category ?? PRODUCT_CATEGORIES[0]} className={`${inputClass} appearance-none`}>
                  {PRODUCT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="tagline" className={labelClass}>
                Frase corta
              </label>
              <input id="tagline" name="tagline" defaultValue={product?.tagline ?? ""} className={inputClass} placeholder="Resumen de una línea para las tarjetas" />
            </div>

            <div>
              <label htmlFor="description" className={labelClass}>
                Descripción
              </label>
              <textarea id="description" name="description" rows={4} defaultValue={product?.description ?? ""} className={areaClass} placeholder="Descripción completa del equipo…" />
            </div>

            <div>
              <label htmlFor="features" className={labelClass}>
                Características <span className="text-muted font-normal">(una por línea)</span>
              </label>
              <textarea id="features" name="features" rows={4} defaultValue={product?.features.join("\n")} className={areaClass} placeholder={"Control digital de concentración\nCalibración certificada"} />
            </div>

            <div>
              <label htmlFor="specs" className={labelClass}>
                Especificaciones <span className="text-muted font-normal">(formato “Etiqueta: valor”, una por línea)</span>
              </label>
              <textarea id="specs" name="specs" rows={4} defaultValue={product?.specs.map((s) => `${s.label}: ${s.value}`).join("\n")} className={areaClass} placeholder={"Concentración: 1–100 µg/mL\nGarantía: 24 meses"} />
            </div>
          </div>
        </div>

        {/* Columna lateral */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-line bg-white p-6 space-y-4">
            <p className={labelClass}>Imagen del producto</p>
            <div className="aspect-[4/3] rounded-xl border border-line bg-surface overflow-hidden grid place-items-center">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt="Vista previa" className="w-full h-full object-cover" />
              ) : (
                <span className="text-muted text-sm">Sin imagen</span>
              )}
            </div>
            <label className="inline-flex items-center justify-center h-10 px-4 rounded-lg border border-line bg-white text-sm font-semibold text-primary hover:bg-surface cursor-pointer transition w-full">
              {uploading ? "Subiendo…" : imageUrl ? "Cambiar imagen" : "Subir imagen"}
              <input type="file" accept="image/*" className="sr-only" onChange={onFile} disabled={uploading} />
            </label>
            {uploadError && <p className="text-sm text-rose-600">{uploadError}</p>}
          </div>

          <div className="rounded-2xl border border-line bg-white p-6 space-y-4">
            <div>
              <label htmlFor="badge" className={labelClass}>
                Etiqueta destacada
              </label>
              <input id="badge" name="badge" defaultValue={product?.badge ?? ""} className={inputClass} placeholder="Ej. Nuevo Lanzamiento" />
            </div>
            <div>
              <label htmlFor="sort_order" className={labelClass}>
                Orden
              </label>
              <input id="sort_order" name="sort_order" type="number" defaultValue={product?.sort_order ?? 100} className={inputClass} />
            </div>
            <label className="flex items-center gap-3 text-sm text-ink">
              <input type="checkbox" name="visible" defaultChecked={product?.visible ?? true} className="w-4 h-4 accent-[var(--color-primary)]" />
              Visible en el sitio
            </label>
            <label className="flex items-center gap-3 text-sm text-ink">
              <input type="checkbox" name="featured" defaultChecked={product?.featured ?? false} className="w-4 h-4 accent-[var(--color-primary)]" />
              Destacado en la portada
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending || uploading}
          className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-blue text-white text-sm font-semibold hover:bg-primary active:scale-[0.98] transition disabled:opacity-60"
        >
          {pending ? "Guardando…" : "Guardar producto"}
        </button>
        <Link href="/admin/productos" className="inline-flex items-center h-11 px-5 rounded-lg border border-line text-sm font-semibold text-muted hover:text-primary transition">
          Cancelar
        </Link>

        {product && (
          <button
            type="submit"
            formAction={deleteProduct}
            formNoValidate
            onClick={(e) => {
              if (!confirm("¿Eliminar este producto? Esta acción no se puede deshacer.")) {
                e.preventDefault();
              }
            }}
            className="ml-auto inline-flex items-center h-11 px-5 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50 transition"
          >
            Eliminar
          </button>
        )}
      </div>
    </form>
  );
}
