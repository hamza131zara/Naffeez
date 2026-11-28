import Link from "next/link";

export const metadata = { title: "Admin access" };

export default function AdminPage() {
  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY &&
    process.env.SUPABASE_SECRET_KEY
  );

  return (
    <div className="container page-section--compact">
      <div className="admin-placeholder">
        <p className="eyebrow">NAFFEEZ ADMINISTRATION</p>
        <h1>Store operations</h1>
        <p>
          {configured
            ? "The Supabase environment is configured. Owner/staff authentication, permission checks and the operational dashboard are the next implementation slice."
            : "The admin console is not connected to a Naffeez Supabase project yet. No demo credentials or insecure public admin access are provided."}
        </p>
        <ul>
          <li>Product, media and variant management</li>
          <li>Inventory and low-stock queues</li>
          <li>Order processing and manual payment review</li>
          <li>Invoice access, Journal and homepage campaigns</li>
          <li>Staff permissions, integrations and audit trail</li>
        </ul>
        <Link className="button button--secondary" href="/">Return to storefront</Link>
      </div>
    </div>
  );
}