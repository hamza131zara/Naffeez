# Naffeez — Hero Video Campaign and 360° Spin Builder Specification

**Document ID:** NAF-P3-MEDIA-001  
**Version:** 1.0  
**Status:** Proposed Phase 3 visual/operational design; owner review pending  
**Scope:** Homepage hero campaign media and optional product-specific photograph-sequence spin viewer

## 1. Purpose and design boundary

This document defines two separate media experiences:

1. **Homepage hero campaign:** three editorial campaign slides using real Naffeez product photography and optional short, muted video.
2. **Naffeez 360° Spin Builder:** a protected admin workflow that turns a genuine full-rotation capture into an optimized image-sequence spin for one product/variant.

The two experiences must not be conflated. A short hero video is a campaign/brand presentation. A 360° spin is an interactive product-viewing asset. Neither replaces the standard product gallery or the Product Studio's per-image zoom.

This is a design proposal for Phase 3. It does not introduce application code, a video-processing service, a GLB viewer or an AI image-generation pipeline.

## 2. Homepage hero — visual composition

### 2.1 Desktop layout

- Keep the editorial copy and primary CTA in the left column.
- Use the right column as a large campaign-media stage featuring a real model wearing a real Naffeez product.
- Use a model/product photograph as the poster and fallback.
- Optional floating detail label or “Explore this look” link is allowed, but do not clutter the image with multiple product cards, 3D controls or animated decorative objects.
- Maintain a readable contrast scrim based on the media focal point.
- The media stage is cropped responsively without distorting the garment/model.

### 2.2 Three-slide campaign concept

Initial creative direction is three slides, configurable by the admin and not hard-coded to a fixed set of products:

| Example slide | Visual direction | Product/content binding |
|---|---|---|
| 01 — Shirt edit | Model wearing a launch shirt; subtle movement or fabric motion | Admin-selected published shirt/collection |
| 02 — Trouser edit | Model showing fit, silhouette and drape | Admin-selected published trouser/collection |
| 03 — Winter edit | Model wearing a launch hoodie or seasonal layer | Admin-selected published product/collection |

The actual product, title, copy, poster, optional video, CTA and destination are all admin-managed. Do not label a product “top seller” unless the data or owner-curated collection supports that label.

### 2.3 Mobile layout

- Stack the text and media stage with the CTA easy to reach.
- Provide a mobile-specific poster/crop where the desktop focal point would be lost.
- Use a smaller mobile video rendition only where it remains within the approved media budget.
- Static poster is the default fallback on data-saving, reduced-motion or constrained playback conditions.
- Do not force a landscape desktop video crop into a narrow mobile viewport.

## 3. Hero media behavior

Each slide may use a poster image only or a poster plus optional video.

**Suggested editorial clip length:** 6–10 seconds, designed to loop cleanly. This is a creative recommendation, not a requirement to force every slide to have video.

### Media rules

- Poster image is required, even when a video exists.
- Video is muted, inline and has no audio track or audio playback control.
- The video runs only while its slide is active and in view; pause inactive/offscreen slides.
- Load the first slide's poster at the appropriate priority. Do not download all three videos on initial page load.
- Start optional video only after the poster has rendered and the active slide is ready.
- Load subsequent slide media only when activated or immediately before the user reaches it.
- Use an optimized web video rendition with a compatible fallback (for example, WebM and MP4); exact codec/bitrate/size budgets are finalized during Phase 4 asset/hosting tests.
- Preserve intrinsic aspect ratio and dimensions to prevent layout shift.
- If autoplay is unavailable, the user has enabled reduced motion/data saving, the device is constrained, or playback fails, show the poster.
- Never display an empty media box while a source is loading or fails.
- Respect browser visibility and pause the video when the page is backgrounded.

### Carousel controls

