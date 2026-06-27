"use client";

import Link from "next/link";
import { useQuoteCart } from "@/components/cart/cart-context";

/** Barra inferior fija (móvil) consciente del carrito de cotización. */
export default function MobileBar() {
  const { count, openCart } = useQuoteCart();

  return (
    <div
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur border-t border-line"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="px-4 py-3 flex items-center gap-3">
        {count > 0 ? (
          <button
            type="button"
            onClick={openCart}
            className="btn-brand flex-grow inline-flex items-center justify-center gap-2 h-12 rounded-xl text-base font-semibold"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <path d="M3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
            Ver cotización ({count})
          </button>
        ) : (
          <Link
            href="/catalogo"
            className="btn-brand flex-grow inline-flex items-center justify-center gap-2 h-12 rounded-xl text-base font-semibold"
          >
            Explorar catálogo
          </Link>
        )}
        <a
          href="https://wa.me/522221234567"
          aria-label="Hablar por WhatsApp"
          className="shrink-0 grid place-items-center w-12 h-12 rounded-xl border border-line bg-white text-primary active:scale-95 transition"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.5 8.5 0 01-12.5 7.5L3 21l2-5.5A8.5 8.5 0 1121 11.5z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
