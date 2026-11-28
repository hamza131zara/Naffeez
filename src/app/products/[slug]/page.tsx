import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductStudio } from "@/components/product-studio";
import { getPublishedProductBySlug } from "@/lib/catalog/queries";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);
  return { title: product?.title ?? "Product" };
}

export default async function ProductStudioPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="container page-section--compact">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> &nbsp;/&nbsp; <Link href="/shop">Shop</Link> &nbsp;/&nbsp; {product.title}
      </nav>
      <ProductStudio product={product} />
    </div>
  );
}