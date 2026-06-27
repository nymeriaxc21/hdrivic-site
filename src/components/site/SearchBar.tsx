"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
  initialValue?: string;
  onSubmitted?: () => void;
};

export default function SearchBar({ className = "", initialValue = "", onSubmitted }: Props) {
  const router = useRouter();
  const [q, setQ] = useState(initialValue);

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const term = q.trim();
        router.push(term ? `/catalogo?q=${encodeURIComponent(term)}` : "/catalogo");
        onSubmitted?.();
      }}
      className={`relative ${className}`}
    >
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </span>
      <input
        type="search"
        name="q"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar equipos, categorías…"
        aria-label="Buscar equipos"
        className="w-full h-11 pl-11 pr-24 rounded-xl border border-line bg-white text-ink placeholder:text-muted/70 focus-visible:border-cyan transition"
      />
      <span className="absolute right-1.5 top-1/2 -translate-y-1/2">
        <button
          type="submit"
          className="btn-brand inline-flex items-center justify-center h-8 px-4 rounded-lg text-sm font-semibold"
        >
          Buscar
        </button>
      </span>
    </form>
  );
}
