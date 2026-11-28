import Link from "next/link";

export const metadata = { title: "Compare" };

export default function ComparePage() {
  return (
    <div className="container page-section--compact">
      <div className="empty-state">
        <p className="eyebrow">PRODUCT COMPARISON</p>
        <h1>Compare selected pieces.</h1>
        <p>Compare up to four products. Attribute-level comparison will become available as the published catalog includes fit, material and size information.</p>
        <Link className="button button--primary" href="/shop">Explore products</Link>
      </div>
    </div>
  );
}