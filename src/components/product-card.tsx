"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/catalog/types";
import { formatPKR } from "@/lib/format";

type Props = { product: Product };

function readIds(key: string): string[] {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function ProductCard({ product }: Props) {
  const [saved, setSaved] = useState(false);
  const [compared, setCompared] = useState(false);
  const [quickView, setQuickView] = useState(false);
  const primary = product.images[0];
  const secondary = product.images.find((image) => image.id !== primary?.id && image.mediaRole !== "zoom");

  useEffect(() => {
    setSaved(readIds("naffeez-wishlist").includes(product.id));
    setCompared(readIds("naffeez-compare").includes(product.id));
  }, [product.id]);

  function toggleList(key: string, value: boolean, setter: (next: boolean) => void, max?: number) {
    const ids = readIds(key);
    if (value) {
      window.localStorage.setItem(key, JSON.stringify(ids.filter((id) => id !== product.id)));
      window.dispatchEvent(new Event("naffeez:wishlist-updated"));
      setter(false);
      return;
    }
    if (max && ids.filter((id) => id !== product.id).length >= max) {
      window.dispatchEvent(new CustomEvent("naffeez:notice", { detail: "Compare is limited to " + max + " products." }));
      return;
    }
    window.localStorage.setItem(key, JSON.stringify([...ids.filter((id) => id !== product.id), product.id]));
    if (key === "naffeez-wishlist") window.dispatchEvent(new Event("naffeez:wishlist-updated"));
    setter(true);
  }

  return (
    <>
      <article className="product-card">
        <div className="product-card__media">
          <Link className="product-card__image-link" href={"/products/" + product.slug} aria-label={"View " + product.title}>
            {primary ? (
              <>
                <Image className="product-card__image product-card__image--primary" src={primary.src} alt={primary.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 25vw" unoptimized />
                {secondary && <Image className="product-card__image product-card__image--secondary" src={secondary.src} alt={secondary.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 25vw" unoptimized />}
              </>
            ) : (
              <span className="image-empty"><span>NAFFEEZ</span><small>Product photography will appear here</small></span>
            )}
          </Link>
          <button className={"icon-action product-card__wishlist " + (saved ? "is-active" : "")} type="button" onClick={() => toggleList("naffeez-wishlist", saved, setSaved)} aria-pressed={saved} aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}>♡</button>
          <div className="product-card__hover-actions">
            <button type="button" className="icon-action" onClick={() => toggleList("naffeez-wishlist", saved, setSaved)} aria-label="Toggle wishlist" aria-pressed={saved}>♡</button>
            <button type="button" className="icon-action" onClick={() => toggleList("naffeez-compare", compared, setCompared, 4)} aria-label="Toggle compare" aria-pressed={compared}>⇄</button>
            <button type="button" className="icon-action" onClick={() => setQuickView(true)} aria-label={"Quick view " + product.title}>⌕</button>
          </div>
          <Link className="product-card__select" href={"/products/" + product.slug}>Select options <span aria-hidden="true">→</span></Link>
          {product.variants.length > 0 && product.variants.every((variant) => !variant.isActive || variant.availableQuantity === 0) && (
            <span className="stock-badge">Sold out</span>
          )}
        </div>
        <div className="product-card__details">
          <Link href={"/products/" + product.slug} className="product-card__title">{product.title}</Link>
          <span className="product-card__price">{formatPKR(product.basePriceMinor)}</span>
        </div>
      </article>

      {quickView && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setQuickView(false); }}>
          <section className="quick-view dialog-panel" role="dialog" aria-modal="true" aria-labelledby={"quick-view-" + product.id}>
            <button className="dialog-close" type="button" onClick={() => setQuickView(false)} aria-label="Close quick view">×</button>
            <div className="quick-view__image">
              {primary ? <Image src={primary.src} alt={primary.alt} fill sizes="(max-width: 720px) 90vw, 40vw" unoptimized /> : <span className="image-empty">NAFFEEZ</span>}
            </div>
            <div className="quick-view__details">
              <p className="eyebrow">QUICK VIEW</p>
              <h2 id={"quick-view-" + product.id}>{product.title}</h2>
              <strong>{formatPKR(product.basePriceMinor)}</strong>
              <p>{product.description || "Explore product details, available options and gallery images in Naffeez Product Studio."}</p>
              <Link className="button button--primary" href={"/products/" + product.slug}>Open Product Studio</Link>
            </div>
          </section>
        </div>
      )}
    </>
  );
}