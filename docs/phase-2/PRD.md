# Naffeez — Product Requirements Document

**Document ID:** NAF-P2-PRD-001  
**Version:** 0.1.0  
**Status:** Draft for owner review  
**Baseline:** Phase 1 UI/UX v1.0  
**Last updated:** 2026-11-28

## 1. Purpose

This document converts the accepted Phase 1 product/UI/UX baseline into testable requirements. Phase 1 remains authoritative for visual direction and screen behavior. This PRD defines launch scope, actors, functional requirements, priorities, constraints and acceptance gates.

## 2. Product definition

Naffeez is an English-language men's fashion e-commerce store for Pakistan, with PKR pricing. The MVP provides product discovery, a dedicated Product Studio product page, cart, guest checkout, COD and manually verified Easypaisa/bank QR transfers, WhatsApp contact, order management, inventory management and downloadable invoices for customers and admins.

AI styling, face preview, virtual try-on, event styling and advanced 3D are explicitly deferred. The MVP must not depend on them.

## 3. Users and roles

| Actor | Primary goals | Access boundary |
|---|---|---|
| Guest shopper | Browse, search, compare, add to cart and place order | Public catalog and own guest checkout/order capability |
| Customer | Manage profile, orders, wishlist, addresses and invoices | Own customer records only |
| Owner/Super Admin | Configure and operate the whole store | Full authorized admin access |
| Store Manager | Manage products, stock, collections, content and orders | Granted operational permissions |
| Order/Payment Operator | Process orders and review manual transfer proof | Order/payment operations only |
| System | Validate totals, reserve stock, issue invoice numbers and record events | Server/database-controlled operations |

Admin privileges must be assigned through a protected administrative process, never through customer-editable profile metadata.

## 4. Launch scope

### P0 — Required for first production release

1. Responsive homepage with announcement bar, navigation, editorial carousel, category shortcuts, product sections, brand section and footer.
2. Light, Dark and System theme behavior.
3. Men's-only catalog taxonomy: Casual Shirts, Dress Shirts, Seasonal Trousers, Winter Trousers and Hoodies.
4. Admin-managed products, images, pricing, variants, sizes, colors, collections and inventory.
5. Shop/category pages, search, filters, sorting and real result counts.
6. Product cards with image/title navigation, wishlist, Quick View, compare and Select Options.
7. Dedicated Product Studio product detail.
8. Cart with server-side price/stock revalidation.
9. Guest checkout.
10. COD checkout and order creation.
11. Easypaisa/bank QR instructions, transaction reference and/or proof submission, and manual admin verification.
12. Order confirmation and customer-accessible order/invoice view.
13. Invoice numbering, invoice snapshot and PDF view/download for authorized customer and admin.
14. Admin dashboard for products, inventory, orders, payments, invoices, collections, homepage content and store settings.
15. WhatsApp product/support link.
16. Privacy, terms, shipping/returns, size guide and contact pages with owner-approved content.
17. Security, accessibility, SEO and performance baseline.

### P1 — May follow the minimum transactional release

- Full compare page if schedule requires a reduced launch.
- Customer accounts and cross-device saved wishlist/address history if authentication configuration is not ready.
- Order lookup/tracking enhancements.
- FAQs and extended editorial content.
- Reviews, promotions and advanced analytics only after real operational requirements exist.

The owner must approve any P0-to-P1 downgrade before launch.

## 5. Functional requirements

### Catalog and discovery

| ID | Requirement | Priority |
|---|---|---|
| CAT-001 | Display only published, active men's products | P0 |
| CAT-002 | Support the five approved launch subcategories | P0 |
| CAT-003 | Search product name, description and approved tags | P0 |
| CAT-004 | Filter by category, available size, color, PKR price, stock, collection, style and occasion where data exists | P0 |
| CAT-005 | Sort featured, newest, price ascending/descending and popularity only when real data supports it | P0 |
| CAT-006 | Display accurate result counts and active filter chips | P0 |
| CAT-007 | Keep filter state shareable in URL query parameters where practical | P1 |

### Product experience

| ID | Requirement | Priority |
|---|---|---|
| PDP-001 | Product image/title opens the dedicated Product Studio route | P0 |
| PDP-002 | Show gallery, title, description, PKR price, stock and variant details | P0 |
| PDP-003 | Require an available size/color variant before adding when variants apply | P0 |
| PDP-004 | Provide Quick View as a lightweight alternative to full navigation | P0 |
| PDP-005 | Support wishlist and a maximum of four comparison items | P0/P1 |
| PDP-006 | Provide WhatsApp enquiry without leaking private customer data | P0 |

### Cart and checkout

| ID | Requirement | Priority |
|---|---|---|
| ORD-001 | Cart supports quantity changes/removal and displays line/order totals | P0 |
| ORD-002 | Server recalculates current prices, discounts, stock, shipping and total before order creation | P0 |
| ORD-003 | Guest checkout is allowed | P0 |
| ORD-004 | COD orders are marked Payable on Delivery, not Paid | P0 |
| ORD-005 | QR transfer orders remain Pending Verification until an authorized admin verifies receipt | P0 |
| ORD-006 | Checkout/order submission is idempotent against accidental duplicate requests | P0 |
| ORD-007 | Inventory reservation/decrement is atomic and cannot oversell | P0 |
| ORD-008 | Customer sees an order reference and invoice access after successful order creation | P0 |

