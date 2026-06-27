"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import AddToQuoteButton from "@/components/cart/AddToQuoteButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card-enter card-glow group bg-white rounded-2xl border border-line overflow-hidden flex flex-col">
      <Link
        href={`/productos/${product.slug}`}
        className="block relative aspect-[4/3] bg-surface overflow-hidden"
      >
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-muted" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 16l5-5 4 4 3-3 6 6" />
              <circle cx="9" cy="8" r="1.5" />
            </svg>
          </div>
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-navy/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
        {product.badge && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-cyan text-white px-3 py-1 text-xs font-semibold shadow-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-white/90" aria-hidden="true" />
            {product.badge}
          </span>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-ink mb-1.5">
          {product.category}
        </p>
        <h3 className="font-display text-base font-semibold text-ink leading-snug">
          <Link href={`/productos/${product.slug}`} className="hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </Link>
        </h3>
        {product.tagline && (
          <p className="mt-1.5 text-sm text-muted line-clamp-2 flex-grow">{product.tagline}</p>
        )}
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.6 13.4l-7.2 7.2a2 2 0 01-2.8 0l-8-8V4h8.6l9.4 9.4a2 2 0 010 0z" />
            <circle cx="7.5" cy="7.5" r="1.5" />
          </svg>
          Precio bajo cotización
        </p>
        <div className="mt-4 flex gap-2">
          <AddToQuoteButton
            product={{
              id: product.id,
              slug: product.slug,
              name: product.name,
              image_url: product.image_url,
              category: product.category,
            }}
            label="Agregar"
            className="flex-grow"
          />
          <Link
            href={`/productos/${product.slug}`}
            aria-label={`Ver detalles de ${product.name}`}
            className="shrink-0 w-11 h-11 grid place-items-center rounded-xl border border-line text-primary hover:border-cyan/50 hover:bg-surface active:scale-95 transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
