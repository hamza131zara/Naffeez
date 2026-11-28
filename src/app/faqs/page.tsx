import Link from "next/link";

export const metadata = { title: "FAQs" };

export default function FAQsPage() {
  return (
    <div className="container page-section--compact">
      <div className="empty-state">
        <p className="eyebrow">HELP & SUPPORT</p>
        <h1>Frequently asked questions</h1>
        <p>Verified delivery, payment, sizing and returns answers will be added when the relevant store policies are approved.</p>
        <Link className="button button--secondary" href="/contact">Contact support</Link>
      </div>
    </div>
  );
}