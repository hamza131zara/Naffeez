"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPKR } from "@/lib/format";

type CartLine = {
  productId: string;
  slug: string;
  title: string;
  variantId: string;
  sizeLabel: string | null;
  colorName: string | null;
  unitPriceMinor: number;
  quantity: number;
  image: string | null;
};

const CART_KEY = "naffeez-cart-v1";

export function CartView() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  function readCart() {
    try {
      const value = JSON.parse(window.localStorage.getItem(CART_KEY) ?? "[]");
      setLines(Array.isArray(value) ? value as CartLine[] : []);
    } catch {
      setLines([]);
    }
    setReady(true);
  }

  useEffect(() => {
    readCart();
    window.addEventListener("naffeez:cart-updated", readCart);
    return () => window.removeEventListener("naffeez:cart-updated", readCart);
  }, []);

  function save(next: CartLine[]) {
    setLines(next);
    window.localStorage.setItem(CART_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("naffeez:cart-updated"));
  }

  const subtotal = lines.reduce((sum, line) => sum + line.unitPriceMinor * line.quantity, 0);

  if (!ready) return <div className="loading-panel" aria-live="polite">Loading your bag…</div>;
  if (!lines.length) {
    return (
      <div className="empty-state">
        <p className="eyebrow">YOUR BAG</p>
        <h1>Your bag is waiting.</h1>
        <p>Explore the collection and add a piece when something feels right.</p>
        <Link className="button button--primary" href="/shop">Explore the collection</Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div className="cart-lines">
        {lines.map((line) => (
          <article className="cart-line" key={line.variantId}>
            <div className="cart-line__image">
              {line.image && <Image src={line.image} alt="" fill sizes="120px" unoptimized />}
            </div>
            <div className="cart-line__details">
              <Link href={"/products/" + line.slug}>{line.title}</Link>
              <span>{[line.colorName, line.sizeLabel].filter(Boolean).join(" · ") || "Selected variant"}</span>
              <strong>{formatPKR(line.unitPriceMinor)}</strong>
              <div className="quantity-control" aria-label={"Quantity for " + line.title}>
                <button type="button" onClick={() => save(lines.map((item) => item.variantId === line.variantId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item))} aria-label="Decrease quantity">−</button>
                <span>{line.quantity}</span>
                <button type="button" onClick={() => save(lines.map((item) => item.variantId === line.variantId ? { ...item, quantity: item.quantity + 1 } : item))} aria-label="Increase quantity">+</button>
              </div>
              <button className="text-button" type="button" onClick={() => save(lines.filter((item) => item.variantId !== line.variantId))}>Remove</button>
            </div>
            <strong className="cart-line__total">{formatPKR(line.unitPriceMinor * line.quantity)}</strong>
          </article>
        ))}
      </div>
      <aside className="cart-summary">
        <p className="eyebrow">ORDER SUMMARY</p>
        <div><span>Subtotal</span><strong>{formatPKR(subtotal)}</strong></div>
        <div><span>Delivery</span><span>Calculated after address and coverage are configured</span></div>
        <div className="cart-summary__total"><span>Subtotal</span><strong>{formatPKR(subtotal)}</strong></div>
        <p className="form-note">This is a local guest cart. Current price, stock, delivery charges and the final payable amount must be confirmed by the server at checkout.</p>
        <button className="button button--primary" type="button" disabled>Checkout setup pending</button>
        <Link className="text-link" href="/shop">Continue shopping</Link>
      </aside>
    </div>
  );
}