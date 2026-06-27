"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import Link from "next/link";
import { submitQuote, type QuoteState } from "@/app/(public)/cotizacion/actions";
import type { Product } from "@/lib/types";
import { useQuoteCart } from "@/components/cart/cart-context";

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
  const { items, setQty, remove, clear } = useQuoteCart();

  // Vaciar el carrito cuando la solicitud se envía con éxito
  useEffect(() => {
    if (state.status === "success" || state.status === "demo") clear();
  }, [state.status, clear]);

  if (state.status === "success" || state.status === "demo") {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center">
        <span className="grid place-items-center w-14 h-14 mx-auto rounded-full bg-cyan/10 text-cyan-ink" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
        <h2 className="mt-5 font-display text-2xl font-bold text-ink">¡Solicitud enviada!</h2>
        <p className="mt-3 text-muted">
          Gracias por tu interés. Un asesor de HD RIVIC te contactará muy pronto.
        </p>
        {state.status === "demo" && (
          <p className="mt-4 text-sm text-cyan-ink bg-cyan/10 rounded-lg px-4 py-3">
            Modo demo: conecta Supabase para guardar y recibir las solicitudes reales.
          </p>
        )}
        <Link href="/catalogo" className="btn-brand mt-6 inline-flex items-center justify-center h-11 px-6 rounded-xl text-sm font-semibold">
          Seguir explorando el catálogo
        </Link>
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

      {/* Equipos del carrito de cotización */}
      {items.length > 0 && (
        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="text-sm font-semibold text-ink mb-3">
            Equipos en tu cotización ({items.length})
          </p>
          <ul className="space-y-2.5">
            {items.map((it) => (
              <li key={it.id} className="flex items-center gap-3">
                <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-line bg-white">
                  {it.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={it.image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="w-full h-full grid place-items-center text-muted" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 16l5-5 4 4 3-3 6 6" />
                      </svg>
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-grow">
                  <p className="text-sm font-medium text-ink truncate">{it.name}</p>
                  <p className="text-xs text-muted">{it.category}</p>
                </div>
                <div className="inline-flex items-center rounded-lg border border-line bg-white shrink-0">
                  <button type="button" aria-label="Disminuir" onClick={() => setQty(it.id, it.qty - 1)} className="w-8 h-8 grid place-items-center text-muted hover:text-primary active:scale-90 transition">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14" /></svg>
                  </button>
                  <span className="w-7 text-center text-sm font-semibold tnum">{it.qty}</span>
                  <button type="button" aria-label="Aumentar" onClick={() => setQty(it.id, it.qty + 1)} className="w-8 h-8 grid place-items-center text-muted hover:text-primary active:scale-90 transition">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                  </button>
                </div>
                <button type="button" onClick={() => remove(it.id)} aria-label={`Quitar ${it.name}`} className="shrink-0 text-muted hover:text-rose-600 transition">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </button>
              </li>
            ))}
          </ul>
          <input
            type="hidden"
            name="items"
            value={JSON.stringify(
              items.map((i) => ({ name: i.name, qty: i.qty, category: i.category }))
            )}
          />
          <Link href="/catalogo" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-cyan-ink transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
            Agregar más equipos
          </Link>
        </div>
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

      {items.length === 0 && (
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
      )}

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
        className="btn-brand inline-flex items-center justify-center h-12 px-7 rounded-xl text-base font-semibold disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
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
