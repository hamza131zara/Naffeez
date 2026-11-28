"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { Product } from "@/lib/catalog/types";
import { ProductCard } from "./product-card";

function readWishlistIds(): string[] {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem("naffeez-wishlist") ?? "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function WishlistView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    await Promise.resolve();
    const ids = readWishlistIds();
    let next: Product[] = [];

    if (ids.length) {
      try {
        const response = await fetch("/api/catalog/wishlist?ids=" + encodeURIComponent(ids.join(",")), { cache: "no-store" });
        if (!response.ok) throw new Error("Wishlist request failed");
        next = await response.json() as Product[];
      } catch {
        next = [];
      }
    }

    setProducts(next);
    setLoaded(true);
  }, []);

  useEffect(() => {
    const sync = async () => {
      await refresh();
    };

    void sync();
    const handler = () => { void sync(); };
    window.addEventListener("naffeez:wishlist-updated", handler);
    return () => window.removeEventListener("naffeez:wishlist-updated", handler);
  }, [refresh]);

  if (!loaded) return <div className="loading-panel">Loading saved pieces…</div>;
  if (!products.length) {
    return (
      <div className="empty-state">
        <h2>No saved pieces yet.</h2>
        <p>Your guest wishlist is stored in this browser. Sign-in sync is pending the authentication decision.</p>
        <Link className="button button--primary" href="/shop">Shop now</Link>
      </div>
    );
  }

  return <div className="product-grid">{products.map((product) => <ProductCard product={product} key={product.id} />)}</div>;
}
