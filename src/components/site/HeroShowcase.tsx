"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AddToQuoteButton from "@/components/cart/AddToQuoteButton";
import type { QuoteItem } from "@/components/cart/cart-context";

type Item = Omit<QuoteItem, "qty">;

const ROTATE_MS = 5000;

function Stars() {
  return (
    <div className="flex gap-0.5 text-star opacity-90" role="img" aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
        </svg>
      ))}
    </div>
  );
}

export default function HeroShowcase({ products }: { products: Item[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const count = products.length;

  // Auto-avance (se re-agenda en cada cambio de index; pausa en hover/focus)
  useEffect(() => {
    if (paused || reduce || count <= 1) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % count),
      ROTATE_MS
    );
    return () => window.clearTimeout(id);
  }, [index, paused, reduce, count]);

  if (count === 0) return null;
  const safe = index % count;
  const p = products[safe];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="orb glow-pulse w-72 h-72 -top-10 -right-6 bg-cyan/30" aria-hidden="true" />

      <div
        className="relative rounded-3xl bg-gradient-to-br from-navy to-navy-2 p-5 md:p-7 shadow-glow"
        aria-roledescription="carrusel"
        aria-label="Equipos destacados"
      >
        <div className="absolute inset-0 grid-motif opacity-25 rounded-3xl" aria-hidden="true" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan/20 ring-1 ring-cyan/40 text-white px-3 py-1 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-bright" aria-hidden="true" />
              Destacado
            </span>
            <Stars />
          </div>

          {/* Contenido rotativo (key fuerza el remount → fade) */}
          <div key={p.id} className="showcase-fade">
            <Link
              href={`/productos/${p.slug}`}
              className="block mt-4 rounded-2xl overflow-hidden border border-white/10 bg-white/5 aspect-[5/4] group"
            >
              {p.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                />
              ) : (
                <span className="w-full h-full grid place-items-center text-white/40" aria-hidden="true">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 16l5-5 4 4 3-3 6 6" />
                  </svg>
                </span>
              )}
            </Link>

            <div className="mt-5 flex items-end justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-bright">{p.category}</p>
                <h2 className="mt-1 font-display text-lg font-bold text-white leading-snug line-clamp-2">{p.name}</h2>
                <p className="mt-1 text-sm text-white/60">Precio bajo cotización</p>
              </div>
              <AddToQuoteButton product={p} openOnAdd label="Agregar" className="shrink-0" />
            </div>
          </div>

          {/* Indicadores */}
          {count > 1 && (
            <div className="mt-5 flex items-center gap-2" role="tablist" aria-label="Seleccionar equipo destacado">
              {products.map((it, i) => (
                <button
                  key={it.id}
                  type="button"
                  role="tab"
                  aria-selected={i === safe}
                  aria-label={`Mostrar ${it.name}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === safe ? "w-6 bg-cyan-bright" : "w-1.5 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white rounded-2xl shadow-lift border border-line p-3.5 pr-5 flex items-center gap-3 float-med">
        <span className="grid place-items-center w-10 h-10 rounded-xl bg-blue-fixed text-primary" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
        </span>
        <div>
          <p className="text-sm font-bold text-ink leading-none">ISO 13485</p>
          <p className="text-xs text-muted mt-1">Grado médico certificado</p>
        </div>
      </div>
    </div>
  );
}
