"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/admin", label: "Inicio", exact: true },
  { href: "/admin/productos", label: "Productos", exact: false },
  { href: "/admin/cotizaciones", label: "Cotizaciones", exact: false },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-1 overflow-x-auto" aria-label="Navegación del panel">
      {ITEMS.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`shrink-0 h-9 inline-flex items-center px-3.5 rounded-lg text-sm font-medium transition ${
              active
                ? "bg-primary text-white"
                : "text-muted hover:text-primary hover:bg-surface"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
