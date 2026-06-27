"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import CartButton from "@/components/cart/CartButton";

const CATS = [
  { label: "Inicio", href: "/" },
  { label: "Todos los equipos", href: "/catalogo" },
  { label: "Ozonoterapia", href: "/catalogo?cat=Ozonoterapia" },
  { label: "PEMF", href: "/catalogo?cat=PEMF" },
  { label: "DISSO3", href: "/catalogo?cat=DISSO3" },
  { label: "Accesorios", href: "/catalogo?cat=Accesorios" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-line shadow-sm">
      {/* Fila superior */}
      <div className="mx-auto max-w-[1240px] px-4 md:px-10 h-16 md:h-[72px] flex items-center gap-3 md:gap-5">
        <button
          type="button"
          aria-controls="mobileMenu"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 -ml-2 rounded-xl text-primary hover:bg-cyan/10 active:scale-95 transition"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>

        <Link href="/" className="flex items-center shrink-0" aria-label="HD RIVIC — Inicio">
          <Image
            src="/assets/hd-rivic-logo.png"
            alt="HD RIVIC · Ingeniería Médica"
            width={150}
            height={86}
            className="h-8 md:h-10 w-auto transition-transform duration-300 hover:scale-[1.03] active:scale-95"
            priority
          />
        </Link>

        <div className="hidden md:flex flex-grow max-w-xl">
          <SearchBar className="w-full" />
        </div>

        <div className="flex items-center gap-1 ml-auto md:ml-0">
          <Link
            href="/cotizacion"
            className="hidden xl:inline-flex items-center gap-2 h-11 px-4 rounded-xl text-sm font-semibold text-primary hover:bg-cyan/10 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8.1 9.6a16 16 0 006 6l1.2-1.1a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z" />
            </svg>
            Cotizar
          </Link>
          <CartButton />
        </div>
      </div>

      {/* Búsqueda móvil */}
      <div className="md:hidden px-4 pb-3">
        <SearchBar className="w-full" onSubmitted={() => setMenuOpen(false)} />
      </div>

      {/* Navegación de categorías (desktop) */}
      <nav className="hidden lg:block border-t border-line/70" aria-label="Categorías">
        <div className="mx-auto max-w-[1240px] px-10 h-11 flex items-center gap-6">
          {CATS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="navlink text-sm font-medium text-muted hover:text-primary transition-colors"
            >
              {c.label}
            </Link>
          ))}
          <span className="ml-auto inline-flex items-center gap-2 text-xs text-muted">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="1" y="5" width="14" height="12" rx="1" />
              <path d="M15 9h4l3 3v5h-7M5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Envío a todo México · Soporte 24/7
          </span>
        </div>
      </nav>

      {/* Menú móvil */}
      {menuOpen && (
        <div id="mobileMenu" className="menu-in lg:hidden border-t border-line bg-white">
          <nav
            className="px-4 py-2 flex flex-col"
            aria-label="Navegación móvil"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) setMenuOpen(false);
            }}
          >
            {CATS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="py-3.5 text-base font-medium text-ink border-b border-line"
              >
                {c.label}
              </Link>
            ))}
            <Link
              href="/cotizacion"
              className="btn-brand my-3 inline-flex items-center justify-center h-12 rounded-xl font-semibold"
            >
              Solicitar cotización
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
