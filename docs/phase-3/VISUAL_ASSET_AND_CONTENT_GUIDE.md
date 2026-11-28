# Naffeez — Visual Assets, Photography and Content Guide

**Document ID:** NAF-P3-ASSET-001  
**Version:** 1.0  
**Status:** Owner input and creative production guide

## 1. Asset principles

- Use original Naffeez-owned or properly licensed imagery.
- Do not reuse Blackenwhite logos, product shots, campaign copy or proprietary assets.
- Keep product photography consistent enough for grid comparison.
- Editorial campaign images can be more expressive than catalog images.
- Every image must have a purpose, focal point and responsive crop.
- Do not invent product details or claims in copy.

## 2. Product image checklist

Recommended per product/variant:
1. Front full view.
2. Back full view.
3. 3/4 angle.
4. Close-up of fabric/texture.
5. Detail of collar/cuff/pocket/seam where relevant.
6. Styled/lifestyle image.
7. Fit/model view where supplied and permissioned.
8. Variant color image when color differs materially.

Product image baseline:
- 3:4 portrait target.
- Consistent framing and lighting.
- Garment fully visible.
- Clean background.
- High-resolution master; derivative sizes generated for web.
- AVIF/WebP delivery.
- Meaningful alt text.
- Avoid embedding price/text as part of photo.

## 3. Hero campaign image checklist

- Landscape 16:9 or wider campaign crop.
- Focal subject has safe space for text on one side.
- Mobile crop composed separately where required.
- Avoid text baked into image.
- Provide a poster/static image for every optional video; poster is required and is the no-playback fallback.
- Optional homepage campaign video is a 6–10 second muted, inline, seamless loop with no audio track.
- Provide separate desktop/mobile crop or focal-point metadata where required.
- Load active media only; do not download all campaign slide videos on initial homepage render.
- Pause inactive/offscreen media and respect reduced-motion/data-saving/constrained playback by showing the poster.
- Ensure contrast scrim adapts to image/video focal point.
- Provide campaign title, short copy, selected published product/collection, CTA, poster and optional video fields in CMS.

## 4. Category/collection assets

Use a consistent photography style and crop. Initial categories:
- Casual Shirts.
- Dress Shirts.
- Seasonal Trousers.
- Winter Trousers.
- Hoodies.

Each tile links to a real active category. If no approved image is available, use a neutral brand-safe fallback rather than generic stock imagery that misrepresents products.

## 5. Journal editorial imagery and copy

Article fields:
- title;
- short summary;
- hero/cover image;
- body;
- author/byline if real and approved;
- publication date;
- tags/category;
- related active products;
- SEO title/description;
- social image.

Suggested editorial themes:
- Shirt styling and outfit combinations.
- How to select trouser fits.
- Fabric/care education when based on actual product materials.
- Seasonal outfit guides.
- Occasion styling.
- New collection stories.

Do not publish fabricated fashion claims, material facts or false celebrity endorsements.

## 6. Image optimization and performance

- Convert originals to AVIF/WebP derivatives.
- Supply width/height or aspect ratio to prevent CLS.
- Use responsive srcset/sizes.
- Preload only the true primary LCP image.
- Lazy-load below-the-fold images.
- Avoid loading full-resolution images into thumbnail grids.
- Strip unnecessary EXIF metadata, especially location metadata.
- Set cache policy based on asset versioning.
- Keep product images separate from private payment proof/customer uploads.

## 7. Brand copy voice

- Confident, minimal, contemporary and helpful.
- Product copy should identify real fabric, fit, size, color and care information.
- Avoid exaggerated claims, fake scarcity or invented stock/sales.
- CTA language: “Explore”, “Shop Collection”, “Select Size”, “Add to Cart”, “View Details”.
- Order/payment messages should be direct and reassuring.
- Marketing emails should explain why the customer received them and provide preference/unsubscribe links.

## 8. Required owner-supplied inputs

