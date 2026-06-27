"use client";

import { useQuoteCart } from "@/components/cart/cart-context";

export default function CartButton({ className = "" }: { className?: string }) {
  const { count, openCart } = useQuoteCart();
  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Abrir cotización${count > 0 ? ` (${count} equipos)` : ""}`}
      className={`relative inline-flex items-center justify-center w-11 h-11 rounded-xl text-primary hover:bg-cyan/10 active:scale-95 transition ${className}`}
    >
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      {count > 0 && (
        <span
          key={count}
          className="badge-pop absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 grid place-items-center rounded-full bg-cyan text-white text-[11px] font-bold tnum ring-2 ring-white"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
