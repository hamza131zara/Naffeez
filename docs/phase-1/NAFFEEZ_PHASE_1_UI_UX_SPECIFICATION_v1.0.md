# NAFFEEZ — Phase 1 Product & UI/UX Baseline

**Document ID:** NAF-P1-UIUX-001  
**Version:** 1.0  
**Status:** Accepted baseline; Phase 1 signed off by owner on 2026-11-28  
**Product:** Premium men's fashion e-commerce platform  
**Domain:** https://naffeez.com  
**Launch market/currency:** Pakistan / PKR  
**Launch language:** English  
**Owner-provided brand channels:** naffeezofficial@gmail.com · WhatsApp +92 371 649 9220 · Instagram https://www.instagram.com/naffeezofficial/

> This document is the product and experience baseline for Naffeez. Phase 2 technical documentation must implement and refine this baseline rather than silently changing its scope. Changes require a recorded decision or version update.

---

## 1. Product vision and launch objective

Naffeez is a premium men's fashion store that combines a high-quality editorial storefront with simple, reliable commerce. Customers discover garments, open a dedicated **Naffeez Product Studio** experience, inspect product images and information, choose variants, add products to their cart, and place an order using Cash on Delivery (COD) or a manually verified Easypaisa/bank-transfer QR workflow. Customers can contact the store through WhatsApp and view/download their invoices after checkout.

The first release is a real commerce MVP. AI recommendations, photo-based virtual try-on, face previews, event-scene generation and advanced 3D experiences are future modules. Their integration points may be designed now, but they must not delay or disable ordinary shopping.

**Customer promise:** Discover your style. Explore every detail. Shop with confidence.

### Launch success criteria

- A customer can browse men's clothing without signing in.
- A customer can find products using categories, search, filters and sorting.
- A customer can understand price, available sizes/colors, stock and product details.
- A customer can place an order using COD or submit a manual transfer payment for admin verification.
- A customer can contact Naffeez and access the order confirmation/invoice.
- An authorized admin can manage products, images, variants, inventory, orders, payment verification, invoices and homepage content.
- The site remains useful if AI, 3D or third-party integrations are unavailable.

## 2. Confirmed product decisions

| Area | Baseline decision |
|---|---|
| Initial audience | Men's clothing only |
| Initial product families | Shirts, trousers and hoodies |
| Shirt subcategories | Casual Shirts; Dress Shirts |
| Trouser subcategories | Seasonal Trousers; Winter Trousers |
| Language | English only |
| Market/currency | Pakistan / PKR |
| Product entry | Admin-managed through the Naffeez dashboard |
| Checkout | COD plus manual Easypaisa/bank-account QR payment |
| Payment verification | Admin reviews transfer reference/proof and marks payment verified or rejected |
| Customer communication | WhatsApp support and product/order enquiry |
| Invoices | Generated for orders; view/download for both customer and admin |
| Theme | Both Light and Dark modes; System preference may also be offered |
| Visual direction | Monochrome Editorial + Functional Glassmorphism + Selective 3D |
| Product destination | Product card click opens a dedicated Product Studio page |
| AI features | Future scope, not required for MVP operation |
| Technology direction | Next.js/TypeScript modular application; optional Python service only when justified |

Do not show empty or unsupported categories such as women's clothing, unisex, jackets or T-shirts until the owner adds those products and confirms the category.

## 3. Design principles

