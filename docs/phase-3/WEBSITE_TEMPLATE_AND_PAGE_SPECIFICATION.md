# Naffeez — Website Template and Page-by-Page Design Specification

**Document ID:** NAF-P3-TEMPLATE-001  
**Version:** 1.0  
**Status:** Phase 3 design proposal for owner review  
**Depends on:** Phase 1 UI/UX baseline and Phase 2 PRD/API/architecture

## 1. Template concept

A high-end editorial fashion storefront with a clean shopping system. The same design system powers all pages, but each page uses a purpose-built layout. Homepage and product imagery carry visual impact; catalog and checkout prioritize clarity.

Global shell:
1. Optional slim announcement bar.
2. Responsive navigation.
3. Main page content.
4. Contextual support/WhatsApp action where appropriate.
5. Footer.
6. Global overlays: search, mobile menu, Quick View, cart drawer, notification/toast and confirmation dialog.

## 2. Navigation architecture

### Desktop header

- Left: Naffeez wordmark.
- Center: Shop, Collections, New Arrivals, Journal, AI Style Studio (Coming Soon only until enabled).
- Right: Search, Account, Wishlist, Compare, Cart, Theme.
- Category mega menu: Shirts → Casual Shirts/Dress Shirts; Trousers → Seasonal/Winter; Hoodies.
- Header overlays hero at top and transitions to an opaque or restrained glass surface after scroll.
- Sticky behavior must not cover anchors or page headings.

### Mobile header

- Menu icon, wordmark, Search and Cart.
- Drawer includes Shop categories, Collections, New Arrivals, Journal, Account, Wishlist, Compare, Contact and theme.
- AI Style Studio appears only when its page is enabled or visibly labelled Coming Soon.
- Avoid putting 7–8 small icons in the mobile header.

## 3. Homepage template

### Section order and design rules

| Order | Section | Layout and behavior | Primary action |
|---|---|---|---|
| 1 | Announcement | Single editable strip; optional close control only if campaign permits | Link to relevant page |
| 2 | Main navigation | Transparent over hero → solid/glass on scroll | Category navigation |
| 3 | Editorial hero | Full-width carousel, 3 slides target; high-quality campaign image/video poster, headline and one CTA | Shop Collection |
| 4 | Category shortcuts | Five launch categories, image tiles | Open category |
| 5 | Trending products | 4 desktop cards, 2 mobile columns or horizontal swipe | Product Studio |
| 6 | New Arrivals | Editorial product grid, newest published products | View New Arrivals |
| 7 | Product Studio feature | Split editorial image/text introducing immersive product detail | Explore a Product |
| 8 | Curated/Best Sellers | Admin-curated collection; don't claim popularity without data | View Collection |
| 9 | Journal | 2–3 most recent or admin-featured articles | Read Journal |
| 10 | Brand story | Campaign image and owner-approved brand copy | About Naffeez |
| 11 | Social gallery | Owner-owned/approved social imagery or official Instagram link | Visit Instagram |
| 12 | Newsletter | Clear optional subscription topic/frequency explanation | Subscribe |
| 13 | Footer | Shop, support, policies, account, social/contact | Relevant route |

### Homepage states
- No products: hide product section or show a designed owner-approved empty state.
- No articles: hide Journal preview until an article is published.
- No campaign: do not show blank announcement or empty sale section.
- Failed image: use consistent neutral fallback and preserve dimensions.
- Loading: skeletons only for data that is not server-rendered with a stable placeholder.

