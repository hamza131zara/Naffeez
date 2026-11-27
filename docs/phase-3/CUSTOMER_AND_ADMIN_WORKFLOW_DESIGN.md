# Naffeez — Customer and Admin Workflow Design

**Document ID:** NAF-P3-FLOW-001  
**Version:** 1.0  
**Status:** Phase 3 design proposal for owner review

## 1. Workflow principles

- Customer can browse without account creation.
- Every purchase step has visible progress and recovery.
- Prices, stock and payment status are verified by server/database, not browser state.
- No customer is subscribed to marketing by login or purchase alone.
- All sensitive admin actions are permission checked and audited.
- Core purchase path works when email, 3D and optional integrations are unavailable.

## 2. Main customer journey

~~~mermaid
flowchart TD
  H[Home] --> S[Shop / Category / Search]
  S --> P[Product Studio]
  P --> V[Select size, color, quantity]
  V --> W{Choose action}
  W -->|Wishlist| L[Wishlist]
  W -->|Compare| C[Compare]
  W -->|Add to Cart| K[Cart]
  W -->|Buy Now| Q[Checkout]
  K --> Q
  Q --> A[Contact and delivery address]
  A --> M{Payment method}
  M -->|COD| O[Create COD order]
  M -->|Easypaisa QR| R[Show QR and instructions]
  M -->|Bank QR| B[Show QR and instructions]
  R --> T[Customer submits transfer reference/proof]
  B --> T
  T --> N[Pending admin verification]
  O --> I[Order confirmation and invoice]
  N --> I
  I --> AC[Account/order access]
~~~

## 3. Browse and discovery workflows

### WF-C01 — Homepage discovery
1. Customer lands on Home.
2. Announcement bar and navigation load.
3. Hero carousel displays active slide.
4. Customer chooses category, collection or Shop CTA.
5. Listing page opens with default sort and result count.
6. Customer can open search, change filters or sort.
**Failure:** if a homepage section has no content, hide it gracefully; do not render placeholder product claims.

### WF-C02 — Search
1. Customer opens search.
2. Enters a query.
3. Search request is debounced and cancellable.
4. Suggest products/categories only if supported.
5. Results show count and applied filters.
6. Selecting result opens Product Studio.
**Failure:** no-results gives category suggestions and Clear Search; API failure gives retry without erasing query.

### WF-C03 — Filters
1. Customer opens filter panel.
2. System shows values derived from current published products.
3. Customer selects multi-values/price/availability.
4. Apply updates results and result count.
5. Active chips show selections.
6. Clear All restores default.
**Failure:** if selected variant no longer exists, remove or mark unavailable and explain.

### WF-C04 — Product Studio
1. Customer opens product card.
2. Product Studio route begins with image-first transition.
3. Gallery and product details load.
4. Customer selects color.
5. Size availability updates based on selected color/variant.
6. Customer reviews size guide and stock.
7. Customer chooses quantity.
8. Add to Cart or Buy Now.
9. System confirms action with cart count.
**Failure:** unavailable variant cannot be selected; stock changes are revalidated on add/checkout.

### WF-C05 — Wishlist/Compare
- Guest wishlist can use local/session persistence.
- On login, merge into account and deduplicate.
- Wishlist add/remove provides toast/status.
- Compare supports maximum four products; fifth attempt gives a clear removal prompt.
- Customer can continue shopping without authentication.

## 4. Checkout workflows

### WF-C06 — Guest checkout
1. Customer reviews cart.
2. Server quote recalculates current prices, variants, stock and configured delivery charges.
3. Customer enters name, phone, email if required and delivery address.
4. Customer selects payment method.
5. Customer reviews authoritative total and policy links.
6. Customer submits once.
7. Server creates order with idempotency.
8. Confirmation shows order reference and status.
9. Customer receives invoice access via secure current session or verified guest access link.
10. Transactional message is queued if email is available.

