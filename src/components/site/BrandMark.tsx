/**
 * Marca HD RIVIC: mosaico cian + glifo matraz/ADN (aproximación del logo).
 * Reemplazar por el archivo real en /public/assets/logo.svg cuando esté disponible.
 */
export default function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid place-items-center w-10 h-10 rounded-lg bg-cyan text-white shrink-0 ${className}`}
      aria-hidden="true"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.5 3h5" />
        <path d="M10.5 3v5.2L5.7 16.3A2.3 2.3 0 0 0 7.7 19.8h8.6a2.3 2.3 0 0 0 2-3.5L13.5 8.2V3" />
        <path d="M9.9 12.5c1.4 1.1 2.8 1.1 4.2 0" />
        <path d="M9.3 15.2c1.7 1.2 3.7 1.2 5.4 0" />
      </svg>
    </span>
  );
}
