# Naffeez — Motion, Hover, Scroll and Product Image Inspection Specification

**Document ID:** NAF-P3-MOTION-001  
**Version:** 1.0  
**Status:** Phase 3 design requirement — owner review  
**Applies to:** Storefront, Product Studio, customer account and admin where appropriate  
**Depends on:** Design System and Theme, Website Template Specification, Component Library, Product Studio Visual Specification

## 1. Experience objective

Naffeez should feel responsive, polished and premium through restrained motion. Animation should help customers understand focus, navigation, image detail and successful actions. It must never delay shopping, hide content, cause layout shifts, reduce readability or make the site feel like a motion demo.

Motion principles:
1. Fast feedback for direct input.
2. Calm, smooth movement for page/section transitions.
3. Product photography receives subtle attention, never exaggerated distortion.
4. Scroll animation supports both downward and upward reading.
5. All actions remain usable without hover, animation or pointer precision.
6. Reduced-motion preferences are respected.
7. Motion must be inexpensive and should not require a heavy animation runtime for basic storefront behavior.

## 2. Motion tokens

These are initial design tokens. Final timings should be tuned against a browser prototype.

| Token | Initial value | Use |
|---|---:|---|
| `--motion-instant` | 100ms | Press/focus feedback |
| `--motion-fast` | 150ms | Button/icon/card hover |
| `--motion-standard` | 220ms | Image crossfade, menu states |
| `--motion-enter` | 360ms | Dialog/drawer and section reveal |
| `--motion-editorial` | 500ms | Large image reveal or hero transition |
| `--ease-standard` | cubic-bezier(0.2, 0.7, 0.2, 1) | General UI |
| `--ease-enter` | cubic-bezier(0.16, 1, 0.3, 1) | Enter/reveal |
| `--ease-exit` | cubic-bezier(0.4, 0, 1, 1) | Exit |
| `--lift-subtle` | 2px | Product card/button hover |
| `--image-scale-hover` | 1.025–1.04 | Product card image hover |
| `--reveal-distance` | 12–20px | Scroll reveal |

Do not animate every CSS property. Prefer transform and opacity. Avoid animating layout dimensions, top/left, large blur radii or box-shadow on many elements simultaneously.

## 3. Button and control micro-interactions

| Component | Hover (pointer devices) | Press/click | Focus | Loading/disabled |
|---|---|---|---|---|
| Primary button | Slight tonal/brightness shift; optional 1–2px lift | Scale to ~0.98 for 80–120ms; clear active state | High-contrast visible ring | Spinner and stable width; disabled has no hover/lift |
| Secondary/outline button | Background softly fills; border contrast increases | Same subtle press response | Visible ring | Muted, non-interactive |
| Text/quiet button | Underline or text-color transition | Immediate feedback | Visible ring | No motion while disabled |
| Icon button | Neutral surface appears; icon subtly changes opacity | Brief 0.96 scale | Ring and accessible label | Tooltip does not replace accessible name |
| Wishlist heart | Color/fill transition and small 1.05–1.1 pop | One short pop only | Focus ring | No repeated pulse |
| Cart action | Label/icon feedback; optional tiny cart icon nudge | Button locks to prevent duplicate submission | Focus ring | Loading label/spinner without width shift |
| Filter chips | Background/border transition | Removal/check state feedback | Focus ring | Keep selected state visible |
| Quantity stepper | Soft surface feedback | Immediate number update | Focus ring | Disable +/- at limits |
| Theme switch | Icon crossfade/rotation limited to subtle 150–200ms | Theme changes without page reload | Focus ring | No animation under reduced motion |

### Rules
- Primary CTA is visually strong in idle state; don't make hover the only time it becomes visible.
- Do not use a large bounce, elastic stretch, cursor trail or glow.
- Avoid changing button width when text changes to “Added”.
- On touch devices, provide pressed/selected feedback rather than hover emulation.
- Success feedback should be one short toast/status message; do not make the button animate indefinitely.

## 4. Product card hover and image preview

### Default card
- Image uses a consistent 3:4 crop.
- Product name and current PKR price remain visible.
- Actions are discoverable: Wishlist, Compare, Quick View and Select Options.
- No motion is required to understand the card.

