import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-navy-2 text-white/70 border-t border-white/10">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="inline-flex">
            <span className="bg-white rounded-xl px-3 py-1.5 inline-flex items-center">
              <Image
                src="/assets/hd-rivic-logo.png"
                alt="HD RIVIC · Ingeniería Médica"
                width={140}
                height={80}
                className="h-9 w-auto"
              />
            </span>
          </div>
          <p className="mt-4 text-sm max-w-xs">
            Innovación y precisión en tecnología médica regenerativa.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href="#"
              aria-label="HD RIVIC en LinkedIn"
              className="w-10 h-10 rounded-lg border border-white/15 grid place-items-center hover:bg-white/10 hover:text-white transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.94 5a2 2 0 11-4 0 2 2 0 014 0zM3.5 8.5h3v12h-3zM9 8.5h2.9v1.6h.04c.4-.75 1.4-1.6 2.96-1.6 3.16 0 3.74 2 3.74 4.7v6.8h-3v-6c0-1.43-.02-3.27-2-3.27-2 0-2.3 1.55-2.3 3.16v6.1H9z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="HD RIVIC en Facebook"
              className="w-10 h-10 rounded-lg border border-white/15 grid place-items-center hover:bg-white/10 hover:text-white transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.55.45-1 1-1z" />
              </svg>
            </a>
            <a
              href="https://wa.me/522221234567"
              aria-label="HD RIVIC en WhatsApp"
              className="w-10 h-10 rounded-lg border border-white/15 grid place-items-center hover:bg-white/10 hover:text-white transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.5 8.5 0 01-12.5 7.5L3 21l2-5.5A8.5 8.5 0 1121 11.5z" />
              </svg>
            </a>
          </div>
        </div>

        <nav aria-label="Equipos">
          <h2 className="text-sm font-semibold text-white mb-3">Equipos</h2>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/catalogo" className="hover:text-white transition">Ozonoterapia</Link></li>
            <li><Link href="/catalogo" className="hover:text-white transition">Camas PEMF</Link></li>
            <li><Link href="/catalogo" className="hover:text-white transition">DISSO3</Link></li>
            <li><Link href="/catalogo" className="hover:text-white transition">Accesorios</Link></li>
          </ul>
        </nav>

        <nav aria-label="Empresa">
          <h2 className="text-sm font-semibold text-white mb-3">Empresa</h2>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/#tecnologia" className="hover:text-white transition">Nosotros</Link></li>
            <li><Link href="/#proceso" className="hover:text-white transition">Proceso</Link></li>
            <li><Link href="/#faq" className="hover:text-white transition">Preguntas frecuentes</Link></li>
            <li><Link href="/#testimonios" className="hover:text-white transition">Testimonios</Link></li>
          </ul>
        </nav>

        <div className="col-span-2 md:col-span-1">
          <h2 className="text-sm font-semibold text-white mb-3">Contacto y soporte</h2>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-start gap-2">
              <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0116 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Puebla, México
            </li>
            <li>
              <a href="tel:+522221234567" className="flex items-center gap-2 hover:text-white transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8.1 9.6a16 16 0 006 6l1.2-1.1a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z" />
                </svg>
                +52 (222) 123 4567
              </a>
            </li>
            <li>
              <a href="mailto:contacto@hdrivic.com" className="flex items-center gap-2 hover:text-white transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                contacto@hdrivic.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1240px] px-5 md:px-10 py-5 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <p className="text-xs text-white/55">
            © {new Date().getFullYear()} HD RIVIC · Ingeniería Médica. Todos los
            derechos reservados. Puebla, México.
          </p>
          <div className="flex gap-5 text-xs">
            <a href="#" className="hover:text-white transition">Aviso de Privacidad</a>
            <a href="#" className="hover:text-white transition">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