### Manual payment

| ID | Requirement | Priority |
|---|---|---|
| PAY-001 | Admin can enable/disable Easypaisa and bank-transfer instructions separately | P0 |
| PAY-002 | Admin can configure approved QR image and display instructions | P0 |
| PAY-003 | Customer can enter a transaction reference and/or submit proof according to configured policy | P0 |
| PAY-004 | Payment proof is private and visible only to authorized parties | P0 |
| PAY-005 | Admin can verify, reject or request replacement proof with an audit reason | P0 |
| PAY-006 | Customer-entered reference or image upload never automatically proves payment | P0 |

### Invoice

| ID | Requirement | Priority |
|---|---|---|
| INV-001 | Issue one unique invoice number for each qualifying order | P0 |
| INV-002 | Store immutable order-line and monetary snapshot | P0 |
| INV-003 | Customer can view, print and download PDF | P0 |
| INV-004 | Authorized admin can view and download the same invoice | P0 |
| INV-005 | Unauthorized users cannot access invoices by guessing identifiers | P0 |
| INV-006 | PDF generation failure is recoverable and does not lose the order | P0 |

### Admin

| ID | Requirement | Priority |
|---|---|---|
| ADM-001 | Admin can create/edit/archive and publish products | P0 |
| ADM-002 | Admin can manage product variants and inventory | P0 |
| ADM-003 | Admin can manage categories, collections and homepage slides | P0 |
| ADM-004 | Admin can review orders and apply valid status transitions | P0 |
| ADM-005 | Admin can review manual transfer submissions and record decisions | P0 |
| ADM-006 | Admin can access invoices and operational settings | P0 |
| ADM-007 | Sensitive administrative actions are audit logged | P0 |
| ADM-008 | Admin routes and actions enforce server-side role permissions | P0 |

## 6. Non-functional requirements

- Core Web Vitals targets: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 at the 75th percentile when real-user data is available.
- Support 320px mobile width through wide desktop layouts.
- Keep catalog/product pages usable without WebGL or 3D.
- Use responsive AVIF/WebP and lazy-load below-the-fold media.
- No customer photo collection in MVP.
- No secrets in browser bundles or Git.
- Enable RLS on exposed data tables and define explicit privileges and policies.
- Retain accessible keyboard/touch behavior and reduced-motion preferences.
- Keep error reporting useful but scrub customer/payment data and secrets.

## 7. Out of scope for MVP

- AI stylist generation.
- Face compositing or virtual try-on.
- Customer photo uploads for outfit generation.
- Full 3D virtual showroom.
- Automatic Easypaisa/bank payment confirmation unless an approved official integration is selected.
- Automated WhatsApp messaging unless a compliant provider is approved.
- Multi-vendor marketplace, loyalty points and subscriptions.

## 8. Acceptance and release gate

A feature is accepted only when its success path, permission boundary, failure state and test evidence exist. Before MVP development is considered complete, all P0 requirements must be implemented and verified in a non-production environment. QA and production readiness are separate gates.

## 9. Owner decisions still open

1. Approved size chart and measurements.
2. Delivery cities/areas, shipping fee and expected delivery wording.
3. COD availability rules.
4. Return/exchange policy.
5. QR/account display information and approved QR images.
6. Whether transfer reference, proof image or both are mandatory.
7. Customer authentication/recovery method and transactional email/SMS provider.
8. Invoice legal/business details and final number format.
9. Product photo and copy standards.
10. Staff identities and role assignments.
11. Production hosting/budget decision.


## 10. Journal, notifications and communication requirements

### Editorial/Journal
- JOUR-001: Admin can create, edit, preview, schedule, publish and archive articles.
- JOUR-002: Public Journal listing shows only published articles.
- JOUR-003: Article detail supports cover image, title, summary, body, publication date, tags, SEO fields and related products.
- JOUR-004: Publishing an article never sends an email campaign by itself.
- JOUR-005: An authorized admin can create a campaign draft from a published article.

### Customer notification preferences
- NOT-PREF-001: Email verification/account email and marketing consent are separate.
- NOT-PREF-002: Marketing topic controls are unchecked by default.
- NOT-PREF-003: Account creation, checkout email and purchase do not imply marketing consent.
- NOT-PREF-004: Customer can opt into New Products, Offers & Discounts, Journal/Articles, Seasonal Campaigns and optional General Brand News independently.
- NOT-PREF-005: Customer can change frequency, pause selected topics, or unsubscribe from all marketing.
- NOT-PREF-006: Consent changes retain an audit record of topic, channel, source, consent text version, time and confirmation state.
- NOT-PREF-007: Marketing is sent only to confirmed addresses with active topic consent and no suppression.
- NOT-PREF-008: Transactional order/account/security messages remain separate from marketing preferences.
- NOT-PREF-009: Marketing email includes a visible preference/unsubscribe path and one-click unsubscribe support.
- NOT-PREF-010: Customers can view and manage in-app notifications.

