import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
};

/** Cabecera dinámica de páginas internas (navy con aura). Incluye padding para librar el header fijo. */
export default function PageHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-cyan/15" aria-hidden="true" />
      <div className="absolute inset-0 grid-motif opacity-40" aria-hidden="true" />
      <div className="orb aurora-a glow-pulse w-[26rem] h-[26rem] -top-32 -right-24 bg-cyan/25" aria-hidden="true" />
      <div className="orb aurora-b glow-pulse w-[20rem] h-[20rem] -bottom-28 -left-16 bg-blue/30" aria-hidden="true" />

      <div
        className="relative z-10 mx-auto max-w-[1240px] px-5 md:px-10 pt-12 md:pt-16 pb-12 md:pb-16"
        data-stagger="80"
      >
        {eyebrow && (
          <p
            className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-fixed mb-3"
            data-reveal
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-bright opacity-75 glow-pulse" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-bright" />
            </span>
            {eyebrow}
          </p>
        )}
        <h1
          className="font-display text-3xl md:text-[3rem] font-bold tracking-tight"
          data-reveal
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-white/75 text-lg max-w-2xl" data-reveal>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
