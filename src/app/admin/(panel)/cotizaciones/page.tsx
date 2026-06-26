import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Quote, QuoteStatus } from "@/lib/types";
import { updateQuoteStatus, deleteQuote } from "./actions";

export const dynamic = "force-dynamic";

const FILTERS: { key: QuoteStatus | "todas"; label: string }[] = [
  { key: "nueva", label: "Nuevas" },
  { key: "atendida", label: "Atendidas" },
  { key: "archivada", label: "Archivadas" },
  { key: "todas", label: "Todas" },
];

const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));

const statusStyle: Record<QuoteStatus, string> = {
  nueva: "bg-cyan/15 text-cyan-ink",
  atendida: "bg-emerald-50 text-emerald-700",
  archivada: "bg-surface text-muted border border-line",
};

export default async function CotizacionesPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const { estado } = await searchParams;
  const active = (FILTERS.find((f) => f.key === estado)?.key ?? "nueva") as
    | QuoteStatus
    | "todas";

  if (!isSupabaseConfigured) {
    return <div className="text-muted">Conecta Supabase para ver las solicitudes.</div>;
  }

  const supabase = await createClient();
  let query = supabase
    .from("quotes")
    .select("*")
    .order("created_at", { ascending: false });
  if (active !== "todas") query = query.eq("status", active);
  const { data } = await query;
  const quotes = (data as Quote[]) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Cotizaciones</h1>
        <p className="text-muted mt-1">Solicitudes recibidas desde el sitio.</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.key}
            href={`/admin/cotizaciones?estado=${f.key}`}
            className={`inline-flex items-center h-9 px-4 rounded-full text-sm font-medium border transition ${
              active === f.key
                ? "bg-primary text-white border-primary"
                : "bg-white text-muted border-line hover:border-cyan/50 hover:text-primary"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {quotes.length === 0 ? (
        <div className="rounded-2xl border border-line bg-white p-12 text-center text-muted">
          No hay solicitudes en esta vista.
        </div>
      ) : (
        <ul className="space-y-4">
          {quotes.map((q) => (
            <li key={q.id} className="rounded-2xl border border-line bg-white p-5 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="font-semibold text-ink">{q.name}</h2>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusStyle[q.status]}`}>
                      {q.status}
                    </span>
                  </div>
                  {q.clinic && <p className="text-sm text-muted mt-0.5">{q.clinic}</p>}
                </div>
                <time className="text-xs text-muted shrink-0">{fmtDate(q.created_at)}</time>
              </div>

              <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <div className="flex gap-2">
                  <dt className="text-muted shrink-0">Correo:</dt>
                  <dd><a href={`mailto:${q.email}`} className="text-primary hover:underline break-all">{q.email}</a></dd>
                </div>
                {q.phone && (
                  <div className="flex gap-2">
                    <dt className="text-muted shrink-0">Teléfono:</dt>
                    <dd><a href={`tel:${q.phone}`} className="text-primary hover:underline">{q.phone}</a></dd>
                  </div>
                )}
                <div className="flex gap-2">
                  <dt className="text-muted shrink-0">Interés:</dt>
                  <dd className="text-ink">{q.product_name ?? "Asesoría general"}</dd>
                </div>
              </dl>

              {q.message && (
                <p className="mt-3 text-sm text-ink/80 bg-surface rounded-lg px-4 py-3 whitespace-pre-wrap">
                  {q.message}
                </p>
              )}

              {/* Acciones */}
              <div className="mt-4 pt-4 border-t border-line flex flex-wrap items-center gap-2">
                {q.status !== "atendida" && (
                  <form action={updateQuoteStatus}>
                    <input type="hidden" name="id" value={q.id} />
                    <input type="hidden" name="status" value="atendida" />
                    <button className="inline-flex items-center h-9 px-3.5 rounded-lg text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition">
                      Marcar atendida
                    </button>
                  </form>
                )}
                {q.status !== "nueva" && (
                  <form action={updateQuoteStatus}>
                    <input type="hidden" name="id" value={q.id} />
                    <input type="hidden" name="status" value="nueva" />
                    <button className="inline-flex items-center h-9 px-3.5 rounded-lg text-sm font-semibold text-cyan-ink bg-cyan/10 hover:bg-cyan/20 transition">
                      Volver a nueva
                    </button>
                  </form>
                )}
                {q.status !== "archivada" && (
                  <form action={updateQuoteStatus}>
                    <input type="hidden" name="id" value={q.id} />
                    <input type="hidden" name="status" value="archivada" />
                    <button className="inline-flex items-center h-9 px-3.5 rounded-lg text-sm font-semibold text-muted hover:bg-surface transition">
                      Archivar
                    </button>
                  </form>
                )}
                <a
                  href={`mailto:${q.email}?subject=${encodeURIComponent("HD RIVIC · Tu solicitud de cotización")}`}
                  className="inline-flex items-center h-9 px-3.5 rounded-lg text-sm font-semibold text-primary hover:bg-surface transition"
                >
                  Responder
                </a>
                <form action={deleteQuote} className="ml-auto">
                  <input type="hidden" name="id" value={q.id} />
                  <button className="inline-flex items-center h-9 px-3.5 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50 transition">
                    Eliminar
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
