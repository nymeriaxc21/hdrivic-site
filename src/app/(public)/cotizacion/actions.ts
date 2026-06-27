"use server";

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type QuoteState = {
  status: "idle" | "success" | "error" | "demo";
  message?: string;
};

type CartItem = { name: string; qty: number; category?: string };

function parseItems(raw: string): CartItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x) => x && typeof x.name === "string")
      .map((x) => ({
        name: String(x.name).slice(0, 160),
        qty: Math.min(99, Math.max(1, Number(x.qty) || 1)),
        category: x.category ? String(x.category).slice(0, 80) : undefined,
      }))
      .slice(0, 50);
  } catch {
    return [];
  }
}

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
  const items = parseItems(String(formData.get("items") ?? "").trim());

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
  let finalMessage = message || null;

  if (items.length > 0) {
    // Cotización con varios equipos (carrito)
    product_name = items.map((i) => `${i.name} ×${i.qty}`).join("; ").slice(0, 300);
    const summary =
      "Equipos solicitados:\n" +
      items.map((i) => `• ${i.name} ×${i.qty}`).join("\n");
    finalMessage = message ? `${summary}\n\n${message}` : summary;
  } else if (productId) {
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
    message: finalMessage,
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
