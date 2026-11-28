"use client";

import { useState } from "react";
import type { Product } from "@/lib/catalog/types";

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

export function AddToBagButton({
  product,
  variantId,
  disabled
}: {
  product: Product;
  variantId: string;
  disabled?: boolean;
}) {
  const [added, setAdded] = useState(false);

  function addToBag() {
    const variant = product.variants.find((item) => item.id === variantId);
    if (!variant || !variant.isActive || variant.availableQuantity === 0) return;

    const key = "naffeez-cart-v1";
    let lines: CartLine[] = [];
    try {
      const stored = JSON.parse(window.localStorage.getItem(key) ?? "[]");
      if (Array.isArray(stored)) lines = stored as CartLine[];
    } catch {
      lines = [];
    }

    const unitPriceMinor = variant.priceOverrideMinor ?? product.basePriceMinor;
    const existing = lines.find((line) => line.variantId === variant.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      lines.push({
        productId: product.id,
        slug: product.slug,
        title: product.title,
        variantId: variant.id,
        sizeLabel: variant.sizeLabel,
        colorName: variant.colorName,
        unitPriceMinor,
        quantity: 1,
        image: product.images[0]?.src ?? null
      });
    }
    window.localStorage.setItem(key, JSON.stringify(lines));
    window.dispatchEvent(new Event("naffeez:cart-updated"));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button className="button button--primary add-to-bag" type="button" disabled={disabled || !variantId} onClick={addToBag}>
      {added ? "Added to bag ✓" : "Add to bag"}
    </button>
  );
}