### WF-C07 — COD
1. Customer chooses COD.
2. Checkout displays COD availability for entered delivery area.
3. Customer reviews payable total.
4. Order is created with payment state `cod_due`.
5. Confirmation says “Payable on Delivery.”
6. Admin receives new-order alert.
7. Admin confirms/processes/ships/delivers.
8. Actual COD collection is recorded by authorized staff.
**Never mark COD as paid at order placement.**

### WF-C08 — Easypaisa/Bank QR
1. Customer selects an enabled QR method.
2. Checkout shows approved QR, account instructions, exact amount and order reference.
3. Customer uses another device to scan or saves/copies payment details on mobile.
4. Customer returns and submits transaction reference and/or proof as configured.
5. Order/payment record shows Pending Verification.
6. Admin checks actual account receipt.
7. Admin verifies, rejects or requests new evidence.
8. Customer receives status update and in-app notification.
**Never mark payment verified because QR was displayed, scanned or proof was uploaded.**

### WF-C09 — Order cancellation/recovery
- Customer support request routes to WhatsApp/contact.
- Admin validates current fulfillment/payment state.
- Cancellation releases inventory exactly once.
- Verified payments require an actual refund workflow; cancellation is not the same as refund.
- Customer receives a transactional status message when allowed transition is committed.

## 5. Invoice workflow

1. Order transaction creates invoice number and immutable snapshot.
2. PDF generation uses the snapshot after order commit.
3. Customer opens invoice from confirmation or account order detail.
4. Server checks customer ownership or guest capability.
5. PDF is streamed or signed URL is generated short-lived.
6. Admin opens same invoice from order/invoice management.
7. If PDF file is missing, regenerate from snapshot without changing order totals.
8. Payment status shown on a newly rendered invoice reflects current payment state, while commercial line snapshot remains immutable.

## 6. Account and email subscription workflow

### WF-C10 — Customer account
1. Customer can register/sign in using the Phase 2-approved method.
2. Email verification is completed where email auth is used.
3. Customer views profile/orders/addresses/invoices.
4. Ownership checks apply to every route.
5. Local wishlist/cart may be merged into account after validation.

### WF-C11 — Marketing subscription
1. Customer opens Notifications Preferences or optional footer signup.
2. Marketing topics are unchecked by default.
3. Customer actively selects Products, Offers, Journal, Seasonal or Brand News.
4. Customer submits email.
5. System sends confirmation.
6. Customer confirms subscription.
7. System records consent text version, source, timestamp, topic and channel.
8. Future campaigns check current preferences and suppression again before send.
9. Customer can pause, change topics or unsubscribe all.
10. Transactional order/account messages remain separate.

## 7. Journal and marketing campaign workflow

### WF-C12 — Article publishing
1. Admin author creates draft.
2. Adds title, summary, body, cover image, category/tags, SEO and related products.
3. Previews desktop/mobile.
4. Authorized editor publishes or schedules.
5. Public Journal lists published content only.
6. Admin may click “Create email campaign”; this creates draft only.
7. Campaign is reviewed, audience previewed, test sent and approved separately.

### WF-C13 — Product/offer campaign
1. Admin selects published product(s) or valid offer.
2. System checks active status, prices, validity dates and stock.
3. Admin selects consent topic audience.
4. System displays eligible, unconfirmed, unsubscribed and suppressed counts.
5. Admin previews HTML/text, sends internal test and approves.
6. Campaign sends with deduplication and delivery tracking.
7. Complaints/bounces/unsubscribes update suppression before subsequent sends.

## 8. Customer notification event design

| Trigger | Customer surface | Channel |
|---|---|---|
| Account email verification | Verify address | Email |
| Password recovery | Recovery instructions | Email |
| COD order created | Order received, COD payable, invoice access | On-screen + email + inbox |
| QR order created | QR payment instructions and pending state | On-screen + email + inbox |
| Proof submitted | Awaiting admin review | Email + inbox |
| Payment verified/rejected | Result and next action | Email + inbox |
| Order confirmed/processing | Status update | Email + inbox |
| Order shipped | Shipment status; tracking only if real | Email + inbox |
| Delivered/cancelled | Status update | Email + inbox |
| Invoice ready | View/download invoice | Email + inbox |
| Product/article/offer campaign | Relevant editorial/offer content | Marketing email + optional in-app card, consent required |

