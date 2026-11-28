"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { PointerEvent } from "react";
import type { ProductImage } from "@/lib/catalog/types";

type LensPosition = { left: number; top: number; backgroundPosition: string };

export function ProductGallery({ images, productName }: { images: ProductImage[]; productName: string }) {
  const [activeId, setActiveId] = useState(images[0]?.id ?? "");
  const [zoomOpen, setZoomOpen] = useState(false);
  const [lens, setLens] = useState<LensPosition | null>(null);
  const active = useMemo(() => images.find((image) => image.id === activeId) ?? images[0], [activeId, images]);

  function moveLens(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !active?.zoomSrc) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
    const xPercent = Math.round((x / rect.width) * 100);
    const yPercent = Math.round((y / rect.height) * 100);
    setLens({
      left: x,
      top: y,
      backgroundPosition: xPercent + "% " + yPercent + "%"
    });
  }

  if (!active) {
    return <div className="product-gallery__empty image-empty"><span>NAFFEEZ</span><small>Product images will appear when the catalog is populated.</small></div>;
  }

  return (
    <div className="product-gallery">
      <div
        className={"product-gallery__stage " + (active.zoomSrc ? "has-zoom-source" : "")}
        onPointerMove={moveLens}
        onPointerLeave={() => setLens(null)}
      >
        <Image src={active.src} alt={active.alt || productName} fill priority sizes="(max-width: 900px) 100vw, 64vw" unoptimized />
        {active.zoomSrc && lens && (
          <div
            className="zoom-lens"
            aria-hidden="true"
            style={{
              left: lens.left,
              top: lens.top,
              backgroundImage: "url(" + active.zoomSrc + ")",
              backgroundPosition: lens.backgroundPosition
            }}
          />
        )}
        {active.zoomSrc ? (
          <button type="button" className="zoom-control" onClick={() => setZoomOpen(true)} aria-label={"Open high-resolution inspection for " + (active.detailLabel || active.alt)}>⌕ <span>Inspect detail</span></button>
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
              onClick={() => { setActiveId(image.id); setLens(null); }}
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