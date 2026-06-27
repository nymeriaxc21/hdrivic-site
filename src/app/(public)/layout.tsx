import Link from "next/link";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteInteractions from "@/components/site/SiteInteractions";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface text-ink pb-[76px] lg:pb-0">
      <div id="scrollProgress" aria-hidden="true" />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-3 focus:left-3 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Saltar al contenido
      </a>

      <Header />

      <main id="contenido">{children}</main>

      <Footer />

      {/* CTA móvil fija */}
      <div
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur border-t border-line"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="px-4 py-3 flex items-center gap-3">
          <Link
            href="/cotizacion"
            className="flex-grow inline-flex items-center justify-center h-12 rounded-lg bg-blue text-white text-base font-semibold active:scale-[0.98] transition"
          >
            Solicitar Cotización
          </Link>
          <a
            href="https://wa.me/522221234567"
            aria-label="Hablar por WhatsApp"
            className="shrink-0 grid place-items-center w-12 h-12 rounded-lg border border-line text-primary active:scale-95 transition"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 11.5a8.5 8.5 0 01-12.5 7.5L3 21l2-5.5A8.5 8.5 0 1121 11.5z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Volver arriba */}
      <button
        id="toTop"
        type="button"
        aria-label="Volver arriba"
        className="hidden md:grid place-items-center fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-white border border-line text-primary shadow-lift opacity-0 pointer-events-none hover:bg-cyan hover:text-white hover:border-cyan transition"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
      </button>

      <SiteInteractions />
    </div>
  );
}
