# Naffeez — Product Studio Room and Selective 3D Visual Specification

**Document ID:** NAF-P3-STUDIO-001  
**Version:** 1.0  
**Status:** Design proposal; 3D assets and interactive rendering remain implementation-dependent

## 1. Experience goal

When the customer clicks a product, the product detail should feel like entering a premium Naffeez studio—not simply opening a plain catalog record. The room/stage creates an editorial atmosphere while the product and buying controls remain immediately understandable.

The Studio must not delay shopping or require WebGL.

## 2. Studio visual composition

### Stage concept
- Minimal monochrome photo studio.
- Matte off-white or deep charcoal cyclorama depending on theme and product image.
- Soft overhead/key light and subtle floor shadow.
- Clean vertical/horizontal planes with gentle perspective.
- Restrained silver highlights for UI detail, not colored neon.
- Garment/product remains the visual focus.
- Background objects are minimal and never compete with silhouette or fabric texture.

### Desktop layout
- Left/center stage: 60–64% of content width.
- Right details panel: 36–40%, sticky within product content.
- Gallery thumbnails in a compact vertical rail or bottom strip.
- Floating previous/next/zoom controls use restrained glass.
- Details panel uses solid readable surface, not heavy blur.
- At wide viewport, allow breathing room but keep purchase actions visible.

### Mobile layout
- Stage occupies top section with swipe gallery.
- Product title/price follows.
- Variant/size controls appear before purchase CTA.
- Sticky Add to Cart bar after options are selected.
- No full 3D room if performance or viewport cannot support it.
- A user can reach size guide and delivery details with one clear tap.

## 3. Three progressive experience levels

### Level 1 — MVP studio presentation
- High-quality product gallery.
- Neutral studio background baked into photography or simple CSS backdrop.
- Subtle image transition and parallax only if it remains accessible.
- Size/color selection, stock, quantity and checkout.
- No required GLB asset.

### Level 2 — Selective 3D product viewer
- Only for selected products that have approved optimized GLB/GLTF files.
- Explicit “3D View” toggle/button.
- Load model only after click/viewport visibility.
- Provide rotate/zoom/reset controls and a static image fallback.
- Avoid downloading Three.js/model files on homepage/product cards.
- Display model loading and unsupported-device states.

### Level 3 — Future virtual showroom
- Optional navigable studio environment or collection showroom.
- Separate route/entry point, not default checkout path.
- Evaluate mobile GPU, memory, battery and network impact.
- Must not block product text, variant selection or purchase.

## 4. Asset requirements

For a 3D-enabled product:
- GLB/GLTF optimized and compressed.
- Correct scale/orientation and origin/pivot.
- PBR materials with compressed texture maps.
- Mesh complexity appropriate for target devices.
- Preview images from same product variant.
- Asset version and fallback media stored in product media metadata.
- Admin upload validation and preview before publishing.
- License/provenance recorded for any commissioned/third-party model.

Do not expect an apparel model automatically from ordinary product photos; 3D assets require creation or a vendor/modeling workflow.

## 5. Performance budget proposal

Targets to validate through prototype:
- Default product page contains no 3D runtime until user activates it.
- Initial product image prioritized; secondary images lazy-loaded.
- GLB model size target initially under 5 MB where feasible; larger models require explicit approval and compression.
- Load 3D in a separate chunk.
- Limit texture dimensions and material count according to model requirements.
- Provide a timeout and static fallback.
- Stop rendering when tab/scene is hidden where supported.
- Avoid complex physics and real-time cloth simulation in MVP.

These are design targets, not measured results.

## 6. Interaction behavior

- Enter Studio: brief transition only; preserve direct URL navigation.
- Gallery: next/previous, thumbnails, swipe and zoom.
- 3D View: explicit activation, rotate/zoom/reset, exit to image view.
- Variant selection: selected color may change gallery/model if variant-specific asset exists.
- Stock/size controls stay outside the canvas and remain accessible to screen readers.
- Add to Cart remains available even if 3D asset fails.
- Reduced-motion disables parallax/animated camera transitions.

## 7. Failure and fallback states

- 3D unsupported: show normal gallery with no warning unless user explicitly requested 3D.
- Model missing: hide 3D toggle.
- Model load fails: explain briefly and switch to photos.
- Slow connection: user may cancel model loading.
- Asset mismatch: prevent publishing model until variant association reviewed.
- Mobile memory pressure: prefer image mode.
- Accessibility mode/reduced motion: no forced camera movement.

## 8. Acceptance criteria

- Product Studio is useful without WebGL.
- 3D is never downloaded from normal product cards.
- Product purchase controls do not depend on 3D state.
- Only products with approved assets show the 3D toggle.
- Every 3D failure has a static gallery fallback.
- Desktop and mobile layouts tested before enabling 3D publicly.
