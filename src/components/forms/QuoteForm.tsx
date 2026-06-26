"use client";

import { useActionState } from "react";
import { submitQuote, type QuoteState } from "@/app/(public)/cotizacion/actions";
import type { Product } from "@/lib/types";

const initialState: QuoteState = { status: "idle" };

const inputClass =
  "w-full h-11 px-3.5 rounded-lg border border-line bg-white text-ink placeholder:text-muted/70 focus-visible:border-cyan transition";

export default function QuoteForm({
  products,
  defaultProductId,
}: {
  products: Pick<Product, "id" | "name">[];
  defaultProductId?: string;
}) {
  const [state, formAction, pending] = useActionState(submitQuote, initialState);

  if (state.status === "success" || state.status === "demo") {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center">
        <span className="grid place-items-center w-14 h-14 mx-auto rounded-full bg-cyan/10 text-cyan-ink" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
        <h2 className="mt-5 font-display text-2xl font-bold text-ink">
          ¡Solicitud enviada!
        </h2>
        <p className="mt-3 text-muted">
          Gracias por tu interés. Un asesor de HD RIVIC te contactará muy pronto.
        </p>
        {state.status === "demo" && (
          <p className="mt-4 text-sm text-cyan-ink bg-cyan/10 rounded-lg px-4 py-3">
            Modo demo: conecta Supabase para guardar y recibir las solicitudes
            reales.
          </p>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-2xl border border-line bg-white p-6 md:p-8 space-y-5">
      {state.status === "error" && state.message && (
        <p className="rounded-lg bg-rose-50 text-rose-700 border border-rose-200 px-4 py-3 text-sm">
          {state.message}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
            Nombre completo <span className="text-rose-600">*</span>
          </label>
          <input id="name" name="name" required className={inputClass} placeholder="Dra. María Ríos" />
        </div>
        <div>
          <label htmlFor="clinic" className="block text-sm font-medium text-ink mb-1.5">
            Clínica / Hospital
          </label>
          <input id="clinic" name="clinic" className={inputClass} placeholder="Clínica Regenera" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
            Correo electrónico <span className="text-rose-600">*</span>
          </label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="correo@clinica.com" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-ink mb-1.5">
            Teléfono / WhatsApp
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} placeholder="+52 222 123 4567" />
        </div>
      </div>

      <div>
        <label htmlFor="product_id" className="block text-sm font-medium text-ink mb-1.5">
          Equipo de interés
        </label>
        <select
          id="product_id"
          name="product_id"
          defaultValue={defaultProductId ?? ""}
          className={`${inputClass} appearance-none`}
        >
          <option value="">Asesoría general / no estoy seguro</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-3.5 py-3 rounded-lg border border-line bg-white text-ink placeholder:text-muted/70 focus-visible:border-cyan transition resize-y"
          placeholder="Cuéntanos sobre tu clínica y lo que necesitas…"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center h-12 px-7 rounded-lg bg-blue text-white text-base font-semibold shadow-soft hover:bg-primary active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
      >
        {pending ? "Enviando…" : "Enviar solicitud"}
      </button>

      <p className="text-xs text-muted">
        Al enviar aceptas que HD RIVIC te contacte sobre tu solicitud. No
        compartimos tus datos con terceros.
      </p>
    </form>
  );
}
