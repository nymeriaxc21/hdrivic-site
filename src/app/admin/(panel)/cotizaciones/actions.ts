"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { QuoteStatus } from "@/lib/types";

const VALID: QuoteStatus[] = ["nueva", "atendida", "archivada"];

export async function updateQuoteStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const status = String(formData.get("status") ?? "") as QuoteStatus;
  if (!id || !VALID.includes(status)) return;
  const supabase = await createClient();
  await supabase.from("quotes").update({ status }).eq("id", id);
  revalidatePath("/admin/cotizaciones");
  revalidatePath("/admin");
}

export async function deleteQuote(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("quotes").delete().eq("id", id);
  revalidatePath("/admin/cotizaciones");
  revalidatePath("/admin");
}
