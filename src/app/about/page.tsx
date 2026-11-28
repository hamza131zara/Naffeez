import Link from "next/link";

export const metadata = { title: "Our Story" };

export default function AboutPage() {
  return (
    <div className="container page-section--compact">
      <div className="empty-state">
        <p className="eyebrow">ABOUT NAFFEEZ</p>
        <h1>Modern menswear, considered in every detail.</h1>
        <p>The approved brand story and editorial copy will be published by the Naffeez team.</p>
        <Link className="button button--secondary" href="/shop">Explore the collection</Link>
      </div>
    </div>
  );
}