### Desktop hover/focus sequence
1. Card rises no more than 2–3px with a subtle border/shadow change.
2. Main image scales gently to 1.025–1.04 inside an overflow-hidden frame.
3. If a secondary image exists, crossfade to it over 180–240ms.
4. Wishlist/Compare/Quick View controls fade in with a short 100–160ms stagger.
5. Select Options appears or gains emphasis without moving card layout.
6. Moving pointer away reverses the transition smoothly.
7. Keyboard focus triggers the same discoverable actions; hover is not the only access path.

### Mobile/touch behavior
- Do not wait for hover.
- Keep essential Wishlist and Quick View/Select Options actions visible or reveal them through a clearly labelled action control.
- Tapping the image/title opens Product Studio.
- Avoid first tap being consumed only to simulate hover.

### Product card limitations
- Do not zoom the entire card or crop out the garment.
- Do not show a second image if it is identical or not available.
- Do not animate prices, stock numbers or sale values.
- Respect reduced motion by removing image scale and using a simple state change.

## 5. Scroll-driven and scroll-triggered animations

### 5.1 Direction-aware section reveal
When a section enters the viewport:
- Scrolling down: reveal from a small Y offset (12–20px) with opacity 0→1.
- Scrolling up: reveal from a similarly small reverse offset or restore the natural layout; do not force all content to replay a long entrance.
- Use 280–420ms duration for major sections; 160–240ms for small cards/controls.
- Trigger near 10–20% viewport visibility, adjusted per layout.
- For product grids, stagger only the first visible row or use a very small stagger (30–50ms); do not animate every card sequentially on long pages.
- Do not make text wait for a large image animation before it becomes readable.

### 5.2 Re-entry behavior
- Short sections may reveal again when re-entered from the opposite direction if it remains smooth.
- Long product grids should animate once per page visit or only the newly entering row; do not repeatedly animate the entire grid while the user scrolls up and down.
- Content remains visible if IntersectionObserver or JavaScript is unavailable.
- Never set essential content to opacity:0 in a way that hides it permanently when scripts fail.

### 5.3 Editorial image reveal
- Use a subtle clip/scale reveal for large hero/editorial imagery.
- Keep focal subject and copy readable throughout.
- No aggressive parallax. If parallax is used, limit displacement to a small fraction of viewport movement and disable for reduced-motion.
- Avoid pinning several sections; standard scroll remains the default.

### 5.4 Header behavior
- At page top, header can sit transparently over the hero if contrast is adequate.
- After the hero/top threshold, header transitions to solid or restrained glass surface.
- Optional hide-on-down/show-on-up: hide only after a small downward threshold and reveal promptly on upward intent.
- Never hide while search, navigation, cart, account or another modal/drawer is open.
- Do not hide when focus is inside header controls or when a user is typing.
- On checkout and admin workflows, prefer a stable visible header rather than directional hiding.
- Avoid jitter from trackpad micro-scroll; use direction threshold and hysteresis.

### 5.5 Scroll progress and back-to-top
- Optional thin page-progress indicator may appear on long Journal articles only.
- Back-to-top control appears only after meaningful scroll distance, remains unobtrusive and supports reduced motion.
- Smooth-scroll must respect reduced-motion; never hijack natural wheel/touch scrolling.

## 6. Product Studio image gallery — universal zoom requirement

**Critical requirement:** cursor zoom/texture inspection must work on every image in every product's gallery, not only the primary image.

Every gallery item must support the same inspection behavior:
- main/front image;
- alternate angle;
- back image;
- side view;
- fabric/texture close-up;
- stitching/seam/collar/cuff/zipper/button/detail image;
- variant-specific gallery image where available.

The active gallery index determines both the visible source and the matching high-resolution zoom source. Switching thumbnails must never leave the previous image's zoom crop active.