### Transactional notification requirements
- NOT-TX-001: Send order received/confirmation for COD.
- NOT-TX-002: Send QR payment instructions and pending state for manual transfer.
- NOT-TX-003: Send payment submission received, verified, rejected or new-proof-requested message.
- NOT-TX-004: Send approved fulfillment status changes.
- NOT-TX-005: Make invoice-ready notification available after order/invoice creation.
- NOT-TX-006: Send account verification and recovery messages.
- NOT-TX-007: Every event uses an idempotent outbox/deduplication key; retry must not create duplicate customer messages.

### Marketing campaigns
- MKT-001: Admin can create Product, Article, Offer, Seasonal and Digest campaigns.
- MKT-002: Audience is selected by consent topic and eligibility, not raw email export.
- MKT-003: Audience preview shows eligible, unconfirmed, unsubscribed, suppressed and excluded counts.
- MKT-004: Admin can preview desktop/mobile/plain text and send an internal test.
- MKT-005: Campaign requires an authorized approval action before send/schedule.
- MKT-006: Campaign stores its audience snapshot, sender/template version and approval details.
- MKT-007: Campaign can be paused/cancelled for unsent recipients.
- MKT-008: Frequency caps and quiet-hour settings are configurable and enforced server-side.

### Admin/system alerts
- ALERT-001: Alert for new order.
- ALERT-002: Alert for new QR proof/payment submission.
- ALERT-003: Alert for pending verification older than configured threshold.
- ALERT-004: Alert for low/out-of-stock variants.
- ALERT-005: Alert for invoice/PDF generation failure.
- ALERT-006: Alert for email provider outage, webhook failure or notification outbox backlog.
- ALERT-007: Alert for unusual bounce/complaint spike and pause campaign if configured guardrail is crossed.
- ALERT-008: Alert for admin role, payment settings or integration credential changes.
- ALERT-009: Alerts are routed by role/severity, acknowledgeable and auditable.

## 11. Notification acceptance tests

- Login with an email and no marketing selection: no marketing campaign is eligible.
- Customer chooses only New Products: product campaigns eligible; offers/articles excluded.
- Customer unsubscribes from Offers: future offer campaigns excluded immediately; order emails remain enabled.
- Customer globally unsubscribes: all marketing topics suppressed; essential transactional events continue.
- Unconfirmed address: no marketing campaign send.
- Hard bounce or complaint: address enters suppression before another campaign is sent.
- Provider webhook arrives twice: one state transition only.
- Campaign send action clicked twice: no duplicate campaign delivery.
- Product/article publish: no auto-send.
- New campaign uses only currently published and valid destination content.
- Provider outage: order creation succeeds; email remains queued and admin is alerted.

## 12. Priority changes

- P0: transactional email events, in-app order/payment notifications, customer notification settings shell, explicit consent capture/storage, suppression/unsubscribe, admin alerts for new orders/QR review/stock/critical failures.
- P1: Journal CMS and pages if the first content batch is not ready; marketing campaign composer, scheduled campaigns, weekly digest and delivery analytics. The opt-in data model and privacy behavior remain P0 even if campaign UI launches later.
- Later: browser push, SMS, automated WhatsApp messages, AI-personalized marketing and advanced segmentation.

## 13. Notification launch-tier clarification

This section clarifies the priority split in Section 12 and takes precedence if the earlier summary is read as deferring all campaigns.

**P0 notification launch capability**
- Transactional order/account/payment/invoice emails.
- Customer notification inbox and preference center.
- Marketing subscriber capture, email confirmation, topic-specific opt-in, topic-level unsubscribe and global marketing unsubscribe.
- Basic admin campaign workflow for Products, Offers and Journal: create draft, choose topic audience, preview eligible count, internal test, approve and send now.
- Current consent/suppression re-check immediately before each send.
- Admin alerts for new orders, QR submissions, low/out-of-stock, invoice failures and critical email/outbox failures.
- Delivery/bounce/complaint webhook processing and suppression.

**P0 editorial/offer capability**
- Basic Journal listing and article detail plus admin draft/preview/publish.
- Basic Offer content record with title, description/terms, campaign image, valid dates, CTA and publication state.
- Campaign email can link to published content only.
- Coupon/discount-code engine is not implied by an Offer content record. If discounts must be automatically applied at checkout, that is a separately specified promotion-pricing feature.

**P1 enhancements**
- Scheduled campaigns and calendar.
- Weekly digest automation.
- Advanced segmentation and automated lifecycle journeys.
- Campaign analytics beyond provider delivery/bounce/complaint basics.
- Back-in-stock and personalized recommendations.
- Advanced article taxonomy/search if content volume requires it.

This priority is intended to deliver the owner's requested email announcements without requiring a complex marketing automation suite before launch.

