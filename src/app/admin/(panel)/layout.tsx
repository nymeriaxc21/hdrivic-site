import Link from "next/link";
import { redirect } from "next/navigation";
import BrandMark from "@/components/site/BrandMark";
import AdminNav from "@/components/admin/AdminNav";
import { signOut } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Protección de ruta: sin sesión válida -> login.
  if (!isSupabaseConfigured) redirect("/admin/login");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-surface text-ink flex flex-col">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-line">
        <div className="mx-auto max-w-[1100px] px-5 h-16 flex items-center justify-between gap-4">
          <Link href="/admin" className="flex items-center gap-2.5 shrink-0" aria-label="Panel HD RIVIC">
            <BrandMark />
            <span className="hidden sm:block leading-none">
              <span className="block font-display text-base font-bold text-primary">HD RIVIC</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-ink mt-0.5">Panel</span>
            </span>
          </Link>

          <AdminNav />

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center h-9 px-3 rounded-lg text-sm font-medium text-muted hover:text-primary hover:bg-surface transition"
            >
              Ver sitio
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="inline-flex items-center h-9 px-3.5 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50 transition"
              >
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="mx-auto max-w-[1100px] px-5 py-8">{children}</div>
      </main>
    </div>
  );
}