- Final logo/wordmark and icon.
- Font approval/licensing.
- Campaign photography.
- Product photos and verified descriptions.
- Size chart and measurement units.
- Actual fabric/material/care details.
- Brand story.
- Article authors and final editorial copy.
- Policy text and business/legal invoice details.
- Image licensing/source records.

No placeholder content may be mistaken for approved production copy.

## 9. High-resolution gallery and zoom asset requirements

For every product gallery image, define a corresponding high-resolution zoom source where one exists. The source must match the exact image and selected variant.

- Display image: responsive AVIF/WebP derivative for normal gallery viewing.
- Zoom image: higher-resolution derivative with enough real pixel detail for the planned 2×–3× inspection.
- Keep the gallery item ID stable and map `zoomSrc` to that exact item ID.
- Include fabric/stitching/texture close-ups as separate gallery images when the product photography provides them.
- Do not use AI upscaling to imply genuine stitching/fabric detail that the original photo does not contain.
- Strip unnecessary EXIF/location data.
- Load the active zoom source on inspection intent; lazy-load the other gallery zoom assets.
- If there is no suitable zoom source, use a standard lightbox and avoid showing a magnifier that produces a blurry crop.

An admin/media workflow should allow the owner to select the primary image, reorder images, assign the correct variant, set alt text and associate each zoom asset. Preview the magnifier crop before publication.

## 10. Motion asset considerations

- Avoid animated GIFs for product photography; use optimized still images or carefully compressed video only where justified.
- Product hover alternate image must be a real product image, not an invented generated variant.
- Keep image dimensions and aspect ratio reserved to prevent layout shifts.
- Provide mobile crops for hero banners; motion must not move important product text outside the safe area.



## 11. Hero video production checklist

- Film real products worn/presented by a model; do not rely on a generic animation that does not match the catalog SKU.
- Suggested creative length is 6–10 seconds with a clean loop; not every slide needs video.
- Capture a still poster that communicates the same product/campaign when video cannot play.
- Keep the model/product focal point safe for desktop and mobile crops.
- No audio track, voiceover or music is required in the homepage hero.
- Use restrained movement: natural turn, fabric movement or a short walk; avoid rapid cuts and flashing.
- Optimize the video rendition separately from the poster; exact codec, bitrate and file-size budgets are finalized and measured during implementation/QA.
- Provide an image-only fallback for data saver, reduced motion, unsupported playback and media failure.

## 12. 360° Spin capture assets

- Preferred source is one complete real rotation capture with a fixed camera, consistent lighting, framing and product display.
- Alternatively supply an ordered sequence of real frames at consistent angular intervals.
- Suggested output presets are 24, 36 and 72 frames; 36 is the proposed default balance.
- Four to ten sparse still images remain useful gallery angles but are not sufficient for a truthful smooth full rotation without inventing unseen views.
- Every spin must be associated with the exact product and, where appearance differs, the exact color/variant.
- Human approval is required after inspecting continuity, blur, duplicate frames, crop, lighting and product shape.
- A frame-sequence spin is not a geometry-based 3D asset. Any later GLB/glTF model has separate modelling, materials, optimization and fallback requirements.
- See [Hero Video Campaign and 360° Spin Builder](HERO_VIDEO_AND_360_SPIN_BUILDER_SPEC.md).

## 13. Additional vector review boards

- [Customer discovery and Journal](design-assets/CUSTOMER_DISCOVERY_AND_JOURNAL.svg)
- [Order confirmation and A4 invoice](design-assets/ORDER_CONFIRMATION_AND_INVOICE.svg)
- [Journal, Offers and Support pages](design-assets/JOURNAL_OFFERS_SUPPORT_PAGES.svg)
- [Admin hero campaign and 360° Spin Builder](design-assets/ADMIN_HERO_CAMPAIGN_AND_SPIN_BUILDER.svg)
- [Inventory and sold-out states](design-assets/INVENTORY_STOCK_STATES.svg)
- [Responsive and state coverage](design-assets/RESPONSIVE_AND_STATE_COVERAGE.svg)
