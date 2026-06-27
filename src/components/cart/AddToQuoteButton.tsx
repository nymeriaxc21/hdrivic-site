"use client";

import { useState } from "react";
import { useQuoteCart, type QuoteItem } from "@/components/cart/cart-context";

type Props = {
  product: Omit<QuoteItem, "qty">;
  qty?: number;
  openOnAdd?: boolean;
  label?: string;
  className?: string;
};

export default function AddToQuoteButton({
  product,
  qty = 1,
  openOnAdd = false,
  label = "Agregar a cotización",
  className = "",
}: Props) {
  const { add, openCart } = useQuoteCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        add(product, qty);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1500);
        if (openOnAdd) openCart();
      }}
      aria-label={`${label}: ${product.name}`}
      className={`btn-brand inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl text-sm font-semibold ${className}`}
    >
      {added ? (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Agregado
        </>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}
