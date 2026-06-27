"use client";

import { useState } from "react";
import AddToQuoteButton from "@/components/cart/AddToQuoteButton";
import type { QuoteItem } from "@/components/cart/cart-context";

export default function ProductBuyBox({ product }: { product: Omit<QuoteItem, "qty"> }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-7">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-ink">Cantidad</span>
        <div className="inline-flex items-center rounded-xl border border-line bg-white">
          <button
            type="button"
            aria-label="Disminuir cantidad"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-10 h-11 grid place-items-center text-muted hover:text-primary active:scale-90 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14" /></svg>
          </button>
          <span className="w-10 text-center font-semibold tnum">{qty}</span>
          <button
            type="button"
            aria-label="Aumentar cantidad"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            className="w-10 h-11 grid place-items-center text-muted hover:text-primary active:scale-90 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <AddToQuoteButton
          product={product}
          qty={qty}
          openOnAdd
          label="Agregar a cotización"
          className="flex-grow"
        />
        <a
          href="https://wa.me/522221234567"
          className="btn-ghost inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl border border-line text-primary font-semibold hover:bg-surface hover:border-cyan/50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.5 8.5 0 01-12.5 7.5L3 21l2-5.5A8.5 8.5 0 1121 11.5z" />
          </svg>
          Cotizar por WhatsApp
        </a>
      </div>
    </div>
  );
}
