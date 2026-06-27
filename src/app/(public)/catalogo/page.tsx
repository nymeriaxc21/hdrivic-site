import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import ProductCard from "@/components/catalog/ProductCard";
import CatalogControls from "@/components/catalog/CatalogControls";
import { getVisibleProducts } from "@/lib/products";
import type { Product } from "@/lib/types";

export const metadata: Metadata = {
  title: "Catálogo de Equipos",
  description:
    "Tienda de equipos de medicina regenerativa HD RIVIC: ozonoterapia, camas PEMF, DISSO3 y accesorios. Arma tu cotización en línea.",
};

function matches(p: Product, term: string) {
  return [p.name, p.tagline, p.category, p.description]
    .filter(Boolean)
    .some((s) => (s as string).toLowerCase().includes(term));
}

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; q?: string; sort?: string }>;
}) {
  const { cat, q, sort } = await searchParams;
  const all = await getVisibleProducts();

  const categories = Array.from(new Set(all.map((p) => p.category)));
  const activeCat = cat && categories.includes(cat) ? cat : null;
  const term = (q ?? "").trim().toLowerCase();
  const sortKey = sort === "nombre-az" || sort === "nombre-za" ? sort : "relevancia";

  // Conteos por categoría dentro de la búsqueda actual (ignorando la categoría)
  const base = term ? all.filter((p) => matches(p, term)) : all;
  const countFor = (c: string) => base.filter((p) => p.category === c).length;

  let filtered = base;
  if (activeCat) filtered = filtered.filter((p) => p.category === activeCat);
  if (sortKey === "nombre-az")
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name, "es"));
  else if (sortKey === "nombre-za")
    filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name, "es"));

  const hrefFor = (c: string | null) => {
    const params = new URLSearchParams();
    if (c) params.set("cat", c);
    if (term) params.set("q", (q ?? "").trim());
    if (sortKey !== "relevancia") params.set("sort", sortKey);
    const s = params.toString();
    return `/catalogo${s ? `?${s}` : ""}`;
  };

  const catLink = (label: string, c: string | null, count: number, active: boolean) => (
    <Link
      key={label}
      href={hrefFor(c)}
      aria-current={active ? "true" : undefined}
      className={`flex items-center justify-between gap-2 px-3.5 h-10 rounded-xl text-sm font-medium transition ${
        active
          ? "bg-gradient-to-r from-cyan to-blue text-white shadow-soft"
          : "text-muted hover:bg-white hover:text-primary"
      }`}
    >
      <span>{label}</span>
      <span className={`tnum text-xs ${active ? "text-white/80" : "text-muted/70"}`}>{count}</span>
    </Link>
  );

  return (
    <>
      <PageHero
        eyebrow="Tienda"
        title="Catálogo de equipos"
        subtitle="Tecnología de grado médico fabricada en México. Agrega equipos a tu cotización y recibe una propuesta personalizada."
      />

      <section className="bg-surface py-8 md:py-12 min-h-[60vh]">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          {/* Chips de categoría (móvil/tablet) */}
          <div className="lg:hidden -mx-5 px-5 mb-5 flex gap-2 overflow-x-auto pb-1">
            {catLink(`Todos (${base.length})`, null, base.length, activeCat === null)}
            {categories.map((c) =>
              catLink(c, c, countFor(c), activeCat === c)
            )}
          </div>

          <div className="grid lg:grid-cols-[250px_1fr] gap-8">
            {/* Sidebar (desktop) */}
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted mb-3 px-3.5">
                  Categorías
                </p>
                <nav className="space-y-1" aria-label="Filtrar por categoría">
                  {catLink(`Todos los equipos`, null, base.length, activeCat === null)}
                  {categories.map((c) => catLink(c, c, countFor(c), activeCat === c))}
                </nav>

                <div className="mt-6 rounded-2xl border border-line bg-gradient-to-br from-navy to-navy-2 text-white p-5">
                  <p className="font-display font-semibold">¿No encuentras tu equipo?</p>
                  <p className="mt-1.5 text-sm text-white/70">
                    Cuéntanos qué necesitas y te asesoramos.
                  </p>
                  <Link
                    href="/cotizacion"
                    className="btn-brand mt-4 inline-flex items-center justify-center h-10 px-4 rounded-xl text-sm font-semibold w-full"
                  >
                    Pedir asesoría
                  </Link>
                </div>
              </div>
            </aside>

            {/* Contenido */}
            <div>
              <div className="mb-6">
                <CatalogControls q={(q ?? "").trim()} sort={sortKey} cat={activeCat} total={filtered.length} />
              </div>

              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-line bg-white p-12 text-center" data-reveal>
                  <span className="mx-auto grid place-items-center w-14 h-14 rounded-2xl bg-cyan/10 text-cyan-ink mb-4" aria-hidden="true">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.3-4.3" />
                    </svg>
                  </span>
                  <p className="font-semibold text-ink">Sin resultados</p>
                  <p className="mt-1 text-muted">No encontramos equipos con esos filtros.</p>
                  <div className="mt-5 flex flex-wrap gap-3 justify-center">
                    <Link href="/catalogo" className="inline-flex items-center justify-center h-11 px-5 rounded-xl border border-line text-primary text-sm font-semibold hover:bg-surface transition">
                      Limpiar filtros
                    </Link>
                    <Link href="/cotizacion" className="btn-brand inline-flex items-center justify-center h-11 px-5 rounded-xl text-sm font-semibold">
                      Solicitar asesoría
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5" data-stagger="70">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
