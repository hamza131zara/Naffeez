"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ProductImage } from "@/lib/catalog/types";

export function ProductGallery({ images, productName }: { images: ProductImage[]; productName: string }) {
  const [activeId, setActiveId] = useState(images[0]?.id ?? "");
  const [zoomOpen, setZoomOpen] = useState(false);
  const active = useMemo(() => images.find((image) => image.id === activeId) ?? images[0], [activeId, images]);

  if (!active) {
    return <div className="product-gallery__empty image-empty"><span>NAFFEEZ</span><small>Product images will appear when the catalog is populated.</small></div>;
  }

  return (
    <div className="product-gallery">
      <div className="product-gallery__stage">
        <Image src={active.src} alt={active.alt || productName} fill priority sizes="(max-width: 900px) 100vw, 64vw" unoptimized />
        {active.zoomSrc ? (
          <button type="button" className="zoom-control" onClick={() => setZoomOpen(true)} aria-label={"Zoom into " + (active.detailLabel || active.alt)}>⌕ <span>Inspect detail</span></button>
        ) : (
          <span className="gallery-hint">High-resolution inspection source not supplied for this image</span>
        )}
        {active.detailLabel && <span className="detail-label">{active.detailLabel}</span>}
      </div>
      {images.length > 1 && (
        <div className="product-gallery__thumbs" aria-label="Product images">
          {images.map((image, index) => (
            <button
              className={"gallery-thumb " + (active.id === image.id ? "is-active" : "")}
              type="button"
              onClick={() => setActiveId(image.id)}
              aria-pressed={active.id === image.id}
              aria-label={"Show " + (image.detailLabel || image.alt || "image " + (index + 1))}
              key={image.id}
            >
              <Image src={image.src} alt="" fill sizes="80px" unoptimized />
            </button>
          ))}
        </div>
      )}
      {zoomOpen && active.zoomSrc && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setZoomOpen(false); }}>
          <section className="zoom-dialog dialog-panel" role="dialog" aria-modal="true" aria-label={"High-resolution detail: " + (active.detailLabel || productName)}>
            <button type="button" className="dialog-close" onClick={() => setZoomOpen(false)} aria-label="Close zoom viewer">×</button>
            <Image src={active.zoomSrc} alt={"High-resolution view: " + active.alt} fill sizes="95vw" unoptimized />
            <p>{active.detailLabel || "Product detail"}</p>
          </section>
        </div>
      )}
    </div>
  );
}