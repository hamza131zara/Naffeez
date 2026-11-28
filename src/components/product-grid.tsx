import type { Product } from "@/lib/catalog/types";
import { ProductCard } from "./product-card";

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <div className="product-grid">
      {products.map((product) => <ProductCard product={product} key={product.id} />)}
    </div>
  );
}