### Hero behavior
- Target three editorial campaign slides; admin can manage 1–5 active slides.
- Right side uses a real Naffeez campaign/product photograph as the poster and may use an optional 6–10 second muted, seamless-loop video.
- Example campaign directions: a shirt edit, a trouser edit and a winter/hoodie edit. Actual product/collection bindings and slide copy are admin-selected; do not hard-code or invent best-seller status.
- The left column retains eyebrow, headline, short copy and one primary CTA.
- Poster is required even when video is present; provide desktop/mobile crops and focal-point preview.
- Video is muted and inline, has no audio track, and plays only while its slide is active and visible.
- Load the first poster first; do not download all slide videos at initial page load. Load later media only on activation or just before needed.
- Pause inactive/offscreen video. Use the poster on data-saving, reduced-motion, constrained playback or video failure.
- Manual previous/next, pagination and pause/play controls remain available. Pause auto movement on hover, focus, manual interaction and reduced-motion preference.
- Do not transition away before a video has had a meaningful viewing opportunity. The 6–10 second clip length is separate from the carousel transition interval.
- Reserve media dimensions, use responsive optimized assets and never show an empty media stage.
- Text position and contrast scrim adapt to image focal point. No fake countdown or false “limited pieces” copy.
- See [Hero Video Campaign and 360° Spin Builder](HERO_VIDEO_AND_360_SPIN_BUILDER_SPEC.md).

## 4. Shop and category templates

### Shop All
- Breadcrumb.
- Heading and optional short editorial intro.
- Result count and sort.
- Desktop filter sidebar or horizontal filter toolbar.
- Mobile Filters button opens full-height drawer.
- Product grid with 4 columns desktop / 2 mobile.
- Active filter chips and Clear All.
- Pagination or Load More selected after API/paging tests.

### Category page
- Category title and optional category banner.
- Subcategory navigation where relevant.
- Filter options derived from in-stock/published catalog data.
- Product grid and empty state.
- SEO intro must be useful, short and unique—not copied across every category.

### Search
- Search input with keyboard focus.
- Recent searches stored locally only if useful and clearable.
- Suggested categories/products after query entry.
- Search results show query, count, sort and filters.
- No-results state suggests related categories and clear query.
- Search is debounced and cancellable; don't send a request for every keystroke.

## 5. Product cards

Card composition:
- 3:4 image.
- Optional second image on hover (desktop only).
- Top-right small icon controls: Wishlist, Compare, Quick View.
- Bottom title and PKR price.
- Optional size/color availability hint.
- Select Options CTA appears on hover/focus desktop and remains discoverable on touch devices.
- New/Sale/Best Seller badge only from valid product data/admin assignment.
- Stock state is not fabricated and must be accurate.

Interaction:
- Image/title → Product Studio route.
- Wishlist → toggle with accessible feedback and sign-in prompt only if persistence requires account.
- Compare → add/remove; maximum 4.
- Quick View → lightweight dialog.
- Select Options → open variant selection, requiring a valid variant before cart add.

## 6. Naffeez Product Studio template

The Product Studio is the defining product page. The customer should feel they entered a curated fashion studio, while retaining familiar purchase controls.

### Desktop composition
- Full content width within the store shell.
- Main visual stage: approximately 60–64% width.
- Details panel: approximately 36–40% width, sticky while scrolling within product content.
- Gallery thumbnails along a side/bottom edge.
- Large product image on a clean studio backdrop.
- Optional room-like lighting, shadows or subtle layered depth; avoid a heavy 3D environment as the default.
- Glass effect only for floating gallery controls/compact overlay.
- Right panel contains product title, price, description, color/size selection, stock, quantity, Add to Cart, Buy Now, wishlist, compare, size guide and delivery/returns information.
- Additional gallery/details/related products below.

### Mobile composition
- Image/gallery at top; swipe and tap-to-zoom.
- Details flow below image.
- Sticky bottom purchase bar appears after variant selection is possible; it must not hide inputs or system browser controls.
- Full-screen size-guide drawer/modal.
- WhatsApp enquiry remains secondary.

### Room/3D direction
For MVP design, model a studio-like visual stage with neutral floor/backdrop, soft directional shadows and controlled depth. A static image is the baseline rendering; optional GLB/GLTF product rotation can be enabled only when an optimized model exists. No 3D model is required for every SKU. If 3D fails or is not available, the standard image gallery remains complete.

