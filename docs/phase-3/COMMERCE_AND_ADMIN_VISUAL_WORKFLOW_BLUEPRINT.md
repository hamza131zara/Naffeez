# Naffeez — Commerce, Hover and Admin Visual Workflow Blueprint

**Document ID:** NAF-P3-VISUAL-FLOW-002  
**Version:** 1.0  
**Status:** Visual blueprint prepared for owner review; native Figma import/review pending  
**Applies to:** Product card, catalog, cart, checkout, invoices, customer account, notifications and admin operations

## 1. Purpose and status

This blueprint extends the existing Phase 3 design pack with the next set of customer and admin screen designs. It is grounded in the approved Phase 1 product baseline and the Phase 2 order/payment/invoice, authorization and notification contracts. It does not change open business decisions or authorize Phase 4 application coding.

The accompanying SVGs are importable vector design boards. The Figma Starter-plan MCP call limit prevented writing additional native frames to the existing Figma file during this pass. The SVG boards are therefore **repository design assets, not yet native pages/frames inside the Figma file**. Import them into the existing [Naffeez design file](https://www.figma.com/design/PEKxJAmDkJgfVpBL8nDTrT) when Figma editing capacity is available, then complete visual QA there.

## 2. Product card — default and hover preview

### 2.1 Reference and target behavior

The supplied reference shows a compact dark product card with a 3:4 garment image, a small `NEW` badge, a wishlist control and the product name/price underneath. Preserve that quiet default appearance. Add a separate hover-preview state for the **same product**, not a second unrelated product.

The preview board shows the Cocoa suede overshirt in two states:
- **Default:** front image, product badge and wishlist affordance.
- **Hover preview:** alternate/back image of that same garment, revealed Wishlist / Compare / Quick View actions, and a `Select Options` CTA over the lower image edge.

### 2.2 Hover/focus sequence

1. Pointer enters the product image/card.
2. Card rises by approximately 2–3px; its border/elevation changes subtly without shifting neighboring cards.
3. If a distinct secondary image exists, crossfade from the primary/front image to the alternate/back image in 180–240ms. Keep the image frame clipped and geometry fixed.
4. Reveal the compact action stack: Wishlist, Compare and Quick View. Use a brief 100–160ms opacity/translate reveal; do not introduce a large stagger or elastic bounce.
5. Reveal `Select Options` as the primary card action. It must not move the product name or price.
6. On pointer leave, return to the primary image and default action treatment.
7. Keyboard focus within the card reveals the same actions and provides a visible focus ring. Hover must not be the sole path to an action.

### 2.3 Action behavior

| Action | Behavior |
|---|---|
| Product image/title | Opens the full Naffeez Product Studio route |
| Wishlist | Adds/removes the item and announces the result; guest behavior follows the existing wishlist persistence contract |
| Compare | Adds/removes the product; compare maximum remains four items |
| Quick View | Opens an accessible dialog with compact product image, title, price, valid variant selection and Add to Cart / View Full Product |
| Select Options | Opens the variant-selection step or routes to Product Studio when more detail is needed |

### 2.4 Missing secondary image and touch behavior

- If no distinct secondary image exists, retain the primary image; do not reveal a blank image or pretend that a different angle is available.
- On touch devices, do not simulate hover with a first tap. Keep essential controls visible or provide a labelled action control.
- Keep minimum interactive targets at 44×44px.
- Provide accessible names for icon-only controls and restore focus after Quick View closes.
- Under reduced motion, use an immediate image/state swap without scale or animated lift.

**Vector specimen:** [Product Card — Default and Hover Preview](design-assets/PRODUCT_CARD_HOVER_PREVIEW.svg)

## 3. Customer commerce screens

The customer board gives a consistent storefront shell and screen structure. Product names, garment images and `PKR 0,000` values in the SVGs are visual placeholders, not a source of live catalog truth.

**Vector board:** [Customer Commerce Screens](design-assets/COMMERCE_CUSTOMER_WORKFLOWS.svg)

### 3.1 Catalog — Shop All and category listing

**Desktop composition**
- Store header: Naffeez wordmark, Shop, Collections, New Arrivals, Journal, search, account, wishlist and cart.
- Breadcrumb, page title and owner-managed short category intro.
- Result count and sort menu; count is shown only when returned from catalog data.
- Filter sidebar with the launch taxonomy: Casual Shirts, Dress Shirts, Seasonal Trousers, Winter Trousers and Hoodies.
- Additional filters appear only when the product data supports them: size, color, availability and price range.
- Product grid: four columns at standard desktop widths; use the shared product-card component.
- Active filter chips and Clear All; preserve filters in URL state where practical.

**Mobile composition**
- Compact header.
- Full-height filter drawer opened by a clear Filters button.
- Staged filter changes with Apply and Reset, or immediate apply only if that interaction is selected and documented.
- Two-column grid at common phone widths; switch to one column only when readability requires it.

**Required states:** loading skeleton, no results, search error/retry, unavailable/archived product, missing image fallback and active-filter state. Filter values must be derived from published/current catalog data, not hard-coded category counts.

### 3.2 Cart

- Cart line shows product image, title, selected color/size, current price, quantity stepper and remove action.
- Quantity is constrained by the current available stock/purchase limit; stock is revalidated at checkout.
- Summary separates subtotal, configured delivery charge, valid discount and total.
- Delivery charge should say it is calculated at checkout until the owner confirms the delivery-charge/coverage policy and the server can quote it.
- Guest checkout remains available; do not force sign-in.
- Primary CTA: Proceed to Checkout. Secondary action: Continue Shopping.
- Handle changed price, archived product, unavailable variant, quantity conflict and empty cart with a clear recovery action.

### 3.3 Checkout — contact, address and review

Use a clear progress indicator: Contact → Delivery → Payment → Review. A step should not appear complete before its data has been validated.

**Contact and delivery fields**
- Customer name.
- Phone number.
- Email only if required by the agreed authentication/order policy.
- City/area and street address.
- Any delivery-specific fields only after owner confirmation.

**Payment selection**
- Cash on Delivery (COD).
- Easypaisa QR when enabled.
- Bank QR when enabled.
- Display only payment methods configured as active.

The server must recalculate product prices, variant availability, stock, discounts and configured delivery charges before order creation. The browser must not be authoritative for the payable amount. Submit once using the idempotent order-creation contract.

### 3.4 QR transfer and order result

When the customer selects Easypaisa or Bank QR:
- Show the approved QR asset, exact server-quoted amount, account instructions and order reference.
- Explain whether the customer must submit a transaction reference, proof, or both, according to the configured payment policy.
- Provide upload progress, file constraints, remove/retry and a privacy notice for proof.
- After submission, show **Pending Verification**. QR display, scanning, reference entry or proof upload does not prove receipt.
- Only an authorized payment operator who checks actual account receipt may verify payment.
- Rejection or request-for-new-proof requires a reason and results in a clear next action for the customer.

For COD:
- Order is created with payment state `cod_due`.
- Confirmation says Payable on Delivery.
- COD must not be marked paid when the order is placed; collection is recorded by authorized staff after actual collection.

### 3.5 Invoice — customer and admin

The invoice screen/print view uses the immutable order snapshot created after order commit.

**Required layout**
- Store identity/contact and legally required seller fields (owner confirmation still needed).
- Invoice number/date and order reference.
- Customer and delivery details permitted for the viewer.
- Item rows with snapshot product/variant, quantity and line totals.
- Subtotal, configured delivery, valid discount/tax lines where applicable and total.
- Payment method and current payment state: for example, COD due or QR pending verification.
- Clear print/download action in an A4-friendly layout.

The commercial line snapshot and totals do not change when a product is later edited. If PDF generation fails, allow regeneration from the saved snapshot. Customer access must be ownership/capability checked; admin access is permission checked. Private invoice files must not be placed in a public bucket.

### 3.6 Customer account

Recommended account sections:
- Profile and verified contact details.
- Orders and order status timeline.
- Saved delivery addresses.
- Wishlist.
- Invoice list / invoice access.
- Notification inbox and preference management.

Every customer route is owner-scoped. Guest order access uses the verified, purpose-limited guest capability rather than a guessable order number. The authentication method and a few identity details remain owner decisions; the screens must adapt to the selected Phase 2 authentication contract.

### 3.7 Notifications and preferences

Present two distinct experiences:

**Transactional inbox**
- Account verification/recovery.
- Order received.
- COD payable on delivery.
- QR instructions and payment pending verification.
- Proof submitted.
- Payment verified/rejected/request new proof.
- Order processing/shipped/delivered/cancelled.
- Invoice ready.

**Optional marketing preferences**
- New products.
- Offers.
- Journal/articles.
- Seasonal campaigns.
- Brand news only if separately enabled and described.

Marketing topics are unchecked by default and require affirmative opt-in. Email confirmation, consent text/version, source, timestamp, topic and channel are recorded. Customers can change topics, pause or unsubscribe. Marketing unsubscribe does not disable essential transactional order/account messages.

## 4. Admin operations screens

**Vector board:** [Admin Operations Screens](design-assets/ADMIN_OPERATIONS_WORKFLOWS.svg)

### 4.1 Admin overview

Build an action-oriented overview rather than decorative KPI cards. Live counts must be sourced from the server; show an empty/zero state when actually zero and a skeleton while loading. Do not hard-code sample totals.

Priority queues:
- New orders requiring review.
- QR payments pending verification.
- Low-stock variants.
- Invoice generation failures.
- Email/outbox/provider failures.
- Campaigns awaiting approval or paused due to provider risk.

Admin navigation covers Products, Categories, Collections, Inventory, Orders, Payments, Invoices, Customers, Journal, Campaigns, Notifications, Integrations, Staff/Roles, Audit Log and Settings.

### 4.2 Product editor and gallery media manager

Product editor sections:
- Title, slug, description and SEO fields.
- Approved category/subcategory.
- Current/original price and sale validity where supported.
- Publication status and scheduling.
- Gallery/media manager with upload, reorder, alt text and preview.
- Variant matrix by color/size/SKU with stock for each sellable variant.
- Product card and Product Studio preview before publish.

Every gallery item must store its own identity and image mapping. The implementation handoff contract is:

```ts
type ProductGalleryImage = {
  id: string;
  src: string;
  zoomSrc?: string;
  alt: string;
  width: number;
  height: number;
  sortOrder: number;
  variantId?: string;
  detailLabel?: string;
};
```

The active thumbnail selects its own `src` and matching `zoomSrc`. Never reuse one global texture/stitch zoom source for every image. A zoom source must match the selected image and variant; if it is absent, fall back to the normal image without claiming high-resolution texture inspection.

### 4.3 Order operations and payment review

Keep fulfillment status and payment status as separate timelines.

**Order detail**
- Order reference and customer/contact summary.
- Server-calculated order snapshot and items.
- Fulfillment timeline and allowed next transitions.
- Payment method, amount and current payment state.
- Internal notes (never customer-visible).
- Customer-visible status update preview.
- Audit details for actor, action, reason and timestamp.

**QR payment review**
- Pending queue with order reference, expected amount and submitted transaction reference.
- Private proof preview/download subject to permission.
- Operator verifies against actual Easypaisa/bank receipt.
- Actions: Verify, Reject, Request New Proof.
- Reject/request-more-proof requires a reason.
- State change is committed once, audited, and triggers a transactional customer update.

**COD**
- Order remains unpaid at placement.
- COD collection is recorded by authorized staff when actually collected.
- Payment state changes only after collection is recorded.

### 4.4 Inventory and stock alerts

- Display variant/SKU, current stock, configured threshold and last movement.
- Adjustment form records quantity delta and required reason.
- Alert is generated on threshold crossing, deduplicated for the same variant/threshold episode and re-armed only after the defined reset condition.
- Stock changes must not fabricate “low stock” claims on public product pages unless supported by current stock rules.

### 4.5 Invoice management

- Search/filter by order reference, invoice number and generation status.
- Open the same immutable invoice snapshot available to the customer.
- Retry/regenerate a missing PDF from the snapshot without changing order totals.
- Restrict file access to authorized admin/customer.
- Record generation failures and retries in operational logs.

### 4.6 Journal and campaign operations

**Article editor:** draft title, summary, body, cover image, categories/tags, SEO, related products and desktop/mobile preview. Public Journal shows only published content.

**Campaign builder:** select published content/product/valid offer; select only an enabled consent topic; preview audience eligibility and exclusions (unconfirmed, unsubscribed, suppressed); render HTML/text; send an internal test; obtain approval; then schedule/send. A Journal “Create email campaign” action creates a draft, not an automatically approved send.

Monitor accepted/delivered, soft bounce, hard bounce, complaint, unsubscribe and failure events. Suppression checks run again before each send. A campaign can be paused when provider risk thresholds are crossed.

### 4.7 Notifications, integrations, staff and audit

- Template versions and transactional/marketing classification.
- Outbox queue, retry/backoff, provider status and delivery events.
- Provider credentials masked in settings; test connection without revealing secrets.
- Sender readiness includes SPF, DKIM and DMARC checks when the mail provider is configured.
- Alert routing for new orders, QR review, inventory, invoice failure and email/provider errors.
- Least-privilege staff roles for store operations, payment review, marketing editing/approval and owner-only settings.
- Audit entries for sensitive changes, financial actions, permission changes and manual adjustments.

## 5. Other website actions and edge cases

| Area | Visual/workflow treatment |
|---|---|
| Search | Debounced/cancellable query, suggestions only when supported, count/results, no-results suggestions and retry without clearing the query |
| Filters/sort | Dynamic data-backed options, active chips, Clear All, mobile drawer and URL state where practical |
| Wishlist | Guest persistence where supported; merge/deduplicate after sign-in |
| Compare | Maximum four products; fifth attempt explains how to remove an item |
| Quick View | Focus-managed dialog; Escape close; restore focus; route to Product Studio for complex selection |
| Size guide | Show category-specific owner-provided chart; if absent, say “Size guide coming soon” rather than invent measurements |
| Contact/WhatsApp | Secondary support/enquiry action; must not replace core checkout/order access |
| Cancellation | Validate current fulfillment/payment state; release inventory exactly once |
| Refund | Separate actual refund workflow for verified payments; cancellation is not itself a refund |
| Session expiry | Explain and preserve safe form input where appropriate; reauthorize protected action |
| Stock conflict | Revalidate and explain which variant/quantity changed; let customer revise cart |
| PDF/email provider failure | Keep committed order intact; show invoice retry/access recovery; do not fail checkout because a secondary provider is down |
| Image/zoom failure | Keep normal image gallery usable; show fallback and do not block Add to Cart |

## 6. Responsive and accessibility acceptance

- Desktop catalog: four product columns at standard desktop width; filters in a sidebar.
- Tablet: adapt columns and filters without clipping; no forced horizontal page scroll.
- Mobile catalog: two columns where readable, with a full-height filter drawer.
- Cart/checkout: stack summary and forms; keep totals and primary CTA discoverable without hiding fields.
- Invoice: provide print stylesheet/A4 page; responsive on-screen preview.
- Account/notifications: use stacked cards/tabs with clear labels and unread state.
- Admin tables: provide responsive card/list fallback or deliberate horizontal table scrolling with sticky key identity; never hide financial status.
- Minimum 44×44px touch targets; explicit labels and errors; keyboard navigation; focus visible; dialog focus management; reduced-motion fallback.
- Status is communicated through text/icon as well as color.

## 7. Workflow map

The accompanying [Customer and Admin Workflow Map](design-assets/CUSTOMER_ADMIN_WORKFLOW_MAP.svg) describes the two primary payment branches:

- **COD:** create order with `cod_due` → authorized fulfillment → record actual collection → mark paid.
- **QR:** show QR/amount/reference → customer submits reference/proof → `pending_verification` → payment operator checks actual account receipt → verify/reject/request new proof → transactional customer update.

The global invariants are server-authoritative amounts/stock, owner-scoped customer data, immutable invoice snapshots, explicit marketing consent and core order continuity when email/3D/optional integrations are unavailable.

## 8. Owner inputs still required

This blueprint deliberately does not invent:
- Delivery charge, coverage/regions and COD eligibility.
- Return/exchange/cancellation policy.
- Authentication method and required customer identity fields.
- Product size charts and real garment photography/alternate angles/high-resolution zoom files.
- Payment QR assets, account instructions and proof/reference requirements.
- Invoice issuer/legal fields.
- Stock reservation/expiry policy and staff roles.
- Email provider, sender address and provider credentials.

Resolve these through the existing Phase 2 decision log and handoff process before final screen approval or implementation.

## 9. Acceptance checklist for this visual tranche

- [ ] Default and hover-preview product card show the same product with a distinct alternate image.
- [ ] Hover preview reveals Wishlist, Compare, Quick View and Select Options without layout shift.
- [ ] Keyboard focus exposes the same card actions; mobile has no hover dependency.
- [ ] Catalog, cart, checkout, QR result, invoice, account and notification screens reviewed.
- [ ] Admin overview, product/media editor, order/payment review, inventory, invoice, campaign and alert screens reviewed.
- [ ] COD and QR payment paths are distinct and payment truth is visible.
- [ ] Marketing consent is separate, unchecked by default and independently changeable.
- [ ] Error/empty/loading/retry and responsive states are covered.
- [ ] Actual owner-provided photography, policy text, QR details and invoice fields replace placeholders.
- [ ] SVG boards are imported into the Naffeez Figma file and visually QA'd.
- [ ] Owner explicitly approves the design pack before Phase 4.

## 10. Related source specifications

- [Customer and Admin Workflow Design](CUSTOMER_AND_ADMIN_WORKFLOW_DESIGN.md)
- [Component Library and Interaction Specification](COMPONENT_LIBRARY_AND_INTERACTION_SPEC.md)
- [Admin Dashboard Design](ADMIN_DASHBOARD_DESIGN.md)
- [Website Template and Page Specification](WEBSITE_TEMPLATE_AND_PAGE_SPECIFICATION.md)
- [Order, Payment and Invoice Workflows](../phase-2/ORDER_PAYMENT_INVOICE_WORKFLOWS.md)
- [Notifications, Email Marketing and Admin Alerts](../phase-2/NOTIFICATIONS_AND_ALERTS.md)
- [Authorization and RLS](../phase-2/AUTHORIZATION_AND_RLS.md)
