import Link from "next/link";

export const metadata = { title: "Shipping & Returns" };

export default function ShippingReturnsPage() {
  return (
    <div className="container page-section--compact">
      <div className="empty-state">
        <p className="eyebrow">STORE POLICIES</p>
        <h1>Shipping & returns</h1>
        <p>Delivery coverage, charges, COD availability and return/exchange conditions are pending owner approval. The store will publish the confirmed policy here before checkout is enabled.</p>
        <Link className="button button--secondary" href="/contact">Contact support</Link>
      </div>
    </div>
  );
}