### Product Studio states
- Product loading.
- Product available.
- Variant required.
- Variant unavailable/out of stock.
- Quantity at minimum/maximum.
- Added to cart success.
- Cart update failure.
- Product archived/unavailable.
- Image load failure.
- No related products.
- 3D unavailable/static fallback (future optional).

## 7. Quick View template

- Compact product image/gallery.
- Name, price and genuine sale price.
- Variant selectors and stock.
- Quantity.
- Add to Cart.
- View Full Product.
- Close button and Escape handling.
- Keep focus inside while open; restore focus to triggering card.
- If the product needs more choice/detail, route to Product Studio rather than expanding modal indefinitely.

## 8. Wishlist and Compare

### Wishlist
- Grid reuses product card component.
- Guest wishlist may persist in local/session storage.
- Sign-in can merge local wishlist to account after deduplication.
- Empty wishlist includes Shop Now CTA.
- Removing item updates count and list without full page reload.

### Compare
- Limit 4 items.
- Compare only available structured fields: price, sizes, colors, material/fit when supplied, and stock availability.
- Missing attributes show “Not provided,” not guessed.
- Mobile compare uses horizontally scrollable comparison columns with clear labels.
- No empty/fake ratings.

## 9. Cart and checkout templates

### Cart
- Product image, title, chosen variant, unit price, quantity and line total.
- Remove/save-for-later only if implemented.
- Order subtotal and shipping estimate clearly separated.
- Revalidate price and availability before checkout.
- Empty cart has Continue Shopping.

### Checkout
- Single-column form on mobile; two-column review/details on desktop.
- Contact details and delivery address.
- Order summary with item variants.
- Payment methods: COD, Easypaisa QR, Bank QR.
- QR methods show admin-configured QR/instructions, exact payable amount and order reference.
- Customer enters reference and/or proof according to approved settings.
- Clear status language: “Awaiting transfer” and “Pending verification.”
- Place Order action is guarded by server response; prevent double-click.

## 10. Order confirmation and invoice

- Confirmation page shows order number, fulfillment/payment status, summary and next step.
- COD: “Payable on Delivery.”
- QR: “Payment submitted — awaiting verification” or “Awaiting transfer.”
- Invoice button: View / Download PDF.
- Customer invoice screen shows seller details, invoice number/date, buyer/delivery details, item snapshots, totals, shipping/discount and payment status.
- Admin PDF must use the same immutable invoice snapshot.
- Invoice layout: A4 portrait, printable, strong typography, no glass surface over the document.
- Legal/tax fields appear only after owner confirms details.

## 11. Account and Journal templates

### Account
Overview, Profile, Addresses, Orders, Order Detail, Invoices, Wishlist, Notifications and Preferences.
- Account page uses a left sidebar on desktop and compact tabs/menu on mobile.
- Customer sees only own data.
- Empty order/history states include Shop CTA.

### Journal
- Listing page with featured article and article cards.
- Article detail has reading width, title, summary, cover, publication date, body, related products and related articles.
- Article templates must not render unpublished content.
- Related products only include currently published products.
- Email announcement is a separately approved campaign action.

## 12. Contact and legal/support templates

- Contact: email, WhatsApp, Instagram and optional contact form.
- About: brand story supplied by owner.
- Size Guide: actual approved measurement tables and how-to-measure guidance.
- Shipping & Returns: actual delivery area, charge, timing and exchange/return policy.
- FAQs: owner-approved answers.
- Privacy and Terms: approved policy text; not generic placeholders at production.
- 404 and error pages: back to Shop/Home, no technical stack traces.

## 13. Admin template

Admin is a separate application shell with:
- persistent desktop sidebar;
- responsive mobile nav/drawer;
- top bar with search, notification/alert center, profile and theme;
- content header, breadcrumbs and primary action;
- data tables with sorting/filter/search/pagination;
- detail panels and edit forms;
- consistent loading/empty/error/permission states.

