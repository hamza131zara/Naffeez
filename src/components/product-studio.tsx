"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/catalog/types";
import { ProductGallery } from "@/components/product-gallery";
import { AddToBagButton } from "@/components/add-to-bag-button";
import { formatPKR } from "@/lib/format";

export function ProductStudio({ product }: { product: Product }) {
  const activeVariants = product.variants.filter((variant) => variant.isActive);
  const colors = [...new Set(activeVariants.map((variant) => variant.colorName).filter((value): value is string => Boolean(value)))];
  const sizes = [...new Set(activeVariants.map((variant) => variant.sizeLabel).filter((value): value is string => Boolean(value)))];
  const [color, setColor] = useState(colors[0] ?? "");
  const [size, setSize] = useState("");

  const colorVariants = useMemo(
    () => activeVariants.filter((variant) => !colors.length || variant.colorName === color),
    [activeVariants, colors.length, color]
  );
  const selectedVariant = size
    ? colorVariants.find((variant) => variant.sizeLabel === size) ?? null
    : sizes.length ? null : colorVariants[0] ?? null;

  const galleryImages = useMemo(() => {
    const selectedIds = new Set(
      (selectedVariant ? [selectedVariant] : colorVariants).map((variant) => variant.id)
    );
    const scoped = product.images.filter((image) => !image.variantId || selectedIds.has(image.variantId));
    return scoped.length ? scoped : product.images;
  }, [product.images, selectedVariant, colorVariants]);

  const allColorVariantsSoldOut = colorVariants.length > 0 &&
    colorVariants.every((variant) => variant.availableQuantity === 0);
  const canAdd = Boolean(
    selectedVariant &&
    selectedVariant.isActive &&
    selectedVariant.availableQuantity !== 0
  );
  const price = selectedVariant?.priceOverrideMinor ?? product.basePriceMinor;

  return (
    <div className="product-page">
      <ProductGallery images={galleryImages} productName={product.title} />
      <section className="product-details">
        <p className="eyebrow">NAFFEEZ PRODUCT STUDIO</p>
        <h1>{product.title}</h1>
        <strong className="product-details__price">{formatPKR(price)}</strong>
        {product.description && <p className="product-details__description">{product.description}</p>}

        {colors.length > 0 && (
          <div className="variant-group">
            <span className="variant-group__title">Colour · {color}</span>
            <div className="variant-options">
              {colors.map((value) => (
                <button
                  className="variant-option"
                  type="button"
                  key={value}
                  aria-pressed={color === value}
                  onClick={() => { setColor(value); setSize(""); }}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        )}

        {sizes.length > 0 && (
          <div className="variant-group">
            <span className="variant-group__title">Select size</span>
            <div className="variant-options">
              {sizes.map((value) => {
                const variant = colorVariants.find((item) => item.sizeLabel === value);
                const soldOut = variant?.availableQuantity === 0;
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

        {selectedVariant?.availableQuantity === 0 || allColorVariantsSoldOut ? (
          <p className="stock-message stock-message--sold" role="status">This option is currently sold out.</p>
        ) : selectedVariant?.availableQuantity !== null && selectedVariant?.availableQuantity !== undefined ? (
          <p className="stock-message" role="status">
            {selectedVariant.availableQuantity > 0 ? "Available" : "Currently unavailable"}
          </p>
        ) : (
          <p className="stock-message" role="status">Availability is confirmed again at checkout.</p>
        )}
        <AddToBagButton product={product} variantId={selectedVariant?.id ?? ""} disabled={!canAdd} />
        <p className="size-guide-note">Size guide: approved Naffeez measurements will appear when supplied.</p>
        <a className="whatsapp-link" href="/contact">Ask Naffeez about this product ↗</a>
      </section>
    </div>
  );
}