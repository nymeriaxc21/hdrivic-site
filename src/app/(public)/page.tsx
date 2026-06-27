import Link from "next/link";
import type { ReactNode } from "react";
import { getVisibleProducts } from "@/lib/products";
import ProductCard from "@/components/catalog/ProductCard";
import SearchBar from "@/components/site/SearchBar";
import HeroShowcase from "@/components/site/HeroShowcase";

/* ---------- Datos ---------- */
const TRUST = [
  "Clínica Regenera",
  "Hospital Ángeles",
  "BioSalud",
  "OrthoMed",
  "VitalCare",
  "Centro Regenerativo MX",
];

const CATEGORIES: { name: string; desc: string; icon: ReactNode }[] = [
  {
    name: "Ozonoterapia",
    desc: "Generadores de ozono médico",
    icon: (
      <>
        <path d="M8 2h8M12 2v6M5 22a7 7 0 0114 0z" />
        <circle cx="12" cy="13" r="3" />
      </>
    ),
  },
  { name: "PEMF", desc: "Camas electromagnéticas", icon: <path d="M3 12h4l2-7 4 14 2-7h6" /> },
  { name: "DISSO3", desc: "Disolución de ozono patentada", icon: <path d="M12 2s6 6 6 10a6 6 0 11-12 0c0-4 6-10 6-10z" /> },
  {
    name: "Accesorios",
    desc: "Consumibles certificados",
    icon: <path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2-2 2.6-2.6z" />,
  },
];

