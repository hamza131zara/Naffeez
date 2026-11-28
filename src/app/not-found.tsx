import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container page-section--compact">
      <div className="empty-state">
        <p className="eyebrow">404 · NOT FOUND</p>
        <h1>This page could not be found.</h1>
        <p>The product or page may have been moved, unpublished or is not available.</p>
        <Link className="button button--primary" href="/shop">Back to shop</Link>
      </div>
    </div>
  );
}