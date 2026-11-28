"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { Product } from "@/lib/catalog/types";
import { formatPKR } from "@/lib/format";

function readIds(): string[] {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem("naffeez-compare") ?? "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string").slice(0, 4) : [];
  } catch {
    return [];
  }
}

export function CompareView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    await Promise.resolve();
    const ids = readIds();
    let next: Product[] = [];

    if (ids.length) {
      try {
        const response = await fetch("/api/catalog/compare?ids=" + encodeURIComponent(ids.join(",")), { cache: "no-store" });
        if (!response.ok) throw new Error("Compare request failed");
        next = await response.json() as Product[];
      } catch {
        next = [];
      }
    }

    setProducts(next);
    setLoaded(true);
  }, []);

  useEffect(() => {
    let active = true;
    const sync = async () => {
      await refresh();
      if (!active) return;
    };
    void sync();
    const handler = () => { void sync(); };
    window.addEventListener("naffeez:compare-updated", handler);
    return () => {
      active = false;
      window.removeEventListener("naffeez:compare-updated", handler);
    };
  }, [refresh]);

  function remove(id: string) {
    const next = readIds().filter((item) => item !== id);
    window.localStorage.setItem("naffeez-compare", JSON.stringify(next));
    void refresh();
  }

  if (!loaded) return <div className="loading-panel">Loading comparison…</div>;
  if (!products.length) {
    return (
      <div className="empty-state">
        <h2>No products selected for comparison.</h2>
        <p>Add up to four published products from their product cards to compare product details.</p>
        <Link className="button button--primary" href="/shop">Explore products</Link>
      </div>
    );
  }

  return (
    <div className="compare-table-wrap">
      <table className="compare-table">
        <thead><tr><th scope="col">Product detail</th>{products.map((product) => <th scope="col" key={product.id}>{product.title}</th>)}</tr></thead>
        <tbody>
          <tr><th scope="row">Current price</th>{products.map((product) => <td key={product.id}>{formatPKR(product.basePriceMinor)}</td>)}</tr>
          <tr><th scope="row">Available options</th>{products.map((product) => <td key={product.id}>{product.variants.length ? product.variants.filter((item) => item.isActive).map((item) => [item.colorName, item.sizeLabel].filter(Boolean).join(" / ")).filter(Boolean).join(", ") || "Not provided" : "Not provided"}</td>)}</tr>
          <tr><th scope="row">Description</th>{products.map((product) => <td key={product.id}>{product.description || "Not provided"}</td>)}</tr>
          <tr><th scope="row">Actions</th>{products.map((product) => <td key={product.id}><Link className="text-link" href={"/products/" + product.slug}>View product →</Link><br /><button className="text-button" type="button" onClick={() => remove(product.id)}>Remove</button></td>)}</tr>
        </tbody>
      </table>
    </div>
  );
}
