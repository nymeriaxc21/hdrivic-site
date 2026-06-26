import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Quote } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getStats() {
  if (!isSupabaseConfigured) {
    return { products: 0, visibles: 0, nuevas: 0, totalQuotes: 0, recent: [] as Quote[] };
  }
  const supabase = await createClient();
  const [products, visibles, nuevas, totalQuotes, recent] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("visible", true),
    supabase
      .from("quotes")
      .select("*", { count: "exact", head: true })
      .eq("status", "nueva"),
    supabase.from("quotes").select("*", { count: "exact", head: true }),
    supabase
      .from("quotes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);
  return {
    products: products.count ?? 0,
    visibles: visibles.count ?? 0,
    nuevas: nuevas.count ?? 0,
    totalQuotes: totalQuotes.count ?? 0,
    recent: (recent.data as Quote[]) ?? [],
  };
}

function StatCard({
  label,
  value,
  href,
  accent,
}: {
  label: string;
  value: number;
  href: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-2xl border p-6 transition hover:-translate-y-0.5 hover:shadow-soft ${
        accent
          ? "bg-primary text-white border-primary"
          : "bg-white border-line"
      }`}
    >
      <p className={`text-3xl font-display font-bold tnum ${accent ? "text-white" : "text-ink"}`}>
        {value}
      </p>
      <p className={`mt-1 text-sm ${accent ? "text-white/80" : "text-muted"}`}>{label}</p>
    </Link>
  );
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Resumen</h1>
          <p className="text-muted mt-1">Estado general de tu catálogo y solicitudes.</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-blue text-white text-sm font-semibold hover:bg-primary transition"
        >
          + Nuevo producto
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Cotizaciones nuevas" value={stats.nuevas} href="/admin/cotizaciones" accent />
        <StatCard label="Cotizaciones totales" value={stats.totalQuotes} href="/admin/cotizaciones" />
        <StatCard label="Productos publicados" value={stats.visibles} href="/admin/productos" />
        <StatCard label="Productos totales" value={stats.products} href="/admin/productos" />
      </div>

      <div className="rounded-2xl border border-line bg-white">
        <div className="px-6 py-4 border-b border-line flex items-center justify-between">
          <h2 className="font-semibold text-ink">Solicitudes recientes</h2>
          <Link href="/admin/cotizaciones" className="text-sm font-semibold text-primary hover:underline">
            Ver todas
          </Link>
        </div>
        {stats.recent.length === 0 ? (
          <p className="px-6 py-8 text-center text-muted">Aún no hay solicitudes.</p>
        ) : (
          <ul className="divide-y divide-line">
            {stats.recent.map((q) => (
              <li key={q.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-ink truncate">{q.name}</p>
                  <p className="text-sm text-muted truncate">
                    {q.clinic ? `${q.clinic} · ` : ""}
                    {q.product_name ?? "Asesoría general"}
                  </p>
                </div>
                <span
                  className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    q.status === "nueva"
                      ? "bg-cyan/15 text-cyan-ink"
                      : q.status === "atendida"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-surface text-muted"
                  }`}
                >
                  {q.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