- Manual previous/next and pagination always remain available.
- Provide an explicit pause/play control when automatic movement is enabled.
- Pause auto-advance on pointer hover, keyboard focus within the carousel, manual user interaction and reduced-motion preference.
- Do not switch slides while a user is actively interacting with a CTA or control.
- The clip's 6–10 second creative length is distinct from the carousel transition interval. The interval must not cut a clip before it has completed a meaningful view; final timing is subject to visual QA and usability testing.
- The carousel must remain usable if JavaScript or video playback fails.

## 4. Admin — Homepage Hero Campaign Manager

Route concept: `/admin/homepage/hero` (align with the final route map before implementation).

### Campaign list

Columns:
- Campaign name.
- Slide count/order.
- Draft/scheduled/published/expired status.
- Active date range (if configured).
- Media completeness (poster/video).
- Updated by and updated date.
- Actions: edit, preview, duplicate, schedule/publish, archive.

### Slide editor

Fields:
- Internal slide name (admin only).
- Eyebrow/headline/body copy.
- Primary CTA label and destination.
- Selected published product or collection (optional binding).
- Desktop poster image.
- Mobile poster image/crop where required.
- Optional 6–10 second video source.
- Focal point/crop preview for desktop and mobile.
- Display order and enabled state.
- Schedule/active date range if campaign scheduling is enabled.

### Preview and publish

- Preview desktop and mobile side by side.
- Preview poster-only and poster-plus-video fallback.
- Preview text contrast at real breakpoints.
- Validate that CTA destination exists and selected product/collection is published.
- Validate required poster, media type, size and duration constraints.
- Draft → preview → schedule/publish → archive.
- Keep a version/revision history for published campaigns or require an explicit confirmation when replacing an active slide.
- Publishing a homepage campaign does not create an email campaign or send marketing.

## 5. Naffeez 360° Spin Builder — what it creates

The first version should create a **photograph-sequence 360° spin**, not claim to create a geometry-based 3D model.

The customer sees an ordered set of real product frames and rotates through them by dragging with a mouse or swiping on touch. The browser does not interpolate or invent hidden sides of the garment.

### Source quality guidance

Preferred inputs, in order:
1. One continuous full-rotation capture video with a fixed camera, stable lighting, fixed framing and a slowly rotating mannequin/garment display.
2. An ordered set of real photographs captured at consistent angular intervals.

Suggested output presets:
- 24 frames — lighter, less granular rotation.
- 36 frames — default balance of smoothness and asset size.
- 72 frames — finer rotation with more storage and transfer cost.

**Four to ten still photographs are not enough for an accurate, smooth full 360° turn.** They can be used as ordinary gallery angles, but filling the gaps would require synthetic frame generation and could invent seams, buttons, pockets, folds, logos or fabric patterns. Do not silently publish AI-interpolated/invented views as factual product photography. Any experimental interpolation needs explicit human review and must never be represented as captured product truth.

### Admin processing workflow

1. Admin selects a published/draft product and a specific color/variant/SKU.
2. Admin chooses “Create 360° spin”.
3. Admin uploads a complete rotation video or an ordered frame set.
4. Admin selects a 24/36/72 output preset (36 is the default proposal).
5. Processing extracts/validates frames and produces an ordered preview.
6. Admin reviews the full rotation for blur, duplicate frames, missing angles, inconsistent crop, lighting shifts and garment deformation.
7. Admin may reorder/reject frames, adjust crop and regenerate.
8. Admin tests desktop drag and mobile swipe.
9. Admin approves and attaches the spin asset to the exact product/variant.
10. The public Product Studio exposes a “360° view” option only when the approved asset exists.

### Data and publishing boundaries

Each spin is associated with a product and, where colors materially differ, the exact variant/color. It stores:
- source asset reference;
- ordered output frame references;
- output count/preset;
- dimensions and thumbnail/poster;
- processing status and error details;
- review/approval actor and time;
- product/variant association;
- published/unpublished status.

The spin is published only after an authorized human approval. Asset processing failure returns the product to its standard image gallery; it never blocks purchase.

### Customer viewer behavior

