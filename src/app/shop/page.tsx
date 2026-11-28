import Link from "next/link";
import { ProductGrid } from "@/components/product-grid";
import { LAUNCH_CATEGORIES } from "@/lib/catalog/categories";
import { getPublishedProducts } from "@/lib/catalog/queries";

type SearchParams = Promise<{ q?: string; category?: string; sort?: string }>;

export const metadata = { title: "Shop" };

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const search = params.q?.trim() ?? "";
  const category = LAUNCH_CATEGORIES.find((item) => item.slug === params.category);
  const result = await getPublishedProducts({
    search,
    categorySlug: category?.slug,
    limit: 48
  });

  return (
    <div className="container">
      <header className="page-intro">
        <p className="eyebrow">THE COLLECTION</p>
        <h1>{category?.label ?? "Shop all"}</h1>
        <p>Browse the Naffeez men&apos;s collection. Product options and availability are shown from the published catalog.</p>
      </header>
      <div className="category-chips" aria-label="Shop categories">
        <Link className={"category-chip " + (!category ? "is-active" : "")} href="/shop">All</Link>
        {LAUNCH_CATEGORIES.map((item) => (
          <Link className={"category-chip " + (category?.slug === item.slug ? "is-active" : "")} href={"/shop?category=" + item.slug} key={item.slug}>{item.label}</Link>
        ))}
      </div>
      <div className="catalog-toolbar">
        <span className="form-note">{result.products.length} {result.products.length === 1 ? "product" : "products"} shown</span>
        <form action="/shop" method="get" role="search">
          {category && <input type="hidden" name="category" value={category.slug} />}
          <label className="sr-only" htmlFor="catalog-search">Search products</label>
          <input className="input" id="catalog-search" name="q" defaultValue={search} placeholder="Search the collection" />
          <button className="button button--secondary" type="submit">Search</button>
        </form>
      </div>
      {result.products.length > 0 ? (
        <ProductGrid products={result.products} />
      ) : (
        <div className="empty-state">
          <p className="eyebrow">SHOP ALL</p>
          <h2>{result.configured ? (result.unavailable ? "The catalog is temporarily unavailable." : "No published products in this selection.") : "The catalog is not connected yet."}</h2>
          <p>{result.configured ? (result.unavailable ? "Please try again later." : "Published Naffeez products will appear here when the store team adds them.") : "Connect the approved Naffeez Supabase project to load real products, prices, variants and availability."}</p>
          {search && <Link className="button button--secondary" href="/shop">Clear search</Link>}
        </div>
      )}
    </div>
  );
}