Admin must feel operational, not like a marketing homepage. Use solid surfaces and dense but readable tables.

## 14. Template acceptance checklist

- [ ] Every P0 customer route has desktop/mobile layout.
- [ ] Product Studio design shows the defined studio visual stage.
- [ ] Product cards expose actions on touch, not only hover.
- [ ] Search/filter/sort states defined.
- [ ] COD and QR states are distinct.
- [ ] Invoice visual and PDF output share one source snapshot.
- [ ] Account includes notification inbox/preferences.
- [ ] Journal pages support draft/published states.
- [ ] Admin shell and primary modules specified.
- [ ] All empty/loading/error/success/permission states designed.

## 15. Motion and image inspection details

Use [Motion, Hover, Scroll and Product Image Inspection Specification](MOTION_HOVER_SCROLL_AND_PRODUCT_ZOOM_SPEC.md) as the detailed behavior contract.

### Product gallery zoom — required on every gallery image
Each gallery thumbnail—front, back, side, alternate angle, fabric close-up, stitching detail and variant image—must support image inspection. Selecting a thumbnail binds that image's own high-resolution zoom source. The magnifier must never remain connected to the previous image after thumbnail or variant changes.

Desktop: hover/focus over the image reveals a cursor-tracking magnifier lens. Clicking “Inspect details” opens a pinned large viewer with zoom, pan, reset, previous/next and close controls.

Mobile: tap opens the zoom viewer; pinch/drag are supported where available, with explicit zoom buttons as an alternative. Swipe gallery navigation remains available when the image is not zoomed.

When the gallery image has no high-resolution source, use a normal lightbox without pretending to show true fabric detail.

### Scroll and hover behavior
- Hero text/image entrance is subtle, short and pauseable where carousel motion is involved.
- Product cards lift slightly and crossfade to a genuine second image.
- Buttons provide hover/focus/press/loading feedback without layout shift.
- Sections reveal as customers scroll down and restore naturally when scrolling up.
- Avoid large parallax, forced pinned scenes or full-grid animation cascades.
- All effects have reduced-motion and no-JavaScript fallbacks.



## 16. Homepage hero video and 360° Spin Builder
The homepage hero may pair a required poster image with an optional muted 6–10 second campaign loop. The admin configures title, copy, selected published product/collection, poster, optional video, crop/focal point, CTA, display order and active dates. The first poster loads first; inactive slide videos do not all download at initial render.

The optional Product Studio 360° control is a photograph-sequence spin created from a genuine full-rotation capture or ordered real frames. It is not a geometry-based 3D model and does not replace the standard image gallery or individual zoom sources. Use the full [Hero Video Campaign and 360° Spin Builder Specification](HERO_VIDEO_AND_360_SPIN_BUILDER_SPEC.md) for capture rules, admin approval and customer fallbacks.


## 17. Scroll animation pattern selection — proposed

Use [Motion Pattern Evaluation](MOTION_PATTERN_EVALUATION.md) and [Motion Pattern Preview](design-assets/MOTION_PATTERN_PREVIEW.svg) for the Onda reference analysis.

Only two restrained candidates are proposed for owner review:
1. Section text reveal: a heading and short supporting copy rise 12–16px and settle into full opacity as the section enters view; no default word-by-word splitting.
2. Circular image-mask reveal: one or two large editorial images open from a small circular mask as they enter view.

Candidate placements are the Homepage section headings/short copy and the Homepage Product Studio feature image or one Journal cover. Exact placements remain subject to owner verification. Do not apply these animations across product cards, gallery zoom, checkout, order/invoice actions or admin tables.

Do not adopt Onda's pinned horizontal case-study track, rotating client wheel, sticky stacking service cards, process ring or cross-section travelling hero photo. Preserve native vertical scrolling; no scroll hijacking. Prefer CSS scroll-driven effects with feature detection, static/low-motion fallback and reduced-motion behavior. No GSAP/Lenis dependency is justified for these two effects alone.
