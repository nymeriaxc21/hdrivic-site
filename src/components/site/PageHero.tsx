type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

/** Cabecera de páginas internas. Incluye padding superior para librar el header fijo. */
export default function PageHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="bg-surface border-b border-line">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10 pt-28 md:pt-32 pb-10 md:pb-12">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-ink mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-3xl md:text-[2.75rem] font-bold tracking-tight text-ink">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-muted text-lg max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
