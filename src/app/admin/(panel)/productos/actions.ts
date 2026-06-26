"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ProductSpec } from "@/lib/types";

export type ProductFormState = { status: "idle" | "error"; message?: string };

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita acentos
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function parseFeatures(raw: string): string[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function parseSpecs(raw: string): ProductSpec[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return { label: line, value: "" };
      return {
        label: line.slice(0, idx).trim(),
        value: line.slice(idx + 1).trim(),
      };
    });
}

export async function saveProduct(
  _prev: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const id = String(formData.get("id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { status: "error", message: "El nombre es obligatorio." };

  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugInput ? slugify(slugInput) : slugify(name);
  if (!slug) return { status: "error", message: "El slug no es válido." };

  const row = {
    name,
    slug,
    category: String(formData.get("category") ?? "Ozonoterapia").trim(),
    badge: String(formData.get("badge") ?? "").trim() || null,
    tagline: String(formData.get("tagline") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    features: parseFeatures(String(formData.get("features") ?? "")),
    specs: parseSpecs(String(formData.get("specs") ?? "")),
    image_url: String(formData.get("image_url") ?? "").trim() || null,
    featured: formData.get("featured") === "on",
    visible: formData.get("visible") === "on",
    sort_order: Number(formData.get("sort_order") ?? 100) || 100,
  };

  const supabase = await createClient();

  if (id) {
    const { error } = await supabase.from("products").update(row).eq("id", id);
    if (error) {
      return {
        status: "error",
        message:
          error.code === "23505"
            ? "Ya existe un producto con ese slug."
            : error.message,
      };
    }
  } else {
    const { error } = await supabase.from("products").insert(row);
    if (error) {
      return {
        status: "error",
        message:
          error.code === "23505"
            ? "Ya existe un producto con ese slug."
            : error.message,
      };
    }
  }

  revalidatePath("/admin/productos");
  revalidatePath("/catalogo");
  revalidatePath(`/productos/${slug}`);
  redirect("/admin/productos");
}

export async function deleteProduct(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("products").delete().eq("id", id);
  revalidatePath("/admin/productos");
  revalidatePath("/catalogo");
  redirect("/admin/productos");
}
