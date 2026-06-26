import type { Product } from "@/lib/types";

/**
 * Datos de ejemplo usados cuando Supabase aún no está conectado, para poder ver
 * el catálogo de inmediato. Estos mismos productos se cargan en la base de datos
 * con supabase/seed.sql.
 */
export const SEED_PRODUCTS: Product[] = [
  {
    id: "seed-ozono-pro",
    slug: "generador-ozono-medical-pro",
    name: "Generador de Ozono Medical Pro",
    category: "Ozonoterapia",
    badge: "Más vendido",
    tagline:
      "Generador de ozono médico de ultra precisión con control digital de concentraciones.",
    description:
      "Equipo de grado médico para ozonoterapia con dosificación exacta y esterilidad garantizada. Control digital de concentraciones de 1 a 100 µg/mL, pantalla táctil y registro de sesiones. Diseñado y calibrado en Puebla con soporte directo de fábrica.",
    features: [
      "Control digital de concentración (1–100 µg/mL)",
      "Destructor catalítico de ozono residual integrado",
      "Pantalla táctil con perfiles de tratamiento",
      "Calibración certificada antes de cada entrega",
    ],
    specs: [
      { label: "Concentración", value: "1–100 µg/mL" },
      { label: "Alimentación", value: "110–240 V / 50–60 Hz" },
      { label: "Precisión de flujo", value: "99.9%" },
      { label: "Garantía", value: "24 meses" },
    ],
    image_url: "/assets/ozone-device.png",
    featured: true,
    visible: true,
    sort_order: 1,
  },
  {
    id: "seed-disso3",
    slug: "disso3-sistema-disolucion-ozono",
    name: "DISSO3 — Sistema de Disolución de Ozono",
    category: "DISSO3",
    badge: "Nuevo Lanzamiento",
    tagline:
      "Innovación patentada en disolución de ozono: máxima eficiencia de transferencia en soluciones salinas.",
    description:
      "DISSO3 es nuestra tecnología patentada para la disolución eficiente de ozono en soluciones salinas, logrando una transferencia superior con mínima pérdida. Ideal para clínicas que buscan resultados consistentes y reproducibles.",
    features: [
      "Tecnología de disolución patentada",
      "Máxima eficiencia de transferencia",
      "Compatible con soluciones salinas estériles",
      "Operación simple y segura",
    ],
    specs: [
      { label: "Tecnología", value: "Disolución patentada" },
      { label: "Aplicación", value: "Soluciones salinas" },
      { label: "Garantía", value: "24 meses" },
    ],
    image_url: "/assets/ozone-device.png",
    featured: true,
    visible: true,
    sort_order: 2,
  },
  {
    id: "seed-pemf-advanced",
    slug: "cama-pemf-advanced",
    name: "Cama Electromagnética PEMF Advanced",
    category: "PEMF",
    badge: null,
    tagline:
      "Terapia de campo electromagnético pulsado para acelerar la regeneración ósea y de tejidos.",
    description:
      "Cama de terapia PEMF (campo electromagnético pulsado) para acelerar la regeneración ósea y tisular, manejo del dolor y recuperación deportiva. Múltiples programas preconfigurados y control de intensidad.",
    features: [
      "Programas preconfigurados por especialidad",
      "Control de intensidad y frecuencia",
      "Superficie ergonómica de uso clínico",
      "Bajo mantenimiento",
    ],
    specs: [
      { label: "Frecuencia", value: "1–100 Hz programable" },
      { label: "Programas", value: "12 preconfigurados" },
      { label: "Alimentación", value: "110–240 V" },
      { label: "Garantía", value: "24 meses" },
    ],
    image_url: "/assets/lab-technicians.png",
    featured: true,
    visible: true,
    sort_order: 3,
  },
  {
    id: "seed-ozono-compact",
    slug: "generador-ozono-compact",
    name: "Generador de Ozono Compact",
    category: "Ozonoterapia",
    badge: null,
    tagline:
      "Versión compacta para consultorios, con la misma precisión de grado médico.",
    description:
      "Equipo de ozonoterapia de formato compacto, pensado para consultorios con espacio reducido sin sacrificar precisión ni seguridad. Ideal para iniciar en ozonoterapia.",
    features: [
      "Formato compacto de escritorio",
      "Control digital de concentración",
      "Destructor de ozono residual",
      "Fácil de transportar entre salas",
    ],
    specs: [
      { label: "Concentración", value: "5–80 µg/mL" },
      { label: "Peso", value: "6.5 kg" },
      { label: "Garantía", value: "24 meses" },
    ],
    image_url: "/assets/ozone-device.png",
    featured: false,
    visible: true,
    sort_order: 4,
  },
  {
    id: "seed-kit-accesorios",
    slug: "kit-accesorios-ozonoterapia",
    name: "Kit de Accesorios para Ozonoterapia",
    category: "Accesorios",
    badge: null,
    tagline:
      "Consumibles y accesorios certificados para tus sesiones de ozonoterapia.",
    description:
      "Kit completo de accesorios y consumibles certificados, compatibles con los generadores HD RIVIC, para garantizar la seguridad y consistencia de cada sesión.",
    features: [
      "Componentes resistentes al ozono",
      "Compatibles con equipos HD RIVIC",
      "Material de grado médico",
    ],
    specs: [
      { label: "Compatibilidad", value: "Línea HD RIVIC" },
      { label: "Material", value: "Grado médico" },
    ],
    image_url: "/assets/ozone-device.png",
    featured: false,
    visible: true,
    sort_order: 5,
  },
];
