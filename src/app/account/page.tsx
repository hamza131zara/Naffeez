import Link from "next/link";

export const metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <div className="container page-section--compact">
      <div className="empty-state">
        <p className="eyebrow">YOUR NAFFEEZ ACCOUNT</p>
        <h1>Account access is coming next.</h1>
        <p>The sign-in and recovery method is still an owner decision. Guest shopping remains available while that flow is finalized.</p>
        <Link className="button button--primary" href="/shop">Continue shopping</Link>
      </div>
    </div>
  );
}