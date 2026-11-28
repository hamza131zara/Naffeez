import Link from "next/link";

export const metadata = { title: "Journal" };

export default function JournalPage() {
  return (
    <div className="container page-section--compact">
      <header className="page-intro">
        <p className="eyebrow">THE NAFFEEZ JOURNAL</p>
        <h1>Notes on modern dressing.</h1>
        <p>Stories on fit, fabric and everyday style.</p>
      </header>
      <div className="empty-state">
        <h2>Editorial stories are being prepared.</h2>
        <p>Only articles published by the Naffeez team will appear here.</p>
        <Link className="button button--secondary" href="/shop">Explore the collection</Link>
      </div>
    </div>
  );
}