## 9. Admin operational workflow

~~~mermaid
flowchart LR
  D[Admin Dashboard] --> P[Products and Inventory]
  D --> O[Orders]
  D --> PAY[Payment Review]
  D --> INV[Invoices]
  D --> CMS[Journal and Homepage]
  D --> N[Notifications and Campaigns]
  O --> A[Authorized Status Action]
  PAY --> V[Verify / Reject / Request Proof]
  CMS --> C[Campaign Draft]
  C --> PRE[Audience Preview and Test]
  PRE --> AP[Approval]
  AP --> SEND[Send / Monitor]
  N --> AL[Alert Center and Delivery Logs]
~~~

### WF-A01 — New product
1. Admin creates product draft.
2. Enters title, description, category, prices and SEO.
3. Uploads and orders media.
4. Defines sizes/colors/SKUs and stock.
5. Previews product card and Product Studio.
6. Publishes.
7. Product is visible only after status/published_at rules pass.

### WF-A02 — Order operations
1. Admin sees new order queue.
2. Opens order and customer/contact details.
3. Confirms current stock/payment method.
4. Applies allowed fulfillment transition.
5. Internal notes remain private.
6. Customer-visible update triggers notification once.
7. Action and actor recorded in audit trail.

### WF-A03 — Manual payment verification
1. Payment operator opens pending queue.
2. Reviews order amount, reference and private proof.
3. Checks actual Easypaisa/bank receipt.
4. Selects Verify/Reject/Request New Proof.
5. Adds required reason when rejecting/requesting.
6. Payment state updates exactly once.
7. Customer is notified.

### WF-A04 — Inventory alert
1. Stock movement commits.
2. System evaluates threshold crossing.
3. One alert is created per variant/threshold episode.
4. Admin sees alert and stock detail.
5. Admin adjusts only with reason.
6. Duplicate alert is suppressed until reset/re-arm condition.

### WF-A05 — Notification operations
1. Admin configures provider through protected settings.
2. Tests connection safely.
3. Reviews template versions.
4. Creates a campaign draft.
5. Previews eligible audience and exclusions.
6. Sends internal test.
7. Approver authorizes campaign.
8. Worker delivers and tracks provider events.
9. Admin monitors bounce/complaint/backlog.
10. Admin pauses campaign if risk threshold is reached.

## 10. Global error and recovery flows

Every flow must define:
- session expired;
- no network;
- API timeout;
- database/storage unavailable;
- stock conflict;
- invalid/archived product;
- unauthorized/forbidden;
- payment submission rejected;
- invoice PDF unavailable;
- email provider unavailable;
- notification delivery delayed;
- campaign paused;
- browser back/refresh;
- duplicate action.

Core checkout/order records must not be lost because a secondary email/PDF provider is down.

## 11. Product image inspection workflow

### WF-C14 — Inspect product image, fabric and stitching
1. Customer opens Product Studio.
2. Gallery shows front image and available thumbnails.
3. Customer hovers any image on desktop or taps it on mobile.
4. System opens cursor magnifier or zoom viewer for the selected image.
5. If that image has a matching high-resolution zoom source, render a clear 2×–3× crop.
6. Customer moves cursor/drag to inspect fabric, seams, stitching, buttons, collar or other visible detail.
7. Customer selects another thumbnail.
8. System clears previous image's lens/pan state and loads the newly selected image's own zoom source.
9. Customer can zoom/reset/close or move next/previous through gallery.
10. Customer exits viewer and continues size/color selection and purchase.

Rules:
- Every gallery image is independently inspectable.
- Zoom source is tied to image ID and selected variant.
- Do not reuse the first image's zoom crop for other gallery items.
- If no high-resolution source exists, show a normal lightbox/fit-to-screen image.
- Zoom does not require 3D and never blocks Add to Cart.

