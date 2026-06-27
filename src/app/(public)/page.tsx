import Link from "next/link";
import type { ReactNode } from "react";

/* ---------- Datos de la página ---------- */
const TRUST = [
  "Clínica Regenera",
  "Hospital Ángeles",
  "BioSalud",
  "OrthoMed",
  "VitalCare",
  "Centro Regenerativo MX",
];

const PROCESS = [
  { n: "01", title: "Diagnóstico", body: "Evaluamos las necesidades de su clínica y el espacio disponible." },
  { n: "02", title: "Propuesta", body: "Cotización personalizada con el equipo idóneo y opciones de financiamiento." },
  { n: "03", title: "Instalación", body: "Entrega, montaje y calibración a cargo de nuestros ingenieros." },
  { n: "04", title: "Capacitación y soporte", body: "Entrenamos a su equipo y damos soporte continuo 24/7." },
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
      "El acompañamiento y la capacitación marcaron la diferencia. Un proveedor mexicano a la altura de los estándares internacionales.",
    name: "Dra. Lucía Hernández",
    role: "Medicina del Deporte · Monterrey",
    initials: "LH",
    badge: "bg-navy",
  },
];

const FAQ = [
  {
    q: "¿Qué incluye la compra de un equipo?",
    a: "Cada equipo incluye entrega, instalación, calibración inicial y capacitación del personal clínico, además de garantía y soporte técnico.",
  },
  {
    q: "¿Los equipos cuentan con registro sanitario?",
    a: "Nuestros equipos se diseñan bajo el estándar ISO 13485 y cuentan con registro ante COFEPRIS, garantizando cumplimiento regulatorio en México.",
  },
  {
    q: "¿Ofrecen financiamiento o arrendamiento?",
    a: "Sí. Diseñamos planes a la medida de su clínica, incluyendo opciones de financiamiento y arrendamiento. Consulte con un asesor.",
  },
  {
    q: "¿Cuál es el tiempo de entrega e instalación?",
    a: "Realizamos entregas a todo México. La instalación y calibración son coordinadas directamente por nuestros ingenieros tras la entrega.",
  },
  {
    q: "¿Qué cubre la garantía y el soporte?",
    a: "Ofrecemos 24 meses de garantía, soporte técnico 24/7 y mantenimiento preventivo, con respuesta directa de fábrica desde Puebla.",
  },
];

const APPLICATIONS: { label: string; icon: ReactNode }[] = [
  { label: "Manejo del dolor", icon: <path d="M3 12h4l2-7 4 14 2-7h6" /> },
  {
    label: "Regeneración ósea y tisular",
    icon: <path d="M17 3a3 3 0 00-3 3c0 1-1 2-2 2s-2-1-2-2a3 3 0 10-3 3c1 0 2 1 2 2s-1 2-2 2a3 3 0 103 3c0-1 1-2 2-2s2 1 2 2a3 3 0 103-3c-1 0-2-1-2-2s1-2 2-2a3 3 0 000-6z" />,
  },
  { label: "Oxigenación y antioxidación", icon: <path d="M12 2s6 6 6 10a6 6 0 11-12 0c0-4 6-10 6-10z" /> },
  {
    label: "Recuperación deportiva",
    icon: (
      <>
        <path d="M14.4 14.4L9.6 9.6" />
        <rect x="7.5" y="7.5" width="9" height="9" rx="2" transform="rotate(45 12 12)" />
      </>
    ),
  },
  { label: "Estética regenerativa", icon: <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8z" /> },
  {
    label: "Rehabilitación",
    icon: (
      <>
        <circle cx="12" cy="4" r="2" />
        <path d="M19 8h-5l-2 3-3-1M9 22l3-7 3 3 1 4" />
      </>
    ),
  },
];

/* ---------- Helpers ---------- */
function Stars() {
  return (
    <div className="flex gap-0.5 text-star" role="img" aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
        </svg>
      ))}
    </div>
  );
}

const ArrowRight = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* Anillo tipo engranaje (eco del logo) — decorativo */
function GearRing({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="100" cy="100" r="94" strokeWidth="1.5" strokeDasharray="3 10" />
      <circle cx="100" cy="100" r="74" strokeWidth="1" strokeDasharray="1 7" opacity="0.6" />
      <circle cx="100" cy="100" r="54" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="54" strokeWidth="6" strokeDasharray="2 24" />
    </svg>
  );
}

