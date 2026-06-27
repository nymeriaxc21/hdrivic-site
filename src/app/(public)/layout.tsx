import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SiteInteractions from "@/components/site/SiteInteractions";
import MobileBar from "@/components/site/MobileBar";
import CartDrawer from "@/components/cart/CartDrawer";
import { QuoteCartProvider } from "@/components/cart/cart-context";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QuoteCartProvider>
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

        {/* Barra inferior móvil (consciente del carrito) */}
        <MobileBar />

        {/* Volver arriba (solo desktop, donde no hay barra inferior) */}
        <button
          id="toTop"
          type="button"
          aria-label="Volver arriba"
          className="hidden lg:grid place-items-center fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-white border border-line text-primary shadow-lift opacity-0 pointer-events-none hover:bg-cyan hover:text-white hover:border-cyan transition"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
        </button>

        <CartDrawer />
        <SiteInteractions />
      </div>
    </QuoteCartProvider>
  );
}
