import Link from "next/link";

export const metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="container page-section--compact">
      <div className="empty-state">
        <p className="eyebrow">SECURE CHECKOUT</p>
        <h1>Checkout setup is not complete yet.</h1>
        <p>Final checkout depends on confirmed delivery areas, delivery charges, COD coverage, stock reservation rules and approved QR payment instructions. The app will not guess these values or accept an order with an unverified total.</p>
        <Link className="button button--primary" href="/cart">Return to your bag</Link>
      </div>
    </div>
  );
}