1. **Commerce first:** product browsing, cart, checkout, order handling and invoices are the MVP.
2. **Editorial, not cluttered:** fashion photography should be the visual focus.
3. **Selective glassmorphism:** use translucent glass on navigation, selected overlays, quick-view dialogs, filter drawers and future AI panels—not on every component or over every product image.
4. **Selective 3D:** use 3D only where it creates clear value. Static imagery is always an acceptable fallback.
5. **Fast by default:** defer heavy animations, 3D assets and optional integrations until needed.
6. **Real data only:** prices, availability, stock, counters, popularity and payment state must come from trusted application data. Never fabricate stock urgency, review counts or sales figures.
7. **Responsive and accessible:** controls must work with touch, keyboard and assistive technology. Hover must not be the only way to reach an action.
8. **Progressive enhancement:** the core store must continue working when JavaScript effects, WebGL or external providers fail.
9. **Privacy by design:** no personal photo collection in the MVP. Future photo features require explicit consent, controlled retention and deletion.
10. **Small operational footprint:** start with a modular monolith, not a microservice per feature.

## 4. Brand and visual system

### 4.1 Visual direction

**Monochrome Editorial + Functional Glassmorphism + Selective 3D**

The experience should feel premium, confident, modern, minimal and easy to shop. Use expressive fashion photography, strong typography, deliberate whitespace, thin borders, controlled transitions and clear CTAs. Avoid noisy gradients, excessive blur, neon overload and effects that compete with the garments.

### 4.2 Light and dark theme tokens

Use semantic tokens so components do not hard-code a color based on theme.

| Token | Dark mode | Light mode | Purpose |
|---|---|---|---|
| Background | #000000 | #F5F5F5 | Main page |
| Surface | #0A0A0A | #FFFFFF | Cards and panels |
| Raised surface | #141414 | #FFFFFF | Dialogs and elevated sections |
| Primary text | #FFFFFF | #111111 | Main copy |
| Secondary text | #999999 | #666666 | Supporting copy |
| Muted text | #777777 | #777777 | Subtle/disabled copy; check context contrast |
| Border | rgba(255,255,255,0.15) | rgba(0,0,0,0.12) | Dividers and outlines |
| Glass surface | rgba(10,10,10,0.72) | rgba(255,255,255,0.78) | Selected overlays |
| Accent | #C7C7C7 | #555555 | Restrained silver |
| Focus ring | #FFFFFF | #111111 | Keyboard focus |
| Success | #78B88A | #267A42 | Success state |
| Warning | #E6B65C | #986100 | Warning state |
| Danger | #E07878 | #B3261E | Error/destructive state |

Check color contrast for every text/control pair in both themes. Do not use #999999 as body text on a light background; use the darker secondary token. Communicate status with text/icon as well as color.

### 4.3 Typography

- Headings: Space Grotesk or a visually similar geometric sans-serif.
- Body and UI: Inter or a visually similar neutral sans-serif.
- Body baseline: 16px with 1.5–1.7 line height.
- Desktop hero heading: approximately 56–80px, responsive.
- Section heading: approximately 28–40px desktop and 24–30px mobile.
- Product names/prices: approximately 15–17px.
- Load only necessary font weights; prefer optimized/local hosting when licensing permits.

### 4.4 Layout and interaction

- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96px.
- Product card radius: 10–14px.
- Dialog/drawer radius: 14–20px.
- Button radius: 8–12px; do not make every control a pill.
- Minimum touch target: 44×44px; prefer 48px for key mobile actions.
- Typical UI transition: 140–240ms.
- Respect prefers-reduced-motion.
- Auto-moving carousels need pause/manual controls.

### 4.5 Responsive breakpoints

Use content-driven layouts with initial breakpoints: 320–374px small mobile; 375–767px mobile; 768–1023px tablet; 1024–1439px desktop; 1440px+ wide desktop. The site must remain usable at 320px and must not create horizontal page overflow.

### 4.6 Theme behavior

Offer Light, Dark and System choices. Persist a visitor's preference and prevent a flash of the wrong theme at initial render. Review all pages, drawers, dialogs, inputs, image backdrops and statuses in both themes.

## 5. Information architecture and sitemap

### 5.1 Main navigation

**Desktop:** Naffeez logo · Shop · Collections · New Arrivals · AI Style Studio (coming soon/disabled until ready) · Search · Account · Wishlist · Cart.

