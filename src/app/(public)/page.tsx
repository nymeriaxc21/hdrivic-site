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

export default function HomePage() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative min-h-[92vh] md:min-h-[88vh] flex flex-col justify-center overflow-hidden bg-navy text-white pt-24 pb-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/hero-cleanroom.png"
          alt="Sala blanca clínica de HD RIVIC con equipo de medicina regenerativa de alta tecnología e iluminación fría."
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          width={1376}
          height={768}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/90 to-cyan/25" />
        <div className="absolute inset-0 grid-motif opacity-60" aria-hidden="true" />

        <div className="relative mx-auto max-w-[1240px] w-full px-5 md:px-10">
          <div className="max-w-3xl" data-reveal>
            <p className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] uppercase text-blue-fixed">
              <span className="w-8 h-px bg-blue-fixed/70" aria-hidden="true" />
              Ingeniería Médica · Puebla, México
            </p>
            <h1 className="mt-5 font-display text-[2.6rem] leading-[1.05] sm:text-6xl md:text-[4.4rem] font-bold tracking-tight">
              Vanguardia en<br className="hidden sm:block" /> Medicina Regenerativa
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-relaxed text-white/75 max-w-2xl">
              Diseñamos y fabricamos equipos de alta tecnología para ozonoterapia,
              terapia electromagnética (PEMF) y más — con ingeniería propia y
              soporte directo de fábrica.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg bg-blue text-white text-base font-semibold shadow-lift hover:bg-primary active:scale-[0.97] transition"
              >
                Ver Catálogo de Equipos
                {ArrowRight}
              </Link>
              <Link
                href="/cotizacion"
                className="inline-flex items-center justify-center h-12 px-7 rounded-lg border border-white/30 text-white text-base font-semibold hover:bg-white/10 active:scale-[0.97] transition"
              >
                Agendar una Demo
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
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

        <div className="relative mx-auto max-w-[1240px] w-full px-5 md:px-10 mt-12 md:mt-16" data-reveal>
          <dl className="grid grid-cols-2 md:grid-cols-4 rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur overflow-hidden divide-x divide-y md:divide-y-0 divide-white/10">
            <div className="p-5">
              <dd className="font-display text-3xl font-bold tnum text-white" data-count="99.9" data-decimals="1" data-suffix="%">99.9%</dd>
              <dt className="mt-1 text-xs uppercase tracking-wide text-white/60">Precisión de flujo</dt>
            </div>
            <div className="p-5">
              <dd className="font-display text-3xl font-bold tnum text-white">ISO 13485</dd>
              <dt className="mt-1 text-xs uppercase tracking-wide text-white/60">Certificación médica</dt>
            </div>
            <div className="p-5">
              <dd className="font-display text-3xl font-bold tnum text-white" data-count="120" data-prefix="+">+120</dd>
              <dt className="mt-1 text-xs uppercase tracking-wide text-white/60">Clínicas equipadas</dt>
            </div>
            <div className="p-5">
              <dd className="font-display text-3xl font-bold tnum text-white">24/7</dd>
              <dt className="mt-1 text-xs uppercase tracking-wide text-white/60">Soporte técnico</dt>
            </div>
          </dl>
        </div>
      </section>

      {/* ===================== LOGOS / CONFIANZA ===================== */}
      <section className="bg-surface border-b border-line" aria-label="Clínicas y hospitales que confían en HD RIVIC">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10 py-9">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted mb-6">
            Con la confianza de clínicas y hospitales en todo México
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-primary/55 font-display font-semibold text-lg">
            {TRUST.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===================== EQUIPOS DESTACADOS ===================== */}
      <section id="equipos" className="bg-surface py-20 md:py-28 scroll-mt-24">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12" data-reveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-ink mb-3">Catálogo</p>
              <h2 className="font-display text-3xl md:text-[2.5rem] font-bold tracking-tight text-ink">Equipos Destacados</h2>
              <p className="mt-3 text-muted text-lg">Tecnología de grado médico, diseñada y fabricada en México.</p>
            </div>
            <Link href="/catalogo" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
              Ver todos los productos
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <article className="md:col-span-7 bg-white rounded-2xl border border-line p-6 md:p-8 flex flex-col sm:flex-row gap-6 md:gap-8 hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300 group" data-reveal>
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
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  width={1184}
                  height={864}
                  loading="lazy"
                />
              </div>
            </article>

            <article className="md:col-span-5 bg-navy text-white rounded-2xl p-7 flex flex-col justify-between relative overflow-hidden hover:-translate-y-0.5 transition-all duration-300" data-reveal>
              <div className="absolute inset-0 dot-motif opacity-50" aria-hidden="true" />
              <div className="relative">
                <span className="inline-flex items-center rounded-full bg-cyan/20 ring-1 ring-cyan/40 px-3 py-1 text-xs font-semibold mb-5">Nuevo Lanzamiento</span>
                <h3 className="font-display text-2xl font-bold">DISSO3</h3>
                <p className="mt-3 text-white/75">
                  Innovación patentada en disolución de ozono: máxima eficiencia de
                  transferencia en soluciones salinas.
                </p>
              </div>
              <Link href="/cotizacion" className="relative mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-fixed hover:gap-3 transition-all">
                Solicitar Demo
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </Link>
            </article>

            <article className="md:col-span-5 bg-white rounded-2xl border border-line p-7 flex flex-col relative overflow-hidden hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300 group" data-reveal>
              <span className="absolute -top-4 -right-4 text-cyan/[0.12]" aria-hidden="true">
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
                <div className="px-2">
                  <dd className="font-display text-base md:text-lg font-bold text-primary">Calibración garantizada</dd>
                  <dt className="mt-1 text-xs uppercase tracking-wide text-muted">Antes de cada entrega</dt>
                </div>
                <div className="px-2">
                  <dd className="font-display text-base md:text-lg font-bold text-primary">Entrega nacional</dd>
                  <dt className="mt-1 text-xs uppercase tracking-wide text-muted">A todo México</dt>
                </div>
                <div className="px-2">
                  <dd className="font-display text-base md:text-lg font-bold text-primary">Garantía 24 meses</dd>
                  <dt className="mt-1 text-xs uppercase tracking-wide text-muted">Cobertura extendida</dt>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== POR QUÉ HD RIVIC ===================== */}
      <section id="tecnologia" className="bg-white border-y border-line py-20 md:py-28 scroll-mt-24">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative rounded-2xl overflow-hidden border border-line shadow-soft order-2 lg:order-1" data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/lab-technicians.png"
              alt="Técnicos de HD RIVIC con bata blanca calibrando dispositivos médicos en un laboratorio impecable en Puebla."
              className="w-full object-cover aspect-[4/3]"
              width={1264}
              height={848}
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-3 rounded-xl border border-line shadow-soft flex items-center gap-3">
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
          <div className="order-1 lg:order-2" data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-ink mb-3">Por qué HD RIVIC</p>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-bold tracking-tight text-ink">Excelencia tecnológica con respaldo local</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              No solo diseñamos y fabricamos equipos médicos de vanguardia;
              garantizamos su funcionamiento óptimo. Nuestra presencia en Puebla
              ofrece tiempos de respuesta inigualables para mantenimiento,
              calibración y soporte directo de fábrica.
            </p>
            <ul className="mt-8 space-y-5">
              <li className="flex gap-4">
                <span className="shrink-0 grid place-items-center w-11 h-11 rounded-xl bg-blue-fixed text-primary" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2-2 2.6-2.6z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-lg text-ink">Ingeniería propia</h3>
                  <p className="mt-1 text-muted">Desarrollamos nuestra tecnología, con control total de la calidad y actualizaciones continuas.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="shrink-0 grid place-items-center w-11 h-11 rounded-xl bg-cyan/10 text-cyan-ink" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 14v-3a8 8 0 0116 0v3" />
                    <path d="M18 18a2 2 0 01-2 2h-2" />
                    <rect x="2" y="13" width="4" height="6" rx="1" />
                    <rect x="18" y="13" width="4" height="6" rx="1" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-lg text-ink">Soporte técnico especializado</h3>
                  <p className="mt-1 text-muted">Ingenieros con base en Puebla disponibles para asistencia remota o presencial.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="shrink-0 grid place-items-center w-11 h-11 rounded-xl bg-primary/10 text-primary" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10L12 5 2 10l10 5 10-5z" />
                    <path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-lg text-ink">Capacitación médica</h3>
                  <p className="mt-1 text-muted">Entrenamiento detallado para maximizar los beneficios clínicos en sus pacientes.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===================== PROCESO ===================== */}
      <section id="proceso" className="bg-surface py-20 md:py-28 scroll-mt-24">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <div className="max-w-2xl mb-14" data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-ink mb-3">Cómo trabajamos</p>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-bold tracking-tight text-ink">De la asesoría a la operación</h2>
            <p className="mt-3 text-muted text-lg">Un proceso claro y acompañado, de principio a fin.</p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {PROCESS.map((p) => (
              <li key={p.n} className="relative" data-reveal>
                <div className="font-display text-4xl font-bold text-cyan/40">{p.n}</div>
                <h3 className="mt-3 font-semibold text-lg text-ink">{p.title}</h3>
                <p className="mt-2 text-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===================== APLICACIONES ===================== */}
      <section className="bg-white border-y border-line py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <div className="max-w-2xl mb-12" data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-ink mb-3">Especialidades</p>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-bold tracking-tight text-ink">Aplicaciones clínicas</h2>
            <p className="mt-3 text-muted text-lg">Soluciones regenerativas para un amplio rango de especialidades.</p>
          </div>
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4" data-reveal>
            {APPLICATIONS.map((app) => (
              <li key={app.label} className="bg-surface rounded-xl border border-line p-5 flex items-center gap-3 hover:border-cyan/50 hover:shadow-soft transition">
                <span className="shrink-0 grid place-items-center w-10 h-10 rounded-lg bg-blue-fixed text-primary" aria-hidden="true">
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
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-ink mb-3">Testimonios</p>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-bold tracking-tight text-ink">La confianza de los especialistas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="bg-white rounded-2xl border border-line p-7 flex flex-col" data-reveal>
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
        <div className="mx-auto max-w-[1240px] px-5 md:px-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "ISO 13485", icon: <><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></> },
            { label: "Registro COFEPRIS", icon: <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /> },
            { label: "Garantía 24 meses", icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></> },
            { label: "Instalación y capacitación", icon: <><path d="M22 10L12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" /></> },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-3 justify-center lg:justify-start">
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
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-ink mb-3">Preguntas frecuentes</p>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-bold tracking-tight text-ink">Resolvemos sus dudas</h2>
          </div>
          <div className="divide-y divide-line border-y border-line" data-reveal>
            {FAQ.map((item) => (
              <details key={item.q} className="faq group py-2">
                <summary className="flex items-center justify-between gap-4 py-4 font-semibold text-lg text-ink">
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
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan/25 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1240px] px-5 md:px-10 py-20 md:py-24 text-center" data-reveal>
          <h2 className="font-display text-3xl md:text-[2.75rem] font-bold tracking-tight max-w-3xl mx-auto">
            ¿Listo para equipar su clínica con tecnología de vanguardia?
          </h2>
          <p className="mt-4 text-white/75 text-lg max-w-2xl mx-auto">
            Reciba una cotización personalizada y asesoría directa de nuestros
            ingenieros en Puebla.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/cotizacion" className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-cyan text-white text-base font-semibold hover:bg-[#1391c2] active:scale-[0.97] transition">
              Solicitar Cotización
            </Link>
            <a href="https://wa.me/522221234567" className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg border border-white/30 text-white text-base font-semibold hover:bg-white/10 active:scale-[0.97] transition">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.5 8.5 0 01-12.5 7.5L3 21l2-5.5A8.5 8.5 0 1121 11.5z" />
              </svg>
              Hablar por WhatsApp
            </a>
          </div>
          <p className="mt-7 text-sm text-white/60">Atención directa de fábrica · Puebla, México</p>
        </div>
      </section>
    </>
  );
}