- Product Studio defaults to the standard image gallery.
- A separate “360° view” control appears only when a reviewed spin is available.
- Desktop: click-drag or keyboard-accessible rotate controls.
- Mobile: swipe/drag with touch; preserve ordinary gallery swipe when 360° mode is closed.
- Provide a visible exit/back-to-gallery control.
- Load spin frames only after the customer activates the view; use a thumbnail/poster first and progressive frame loading.
- If one frame fails, keep the viewer usable with the remaining frames or fall back to the standard gallery with a clear message.
- The viewer is optional and does not replace image zoom for fabric/stitching details.

## 6. Spin viewer versus actual 3D

| Feature | Photograph-sequence spin | Actual 3D model |
|---|---|---|
| Source | Real ordered product photos or full-turn capture | Geometry plus textures/materials (e.g. GLB/glTF) |
| Rotation | Steps through captured viewpoints | Rotates a 3D scene/model |
| Can invent unseen angles? | No; only captured frames are displayed | Model may render any supported view, subject to model accuracy |
| Asset creation | Turntable/video capture and frame extraction | 3D modelling/scanning/retopology/material preparation |
| Initial recommendation | Optional later feature after core gallery is stable | Deferred advanced feature |

Do not call the first feature “interactive 3D” in product copy. Label it “360° view” or “360° photo spin”. Actual 3D geometry remains a separate future capability.

## 7. Performance and accessibility guardrails

- Hero: poster-first; only active slide media loads and plays.
- Spin: no frames are downloaded on homepage or initial Product Studio load.
- Generate responsive derivatives and keep frame dimensions consistent.
- Keep standard gallery, zoom and Add to Bag independent from video/360 modules.
- Pause media offscreen and when inactive.
- Respect `prefers-reduced-motion` and data-saving preferences with still-image fallbacks.
- Provide keyboard controls and visible focus for all carousel and spin actions.
- No audio autoplay.
- Reserve image/video dimensions to avoid layout shift.
- Measure mobile transfer size, decode time and interaction responsiveness during Phase 5.

## 8. Acceptance checklist

- [ ] Hero uses real product/campaign imagery, not decorative placeholder dots or an unrelated illustration.
- [ ] Three-slide example is configurable and content binds to published products/collections.
- [ ] Each video has a poster and a static fallback.
- [ ] Inactive/offscreen videos pause; inactive videos are not all downloaded at once.
- [ ] Reduced-motion/data-saving/constrained playback falls back to poster images.
- [ ] Hero remains functional with video and JavaScript unavailable.
- [ ] Admin can draft, preview, schedule/publish and archive hero campaigns.
- [ ] Desktop/mobile crops and copy/CTA contrast can be previewed.
- [ ] A photograph-sequence spin requires a true full-rotation capture or an ordered set of sufficient real frames.
- [ ] 4–10 stills are not silently interpolated into a factual 360° view.
- [ ] Spin output is linked to the matching product/variant and human-approved.
- [ ] 360° assets load only after explicit user activation.
- [ ] Standard Product Studio gallery and purchase actions work when video/spin assets are unavailable.
- [ ] Actual 3D model viewing remains separate from photograph-sequence spin.

## 9. Related Phase 3 sources

- [Website Template and Page Specification](WEBSITE_TEMPLATE_AND_PAGE_SPECIFICATION.md)
- [Visual Asset and Content Guide](VISUAL_ASSET_AND_CONTENT_GUIDE.md)
- [Admin Dashboard Design](ADMIN_DASHBOARD_DESIGN.md)
- [Frontend Architecture and Route Map](FRONTEND_ARCHITECTURE_AND_ROUTE_MAP.md)
- [Commerce and Admin Visual Workflow Blueprint](COMMERCE_AND_ADMIN_VISUAL_WORKFLOW_BLUEPRINT.md)
- [Studio Room and 3D Visual Specification](STUDIO_ROOM_AND_3D_VISUAL_SPEC.md)
