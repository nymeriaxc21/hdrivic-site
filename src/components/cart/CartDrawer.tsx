"use client";

import Link from "next/link";
import { useQuoteCart } from "@/components/cart/cart-context";

const BagIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

export default function CartDrawer() {
  const { items, isOpen, closeCart, setQty, remove, count, clear } = useQuoteCart();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-[70] bg-navy-deep/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de cotización"
        style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
        className={`fixed top-0 right-0 z-[80] h-dvh w-full max-w-md bg-surface shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between gap-4 px-5 h-16 border-b border-line bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-cyan/10 text-cyan-ink" aria-hidden="true">
              {BagIcon}
            </span>
            <div>
              <p className="font-display font-semibold text-ink leading-none">Tu cotización</p>
              <p className="text-xs text-muted mt-0.5">{count} equipo{count === 1 ? "" : "s"}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar"
            className="w-10 h-10 grid place-items-center rounded-lg text-muted hover:bg-surface hover:text-ink active:scale-95 transition"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Cuerpo */}
        {items.length === 0 ? (
          <div className="flex-grow grid place-items-center p-8 text-center">
            <div>
              <span className="mx-auto grid place-items-center w-16 h-16 rounded-2xl bg-cyan/10 text-cyan-ink mb-4" aria-hidden="true">
                {BagIcon}
              </span>
              <p className="font-semibold text-ink">Tu cotización está vacía</p>
              <p className="mt-1 text-sm text-muted max-w-xs">
                Agrega equipos del catálogo para solicitar una cotización sin compromiso.
              </p>
              <Link
                href="/catalogo"
                onClick={closeCart}
                className="btn-brand mt-5 inline-flex items-center justify-center h-11 px-5 rounded-xl text-sm font-semibold"
              >
                Explorar catálogo
              </Link>
            </div>
          </div>
        ) : (
          <ul className="flex-grow overflow-y-auto p-4 space-y-3">
            {items.map((it) => (
              <li key={it.id} className="flex gap-3 rounded-xl border border-line bg-white p-3">
                <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-line bg-surface">
                  {it.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={it.image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="w-full h-full grid place-items-center text-muted" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 16l5-5 4 4 3-3 6 6" />
                      </svg>
                    </span>
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-[11px] uppercase tracking-wide text-cyan-ink font-semibold">{it.category}</p>
                  <Link
                    href={`/productos/${it.slug}`}
                    onClick={closeCart}
                    className="block font-medium text-ink text-sm leading-snug hover:text-primary line-clamp-2"
                  >
                    {it.name}
                  </Link>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-lg border border-line bg-surface">
                      <button
                        type="button"
                        aria-label="Disminuir cantidad"
                        onClick={() => setQty(it.id, it.qty - 1)}
                        className="w-8 h-8 grid place-items-center text-muted hover:text-primary active:scale-90 transition"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14" /></svg>
                      </button>
                      <span className="w-8 text-center text-sm font-semibold tnum">{it.qty}</span>
                      <button
                        type="button"
                        aria-label="Aumentar cantidad"
                        onClick={() => setQty(it.id, it.qty + 1)}
                        className="w-8 h-8 grid place-items-center text-muted hover:text-primary active:scale-90 transition"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(it.id)}
                      className="text-xs font-medium text-muted hover:text-rose-600 transition"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Pie */}
        {items.length > 0 && (
          <div className="border-t border-line bg-white p-4 space-y-3 shrink-0">
            <p className="flex items-start gap-2 text-xs text-muted">
              <svg className="shrink-0 mt-0.5 text-cyan-ink" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
              </svg>
              Sin pago en línea — recibirás una cotización personalizada de nuestros ingenieros.
            </p>
            <Link
              href="/cotizacion"
              onClick={closeCart}
              className="btn-brand flex items-center justify-center gap-2 h-12 rounded-xl font-semibold"
            >
              Solicitar cotización
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <div className="flex items-center justify-between">
              <button type="button" onClick={clear} className="text-sm text-muted hover:text-rose-600 transition">
                Vaciar
              </button>
              <button type="button" onClick={closeCart} className="text-sm font-semibold text-primary hover:text-cyan-ink transition">
                Seguir viendo
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
