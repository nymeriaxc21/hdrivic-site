# HD RIVIC · Sitio + Panel de administración

Sitio web B2B de **HD RIVIC · Ingeniería Médica** (equipos de medicina
regenerativa, Puebla) con **catálogo**, **solicitudes de cotización** y un
**panel de administración** para gestionar productos y leads.

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4
- **Base de datos / Auth / Storage:** Supabase
- **Despliegue recomendado:** Vercel
- **Idioma:** Español (México) · Modelo de venta: cotización / contacto (sin pago en línea)

> El sitio **funciona sin Supabase** mostrando productos de ejemplo. Para
> gestionar productos reales y recibir cotizaciones, conecta Supabase (abajo).

---

## 1. Correr en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

- Sitio público: `/`, `/catalogo`, `/productos/[slug]`, `/cotizacion`
- Panel admin: `/admin` (requiere Supabase + iniciar sesión)

## 2. Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Inicio (landing) |
| `/catalogo` | Catálogo con filtro por categoría |
| `/productos/[slug]` | Detalle de producto + “Solicitar cotización” |
| `/cotizacion` | Formulario de cotización (guarda el lead) |
| `/admin/login` | Acceso al panel |
| `/admin` | Resumen (productos y cotizaciones) |
| `/admin/productos` | Alta / edición / borrado de productos + imágenes |
| `/admin/cotizaciones` | Bandeja de solicitudes recibidas |

---

## 3. Conectar Supabase (paso a paso)

### 3.1 Crear el proyecto
1. Entra a https://supabase.com y crea una cuenta (gratis).
2. **New project** → ponle nombre (ej. `hdrivic`) y una contraseña de base de datos.
3. Espera ~2 min a que se aprovisione.

### 3.2 Crear las tablas y el bucket de imágenes
1. En el panel de Supabase: **SQL Editor → New query**.
2. Pega el contenido de [`supabase/schema.sql`](./supabase/schema.sql) y ejecuta (**Run**).
3. (Opcional) Para cargar productos de ejemplo, ejecuta también
   [`supabase/seed.sql`](./supabase/seed.sql).

Esto crea las tablas `products` y `quotes`, las políticas de seguridad (RLS) y
el bucket público `product-images`.

### 3.3 Variables de entorno
1. En Supabase: **Project Settings → API**.
2. Copia **Project URL** y la clave **anon / publishable**.
3. En el proyecto, copia `.env.local.example` a `.env.local` y rellena:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

4. Reinicia `npm run dev`.

### 3.4 Crear tu usuario administrador
El acceso al panel usa Supabase Auth (correo + contraseña).
1. En Supabase: **Authentication → Users → Add user**.
2. Pon tu correo y una contraseña, y **marca “Auto Confirm User”**.
3. Entra a `/admin/login` con esas credenciales.

> Cualquier usuario autenticado tiene acceso de admin. Crea solo los usuarios
> del equipo de HD RIVIC.

---

## 4. Desplegar en Vercel

1. Sube el proyecto a GitHub.
2. En https://vercel.com → **Add New → Project** → importa el repo.
3. En **Environment Variables** agrega las mismas dos variables del `.env.local`.
4. **Deploy**. Vercel te da una URL pública (y puedes conectar tu dominio).

---

## 5. Antes de lanzar (reemplazar datos de ejemplo)

Estos textos son placeholders: teléfono **+52 (222) 123 4567**,
**contacto@hdrivic.com**, **wa.me/522221234567**, “+120 clínicas”, claims
ISO 13485 / COFEPRIS, logos y testimonios ilustrativos. Búscalos y reemplázalos
por los reales. El logo del header/footer es una aproximación en SVG
(`src/components/site/BrandMark.tsx`); reemplázalo por el logo real cuando esté
listo (hay una copia en `public/assets/hd-rivic-logo.png`).

---

## 6. Estructura

```
src/
  app/
    (public)/            Sitio público (Header/Footer compartidos)
      page.tsx           Inicio (landing)
      catalogo/          Catálogo
      productos/[slug]/  Detalle de producto
      cotizacion/        Formulario + Server Action
    admin/
      login/             Acceso
      (panel)/           Rutas protegidas (sesión requerida)
        page.tsx         Resumen
        productos/       CRUD + subida de imágenes
        cotizaciones/    Bandeja de leads
  components/            Header, Footer, formularios, admin, etc.
  lib/
    supabase/            Clientes (browser/server) + config
    products.ts          Acceso a productos (con datos de ejemplo de respaldo)
    types.ts             Tipos del dominio
  data/seed-products.ts  Productos de ejemplo (sin Supabase)
supabase/
  schema.sql             Tablas + RLS + bucket
  seed.sql               Productos de ejemplo
```

## 7. Comandos

```bash
npm run dev      # desarrollo
npm run build    # build de producción
npm run start    # servir el build
npm run lint     # linter
```