const BENEFITS: { t: string; icon: ReactNode }[] = [
  {
    t: "Envío a todo México",
    icon: (
      <>
        <rect x="1" y="5" width="14" height="12" rx="1" />
        <path d="M15 9h4l3 3v5h-7M5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      </>
    ),
  },
  {
    t: "Garantía 24 meses",
    icon: (
      <>
        <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    t: "Instalación + capacitación",
    icon: (
      <>
        <path d="M22 10L12 5 2 10l10 5 10-5z" />
        <path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
      </>
    ),
  },
  {
    t: "Soporte técnico 24/7",
    icon: (
      <>
        <path d="M4 14v-3a8 8 0 0116 0v3" />
        <path d="M18 18a2 2 0 01-2 2h-2" />
        <rect x="2" y="13" width="4" height="6" rx="1" />
        <rect x="18" y="13" width="4" height="6" rx="1" />
      </>
    ),
  },
];

const TESTIMONIALS = [
  {
    quote:
      "La precisión de los generadores de ozono y el soporte de fábrica nos cambiaron la operación. Calibración impecable en cada entrega.",
    name: "Dra. María Fernanda Ríos",
    role: "Directora, Clínica Regenera · CDMX",
    initials: "MR",
    badge: "bg-primary",
  },
  {
    quote:
      "Las camas PEMF aceleraron notablemente la recuperación de mis pacientes de trauma. Equipos sólidos y bien respaldados.",
    name: "Dr. Alejandro Cervantes",
    role: "Traumatología, Hospital Ángeles · Puebla",
    initials: "AC",
    badge: "bg-cyan",
  },
  {
    quote:
      "El acompañamiento y la capacitación marcaron la diferencia. Un proveedor a la altura de los estándares internacionales.",
    name: "Dra. Lucía Hernández",
    role: "Medicina del Deporte · Monterrey",
    initials: "LH",
    badge: "bg-navy",
  },
];

function Stars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-0.5 text-star ${className}`} role="img" aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
        </svg>
      ))}
    </div>
  );
}

const ArrowRight = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default async function HomePage() {
  const products = await getVisibleProducts();
  const featured = products.filter((p) => p.featured);
  const heroProduct = featured[0] ?? products[0];
  const promoProduct =
    products.find((p) => (p.badge ?? "").toLowerCase().includes("nuevo")) ??
    featured[1] ??
    products[1] ??
    heroProduct;
  const featuredGrid = (featured.length ? featured : products).slice(0, 4);
  const showcaseProducts = (featured.length ? featured : products.slice(0, 5)).map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    image_url: p.image_url,
    category: p.category,
  }));
  const countByCat = (c: string) => products.filter((p) => p.category === c).length;

  return (
    <>
      {/* ===================== HERO (showcase de producto) ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-surface-2 via-white to-blue-fixed/40 border-b border-line">
        <div className="orb glow-pulse w-[26rem] h-[26rem] -top-32 -left-24 bg-cyan/20" aria-hidden="true" />
        <div className="orb glow-pulse w-[22rem] h-[22rem] top-40 right-[-6rem] bg-blue/15" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[1240px] px-5 md:px-10 py-12 md:py-16 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Texto */}
          <div data-stagger="90">
            <h1 className="font-display text-[2.4rem] leading-[1.06] sm:text-5xl md:text-[3.4rem] font-bold tracking-tight text-ink" data-reveal>
              Equipa tu clínica con{" "}
              <span className="text-gradient-brand anim-gradient-text">medicina regenerativa</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted max-w-xl" data-reveal>
              Ozonoterapia, camas PEMF, DISSO3 y accesorios — ingeniería propia
              fabricada en México. Explora el catálogo y arma tu cotización en
              minutos.
            </p>

            <div className="mt-7 max-w-lg" data-reveal>
              <SearchBar className="w-full" />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2" data-reveal>
              {["Envío nacional", "Garantía 24 meses", "Sin pago en línea"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 text-sm text-muted">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-ink" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Showcase rotativo de destacados */}
          {showcaseProducts.length > 0 && (
            <div data-reveal="left">
              <HeroShowcase products={showcaseProducts} />
            </div>
          )}
        </div>
      </section>

      {/* ===================== BENEFICIOS ===================== */}
      <section className="bg-white border-b border-line">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10 py-5 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4" data-stagger="60">
          {BENEFITS.map((b) => (
            <div key={b.t} className="flex items-center gap-3" data-reveal>
              <span className="shrink-0 grid place-items-center w-10 h-10 rounded-xl bg-blue-fixed text-primary" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{b.icon}</svg>
              </span>
              <p className="font-semibold text-ink text-sm">{b.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== CATEGORÍAS ===================== */}
      <section className="bg-surface py-14 md:py-18">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-7" data-reveal>
            <div>
              <p className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-ink mb-3">
                <span className="w-7 h-px bg-cyan/60" aria-hidden="true" />
                Comprar por categoría
              </p>
              <h2 className="font-display text-3xl md:text-[2.3rem] font-bold tracking-tight text-ink">¿Qué necesita tu clínica?</h2>
            </div>
            <Link href="/catalogo" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Ver todo el catálogo
              <span className="group-hover:translate-x-1 transition-transform">{ArrowRight}</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" data-stagger="70">
            {CATEGORIES.map((c) => (
              <Link key={c.name} href={`/catalogo?cat=${encodeURIComponent(c.name)}`} className="card-glow spotlight group bg-white rounded-2xl border border-line p-6 flex flex-col" data-reveal="scale">
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-blue-fixed text-primary mb-4 group-hover:bg-cyan group-hover:text-white transition-colors duration-300" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
                </span>
                <h3 className="font-display text-lg font-semibold text-ink">{c.name}</h3>
                <p className="mt-1 text-sm text-muted flex-grow">{c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {countByCat(c.name)} equipo{countByCat(c.name) === 1 ? "" : "s"}
                  <span className="group-hover:translate-x-1 transition-transform">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== DESTACADOS ===================== */}
      <section className="bg-white border-y border-line py-14 md:py-18">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-7" data-reveal>
            <div>
              <p className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-ink mb-3">
                <span className="w-7 h-px bg-cyan/60" aria-hidden="true" />
                Lo más solicitado
              </p>
              <h2 className="font-display text-3xl md:text-[2.3rem] font-bold tracking-tight text-ink">Equipos destacados</h2>
            </div>
            <Link href="/catalogo" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Ver todos
              <span className="group-hover:translate-x-1 transition-transform">{ArrowRight}</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredGrid.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== BANNER PROMO ===================== */}
      {promoProduct && (
        <section className="bg-surface py-14 md:py-18">
          <div className="mx-auto max-w-[1240px] px-5 md:px-10">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy to-cyan-ink text-white grid md:grid-cols-2 gap-8 items-center p-8 md:p-12" data-reveal>
              <div className="absolute inset-0 grid-motif opacity-30" aria-hidden="true" />
              <div className="orb aurora-a glow-pulse w-80 h-80 -top-20 -right-10 bg-cyan/30" aria-hidden="true" />
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 ring-1 ring-white/20 px-3 py-1 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-bright" aria-hidden="true" />
                  {promoProduct.badge ?? "Destacado del mes"}
                </span>
                <h2 className="mt-4 font-display text-3xl md:text-[2.4rem] font-bold tracking-tight">{promoProduct.name}</h2>
                {promoProduct.tagline && <p className="mt-3 text-white/75 max-w-md">{promoProduct.tagline}</p>}
                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <Link href={`/productos/${promoProduct.slug}`} className="btn-brand inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl text-base font-semibold">
                    Ver producto {ArrowRight}
                  </Link>
                  <Link href="/cotizacion" className="btn-ghost inline-flex items-center justify-center h-12 px-7 rounded-xl border border-white/30 text-white text-base font-semibold hover:bg-white/10 hover:border-white/50">
                    Solicitar cotización
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 aspect-[4/3] float-med">
                  {promoProduct.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={promoProduct.image_url} alt={promoProduct.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="w-full h-full grid place-items-center text-white/40" aria-hidden="true">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 16l5-5 4 4 3-3 6 6" /></svg>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===================== CONFIANZA (marquee) ===================== */}
      <section className="bg-white border-y border-line" aria-label="Clínicas y hospitales que confían en HD RIVIC">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10 py-9">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted mb-6">
            Con la confianza de clínicas y hospitales en todo México
          </p>
          <div className="marquee">
            <ul className="marquee-track items-center text-primary/45 font-display font-semibold text-lg">
              {[...TRUST, ...TRUST].map((t, i) => (
                <li key={`${t}-${i}`} className="inline-flex items-center gap-2.5 whitespace-nowrap transition-colors hover:text-cyan" aria-hidden={i >= TRUST.length}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M8 2h8M12 2v6M5 22a7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIOS ===================== */}
      <section className="bg-surface py-14 md:py-18">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <div className="max-w-2xl mb-9" data-reveal>
            <p className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-ink mb-3">
              <span className="w-7 h-px bg-cyan/60" aria-hidden="true" />
              Testimonios
            </p>
            <h2 className="font-display text-3xl md:text-[2.3rem] font-bold tracking-tight text-ink">La confianza de los especialistas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-stagger="90">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="card-glow spotlight bg-white rounded-2xl border border-line p-7 flex flex-col" data-reveal>
                <Stars />
                <blockquote className="mt-4 text-ink flex-grow">{t.quote}</blockquote>
                <figcaption className="mt-5 pt-5 border-t border-line flex items-center gap-3">
                  <span className={`grid place-items-center w-11 h-11 rounded-full ${t.badge} text-white font-semibold`} aria-hidden="true">{t.initials}</span>
                  <span>
                    <span className="block font-semibold text-ink">{t.name}</span>
                    <span className="block text-sm text-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA FINAL ===================== */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 grid-motif opacity-50" aria-hidden="true" />
        <div className="orb aurora-a glow-pulse w-[28rem] h-[28rem] -top-24 -right-24 bg-cyan/30" aria-hidden="true" />
        <div className="orb aurora-b glow-pulse w-[24rem] h-[24rem] -bottom-24 -left-20 bg-blue/40" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-[1240px] px-5 md:px-10 py-16 md:py-20 text-center" data-stagger="90">
          <h2 className="font-display text-3xl md:text-[2.6rem] font-bold tracking-tight max-w-3xl mx-auto" data-reveal>
            ¿Listo para equipar tu clínica con{" "}
            <span className="text-gradient-hero anim-gradient-text">tecnología de vanguardia</span>?
          </h2>
          <p className="mt-4 text-white/75 text-lg max-w-2xl mx-auto" data-reveal>
            Arma tu cotización desde el catálogo o escríbenos directo. Asesoría de
            nuestros ingenieros en Puebla.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center" data-reveal>
            <Link href="/catalogo" className="btn-brand inline-flex items-center justify-center h-12 px-8 rounded-xl text-base font-semibold">Ver catálogo</Link>
            <a href="https://wa.me/522221234567" className="btn-ghost inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl border border-white/30 text-white text-base font-semibold hover:bg-white/10 hover:border-white/50">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.5 8.5 0 01-12.5 7.5L3 21l2-5.5A8.5 8.5 0 1121 11.5z" />
              </svg>
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
