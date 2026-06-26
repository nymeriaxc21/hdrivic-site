import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import BrandMark from "@/components/site/BrandMark";
import LoginForm from "@/components/admin/LoginForm";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Acceso al panel",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect("/admin");
  }

  return (
    <main className="min-h-screen grid place-items-center bg-surface px-5 py-12">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <BrandMark />
          <span className="leading-none">
            <span className="block font-display text-lg font-bold text-primary">
              HD RIVIC
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-ink mt-0.5">
              Panel de administración
            </span>
          </span>
        </div>

        <div className="rounded-2xl border border-line bg-white p-7 md:p-8 shadow-soft">
          {isSupabaseConfigured ? (
            <>
              <h1 className="font-display text-xl font-bold text-ink mb-1">
                Iniciar sesión
              </h1>
              <p className="text-sm text-muted mb-6">
                Acceso exclusivo para el equipo de HD RIVIC.
              </p>
              <LoginForm />
            </>
          ) : (
            <div>
              <h1 className="font-display text-xl font-bold text-ink mb-3">
                Falta conectar Supabase
              </h1>
              <p className="text-sm text-muted">
                El panel necesita una base de datos. Sigue los pasos del{" "}
                <code className="text-cyan-ink">README.md</code> para crear el
                proyecto en Supabase y agregar las variables en{" "}
                <code className="text-cyan-ink">.env.local</code>.
              </p>
            </div>
          )}
        </div>

        <p className="text-center mt-6 text-sm text-muted">
          <Link href="/" className="hover:text-primary transition">
            ← Volver al sitio
          </Link>
        </p>
      </div>
    </main>
  );
}
