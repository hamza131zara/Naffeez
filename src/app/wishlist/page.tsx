import { WishlistView } from "@/components/wishlist-view";

export const metadata = { title: "Wishlist" };

export default function WishlistPage() {
  return (
    <div className="container page-section--compact">
      <header className="page-intro">
        <p className="eyebrow">SAVED PIECES</p>
        <h1>Your wishlist</h1>
      </header>
      <WishlistView />
    </div>
  );
}