**Mobile:** compact header with logo, search and cart; a drawer for Shop, Collections, New Arrivals, Account, Wishlist, Compare, About and Support. Do not force all desktop actions into one cramped mobile row.

### 5.2 Catalog taxonomy

- Shop All
  - Shirts
    - Casual Shirts
    - Dress Shirts
  - Trousers
    - Seasonal Trousers
    - Winter Trousers
  - Hoodies
- Collections
  - New Arrivals
  - Seasonal Collection (only when populated)
  - Best Sellers (only with actual data or admin-curated selection)
  - Sale (only when sale products exist)
- AI Style Studio
  - MVP state: clearly labelled coming soon/informational page.
  - Future: outfit recommendations and virtual try-on.

### 5.3 Customer and informational routes

| Route concept | Purpose | Launch priority |
|---|---|---|
| / | Home, brand and product discovery | P0 |
| /shop | All men's products | P0 |
| /shop/[category] | Category/subcategory results | P0 |
| /collections/[slug] | Curated collection | P0 |
| /products/[slug] | Naffeez Product Studio | P0 |
| /search | Search results | P0 |
| /wishlist | Saved products | P0 |
| /compare | Compare 2–4 products | P1 |
| /cart | Cart review | P0 |
| /checkout | Delivery/payment | P0 |
| /orders/[order-reference] | Order confirmation/status | P0 |
| /account/orders/[id]/invoice | Invoice view/print/download | P0 |
| /account/* | Authentication, profile and order history | P0 |
| /track-order | Order lookup/tracking | P1 |
| /about | Brand story | P1 |
| /contact | Contact methods/form | P0 |
| /size-guide | Size help | P0 |
| /faqs | Common questions | P1 |
| /shipping-returns | Delivery, exchange and return policy | P0 |
| /privacy | Privacy information | P0 |
| /terms | Store terms | P0 |
| /admin/* | Protected store administration | P0 |

P0 means required for public production launch. P1 can follow the minimum transactional release, but legal and delivery-policy pages must be complete before public launch, not left as placeholder copy.

## 6. Homepage specification

### 6.1 Section order

1. Announcement bar.
2. Main navigation.
3. Full-width editorial hero carousel.
4. Featured category shortcuts.
5. Trending products.
6. New arrivals/featured collection.
7. Naffeez Product Studio introduction.
8. Best sellers/admin-curated collection.
9. Brand story/campaign image.
10. Instagram/social section.
11. Newsletter only when consent and a working email workflow exist.
12. Footer.

### 6.2 Announcement bar

Example: “NEW COLLECTION — DISCOVER YOUR STYLE”. Admin can edit text, destination and active dates. A single static announcement is preferred for MVP; rotating announcements must be pauseable.

### 6.3 Navigation

The header can be transparent over the hero and transition to a solid/glass surface on scroll. Keep readable contrast over every slide. Include category dropdown, search, account, wishlist/cart counters and theme selection.

### 6.4 Hero carousel

- Target 3 editorial slides; admin may manage 1–5.
- Each slide has image, optional eyebrow, headline, optional support copy and one CTA.
- Default auto-advance 6–7 seconds.
- Previous/next and pagination controls; mobile swipe.
- Pause on hover/focus and after user interaction.
- Disable auto-advance for reduced-motion preference.
- Responsive image sources and low-weight placeholder.
- Hero must not depend on 3D.

### 6.5 Featured categories

Show Casual Shirts, Dress Shirts, Seasonal Trousers, Winter Trousers and Hoodies. Use clear labels and owner-uploaded campaign imagery.

### 6.6 Trending products

- Desktop: 4 cards per row at standard desktop width.
- Tablet: 2–3 columns.
- Mobile: 2 columns or a swipeable carousel, based on readability.
- “Trending” starts as an admin-curated collection; do not imply algorithmic popularity unless measured.
- Show real listing result counts, not invented counts.

### 6.7 Product Studio teaser

Introduce the dedicated product-detail experience. “Explore the Studio” or “Discover the Collection” may be used as the CTA. Do not advertise AI try-on as active before a real provider, consent and production behavior exist.

### 6.8 Brand/social/footer

Use owner-approved brand story and uploaded campaign assets. Link to the supplied Instagram profile. Do not scrape/hotlink social images without permission or a supported integration. Footer includes shop categories, support, size guide, shipping/returns, FAQs, About, Privacy, Terms, email, WhatsApp, Instagram and copyright.

## 7. Catalog, product cards and filters

### 7.1 Product card anatomy

Each card supports:
- Main product image, preferably 3:4 portrait.
- Secondary image on desktop hover when available.
- Product name.
- Current PKR price; original price only for a real discount.
- New/Sale/Best Seller badge only when valid.
- Wishlist, compare, Quick View and Select Options actions.
- Stock/availability state.

Clicking the image or title opens the full Product Studio route. Quick View is a lightweight preview, not a substitute for the complete product page.

### 7.2 Product card actions

| Control | Behavior |
|---|---|
| Image/title | Navigate to /products/[slug] |
| Wishlist | Save/remove; announce state accessibly |
| Compare | Add/remove; max 4; explain if full |
| Quick View | Dialog with photos, price, variants and full-details link |
| Select Options | Open option selector/Product Studio; validate variant before adding |
| Sold Out | Disable purchase and identify unavailable variant |
| New/Sale/Best Seller | Display only when supported by product data/admin assignment |

On mobile, actions must remain discoverable without hover.

### 7.3 Product detail data

Product title, SKU (admin always; customer optional), category, price/sale price, description, material/fabric when supplied, fit/style when supplied, colors, sizes, size guide, images, per-variant availability, care instructions when supplied, shipping/returns link and related products.

### 7.4 Filters and sorting

| Filter | Values/rules |
|---|---|
| Category | Shirts, Casual Shirts, Dress Shirts, Trousers, Seasonal Trousers, Winter Trousers, Hoodies |
| Size | Only sizes configured for matching products; do not offer unavailable sizes as selectable |
| Color | Derived from actual variant data |
| Price | PKR min/max |
| Availability | In stock / Sold out |
| Collection | New Arrivals, seasonal, Sale, Best Sellers only when populated |
| Style | Casual/Formal/Streetwear only when tagged |
| Occasion | Party/Wedding/Office/Everyday only when tagged |
| Sort | Featured, Newest, Price low-high, Price high-low, Popularity only when supported by data |

Filters support sensible multi-select, active filter chips, actual result count and Clear All. Mobile uses a full-height slide-in drawer with Apply/Reset controls. Listing filters should be reflected in the URL when practical.

### 7.5 Counters and limits

| Component | Rule |
|---|---|
| Cart | Actual quantity of cart lines/items, using one documented convention |
| Wishlist | Actual saved product count |
| Compare | 0–4 products |
| Product grid | Actual result count after filtering |
| Stock | Actual inventory/variant availability |
| Quantity selector | Minimum 1; maximum available/purchase limit |
| Hero slides | 1–5 active; 3 recommended |
| Gallery | 4–8 images where available; fewer is valid |
| AI generation quota | Not active in MVP; future limits enforced server-side |

Do not use fake urgency counters, false stock claims or invented sales/review totals.

## 8. Naffeez Product Studio

A product click opens a dedicated immersive product-detail experience with a studio-like composition. This is a premium product page, not a claim that the first release contains a navigable 3D room.

### Desktop layout

- Large image/gallery stage on the left or center.
- Product information and purchase panel alongside it.
- Clean background; image remains prominent.
- Thumbnail navigation, zoom and image switching.
- Product title, price, description, size/color variants, stock, size guide, quantity, Add to Cart and Buy Now.
- Wishlist and Compare actions.
- Delivery/returns information and WhatsApp enquiry.
- Related products below the primary product area.

### Mobile layout

- Swipeable gallery with accessible thumbnails/pagination.
- Sticky or clearly reachable purchase panel.
- Variant selectors and size guide before purchase.
- Buttons at least 44×44px.
- No horizontal overflow or hidden critical details.

### Interaction states

Available, low stock (only if thresholds configured), sold out, invalid/missing variant, adding to cart, success, network error, image failure and unavailable product. Preserve selection when recoverable errors occur.

## 9. Cart and checkout

### 9.1 Cart

Show product thumbnail/name, selected size/color, unit price, quantity, line total and remove action. Revalidate price, variant availability and stock on the server during checkout. Provide empty-cart and recoverable error states.

### 9.2 Checkout inputs

Collect only necessary information: customer name, phone, email if needed, delivery address, city/area, optional delivery notes, selected payment method and order review. Guest checkout should be supported. Shipping charges, delivery estimates and COD coverage must be admin-configurable; no values are to be invented.

### 9.3 COD flow

1. Customer reviews cart and delivery details.
2. Selects Cash on Delivery.
3. Server validates price, variant and stock.
4. Order is created with payment status “Payable on Delivery”/unpaid.
5. Confirmation page displays order reference and invoice access.
6. Admin confirms and processes the order.

### 9.4 Easypaisa/bank QR manual transfer flow

1. Admin enables/configures a payment method and uploads the relevant QR image plus customer-facing account instructions.
2. Checkout displays only enabled methods and current instructions.
3. Customer scans using the external Easypaisa/bank app.
4. Customer enters transaction reference and/or uploads proof according to the configured requirement.
5. Order/payment submission is created as “Pending Verification”.
6. Admin reviews account receipt, reference and proof.
7. Admin explicitly selects Verify or Reject and records an audit reason.
8. Customer sees updated payment status; if rejected, provide a safe resubmission/support path.

A screenshot or customer-entered reference is not proof of receipt. Never automatically mark payment Paid because a customer uploaded an image. Payment state changes require an authorized admin action or a verified provider webhook.

### 9.5 WhatsApp

Use WhatsApp for support and product/order questions. Pre-fill a message with a product/order reference only when the user chooses the WhatsApp action. Do not expose private customer information in public URLs or shared messages by default. Store contact details in configuration, not scattered across components.

## 10. Invoices

Invoices are generated after order creation/checkout and accessible to both the customer and authorized admin.

### 10.1 Required invoice information

- Naffeez name and configured contact details.
- Invoice number and issue date.
- Order reference.
- Customer name and delivery details appropriate for the invoice.
- Product name, SKU if configured, selected size/color, quantity, unit price and line total.
- Subtotal, shipping, discount and total.
- Payment method and payment status.
- COD payable amount or QR transfer pending/verified state.
- Any required business/legal details only after owner supplies them.

Do not invent tax registration numbers, tax rates, legal claims, signatures or payment confirmations.

### 10.2 Invoice behavior

- Generate a unique server-side invoice number. Suggested pattern: NAF-YYYY-000001; final numbering can be configured in Phase 2.
- Store an immutable snapshot of order line descriptions/prices/totals at issuance. Later product edits must not rewrite an issued invoice.
- COD invoice states the amount payable on delivery.
- QR transfer invoice/payment status remains Pending Verification until admin confirmation.
- Customer can view, print and download PDF from confirmation/account.
- Admin can view/download from order and invoice management.
- Restrict access; never expose an invoice solely through a guessable ID.
- Failed PDF generation must be recoverable and must not lose the order.
- Downloaded PDF must match on-screen invoice and be readable in A4 and mobile preview.

## 11. Customer account

Account areas: overview, My Orders, order detail, Invoices, saved addresses, wishlist, profile/contact preferences and logout.

Browsing should work without login. Guest cart persists across route changes. After purchase, offer account creation. Associating a guest order with an account requires verification of matching contact information or another secure proof.

Separate fulfillment status from payment status.

Fulfillment examples: Order Received, Awaiting Confirmation, Confirmed, Processing, Shipped, Delivered, Cancelled, Return Requested (only if return flow exists).

Payment examples: Payable on Delivery, Pending Verification, Paid/Verified, Rejected, Refunded (only after refund actually occurs).

## 12. Admin dashboard

### 12.1 Admin navigation

Dashboard · Products · Categories · Collections · Inventory · Orders · Payments · Invoices · Customers · Homepage Content · Settings/Integrations · Staff & Roles · Audit Log.

### 12.2 Dashboard overview

Show real data only: orders in selected period, orders awaiting action, gross order value, verified payments, COD awaiting collection (if tracked), low-stock variants, published/draft products. Distinguish order value from money received. Do not show invented charts.

### 12.3 Product administration

Admin can create/edit/archive products; upload/reorder/remove images; assign category/collection; set title, slug, description, SKU, price/sale price, material, fit, season and tags; configure size/color variants and per-variant stock; assign valid badges; preview card and Product Studio; save draft or publish.

Use a sectioned product form:
1. Basic Information
2. Images and Gallery
3. Pricing
4. Categories and Collections
5. Variants and Stock
6. Details and Tags
7. SEO
8. Preview and Publish

### 12.4 Inventory

Stock is variant-level. Admin adjustments require a reason and audit record. Prevent overselling with server-side transactional checks. Reservation timing and expiry are a Phase 2 technical decision. Low-stock thresholds are configurable.

### 12.5 Orders

Search/filter by order reference, customer, date, fulfillment status and payment status. Authorized staff can view contact/delivery details, make valid status transitions, add internal-only notes, send supported updates, and view/download invoices. Maintain status history.

### 12.6 Payment verification

Queue pending transfers. Show method, amount, reference and proof securely. Actions: Verify Payment, Reject Submission, Request New Proof. Require explicit admin confirmation; record reviewer, timestamp and reason. Prevent duplicate approval.

### 12.7 Invoice management

Search/filter by invoice number, order reference, date and payment status. View/download PDF. Rebuild a missing PDF from immutable snapshot. Do not edit issued totals silently; use traceable revision/adjustment.

### 12.8 Roles

- Owner/Super Admin: full access, account and integration settings.
- Store Manager: products, inventory, orders, customers and content.
- Order/Payment Operator: orders and manual payment verification only.

Apply least privilege; staff cannot grant themselves higher roles.

## 13. Forms, controls and state rules

### Button hierarchy

- Primary: Add to Cart, Buy Now, Place Order, Save Product, Verify Payment.
- Secondary: Quick View, Continue Shopping, View Details, Download Invoice.
- Quiet: Cancel, Back, Clear Filters.
- Destructive: Delete, Cancel Order, Reject Payment; require confirmation and explain consequences.

Every button needs default, hover, focus, active, loading, disabled and success/error states. Prevent duplicate submissions.

### Form rules

Always show labels; placeholders are not labels. Validate on blur/submit, preserve safe values after recoverable errors, explain required formats, show inline errors and announce success/failure accessibly.

### Empty/loading/error states

Every data screen specifies loading/skeleton, empty, success, validation, network/server error, permission-denied and deleted/unavailable states. Examples include empty wishlist/cart, no search results, sold-out variant, unavailable QR method, failed invoice generation and (future) AI provider outage.

## 14. Future AI and 3D boundaries

These are future features, not MVP functionality.

### AI outfit recommendations

Customer selects occasion, preferred style, colors, budget and optionally self-selected skin undertone. Recommendations must query Naffeez catalog data, return real products, show availability and link to Product Studio.

### Virtual try-on

A full-body image is generally needed for garment try-on; a face-only photo cannot provide a convincing full-garment preview. Future process: explicit consent → secure upload → product/variant selection → provider processing → preview → customer save/delete choice. Label output as an approximation, not a sizing/fit guarantee.

### Event styling scenes

Party, wedding, office and everyday contexts can guide outfits. Use customer-selected preferences; do not infer sensitive identity traits from face/body photos.

### 3D

Use GLB/GLTF where useful. Load on interaction/visibility, provide static fallback and avoid loading Three.js on every card/page.

### Photo privacy requirements

Purpose-specific consent; disclose provider/data sharing; private storage; short retention; delete control; signed short-lived access; no public photo URLs; no training use without separate explicit opt-in and legal review; vendor review for security, retention, commercial licensing and geographic processing.

## 15. Python and plugin-based extensibility

### MVP architecture

Use a modular monolith: one Next.js application for storefront, admin and server endpoints; one managed PostgreSQL database; one object storage service for product images and payment proof. Do not create a microservice for every feature.

### Python placement

Python is optional and intended for workloads that justify it, especially AI/image generation, model orchestration and virtual try-on. When needed, add a separately deployed FastAPI service or queued worker behind a server-to-server API. Do not run Python in the browser or add a Python runtime to the MVP without a concrete workload.

### Integration adapters

Use replaceable interfaces/adapters:
- PaymentProvider: manual QR at launch; future gateway adapters.
- AITextProvider: future approved Gemini/Groq/etc. adapter.
- VirtualTryOnProvider: future provider adapter.
- ImageStorageProvider: storage abstraction if useful.
- NotificationProvider: email/WhatsApp/manual notification adapter.

Each optional integration needs an identifier, display name/version, enabled/disabled state, capability list, settings schema, permission requirements, health/status result, timeout/retry policy and secure server-side secret storage. Admins see only settings they are authorized to manage.

Do not build a public plugin marketplace or execute arbitrary uploaded plugin code. Plugin-based means reviewed modules with fixed contracts—not arbitrary code loading.

### Low-footprint rules

- One Next.js app initially.
- One PostgreSQL database.
- One object storage service.
- No Python service until justified.
- Lazy-load 3D and optional UI modules.
- Keep provider secrets server-side.
- Add queues only when asynchronous workloads require them.

## 16. Performance, accessibility, SEO and security targets

### Performance

Target Core Web Vitals at the 75th percentile when enough field data exists:
- LCP ≤ 2.5 seconds.
- INP ≤ 200ms.
- CLS ≤ 0.1.

Also use responsive AVIF/WebP, correct image dimensions, lazy-load below-the-fold media, reserve layout space, defer 3D and third-party scripts, avoid autoplay sound, and ensure the page is usable before optional embeds/analytics load.

### Accessibility

Keyboard-accessible navigation/dialogs/drawers/carousels; visible focus; meaningful alt text; semantic headings; labelled forms; adequate contrast in both themes; reduced-motion support; announced status messages; touch targets at least 44×44px.

### SEO

Unique titles/descriptions for products/categories/collections; canonical URLs; accurate Product structured data; Open Graph images; sitemap; robots rules; readable product slugs; key catalog content must not exist only inside animation.

### Security and privacy

Server-side order total/discount/stock validation; protected admin routes and roles; customer-owned data RLS; rate limits; file validation; no secrets in browser bundles or repository; admin audit logs; secure invoice authorization; private payment proof; documented backups and restoration.

## 17. Phase 1 screen inventory

### Customer screens

1. Home — desktop/mobile, light/dark.
2. Shop all — default, filtered and empty.
3. Category listing — each initial category.
4. Search panel and results.
5. Product card — default, hover/focus, wishlist active, compare active, sold out.
6. Quick View — available/unavailable variants.
7. Product Studio — desktop/mobile, gallery, variant, size guide and stock states.
8. Compare — 2–4 items, empty and maximum.
9. Wishlist — populated and empty.
10. Cart — populated and empty.
11. Checkout — COD, QR, validation and loading.
12. QR instructions and proof submission.
13. Order confirmation — COD and pending verification.
14. Invoice — screen, print and download.
15. Account — overview, orders, detail, invoice and profile.
16. Contact, About, Size Guide, FAQs, Shipping & Returns, Privacy and Terms.
17. Mobile drawer and theme selection.

### Admin screens

1. Admin login/access denied.
2. Dashboard.
3. Product list/create/edit/preview.
4. Variant and stock management.
5. Category/collection management.
6. Order list/detail.
7. Payment verification queue/review.
8. Invoice list/detail/download.
9. Hero slide and featured collection management.
10. Payment method/QR settings.
11. Contact/shipping settings.
12. Staff roles and audit log.

### Required design artifacts

- Approved sitemap/navigation.
- Annotated wireframes for P0 screens.
- High-fidelity desktop/mobile designs.
- Light/dark design tokens.
- Component inventory and states.
- Browse → Product Studio → cart → checkout → invoice flow.
- Manual transfer → admin verification → payment status flow.
- Empty/loading/error state library.
- Accessibility, responsive and performance notes.
- Phase 2 handoff acceptance criteria.

## 18. Critical user flows

### Flow A — COD purchase

Home/Shop → Category/Search → Product card → Product Studio → choose size/color → Add to Cart/Buy Now → contact/address → COD → review → Place Order → confirmation → view/download invoice → admin processes order.

### Flow B — QR transfer purchase

Home/Shop → Product Studio → Cart → Checkout → address → Easypaisa/Bank QR → scan in external app → transaction reference/proof → Place Order → Pending Verification → admin checks receipt → Verify/Reject → customer sees updated status → invoice/payment status remains traceable.

### Flow C — Admin publishes product

Admin login → Products → Add Product → Basic info → Images → Pricing → Category → Variants/stock → Details/tags → preview card/Product Studio → Save Draft/Publish → product appears in shop and assigned collection.

### Flow D — Invoice access

Customer confirmation/account order detail → View Invoice → Print/Download PDF.  
Admin order detail → Invoice → View/Download PDF.

## 19. Phase 1 acceptance criteria

Phase 1 baseline is complete when:
- Men's-only launch scope and initial taxonomy are explicit.
- Every P0 route has purpose and CTA.
- Product Studio is the full product destination.
- Light/dark semantic tokens and contrast checks are specified.
- Glassmorphism is limited to selected surfaces.
- Product photography remains prominent.
- Card actions, filters, sorting, search and counters are documented.
- Product Studio desktop/mobile states are documented.
- COD and QR payment are distinct, with manual admin verification.
- Invoice generation, snapshot, authorization and PDF behavior are specified for customer/admin.
- Admin product, inventory, order, payment, invoice and settings screens are covered.
- Future AI/Python services are optional and replaceable.
- Performance, accessibility, SEO, privacy and security criteria are recorded.

## 20. Owner decisions still required in Phase 2

These are not to be invented by the development team:
1. Exact size charts and garment measurement units.
2. Return/exchange window and conditions.
3. Delivery coverage, charges and estimated delivery wording.
4. COD coverage rules.
5. Easypaisa/bank account display details.
6. Approved payment QR images.
7. Whether proof upload, transaction reference, or both are required.
8. Invoice business/legal details and final numbering format.
9. Product image dimensions/count and content process.
10. Admin staff accounts and role assignments.
11. Final logo, campaign photography and approved brand copy.

## 21. Handoff to Phase 2

Phase 2 must produce the PRD, application architecture, database schema and relationships, API contracts, roles/permissions matrix, payment and order state models, invoice data/snapshot model, deployment topology, integration adapter contracts, security plan, and technical acceptance tests. Resolve open decisions where they affect schema or production behavior. Development starts only after those documents are reviewed and approved.