/* Eyebrow con acento */
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-ink mb-3">
      <span className="w-7 h-px bg-cyan/60" aria-hidden="true" />
      {children}
    </p>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative min-h-[94vh] md:min-h-[90vh] flex flex-col justify-center overflow-hidden bg-navy text-white pt-28 pb-16">
        {/* Imagen de fondo con parallax */}
        <div className="absolute inset-0 will-change-transform" data-parallax="0.18" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/hero-cleanroom.png"
            alt=""
            className="w-full h-[118%] object-cover opacity-35"
            width={1376}
            height={768}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/92 to-cyan/25" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,transparent,rgba(0,26,69,0.7))]" aria-hidden="true" />
        <div className="absolute inset-0 grid-motif opacity-50" aria-hidden="true" />

        {/* Orbes aurora */}
        <div className="orb aurora-a glow-pulse w-[34rem] h-[34rem] -left-40 -top-32 bg-cyan/30" aria-hidden="true" />
        <div className="orb aurora-b glow-pulse w-[28rem] h-[28rem] right-[-8rem] bottom-[-6rem] bg-blue/40" aria-hidden="true" />

        {/* Anillo engranaje rotando (eco del logo) */}
        <div className="absolute right-[-9rem] top-1/2 -translate-y-1/2 opacity-[0.14] hidden lg:block" aria-hidden="true">
          <GearRing className="spin-slow w-[36rem] h-[36rem] text-cyan-bright" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1240px] w-full px-5 md:px-10">
          <div className="max-w-3xl" data-stagger="90">
            <p className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] uppercase text-blue-fixed" data-reveal>
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-bright opacity-75 glow-pulse" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-bright" />
              </span>
              Ingeniería Médica · Puebla, México
            </p>
            <h1 className="mt-5 font-display text-[2.7rem] leading-[1.04] sm:text-6xl md:text-[4.5rem] font-bold tracking-tight" data-reveal>
              Vanguardia en{" "}
              <span className="text-gradient-hero anim-gradient-text">
                Medicina Regenerativa
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-relaxed text-white/75 max-w-2xl" data-reveal>
              Diseñamos y fabricamos equipos de alta tecnología para ozonoterapia,
              terapia electromagnética (PEMF) y más — con ingeniería propia y
              soporte directo de fábrica.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3" data-reveal>
              <Link
                href="/catalogo"
                className="btn-brand inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl text-base font-semibold"
              >
                Ver Catálogo de Equipos
                {ArrowRight}
              </Link>
              <Link
                href="/cotizacion"
                className="btn-ghost inline-flex items-center justify-center h-12 px-7 rounded-xl border border-white/30 text-white text-base font-semibold hover:bg-white/10 hover:border-white/50"
              >
                Agendar una Demo
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70" data-reveal>
              {["Certificación ISO 13485", "Registro COFEPRIS", "Soporte 24/7"].map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5cc8ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Estadísticas glass */}
        <div className="relative z-10 mx-auto max-w-[1240px] w-full px-5 md:px-10 mt-12 md:mt-16" data-reveal>
          <dl className="grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-md overflow-hidden divide-x divide-y md:divide-y-0 divide-white/10 shadow-glow" data-stagger="80">
            {[
              { v: "99.9%", label: "Precisión de flujo", count: "99.9", decimals: "1", suffix: "%" },
              { v: "ISO 13485", label: "Certificación médica" },
              { v: "+120", label: "Clínicas equipadas", count: "120", prefix: "+" },
              { v: "24/7", label: "Soporte técnico" },
            ].map((s) => (
              <div key={s.label} className="p-5 transition-colors hover:bg-white/[0.05]" data-reveal>
                <dd
                  className="font-display text-3xl font-bold tnum text-white"
                  data-count={s.count}
                  data-decimals={s.decimals}
                  data-prefix={s.prefix}
                  data-suffix={s.suffix}
                >
                  {s.v}
                </dd>
                <dt className="mt-1 text-xs uppercase tracking-wide text-white/60">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/50" aria-hidden="true">
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <span className="w-5 h-8 rounded-full border border-white/30 grid justify-center pt-1.5">
            <span className="w-1 h-1.5 rounded-full bg-cyan-bright float-med" />
          </span>
        </div>
      </section>

      {/* ===================== LOGOS / CONFIANZA (marquee) ===================== */}
      <section className="bg-surface border-b border-line" aria-label="Clínicas y hospitales que confían en HD RIVIC">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10 py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted mb-7">
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

      {/* ===================== EQUIPOS DESTACADOS ===================== */}
      <section id="equipos" className="bg-surface py-20 md:py-28 scroll-mt-24">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12" data-reveal>
            <div>
              <Eyebrow>Catálogo</Eyebrow>
              <h2 className="font-display text-3xl md:text-[2.5rem] font-bold tracking-tight text-ink">Equipos Destacados</h2>
              <p className="mt-3 text-muted text-lg">Tecnología de grado médico, diseñada y fabricada en México.</p>
            </div>
            <Link href="/catalogo" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Ver todos los productos
              <svg className="group-hover:translate-x-1 transition-transform" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5" data-stagger="90">
            <article className="card-glow spotlight md:col-span-7 bg-white rounded-2xl border border-line p-6 md:p-8 flex flex-col sm:flex-row gap-6 md:gap-8 group" data-reveal>
              <div className="flex-1 flex flex-col">
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-blue-fixed text-primary mb-5" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 2h8M12 2v6M5 22a7 7 0 0114 0z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </span>
                <h3 className="font-display text-xl font-semibold text-ink">Sistemas de Ozonoterapia</h3>
                <p className="mt-3 text-muted flex-grow">
                  Generadores de ozono médico de ultra precisión con control digital
                  de concentraciones, esterilidad garantizada y dosificación exacta.
                </p>
                <Link href="/catalogo" className="mt-5 w-fit inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                  Explorar especificaciones
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
              <div className="flex-1 rounded-xl overflow-hidden border border-line bg-surface min-h-[200px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/ozone-device.png"
                  alt="Generador de ozono médico HD RIVIC sobre carro estéril de acero inoxidable con interfaz digital."
                  className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                  width={1184}
                  height={864}
                  loading="lazy"
                />
              </div>
            </article>

            <article className="md:col-span-5 bg-navy text-white rounded-2xl p-7 flex flex-col justify-between relative overflow-hidden card-glow group" data-reveal>
              <div className="absolute inset-0 dot-motif opacity-50" aria-hidden="true" />
              <div className="orb glow-pulse w-56 h-56 -right-16 -top-16 bg-cyan/40" aria-hidden="true" />
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan/20 ring-1 ring-cyan/40 px-3 py-1 text-xs font-semibold mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-bright" /> Nuevo Lanzamiento
                </span>
                <h3 className="font-display text-2xl font-bold">DISSO3</h3>
                <p className="mt-3 text-white/75">
                  Innovación patentada en disolución de ozono: máxima eficiencia de
                  transferencia en soluciones salinas.
                </p>
              </div>
              <Link href="/cotizacion" className="relative mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-fixed group-hover:gap-3 transition-all">
                Solicitar Demo
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </Link>
            </article>

            <article className="card-glow spotlight md:col-span-5 bg-white rounded-2xl border border-line p-7 flex flex-col relative overflow-hidden group" data-reveal>
              <span className="absolute -top-4 -right-4 text-cyan/[0.12] group-hover:text-cyan/20 transition-colors" aria-hidden="true">
                <svg width="130" height="130" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 12h4l2-7 4 14 2-7h6" />
                </svg>
              </span>
              <h3 className="font-display text-xl font-semibold relative text-ink">Camas Electromagnéticas (PEMF)</h3>
              <p className="mt-3 text-muted flex-grow relative">
                Terapia de campo electromagnético pulsado para acelerar la
                regeneración ósea y de tejidos.
              </p>
              <div className="mt-6 pt-5 border-t border-line flex items-center justify-between relative">
                <span className="text-xs font-semibold text-cyan-ink px-2.5 py-1 bg-cyan/10 rounded">PEMF Advanced</span>
                <svg className="text-primary group-hover:translate-x-1 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </article>

            <div className="md:col-span-7 bg-blue-fixed/50 rounded-2xl border border-line p-7 flex items-center" data-reveal>
              <dl className="grid grid-cols-3 gap-4 w-full text-center divide-x divide-line">
                {[
                  { h: "Calibración garantizada", s: "Antes de cada entrega" },
                  { h: "Entrega nacional", s: "A todo México" },
                  { h: "Garantía 24 meses", s: "Cobertura extendida" },
                ].map((x) => (
                  <div key={x.h} className="px-2">
                    <dd className="font-display text-base md:text-lg font-bold text-primary">{x.h}</dd>
                    <dt className="mt-1 text-xs uppercase tracking-wide text-muted">{x.s}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== POR QUÉ HD RIVIC ===================== */}
      <section id="tecnologia" className="bg-white border-y border-line py-20 md:py-28 scroll-mt-24">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative rounded-2xl overflow-hidden border border-line shadow-soft order-2 lg:order-1 group" data-reveal="right">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/lab-technicians.png"
              alt="Técnicos de HD RIVIC con bata blanca calibrando dispositivos médicos en un laboratorio impecable en Puebla."
              className="w-full object-cover aspect-[4/3] group-hover:scale-[1.04] transition-transform duration-700 ease-out"
              width={1264}
              height={848}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-3 rounded-xl border border-line shadow-soft flex items-center gap-3 float-med">
              <svg className="text-cyan-ink" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0116 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <p className="text-xs text-muted">Sede Central</p>
                <p className="font-semibold text-ink">Puebla, México</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2" data-reveal="left">
            <Eyebrow>Por qué HD RIVIC</Eyebrow>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-bold tracking-tight text-ink">Excelencia tecnológica con respaldo local</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              No solo diseñamos y fabricamos equipos médicos de vanguardia;
              garantizamos su funcionamiento óptimo. Nuestra presencia en Puebla
              ofrece tiempos de respuesta inigualables para mantenimiento,
              calibración y soporte directo de fábrica.
            </p>
            <ul className="mt-8 space-y-3" data-stagger="80">
              {[
                {
                  t: "Ingeniería propia",
                  d: "Desarrollamos nuestra tecnología, con control total de la calidad y actualizaciones continuas.",
                  cls: "bg-blue-fixed text-primary",
                  icon: <path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2-2 2.6-2.6z" />,
                },
                {
                  t: "Soporte técnico especializado",
                  d: "Ingenieros con base en Puebla disponibles para asistencia remota o presencial.",
                  cls: "bg-cyan/10 text-cyan-ink",
                  icon: (
                    <>
                      <path d="M4 14v-3a8 8 0 0116 0v3" />
                      <path d="M18 18a2 2 0 01-2 2h-2" />
                      <rect x="2" y="13" width="4" height="6" rx="1" />
                      <rect x="18" y="13" width="4" height="6" rx="1" />
                    </>
                  ),
                },
                {
                  t: "Capacitación médica",
                  d: "Entrenamiento detallado para maximizar los beneficios clínicos en sus pacientes.",
                  cls: "bg-primary/10 text-primary",
                  icon: (
                    <>
                      <path d="M22 10L12 5 2 10l10 5 10-5z" />
                      <path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
                    </>
                  ),
                },
              ].map((f) => (
                <li
                  key={f.t}
                  className="flex gap-4 rounded-xl p-3 -mx-3 transition-colors hover:bg-surface"
                  data-reveal
                >
                  <span className={`shrink-0 grid place-items-center w-11 h-11 rounded-xl ${f.cls}`} aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {f.icon}
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg text-ink">{f.t}</h3>
                    <p className="mt-1 text-muted">{f.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===================== PROCESO ===================== */}
      <section id="proceso" className="bg-surface py-20 md:py-28 scroll-mt-24">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <div className="max-w-2xl mb-14" data-reveal>
            <Eyebrow>Cómo trabajamos</Eyebrow>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-bold tracking-tight text-ink">De la asesoría a la operación</h2>
            <p className="mt-3 text-muted text-lg">Un proceso claro y acompañado, de principio a fin.</p>
          </div>
          <div className="relative">
            {/* Línea de energía que conecta los pasos */}
            <div
              className="hidden md:block absolute left-0 right-0 top-7 h-px flow-x"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--color-cyan), var(--color-blue), var(--color-cyan), transparent)",
              }}
              aria-hidden="true"
            />
            <ol className="grid grid-cols-1 md:grid-cols-4 gap-6 relative" data-stagger="100">
              {PROCESS.map((p) => (
                <li key={p.n} className="relative group" data-reveal>
                  <div className="relative w-14 h-14 mb-4 grid place-items-center rounded-2xl bg-white border border-line shadow-soft group-hover:border-cyan/50 group-hover:shadow-glow transition-all duration-300">
                    <span className="font-display text-xl font-bold text-gradient-brand anim-gradient-text">{p.n}</span>
                  </div>
                  <h3 className="font-semibold text-lg text-ink">{p.title}</h3>
                  <p className="mt-2 text-muted">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ===================== APLICACIONES ===================== */}
      <section className="bg-white border-y border-line py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <div className="max-w-2xl mb-12" data-reveal>
            <Eyebrow>Especialidades</Eyebrow>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-bold tracking-tight text-ink">Aplicaciones clínicas</h2>
            <p className="mt-3 text-muted text-lg">Soluciones regenerativas para un amplio rango de especialidades.</p>
          </div>
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4" data-stagger="60">
            {APPLICATIONS.map((app) => (
              <li
                key={app.label}
                className="group bg-surface rounded-xl border border-line p-5 flex items-center gap-3 hover:border-cyan/50 hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
                data-reveal="scale"
              >
                <span className="shrink-0 grid place-items-center w-10 h-10 rounded-lg bg-blue-fixed text-primary group-hover:bg-cyan group-hover:text-white transition-colors duration-300" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {app.icon}
                  </svg>
                </span>
                <span className="font-medium text-ink">{app.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===================== TESTIMONIOS ===================== */}
      <section id="testimonios" className="bg-surface py-20 md:py-28 scroll-mt-24">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <div className="max-w-2xl mb-12" data-reveal>
            <Eyebrow>Testimonios</Eyebrow>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-bold tracking-tight text-ink">La confianza de los especialistas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-stagger="90">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="card-glow spotlight bg-white rounded-2xl border border-line p-7 flex flex-col" data-reveal>
                <svg className="text-cyan/30" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 7h4v4c0 3-1.6 4.8-4 5.5V14H5V7zm9 0h4v4c0 3-1.6 4.8-4 5.5V14h-2V7z" />
                </svg>
                <blockquote className="mt-4 text-ink flex-grow">{t.quote}</blockquote>
                <div className="mt-5">
                  <Stars />
                </div>
                <figcaption className="mt-5 pt-5 border-t border-line flex items-center gap-3">
                  <span className={`grid place-items-center w-11 h-11 rounded-full ${t.badge} text-white font-semibold`} aria-hidden="true">
                    {t.initials}
                  </span>
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

      {/* ===================== CERTIFICACIONES ===================== */}
      <section className="bg-white border-t border-line py-12">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10 grid grid-cols-2 lg:grid-cols-4 gap-6" data-stagger="70">
          {[
            { label: "ISO 13485", icon: <><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></> },
            { label: "Registro COFEPRIS", icon: <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /> },
            { label: "Garantía 24 meses", icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></> },
            { label: "Instalación y capacitación", icon: <><path d="M22 10L12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" /></> },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-3 justify-center lg:justify-start" data-reveal>
              <svg className="text-cyan-ink shrink-0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {c.icon}
              </svg>
              <span className="font-semibold text-ink">{c.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section id="faq" className="bg-surface py-20 md:py-28 scroll-mt-24">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <div className="mb-12" data-reveal>
            <Eyebrow>Preguntas frecuentes</Eyebrow>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-bold tracking-tight text-ink">Resolvemos sus dudas</h2>
          </div>
          <div className="divide-y divide-line border-y border-line" data-reveal>
            {FAQ.map((item) => (
              <details key={item.q} className="faq group py-2">
                <summary className="flex items-center justify-between gap-4 py-4 font-semibold text-lg text-ink transition-colors hover:text-primary">
                  <span>{item.q}</span>
                  <svg className="chev shrink-0 text-cyan-ink" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <p className="pb-5 text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section id="contacto" className="relative bg-navy text-white overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 grid-motif opacity-50" aria-hidden="true" />
        <div className="orb aurora-a glow-pulse w-[30rem] h-[30rem] -top-24 -right-24 bg-cyan/30" aria-hidden="true" />
        <div className="orb aurora-b glow-pulse w-[26rem] h-[26rem] -bottom-24 -left-20 bg-blue/40" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-[1240px] px-5 md:px-10 py-20 md:py-24 text-center" data-stagger="90">
          <h2 className="font-display text-3xl md:text-[2.75rem] font-bold tracking-tight max-w-3xl mx-auto" data-reveal>
            ¿Listo para equipar su clínica con{" "}
            <span className="text-gradient-hero anim-gradient-text">tecnología de vanguardia</span>?
          </h2>
          <p className="mt-4 text-white/75 text-lg max-w-2xl mx-auto" data-reveal>
            Reciba una cotización personalizada y asesoría directa de nuestros
            ingenieros en Puebla.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center" data-reveal>
            <Link href="/cotizacion" className="btn-brand inline-flex items-center justify-center h-12 px-8 rounded-xl text-base font-semibold">
              Solicitar Cotización
            </Link>
            <a href="https://wa.me/522221234567" className="btn-ghost inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl border border-white/30 text-white text-base font-semibold hover:bg-white/10 hover:border-white/50">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.5 8.5 0 01-12.5 7.5L3 21l2-5.5A8.5 8.5 0 1121 11.5z" />
              </svg>
              Hablar por WhatsApp
            </a>
          </div>
          <p className="mt-7 text-sm text-white/60" data-reveal>Atención directa de fábrica · Puebla, México</p>
        </div>
      </section>
    </>
  );
}
