"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SORTS = [
  { value: "relevancia", label: "Relevancia" },
  { value: "nombre-az", label: "Nombre A–Z" },
  { value: "nombre-za", label: "Nombre Z–A" },
];

type Props = {
  q: string;
  sort: string;
  cat: string | null;
  total: number;
};

export default function CatalogControls({ q, sort, cat, total }: Props) {
  const router = useRouter();
  const [term, setTerm] = useState(q);

  const navigate = (next: { q?: string; sort?: string }) => {
    const params = new URLSearchParams();
    if (cat) params.set("cat", cat);
    const qq = (next.q !== undefined ? next.q : term).trim();
    const ss = next.sort !== undefined ? next.sort : sort;
    if (qq) params.set("q", qq);
    if (ss && ss !== "relevancia") params.set("sort", ss);
    const s = params.toString();
    router.push(`/catalogo${s ? `?${s}` : ""}`);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ q: term });
        }}
        className="relative flex-grow sm:max-w-xs"
      >
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
        </span>
        <input
          type="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Buscar en el catálogo…"
          aria-label="Buscar en el catálogo"
          className="w-full h-11 pl-10 pr-3 rounded-xl border border-line bg-white text-sm text-ink placeholder:text-muted/70 focus-visible:border-cyan transition"
        />
      </form>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-sm text-muted whitespace-nowrap tnum">
          {total} equipo{total === 1 ? "" : "s"}
        </span>
        <div className="relative">
          <label className="sr-only" htmlFor="sort">Ordenar</label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => navigate({ sort: e.target.value })}
            className="appearance-none h-11 pl-3.5 pr-9 rounded-xl border border-line bg-white text-sm font-medium text-ink focus-visible:border-cyan transition cursor-pointer"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
          </span>
        </div>
      </div>
    </div>
  );
}
