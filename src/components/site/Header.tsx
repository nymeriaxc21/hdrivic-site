"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandMark from "./BrandMark";

const NAV = [
  { href: "/catalogo", label: "Equipos" },
  { href: "/#tecnologia", label: "Tecnología" },
  { href: "/#proceso", label: "Proceso" },
  { href: "/#testimonios", label: "Testimonios" },
  { href: "/#faq", label: "Preguntas" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Sobre el hero oscuro (home) el header es claro y se oscurece al hacer scroll.
  // En páginas internas arranca siempre en modo sólido.
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled((window.scrollY || 0) > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const headerClass = [
    "fixed top-0 inset-x-0 z-50 border-b border-transparent",
    isHome ? (scrolled ? "scrolled" : "") : "solid",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header id="siteHeader" className={headerClass}>
      <div className="mx-auto max-w-[1240px] h-16 md:h-[72px] px-5 md:px-10 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="HD RIVIC — Inicio"
        >
          <BrandMark />
          <span className="leading-none">
            <span className="brand-word block font-display text-lg font-bold tracking-tight">
              HD RIVIC
            </span>
            <span className="brand-tag block text-[10px] font-semibold uppercase tracking-[0.18em] mt-0.5">
              Ingeniería Médica
            </span>
          </span>
        </Link>

        <nav
          className="hidden lg:flex items-center gap-7 h-full"
          aria-label="Navegación principal"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="navlink text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cotizacion"
            className="hidden sm:inline-flex items-center justify-center h-11 px-5 rounded-lg bg-blue text-white text-sm font-semibold shadow-soft hover:bg-primary active:scale-[0.97] transition"
          >
            Solicitar Cotización
          </Link>
          <button
            type="button"
            aria-controls="mobileMenu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((v) => !v)}
            className="menu-btn lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg hover:bg-black/5 active:scale-95 transition"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobileMenu"
          className="lg:hidden bg-surface/95 backdrop-blur border-t border-line"
        >
          <nav
            className="px-5 py-2 flex flex-col"
            aria-label="Navegación móvil"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) setMenuOpen(false);
            }}
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3.5 text-base font-medium text-ink border-b border-line"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/cotizacion"
              className="mt-3 mb-3 inline-flex items-center justify-center h-12 rounded-lg bg-blue text-white font-semibold"
            >
              Solicitar Cotización
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
