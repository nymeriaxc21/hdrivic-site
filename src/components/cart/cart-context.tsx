"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** Un equipo dentro del carrito de cotización (no hay precios / pago en línea). */
export type QuoteItem = {
  id: string;
  slug: string;
  name: string;
  image_url: string | null;
  category: string;
  qty: number;
};

type CartContextValue = {
  items: QuoteItem[];
  count: number; // suma de cantidades
  distinct: number; // equipos distintos
  isOpen: boolean;
  hydrated: boolean;
  add: (item: Omit<QuoteItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  has: (id: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "hdrivic:quote-cart";

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Cargar desde localStorage al montar
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* noop */
    }
    setHydrated(true);
  }, []);

  // Persistir
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* noop */
    }
  }, [items, hydrated]);

  // Bloquear scroll del body mientras el drawer está abierto + cerrar con Esc
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const add = useCallback((item: Omit<QuoteItem, "qty">, qty = 1) => {
    setItems((cur) => {
      const idx = cur.findIndex((x) => x.id === item.id);
      if (idx >= 0) {
        const next = [...cur];
        next[idx] = { ...next[idx], qty: Math.min(99, next[idx].qty + qty) };
        return next;
      }
      return [...cur, { ...item, qty: Math.min(99, Math.max(1, qty)) }];
    });
  }, []);

  const remove = useCallback(
    (id: string) => setItems((cur) => cur.filter((x) => x.id !== id)),
    []
  );

  const setQty = useCallback(
    (id: string, qty: number) =>
      setItems((cur) =>
        qty <= 0
          ? cur.filter((x) => x.id !== id)
          : cur.map((x) => (x.id === id ? { ...x, qty: Math.min(99, qty) } : x))
      ),
    []
  );

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const count = useMemo(() => items.reduce((s, x) => s + x.qty, 0), [items]);
  const has = useCallback((id: string) => items.some((x) => x.id === id), [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count,
      distinct: items.length,
      isOpen,
      hydrated,
      add,
      remove,
      setQty,
      clear,
      openCart,
      closeCart,
      has,
    }),
    [items, count, isOpen, hydrated, add, remove, setQty, clear, openCart, closeCart, has]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useQuoteCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useQuoteCart debe usarse dentro de <QuoteCartProvider>");
  }
  return ctx;
}
