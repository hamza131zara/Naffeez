# Naffeez — Responsive Layout Refinement Checklist

**Document ID:** NAF-P4-RESP-001  
**Version:** 1.0  
**Status:** Accepted design feedback; scheduled as an explicit Phase 4 implementation and browser-QA workstream  
**Source review:** Owner review of `Homepage Desktop` screenshot on 2026-11-28

## 1. Design decision

The owner accepts the existing Naffeez visual direction, component styling and Light/Dark theme treatments. The current screenshot feedback is about **responsive layout and spacing**, not a request to redesign the visual identity.

Keep the approved design language:
- Monochrome Editorial + Functional Glassmorphism + Selective 3D.
- Space Grotesk headings and Inter body/UI typography.
- Existing component appearance, product-card states, hero-media direction and theme palettes.
- The two accepted motion styles: restrained section text reveal and circular image-mask reveal.

Do not use responsiveness work as a reason to change the approved aesthetic. Correct container sizing, spacing, alignment, wrapping, image proportions and breakpoint behavior.

The owner is comfortable handling these refinements during development. Therefore, they do not block the visual-direction decision; they remain a required Phase 4 implementation and responsive QA acceptance gate.

## 2. Issues observed in the supplied homepage preview

The owner identified:
- Brand/wordmark and logo-section padding/alignment needs refinement.
- Desktop header/navigation elements appear too compressed.
- Hero width and left/right column proportions need correction.
- Other homepage sections do not appear to share consistent container insets/widths.
- Category/product cards and footer need their own responsive sizing rather than being scaled down as one desktop composition.

The attached screenshot is a compact preview of the desktop artboard. Use the actual viewport dimensions in browser testing; do not treat the screenshot's displayed pixel width as the original Figma frame width.

## 3. Shared container and spacing system

Implement one shared responsive container token for homepage, catalog, Product Studio, Journal, customer pages and admin shells. Avoid independent arbitrary left/right padding on each section.

Recommended target values:

| Viewport | Page gutter | Section vertical gap |
|---|---:|---:|
| 1440px and wider | 40–48px; content max 1360px | 64–88px |
| 1024–1439px | 32px | 56–72px |
| 768–1023px | 24px | 48–64px |
| 375–767px | 20px | 36–48px |
| 320–374px | 16px | 32–40px |

- Use a centered max-width content container (target 1360px for the main desktop shell).
- Make every main section align to the same container edges unless an explicitly full-bleed media section is approved.
- Use consistent spacing tokens and CSS `clamp()` only where intermediate sizing is predictable.
- Do not set arbitrary `width: 100vw` on padded content; prefer `width: 100%` to prevent scrollbar-induced horizontal overflow.
- Images and cards must reserve aspect ratio/dimensions before loading to prevent layout shift.

## 4. Header, wordmark and footer

### Desktop (1024px+)
- Header is a balanced row: brand / navigation / utilities.
- Keep the wordmark at its natural width. It must never wrap, split or become compressed.
- Reserve stable space for search, account, wishlist and bag icons.
- Navigation gaps and horizontal padding must remain readable; collapse navigation before it collides with utilities.

