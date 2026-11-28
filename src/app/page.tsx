import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { ProductGrid } from "@/components/product-grid";
import { getPublishedProducts } from "@/lib/catalog/queries";
import { LAUNCH_CATEGORIES } from "@/lib/catalog/categories";

export default async function HomePage() {
  const catalog = await getPublishedProducts({ limit: 8 });

  return (
    <div>
      <section className="container hero">
        <div className="hero__copy">
          <p className="eyebrow">THE NAFFEEZ EDIT · MODERN MENSWEAR</p>
          <h1>Modern layers.<br />Timeless style.</h1>
          <p>A considered edit of everyday menswear — from casual layers to tailored essentials.</p>
          <div className="hero__actions">
            <Link className="button button--primary" href="/shop">Explore the collection <span aria-hidden="true">→</span></Link>
            <Link className="button button--secondary" href="/shop">Discover Naffeez</Link>
          </div>
        </div>
        <div className="hero__media">
          <div className="hero__media-placeholder">
            <strong>CAMPAIGN MEDIA</strong>
            <span>Publish an approved campaign poster in the Naffeez admin to feature a real product here.</span>
          </div>
          <span className="hero__media-note">01 / THE SEASONAL EDIT</span>
        </div>
      </section>

      <section className="container benefit-strip" aria-label="Store information">
        <div><strong>Considered essentials</strong><span>Everyday menswear edit</span></div>
        <div><strong>Product details</strong><span>Gallery and variant information</span></div>
        <div><strong>Flexible payment</strong><span>COD and configured QR methods</span></div>
        <div><strong>Customer support</strong><span>WhatsApp assistance</span></div>
      </section>

      <section className="container page-section">
        <SectionHeading eyebrow="THE COLLECTION" title="Shop by category" description="Explore the Naffeez launch collection." />
        <div className="category-grid">
          {LAUNCH_CATEGORIES.map((category) => (
            <Link className="category-tile" href={"/shop?category=" + category.slug} key={category.slug}>
              <strong>{category.label}</strong>
              <span>{category.group} <span aria-hidden="true">↗</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container page-section">
        <SectionHeading
          eyebrow="THE CURRENT EDIT"
          title="Selected pieces"
          description="Products published by the Naffeez team."
          action={<Link href="/shop" className="text-link">View all →</Link>}
        />
        {catalog.products.length > 0 ? (
          <ProductGrid products={catalog.products} />
        ) : (
          <div className="empty-state">
            <p className="eyebrow">{catalog.configured ? (catalog.unavailable ? "CATALOG UNAVAILABLE" : "CATALOG PREPARATION") : "STORE SETUP"}</p>
            <h2>{catalog.configured ? (catalog.unavailable ? "We couldn't load the collection." : "The collection is being prepared.") : "Your product collection will appear here."}</h2>
            <p>{catalog.configured ? (catalog.unavailable ? "Please try again shortly. The storefront is still available while the catalog service is being checked." : "Once the Naffeez team publishes products in the admin catalog, they will appear here automatically.") : "Connect the Naffeez Supabase project and publish real product details and photography. No sample products or prices are shown as real inventory."}</p>
            <Link className="button button--secondary" href="/shop">Browse categories</Link>
          </div>
        )}
      </section>

      <section className="container studio-feature">
        <div className="studio-feature__copy">
          <p className="eyebrow">NAFFEEZ PRODUCT STUDIO</p>
          <h2>Look closer.<br />Know every detail.</h2>
          <p>Explore available product angles, inspect fabric and stitching where high-resolution images are supplied, and choose the right variant.</p>
          <Link className="button button--primary" href="/shop">Explore the collection <span aria-hidden="true">→</span></Link>
        </div>
        <div className="studio-feature__media circle-reveal">
          <span>PRODUCT STUDIO</span>
          <small>Product imagery will appear from the published catalog.</small>
        </div>
      </section>

      <section className="container page-section journal-teaser">
        <SectionHeading eyebrow="THE NAFFEEZ JOURNAL" title="Notes on modern dressing" description="Stories on fit, fabric and everyday style." action={<Link className="text-link" href="/journal">Explore journal →</Link>} />
        <div className="journal-teaser__grid">
          <div><p className="eyebrow">STYLE GUIDE</p><h3>A better fit starts with the details.</h3><span>Editorial articles will appear when published.</span></div>
          <div><p className="eyebrow">FABRIC NOTES</p><h3>Texture, weight and everyday wear.</h3><span>Editorial articles will appear when published.</span></div>
          <div><p className="eyebrow">CARE & KEEPING</p><h3>Make every piece work harder.</h3><span>Editorial articles will appear when published.</span></div>
        </div>
      </section>
    </div>
  );
}