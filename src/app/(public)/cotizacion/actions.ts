"use server";

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type QuoteState = {
  status: "idle" | "success" | "error" | "demo";
  message?: string;
};

export async function submitQuote(
  _prev: QuoteState,
  formData: FormData
): Promise<QuoteState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const clinic = String(formData.get("clinic") ?? "").trim();
  const productId = String(formData.get("product_id") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email) {
    return { status: "error", message: "Nombre y correo son obligatorios." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Ingresa un correo electrónico válido." };
  }

  // Sin Supabase conectado: mostramos éxito en modo demo (no se guarda).
  if (!isSupabaseConfigured) {
    return { status: "demo" };
  }

  const supabase = await createClient();

  let product_id: string | null = null;
  let product_name: string | null = null;
  if (productId) {
    product_id = productId;
    const { data } = await supabase
      .from("products")
      .select("name")
      .eq("id", productId)
      .maybeSingle();
    product_name = data?.name ?? null;
  }

  const { error } = await supabase.from("quotes").insert({
    name,
    email,
    phone: phone || null,
    clinic: clinic || null,
    product_id,
    product_name,
    message: message || null,
  });

  if (error) {
    console.error("[quotes] insert:", error.message);
    return {
      status: "error",
      message: "No se pudo enviar la solicitud. Intenta de nuevo.",
    };
  }

  return { status: "success" };
}
