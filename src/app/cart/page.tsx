import { CartView } from "@/components/cart-view";

export const metadata = { title: "Your Bag" };

export default function CartPage() {
  return (
    <div className="container page-section--compact">
      <header className="page-intro">
        <p className="eyebrow">NAFFEEZ</p>
        <h1>Your bag</h1>
        <p>Review your selected pieces.</p>
      </header>
      <CartView />
    </div>
  );
}