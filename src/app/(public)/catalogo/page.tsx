import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import ProductCard from "@/components/catalog/ProductCard";
import { getVisibleProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catálogo de Equipos",
  description:
    "Equipos de medicina regenerativa HD RIVIC: sistemas de ozonoterapia, camas PEMF, DISSO3 y accesorios. Tecnología de grado médico fabricada en México.",
};

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const products = await getVisibleProducts();

  const categories = Array.from(new Set(products.map((p) => p.category)));
  const activeCat = cat && categories.includes(cat) ? cat : null;
  const filtered = activeCat
    ? products.filter((p) => p.category === activeCat)
    : products;

  const chip = (label: string, href: string, active: boolean) => (
    <Link
      key={label}
      href={href}
      className={`inline-flex items-center h-9 px-4 rounded-full text-sm font-medium border transition ${
        active
          ? "bg-primary text-white border-primary"
          : "bg-white text-muted border-line hover:border-cyan/50 hover:text-primary"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <>
      <PageHero
        eyebrow="Catálogo"
        title="Equipos de medicina regenerativa"
        subtitle="Tecnología de grado médico, diseñada y fabricada en México, con soporte directo de fábrica."
      />

      <section className="bg-surface py-10 md:py-14">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          {/* Filtros por categoría */}
          <div className="flex flex-wrap gap-2 mb-8">
            {chip("Todos", "/catalogo", activeCat === null)}
            {categories.map((c) =>
              chip(c, `/catalogo?cat=${encodeURIComponent(c)}`, activeCat === c)
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-line bg-white p-12 text-center">
              <p className="text-muted">
                No hay equipos en esta categoría por ahora.
              </p>
              <Link
                href="/cotizacion"
                className="mt-4 inline-flex items-center justify-center h-11 px-5 rounded-lg bg-blue text-white text-sm font-semibold hover:bg-primary transition"
              >
                Solicitar asesoría
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
