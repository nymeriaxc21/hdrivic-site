import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.name,
    description: product.tagline ?? product.description ?? undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <article className="bg-surface">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10 pt-28 md:pt-32 pb-20">
        {/* Migas de pan */}
        <nav className="text-sm text-muted mb-8" aria-label="Migas de pan">
          <Link href="/" className="hover:text-primary transition">Inicio</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <Link href="/catalogo" className="hover:text-primary transition">Catálogo</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Imagen */}
          <div className="relative rounded-2xl overflow-hidden border border-line bg-white shadow-soft">
            <div className="aspect-[4/3]">
              {product.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full grid place-items-center text-muted" aria-hidden="true">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 16l5-5 4 4 3-3 6 6" />
                    <circle cx="9" cy="8" r="1.5" />
                  </svg>
                </div>
              )}
            </div>
            {product.badge && (
              <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-cyan text-white px-3 py-1 text-xs font-semibold shadow-soft">
                {product.badge}
              </span>
            )}
          </div>

          {/* Información */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-ink mb-3">
              {product.category}
            </p>
            <h1 className="font-display text-3xl md:text-[2.5rem] font-bold tracking-tight text-ink">
              {product.name}
            </h1>
            {product.tagline && (
              <p className="mt-4 text-lg text-muted">{product.tagline}</p>
            )}

            {product.description && (
              <p className="mt-5 leading-relaxed text-ink/80">
                {product.description}
              </p>
            )}

            {product.features.length > 0 && (
              <ul className="mt-7 space-y-3">
                {product.features.map((f) => (
                  <li key={f} className="flex gap-3 text-ink/90">
                    <svg className="mt-0.5 shrink-0 text-cyan-ink" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {/* CTAs */}
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/cotizacion?producto=${product.slug}`}
                className="inline-flex items-center justify-center h-12 px-7 rounded-lg bg-blue text-white text-base font-semibold shadow-soft hover:bg-primary active:scale-[0.97] transition"
              >
                Solicitar Cotización
              </Link>
              <a
                href="https://wa.me/522221234567"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg border border-line text-primary text-base font-semibold hover:bg-white active:scale-[0.97] transition"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.5 8.5 0 01-12.5 7.5L3 21l2-5.5A8.5 8.5 0 1121 11.5z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Especificaciones */}
        {product.specs.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink mb-6">
              Especificaciones
            </h2>
            <dl className="rounded-2xl border border-line bg-white divide-y divide-line overflow-hidden max-w-2xl">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-6 px-6 py-4">
                  <dt className="text-muted">{s.label}</dt>
                  <dd className="font-semibold text-ink text-right tnum">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </article>
  );
}
