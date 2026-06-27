import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getVisibleProducts } from "@/lib/products";
import ProductBuyBox from "@/components/catalog/ProductBuyBox";
import ProductCard from "@/components/catalog/ProductCard";

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

const TRUST_BADGES = [
  {
    t: "Envío nacional",
    icon: (
      <>
        <rect x="1" y="5" width="14" height="12" rx="1" />
        <path d="M15 9h4l3 3v5h-7M5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      </>
    ),
  },
  {
    t: "Garantía 24 meses",
    icon: (
      <>
        <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    t: "Instalación incluida",
    icon: (
      <>
        <path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2-2 2.6-2.6z" />
      </>
    ),
  },
];

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const all = await getVisibleProducts();
  const sameCat = all.filter((p) => p.category === product.category && p.slug !== product.slug);
  const related = (sameCat.length ? sameCat : all.filter((p) => p.slug !== product.slug)).slice(0, 4);

  return (
    <>
      <div className="bg-surface">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10 pt-8 md:pt-10 pb-16">
          {/* Migas de pan */}
          <nav className="text-sm text-muted mb-6" aria-label="Migas de pan">
            <Link href="/" className="hover:text-primary transition">Inicio</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/catalogo" className="hover:text-primary transition">Catálogo</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href={`/catalogo?cat=${encodeURIComponent(product.category)}`} className="hover:text-primary transition">{product.category}</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-ink">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            {/* Imagen */}
            <div className="card-glow group relative rounded-2xl overflow-hidden border border-line bg-white shadow-soft lg:sticky lg:top-32" data-reveal="right">
              <div className="aspect-[4/3] overflow-hidden">
                {product.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
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
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-cyan text-white px-3 py-1 text-xs font-semibold shadow-soft">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/90" aria-hidden="true" />
                  {product.badge}
                </span>
              )}
            </div>

            {/* Información */}
            <div data-reveal="left">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-ink mb-3">
                {product.category}
              </p>
              <h1 className="font-display text-3xl md:text-[2.5rem] font-bold tracking-tight text-ink">
                {product.name}
              </h1>

              <div className="mt-3 flex items-center gap-3">
                <div className="flex gap-0.5 text-star" role="img" aria-label="5 de 5 estrellas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-muted">Equipo de grado médico</span>
              </div>

              {product.tagline && (
                <p className="mt-4 text-lg text-muted">{product.tagline}</p>
              )}

              <div className="mt-6 rounded-2xl border border-line bg-white p-5">
                <p className="inline-flex items-center gap-2 text-lg font-bold text-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20.6 13.4l-7.2 7.2a2 2 0 01-2.8 0l-8-8V4h8.6l9.4 9.4a2 2 0 010 0z" />
                    <circle cx="7.5" cy="7.5" r="1.5" />
                  </svg>
                  Precio bajo cotización
                </p>
                <p className="mt-1 text-sm text-muted">
                  Recibe una propuesta personalizada con opciones de financiamiento.
                </p>

                <ProductBuyBox
                  product={{
                    id: product.id,
                    slug: product.slug,
                    name: product.name,
                    image_url: product.image_url,
                    category: product.category,
                  }}
                />
              </div>

              <ul className="mt-6 grid grid-cols-3 gap-3">
                {TRUST_BADGES.map((b) => (
                  <li key={b.t} className="flex flex-col items-center text-center gap-2 rounded-xl border border-line bg-white p-3">
                    <span className="text-cyan-ink" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {b.icon}
                      </svg>
                    </span>
                    <span className="text-xs font-medium text-ink leading-tight">{b.t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Descripción / Características / Especificaciones */}
          <div className="mt-14 grid lg:grid-cols-3 gap-8" data-reveal>
            <div className="lg:col-span-2 space-y-10">
              {product.description && (
                <section>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-ink mb-4">Descripción</h2>
                  <p className="leading-relaxed text-ink/80">{product.description}</p>
                </section>
              )}

              {product.features.length > 0 && (
                <section>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-ink mb-4">Características</h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {product.features.map((f) => (
                      <li key={f} className="flex gap-3 rounded-xl border border-line bg-white p-3.5 text-ink/90">
                        <svg className="mt-0.5 shrink-0 text-cyan-ink" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {product.specs.length > 0 && (
              <aside className="lg:sticky lg:top-32 h-fit">
                <h2 className="font-display text-lg font-bold tracking-tight text-ink mb-3">Especificaciones</h2>
                <dl className="rounded-2xl border border-line bg-white divide-y divide-line overflow-hidden shadow-soft">
                  {product.specs.map((s) => (
                    <div key={s.label} className="flex justify-between gap-6 px-5 py-3.5 transition-colors hover:bg-surface">
                      <dt className="text-muted text-sm">{s.label}</dt>
                      <dd className="font-semibold text-ink text-right text-sm tnum">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            )}
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      {related.length > 0 && (
        <section className="bg-white border-t border-line py-14 md:py-16">
          <div className="mx-auto max-w-[1240px] px-5 md:px-10">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6" data-reveal>
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink">
                También te puede interesar
              </h2>
              <Link href="/catalogo" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Ver catálogo
                <svg className="group-hover:translate-x-1 transition-transform" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" data-stagger="70">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
