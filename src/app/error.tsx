"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container page-section--compact">
      <div className="empty-state" role="alert">
        <p className="eyebrow">TEMPORARY ISSUE</p>
        <h1>We couldn't load this page.</h1>
        <p>Your cart and other browser data have not been deliberately cleared. Please retry.</p>
        <button className="button button--primary" type="button" onClick={() => reset()}>Try again</button>
      </div>
    </div>
  );
}