import Link from "next/link";

export function StoreFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="wordmark wordmark--footer" href="/">NAFFEEZ</Link>
          <p>Discover your style. Explore every detail. Shop with confidence.</p>
          <Link href="/contact">Customer support ↗</Link>
        </div>
        <div className="footer-column">
          <h2>Shop</h2>
          <Link href="/shop?category=casual-shirts">Casual Shirts</Link>
          <Link href="/shop?category=dress-shirts">Dress Shirts</Link>
          <Link href="/shop?category=seasonal-trousers">Seasonal Trousers</Link>
          <Link href="/shop?category=winter-trousers">Winter Trousers</Link>
          <Link href="/shop?category=hoodies">Hoodies</Link>
        </div>
        <div className="footer-column">
          <h2>Support</h2>
          <Link href="/contact">Contact</Link>
          <Link href="/size-guide">Size Guide</Link>
          <Link href="/shipping-returns">Shipping & Returns</Link>
          <Link href="/faqs">FAQs</Link>
        </div>
        <div className="footer-column">
          <h2>Naffeez</h2>
          <Link href="/about">Our Story</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Naffeez. All rights reserved.</span>
        <span>Pakistan · PKR</span>
      </div>
    </footer>
  );
}