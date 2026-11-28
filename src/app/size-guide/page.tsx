import Link from "next/link";

export const metadata = { title: "Size Guide" };

export default function SizeGuidePage() {
  return (
    <div className="container page-section--compact">
      <div className="empty-state">
        <p className="eyebrow">SIZE GUIDE</p>
        <h1>Find your fit.</h1>
        <p>Approved Naffeez size charts and measurement units have not yet been supplied. We will publish the correct shirt, trouser and hoodie measurements here rather than inventing sizes.</p>
        <Link className="button button--secondary" href="/contact">Ask for sizing help</Link>
      </div>
    </div>
  );
}