### Tablet and mobile (below 1024px)
- Switch to a compact menu pattern before navigation labels wrap.
- Use a single-line wordmark with `white-space: nowrap`, `flex-shrink: 0` and a stable minimum/intrinsic width.
- Keep utility icons inside a non-wrapping action group with adequate touch targets.
- Do not scale the full desktop navigation down until labels become illegible.
- Footer brand lockup must retain its intended single-line or approved stacked mark; prevent accidental letter/word wrapping (the screenshot's footer wordmark appears compressed/wrapped).

Acceptance:
- No logo split/wrap at 320px and above.
- No nav collisions, off-screen utilities or clipped menu items.
- Header height/padding is consistent with the chosen breakpoint.

## 5. Homepage hero

### Desktop
- Hero spans the shared content container, not a narrower accidental inner frame.
- Maintain a two-column editorial composition: copy on the left and campaign media on the right.
- Target starting proportion: approximately 42% copy / 58% media, with a deliberate gap and minimum column widths.
- Keep media crop/focal point intact; never stretch the model/product image.
- Headline width and CTA group must have a readable maximum line length and stable alignment.

### Tablet and mobile
- At tablet widths where both columns become cramped, switch to a stacked layout rather than squeezing the two desktop columns.
- On mobile, use a clear copy/media sequence, readable heading size and a full-width primary CTA where appropriate.
- Set a deliberate image aspect ratio and focal position for each breakpoint.
- Never allow the hero media to push the headline off-screen or overlap the header.
- Keep the poster visible while optional video loads; video failure must not change hero geometry.

Acceptance:
- Hero has consistent left/right edges with the homepage content container.
- At no viewport does the image swallow the copy or collapse into a narrow sliver.
- The heading, description and CTA remain readable and usable without horizontal scrolling.

## 6. Homepage section containers

Apply the same content container to:
- trust/benefit strip;
- category tiles;
- selected/trending product cards;
- Product Studio feature;
- Journal teaser;
- newsletter and footer content.

Rules:
- Remove per-section width/padding overrides that produce inconsistent left edges.
- Category layout: five tiles only at roomy desktop; reduce columns at smaller widths, then use a two-column or swipeable tile pattern on mobile.
- Product layout: four columns on wide desktop, reduce to three on narrower desktop/tablet, and two on mobile where card content remains readable.
- At 320px, retain two columns only if image, title, price and actions remain usable; otherwise switch to one column rather than allowing clipped controls.
- Keep card gutters consistent. Titles may use a controlled two-line clamp but must not overlap price or action controls.
- Footer columns stack in a sensible order; brand width is protected and links do not overflow.

## 7. Product Studio

- Wide desktop retains the approved image-first 60–64% gallery / 36–40% details composition.
- At intermediate desktop/tablet widths, reduce the gap and use a balanced split only while both gallery and purchase panel keep usable minimum widths.
- When two columns become cramped, stack gallery above details; do not shrink the main garment image excessively.
- Gallery thumbnails, zoom controls and detail labels remain inside the image stage and do not overlap the garment.
- Variant controls wrap intentionally and preserve selected/sold-out labels.
- Mobile uses swipeable/tappable gallery, visible zoom controls, stacked details and an accessible purchase action.
- Sticky purchase bar must not cover size controls, content, keyboard focus or the browser's safe-area inset.
- 360° viewer (when later added) remains lazy-loaded and cannot change the base gallery layout.

## 8. Catalog, cart, checkout and customer screens

- Catalog filter sidebar becomes a toolbar/drawer before it squeezes the product grid.
- Cart line items stack image/details/quantity controls cleanly on mobile; summary and CTA remain visible.
- Checkout becomes a single-column flow on mobile. Avoid sticky elements that cover fields or the software keyboard.
- Order confirmation and invoice remain readable; invoice print view uses its own A4 layout, not the responsive storefront shell.
- Account, order timeline and notification cards stack vertically; no tiny desktop dashboard squeezed to phone width.
- Quick View becomes a full-height or near-full-height mobile dialog with close control and safe-area handling.
- Wishlist and Compare keep actions accessible on touch; no hover-only interaction.

## 9. Admin responsiveness

- Admin uses a responsive navigation drawer/compact sidebar on tablet and mobile.
- Dense desktop tables convert to row cards or carefully controlled horizontal scrolling with the primary identity/status visible.
- Payment verification, order state and inventory adjustments must not be hidden behind hover.
- Form fields become single-column where needed; labels and validation errors remain visible.
- Dangerous/sensitive actions require confirmation and must remain reachable by keyboard/touch.

## 10. Breakpoint and browser test matrix

Use the existing intended breakpoints:
- 320–374px small mobile;
- 375–767px mobile;
- 768–1023px tablet;
- 1024–1439px desktop;
- 1440px and wider wide desktop.

At minimum verify representative widths: 320, 360, 390, 430, 768, 820, 1024, 1280, 1440 and 1920px.

Test:
- Chrome/Edge desktop and Android-sized emulation;
- Safari/iOS behavior where available;
- keyboard-only navigation and focus order;
- browser zoom at 200%;
- long product titles, large prices, unavailable variants and empty/error states;
- slow image/video loading and media failure;
- Light, Dark and System theme without page reload or a flash of the wrong theme;
- reduced-motion preference and disabled autoplay.

## 11. Responsive acceptance criteria

- [ ] Shared container controls all main public page sections.
- [ ] Logo/wordmark never wraps or compresses at any supported width.
- [ ] Header navigation changes mode before collisions occur.
- [ ] Hero columns retain intended hierarchy on desktop and stack cleanly where needed.
- [ ] Category/product/Journal/footer sections share aligned container edges.
- [ ] No horizontal page overflow, clipped buttons, overlapped text or broken footer columns.
- [ ] Product Studio gallery and purchase panel remain usable on tablet/mobile.
- [ ] Cart and checkout remain fully usable with on-screen keyboard visible.
- [ ] Admin tables/forms are usable on tablet/mobile.
- [ ] Both Light and Dark themes pass the same viewport matrix.
- [ ] Motion styles retain reduced-motion and static fallbacks.
- [ ] Screenshot/browser QA is recorded for all five viewport bands.

## 12. Phase placement

This work is assigned to **Phase 4 — MVP Development**, with final verification in **Phase 5 — QA, Security, Accessibility and Performance**.

Phase 3 has the approved visual direction, theme direction and motion styles. The current desktop screenshot's spacing/container problems are not silently declared fixed. Implement the layout refinements during Phase 4, then use the acceptance criteria in this document as the responsive QA gate before MVP release.
