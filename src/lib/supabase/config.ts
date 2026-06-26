/** Lectura central de la configuración de Supabase. */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * `true` cuando las variables de entorno de Supabase están presentes.
 * Si es `false`, el sitio público funciona con datos de ejemplo locales y el
 * admin muestra un aviso de "conecta Supabase".
 */
export const isSupabaseConfigured =
  SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY.length > 0;