### 6.1 Required media model per gallery image
Each gallery item should support:
- `id` (stable unique media ID);
- `src` (optimized display image);
- `zoomSrc` (higher-resolution image or image-pyramid source for magnification);
- `alt` (descriptive accessible text);
- `width` and `height` or reliable aspect ratio;
- `sortOrder`;
- optional `variantId`;
- optional `detailLabel` (e.g. “Fabric texture”, “Stitching detail”, “Back view”);
- optional admin-defined `inspectionRegion` metadata only when a real close-up region is intentionally authored.

The zoom source must correspond to the exact gallery image and selected variant. Do not use a generic product hero as the zoom source for every thumbnail. If a high-resolution source is missing, fall back to standard click-to-enlarge; do not invent texture detail with AI or sharpen a low-resolution image deceptively.

### 6.2 Desktop cursor magnifier
On hover/focus over the active gallery image:
1. Show a magnifying cursor or clearly labelled “Inspect details” affordance.
2. Display a lens overlay (initial design target: 150–200px diameter or square).
3. Move the lens with pointer coordinates, clamped to image bounds.
4. Render a corresponding crop from that image's own `zoomSrc`.
5. Initial zoom range target: 2×–3×; exact multiplier tuned to source resolution and visual clarity.
6. Keep the cursor/lens out of the way of critical product information where possible.
7. Provide a visible zoom reset/close control when zoom is pinned.
8. On pointer exit, close the transient lens smoothly; do not leave stale magnification.
9. On thumbnail change, reset lens coordinates and bind the newly active `zoomSrc`.
10. Keep keyboard focus path available through a separate “Zoom image” control.

### 6.3 Pinned detail preview mode
For customers who want more time inspecting:
- Clicking the image or “Inspect details” opens a larger zoom viewer/lightbox.
- The viewer shows the current gallery image at high resolution.
- Provide zoom in, zoom out, reset and close controls.
- Optional side-by-side small detail navigator may show the region being inspected.
- Previous/next gallery controls stay available, and zoom state resets or rebinds correctly on navigation.
- Escape closes; focus returns to the gallery control.
- Clicking outside may close only if it does not cause accidental loss of a zoom/pan interaction.

### 6.4 Touch and mobile behavior
Hover does not exist on touch screens, so equivalent behavior is required:
1. Tapping a gallery image opens the zoom viewer.
2. Pinch-to-zoom and drag/pan are supported where device/browser allows.
3. Provide explicit plus, minus and reset buttons as non-gesture alternatives.
4. Double-tap may toggle a sensible zoom level, but cannot be the only zoom method.
5. Swipe between gallery images when not zoomed.
6. When zoomed beyond 1×, drag pans the active image; a clearly labelled close/back control exits zoom.
7. Avoid conflicts between vertical page scroll, horizontal gallery swipe and image pan. At high zoom, image pan takes priority within the zoom viewer.
8. Keep alt text, image index (e.g. “Image 3 of 7”) and zoom state available to assistive technology.

### 6.5 Gallery controls
- Thumbnail selection visibly marks the active item.
- Previous/next buttons work with keyboard and touch.
- Thumbnail rail scrolls to keep the active image visible.
- Every thumbnail opens its own image and corresponding zoom source.
- If a variant changes, update the gallery set to that variant and reset current zoom.
- If an image fails to load, show a neutral placeholder and disable zoom for that item.
- Do not show a zoom affordance if the image is too small to provide meaningful magnification.

### 6.6 Detail markers / hotspots
Optional future enhancement:
- Admin may define a small number of actual image-coordinate hotspots such as “Fabric”, “Stitching”, “Button detail” or “Cuff finish”.
- Hotspots must be anchored to the correct image ID and variant.
- Labels must describe the real image content; don't show “Premium stitching” unless the garment really has that attribute and the owner has verified it.
- Hotspots are supplementary; the cursor magnifier and click zoom work without them.

## 7. Gallery image loading and performance

- Load the active display image with appropriate priority.
- Load its high-resolution zoom asset only on pointer intent, focus intent or viewer activation where feasible.
- Preload only the adjacent gallery image at low priority when it materially improves navigation.
- Lazy-load non-active zoom sources.
- Use responsive AVIF/WebP display sources and a zoom source with adequate pixel dimensions.
- Consider tiled/image-pyramid zoom only if real image resolution/size makes single-file downloads too expensive.
- Reserve stage dimensions to prevent layout shift.
- Cancel stale zoom requests when the active image changes.
- Cache image variants through immutable versioned asset URLs.
- Keep zoom logic isolated from 3D logic; users must be able to inspect photos with WebGL disabled.
- Measure mobile bandwidth and memory; do not download every high-resolution gallery image on initial product view.

