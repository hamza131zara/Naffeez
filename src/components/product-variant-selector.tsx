"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/catalog/types";
import { AddToBagButton } from "./add-to-bag-button";

export function ProductVariantSelector({ product }: { product: Product }) {
  const activeVariants = product.variants.filter((variant) => variant.isActive);
  const colors = [...new Set(activeVariants.map((variant) => variant.colorName).filter((value): value is string => Boolean(value)))];
  const sizes = [...new Set(activeVariants.map((variant) => variant.sizeLabel).filter((value): value is string => Boolean(value)))];
  const [color, setColor] = useState(colors[0] ?? "");
  const [size, setSize] = useState("");

  const matching = useMemo(() => activeVariants.filter((variant) =>
    (!colors.length || variant.colorName === color) && (!sizes.length || variant.sizeLabel === size || !size)
  ), [activeVariants, color, size, colors.length, sizes.length]);

  const selected = size ? matching.find((variant) => variant.sizeLabel === size) ?? null : (sizes.length ? null : matching[0] ?? null);
  const allMatchingSoldOut = matching.length > 0 && matching.every((variant) => variant.isInStock === false);
  const ready = Boolean(selected && selected.isActive && selected.isInStock !== false);

  return (
    <>
      {colors.length > 0 && (
        <div className="variant-group">
          <span className="variant-group__title">Colour {color ? "· " + color : ""}</span>
          <div className="variant-options">
            {colors.map((value) => (
              <button className="variant-option" type="button" key={value} aria-pressed={color === value} onClick={() => { setColor(value); setSize(""); }}>{value}</button>
            ))}
          </div>
        </div>
      )}
      {sizes.length > 0 && (
        <div className="variant-group">
          <span className="variant-group__title">Select size</span>
          <div className="variant-options">
            {sizes.map((value) => {
              const variant = activeVariants.find((item) => item.colorName === color && item.sizeLabel === value);
              const soldOut = variant?.isInStock === false;
              return (
                <button
                  className="variant-option"
                  type="button"
                  key={value}
                  disabled={soldOut}
                  aria-pressed={size === value}
                  onClick={() => setSize(value)}
                >
                  {value}{soldOut ? " · Sold out" : ""}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {selected?.isInStock === false || allMatchingSoldOut ? (
        <p className="stock-message stock-message--sold">This option is currently sold out.</p>
      ) : selected?.isInStock !== null && selected?.isInStock !== undefined ? (
        <p className="stock-message">{selected.isInStock ? "Available" : "Currently unavailable"}</p>
      ) : (
        <p className="stock-message">Availability is confirmed again when you check out.</p>
      )}
      <AddToBagButton product={product} variantId={selected?.id ?? ""} disabled={!ready} />
    </>
  );
}