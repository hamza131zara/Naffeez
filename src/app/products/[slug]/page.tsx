import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product-gallery";
import { ProductVariantSelector } from "@/components/product-variant-selector";
import { getPublishedProductBySlug } from "@/lib/catalog/queries";
import { formatPKR } from "@/lib/format";

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
      <div className="product-page">
        <ProductGallery images={product.images} productName={product.title} />
        <section className="product-details">
          <p className="eyebrow">NAFFEEZ PRODUCT STUDIO</p>
          <h1>{product.title}</h1>
          <strong className="product-details__price">{formatPKR(product.basePriceMinor)}</strong>
          {product.description && <p className="product-details__description">{product.description}</p>}
          {product.variants.length > 0 ? (
            <ProductVariantSelector product={product} />
          ) : (
            <p className="form-note">No purchasable variants have been configured for this product yet.</p>
          )}
          <p className="size-guide-note">Size guide: measurements will be published when the approved Naffeez size charts are available.</p>
          <Link className="whatsapp-link" href="/contact">Ask Naffeez about this product ↗</Link>
        </section>
      </div>
    </div>
  );
}