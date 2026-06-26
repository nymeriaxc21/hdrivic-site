import Link from "next/link";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group bg-white rounded-2xl border border-line overflow-hidden flex flex-col hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300">
      <Link
        href={`/productos/${product.slug}`}
        className="block relative aspect-[4/3] bg-surface overflow-hidden"
      >
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
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
        {product.badge && (
          <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-cyan text-white px-3 py-1 text-xs font-semibold shadow-soft">
            {product.badge}
          </span>
        )}
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-ink mb-2">
          {product.category}
        </p>
        <h3 className="font-display text-lg font-semibold text-ink">
          <Link href={`/productos/${product.slug}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </h3>
        {product.tagline && (
          <p className="mt-2 text-muted text-sm flex-grow">{product.tagline}</p>
        )}
        <div className="mt-5 flex items-center justify-between">
          <Link
            href={`/productos/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all"
          >
            Ver detalles
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <Link
            href={`/cotizacion?producto=${product.slug}`}
            className="text-sm font-semibold text-cyan-ink hover:text-primary transition-colors"
          >
            Cotizar
          </Link>
        </div>
      </div>
    </article>
  );
}
