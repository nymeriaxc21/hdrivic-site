import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";

export default function NuevoProductoPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/productos" className="text-sm text-muted hover:text-primary transition">
          ← Productos
        </Link>
        <h1 className="font-display text-2xl font-bold text-ink mt-2">
          Nuevo producto
        </h1>
      </div>
      <ProductForm />
    </div>
  );
}
