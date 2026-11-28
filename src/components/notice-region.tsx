"use client";

import { useEffect, useState } from "react";

export function NoticeRegion() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<string>;
      setMessage(custom.detail);
    };
    window.addEventListener("naffeez:notice", handler);
    return () => window.removeEventListener("naffeez:notice", handler);
  }, []);

  if (!message) return <div className="sr-only" aria-live="polite" />;
  return (
    <div className="notice-toast" role="status">
      <span>{message}</span>
      <button type="button" onClick={() => setMessage("")} aria-label="Dismiss notice">×</button>
    </div>
  );
}