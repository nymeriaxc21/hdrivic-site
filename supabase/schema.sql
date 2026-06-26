-- ============================================================
-- HD RIVIC · Esquema de base de datos (Supabase / Postgres)
-- Ejecuta este archivo en: Supabase > SQL Editor > New query
-- ============================================================

-- ---------- Extensiones ----------
create extension if not exists "pgcrypto"; -- gen_random_uuid()

-- ---------- Función: updated_at automático ----------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- Tabla: products (catálogo de equipos)
-- ============================================================
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  category    text not null default 'Ozonoterapia',
  badge       text,
  tagline     text,
  description text,
  features    jsonb not null default '[]'::jsonb,   -- string[]
  specs       jsonb not null default '[]'::jsonb,   -- { label, value }[]
  image_url   text,
  featured    boolean not null default false,
  visible     boolean not null default true,
  sort_order  integer not null default 100,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

create index if not exists products_visible_idx on public.products (visible);
create index if not exists products_category_idx on public.products (category);

-- ---------- RLS de products ----------
alter table public.products enable row level security;

-- Cualquiera puede LEER los productos visibles (sitio público).
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read"
  on public.products for select
  using (visible = true);

-- Usuarios autenticados (admin) tienen acceso total.
drop policy if exists "products_admin_all" on public.products;
create policy "products_admin_all"
  on public.products for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- Tabla: quotes (solicitudes de cotización / contacto)
-- ============================================================
create table if not exists public.quotes (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  clinic       text,
  email        text not null,
  phone        text,
  product_id   uuid references public.products (id) on delete set null,
  product_name text,
  message      text,
  status       text not null default 'nueva'
               check (status in ('nueva', 'atendida', 'archivada'))
);

create index if not exists quotes_status_idx on public.quotes (status);
create index if not exists quotes_created_idx on public.quotes (created_at desc);

-- ---------- RLS de quotes ----------
alter table public.quotes enable row level security;

-- Cualquiera (visitante anónimo) puede ENVIAR una cotización.
drop policy if exists "quotes_public_insert" on public.quotes;
create policy "quotes_public_insert"
  on public.quotes for insert
  to anon, authenticated
  with check (true);

-- Solo el admin (autenticado) puede leer / actualizar / borrar.
drop policy if exists "quotes_admin_read" on public.quotes;
create policy "quotes_admin_read"
  on public.quotes for select
  to authenticated
  using (true);

drop policy if exists "quotes_admin_update" on public.quotes;
create policy "quotes_admin_update"
  on public.quotes for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "quotes_admin_delete" on public.quotes;
create policy "quotes_admin_delete"
  on public.quotes for delete
  to authenticated
  using (true);

-- ============================================================
-- Storage: bucket público para imágenes de productos
-- ============================================================
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Lectura pública de las imágenes.
drop policy if exists "product_images_public_read" on storage.objects;
create policy "product_images_public_read"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- Subir / actualizar / borrar imágenes: solo admin autenticado.
drop policy if exists "product_images_admin_write" on storage.objects;
create policy "product_images_admin_write"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

drop policy if exists "product_images_admin_update" on storage.objects;
create policy "product_images_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

drop policy if exists "product_images_admin_delete" on storage.objects;
create policy "product_images_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');
