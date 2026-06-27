import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import QuoteForm from "@/components/forms/QuoteForm";
import { getVisibleProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Solicitar Cotización",
  description:
    "Solicita una cotización personalizada de equipos de medicina regenerativa HD RIVIC. Asesoría directa de nuestros ingenieros en Puebla, México.",
};

export default async function CotizacionPage({
  searchParams,
}: {
  searchParams: Promise<{ producto?: string }>;
}) {
  const { producto } = await searchParams;
  const products = await getVisibleProducts();
  const defaultProduct = producto
    ? products.find((p) => p.slug === producto)
    : undefined;

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Solicitar cotización"
        subtitle="Cuéntanos qué necesita tu clínica y recibe una propuesta personalizada con asesoría directa de nuestros ingenieros."
      />

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2" data-reveal>
            <QuoteForm
              products={products.map((p) => ({ id: p.id, name: p.name }))}
              defaultProductId={defaultProduct?.id}
            />
          </div>

          {/* Información de contacto */}
          <aside className="space-y-4" data-stagger="90">
            <div className="card-glow rounded-2xl border border-line bg-white p-6" data-reveal="left">
              <h2 className="font-display text-lg font-semibold text-ink mb-4">
                Atención directa de fábrica
              </h2>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="shrink-0 grid place-items-center w-10 h-10 rounded-lg bg-blue-fixed text-primary" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0116 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-ink">Puebla, México</p>
                    <p className="text-muted">Sede central y fábrica</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 grid place-items-center w-10 h-10 rounded-lg bg-blue-fixed text-primary" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8.1 9.6a16 16 0 006 6l1.2-1.1a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-ink">
                      <a href="tel:+522221234567" className="hover:text-primary transition">+52 (222) 123 4567</a>
                    </p>
                    <p className="text-muted">Lun–Vie · 9:00–18:00</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 grid place-items-center w-10 h-10 rounded-lg bg-blue-fixed text-primary" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-ink">
                      <a href="mailto:contacto@hdrivic.com" className="hover:text-primary transition">contacto@hdrivic.com</a>
                    </p>
                    <p className="text-muted">Respuesta en 24 h hábiles</p>
                  </div>
                </li>
              </ul>
              <a
                href="https://wa.me/522221234567"
                className="btn-brand mt-6 inline-flex items-center justify-center gap-2 w-full h-11 rounded-xl text-sm font-semibold"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.5 8.5 0 01-12.5 7.5L3 21l2-5.5A8.5 8.5 0 1121 11.5z" />
                </svg>
                Hablar por WhatsApp
              </a>
            </div>

            <div className="rounded-2xl border border-line bg-blue-fixed/40 p-6 text-sm text-primary" data-reveal="left">
              <p className="font-semibold">Incluido en cada equipo</p>
              <ul className="mt-2 space-y-1.5 text-primary/80">
                <li>· Entrega e instalación</li>
                <li>· Calibración y capacitación</li>
                <li>· Garantía 24 meses y soporte 24/7</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
