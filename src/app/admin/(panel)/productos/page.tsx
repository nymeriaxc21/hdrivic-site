import Link from "next/link";
import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Productos</h1>
          <p className="text-muted mt-1">
            {products.length} {products.length === 1 ? "producto" : "productos"} en el catálogo.
          </p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-blue text-white text-sm font-semibold hover:bg-primary transition"
        >
          + Nuevo producto
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-line bg-white p-12 text-center">
          <p className="text-muted">Aún no tienes productos.</p>
          <Link href="/admin/productos/nuevo" className="mt-4 inline-flex items-center justify-center h-11 px-5 rounded-lg bg-blue text-white text-sm font-semibold hover:bg-primary transition">
            Crear el primero
          </Link>
        </div>
      ) : (
        <ul className="rounded-2xl border border-line bg-white divide-y divide-line overflow-hidden">
          {products.map((p) => (
            <li key={p.id}>
              <Link
                href={`/admin/productos/${p.id}`}
                className="flex items-center gap-4 px-4 py-3.5 hover:bg-surface transition"
              >
                <div className="shrink-0 w-14 h-14 rounded-lg border border-line bg-surface overflow-hidden grid place-items-center">
                  {p.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 16l5-5 4 4 3-3 6 6" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0 flex-grow">
                  <p className="font-medium text-ink truncate">{p.name}</p>
                  <p className="text-sm text-muted truncate">{p.category}</p>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  {p.featured && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-fixed text-primary">Destacado</span>
                  )}
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      p.visible ? "bg-emerald-50 text-emerald-700" : "bg-surface text-muted border border-line"
                    }`}
                  >
                    {p.visible ? "Visible" : "Oculto"}
                  </span>
                  <svg className="text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