## 8. Accessibility and reduced motion

- Every zoom function is available by keyboard through visible controls.
- Use descriptive accessible labels: “Zoom in on [image description]”, “Zoom out”, “Reset zoom”, “Close image viewer”.
- Keep visible focus indicators in both themes.
- Announce gallery index and active image changes without excessive live-region chatter.
- Do not require precise pointer movement to discover or use zoom.
- Reduced-motion setting disables parallax, large scale movement and animated scroll reveals; use immediate state changes or a brief opacity transition.
- Provide a static gallery fallback if JavaScript, pointer events, WebGL or motion APIs are unavailable.
- Respect browser zoom and high-contrast settings.

## 9. Motion and image inspection failure states

| Scenario | Required behavior |
|---|---|
| Reduced motion enabled | Disable parallax/scale/scroll choreography; preserve immediate UI feedback |
| Touch screen | Tap-to-zoom, pinch/pan and explicit controls |
| No high-resolution image | Standard lightbox/fit-to-screen; explain zoom is limited only if necessary |
| Zoom source fails | Keep normal gallery working; show safe retry |
| Gallery image changes | Reset old lens state and use new image's zoom source |
| Variant changes | Rebind gallery to selected variant and clear stale zoom |
| Very slow network | Keep product details/actions usable; show loading and cancel/retry |
| JavaScript disabled/fails | Static gallery images remain visible |
| 3D unsupported | Continue with photo gallery and zoom |
| Focus enters controls | Do not hide navigation or remove focus target |

## 10. Implementation guidance for Phase 4

- Prefer CSS transitions/transforms for button/card micro-interactions.
- Use IntersectionObserver or an equivalent lightweight viewport trigger for section reveals; content must remain visible without script.
- Use passive/efficient scroll direction tracking if directional header behavior is implemented; do not continuously measure layout on every scroll frame.
- Use pointer coordinates relative to the rendered image and map them to the corresponding high-resolution image coordinate space.
- Use pointer capture only where needed for pinned/drag behavior.
- Avoid installing a large motion library solely for hover transitions. If a motion library is already approved, use it selectively and code-split where possible.
- Keep image magnification as an isolated ProductGallery feature with a clearly typed gallery-item media contract.
- Do not couple zoom implementation to Three.js/React Three Fiber.
- Write component tests for image-index/source mapping, active thumbnail changes, variant changes, zoom reset, keyboard controls and touch behavior.

## 11. Acceptance test matrix

- [ ] Product card hover subtly lifts and image scales without layout shift.
- [ ] Secondary image crossfades only when a real alternate exists.
- [ ] Product actions are available on keyboard and touch.
- [ ] Buttons show immediate hover, focus, press, loading and disabled states.
- [ ] Homepage and long-page sections reveal smoothly when scrolling down.
- [ ] Scrolling upward does not replay every animation or produce flicker.
- [ ] Header switches surface on scroll without jitter and respects open menus/focus.
- [ ] Reduced-motion preference removes nonessential movement.
- [ ] Gallery image 1 has cursor zoom using image 1's high-resolution source.
- [ ] Gallery image 2 has cursor zoom using image 2's high-resolution source.
- [ ] Every remaining gallery image has the same tested zoom behavior.
- [ ] Zoom crop always matches selected thumbnail and variant.
- [ ] Fabric/stitching detail images can be magnified clearly when high-resolution source exists.
- [ ] No-high-resolution fallback works.
- [ ] Touch tap/pinch/drag and explicit zoom controls work.
- [ ] Keyboard zoom, reset and close work.
- [ ] Zoom does not require WebGL/3D.
- [ ] Initial product page does not download all gallery zoom assets.
- [ ] No image/zoom state causes layout shift or blocks Add to Cart.
