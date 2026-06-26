-- ============================================================
-- HD RIVIC · Datos de ejemplo (opcional)
-- Ejecuta DESPUÉS de schema.sql, en Supabase > SQL Editor.
-- Usa las imágenes incluidas en /public/assets del proyecto.
-- ============================================================

insert into public.products
  (slug, name, category, badge, tagline, description, features, specs, image_url, featured, visible, sort_order)
values
(
  'generador-ozono-medical-pro',
  'Generador de Ozono Medical Pro',
  'Ozonoterapia',
  'Más vendido',
  'Generador de ozono médico de ultra precisión con control digital de concentraciones.',
  'Equipo de grado médico para ozonoterapia con dosificación exacta y esterilidad garantizada. Control digital de concentraciones de 1 a 100 µg/mL, pantalla táctil y registro de sesiones. Diseñado y calibrado en Puebla con soporte directo de fábrica.',
  '["Control digital de concentración (1–100 µg/mL)","Destructor catalítico de ozono residual integrado","Pantalla táctil con perfiles de tratamiento","Calibración certificada antes de cada entrega"]'::jsonb,
  '[{"label":"Concentración","value":"1–100 µg/mL"},{"label":"Alimentación","value":"110–240 V / 50–60 Hz"},{"label":"Precisión de flujo","value":"99.9%"},{"label":"Garantía","value":"24 meses"}]'::jsonb,
  '/assets/ozone-device.png', true, true, 1
),
(
  'disso3-sistema-disolucion-ozono',
  'DISSO3 — Sistema de Disolución de Ozono',
  'DISSO3',
  'Nuevo Lanzamiento',
  'Innovación patentada en disolución de ozono: máxima eficiencia de transferencia en soluciones salinas.',
  'DISSO3 es nuestra tecnología patentada para la disolución eficiente de ozono en soluciones salinas, logrando una transferencia superior con mínima pérdida. Ideal para clínicas que buscan resultados consistentes y reproducibles.',
  '["Tecnología de disolución patentada","Máxima eficiencia de transferencia","Compatible con soluciones salinas estériles","Operación simple y segura"]'::jsonb,
  '[{"label":"Tecnología","value":"Disolución patentada"},{"label":"Aplicación","value":"Soluciones salinas"},{"label":"Garantía","value":"24 meses"}]'::jsonb,
  '/assets/ozone-device.png', true, true, 2
),
(
  'cama-pemf-advanced',
  'Cama Electromagnética PEMF Advanced',
  'PEMF',
  null,
  'Terapia de campo electromagnético pulsado para acelerar la regeneración ósea y de tejidos.',
  'Cama de terapia PEMF (campo electromagnético pulsado) para acelerar la regeneración ósea y tisular, manejo del dolor y recuperación deportiva. Múltiples programas preconfigurados y control de intensidad.',
  '["Programas preconfigurados por especialidad","Control de intensidad y frecuencia","Superficie ergonómica de uso clínico","Bajo mantenimiento"]'::jsonb,
  '[{"label":"Frecuencia","value":"1–100 Hz programable"},{"label":"Programas","value":"12 preconfigurados"},{"label":"Alimentación","value":"110–240 V"},{"label":"Garantía","value":"24 meses"}]'::jsonb,
  '/assets/lab-technicians.png', true, true, 3
),
(
  'generador-ozono-compact',
  'Generador de Ozono Compact',
  'Ozonoterapia',
  null,
  'Versión compacta para consultorios, con la misma precisión de grado médico.',
  'Equipo de ozonoterapia de formato compacto, pensado para consultorios con espacio reducido sin sacrificar precisión ni seguridad. Ideal para iniciar en ozonoterapia.',
  '["Formato compacto de escritorio","Control digital de concentración","Destructor de ozono residual","Fácil de transportar entre salas"]'::jsonb,
  '[{"label":"Concentración","value":"5–80 µg/mL"},{"label":"Peso","value":"6.5 kg"},{"label":"Garantía","value":"24 meses"}]'::jsonb,
  '/assets/ozone-device.png', false, true, 4
),
(
  'kit-accesorios-ozonoterapia',
  'Kit de Accesorios para Ozonoterapia',
  'Accesorios',
  null,
  'Consumibles y accesorios certificados para tus sesiones de ozonoterapia.',
  'Kit completo de accesorios y consumibles certificados, compatibles con los generadores HD RIVIC, para garantizar la seguridad y consistencia de cada sesión.',
  '["Componentes resistentes al ozono","Compatibles con equipos HD RIVIC","Material de grado médico"]'::jsonb,
  '[{"label":"Compatibilidad","value":"Línea HD RIVIC"},{"label":"Material","value":"Grado médico"}]'::jsonb,
  '/assets/ozone-device.png', false, true, 5
)
on conflict (slug) do nothing;
