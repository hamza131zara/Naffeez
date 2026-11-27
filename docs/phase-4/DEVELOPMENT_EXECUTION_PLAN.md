# Phase 4 — MVP Development Execution Plan

**Document ID:** NAF-P4-DEV-001  
**Version:** 1.0  
**Status:** Planned; start only after Phase 2 approval

## 1. Development rules

- Build only from approved Phase 1/2 contracts.
- Start from main and use focused feature branches and PRs.
- Inspect repo state before changing files; preserve any existing work.
- Keep strict TypeScript and small, isolated feature modules.
- Keep order, price, inventory, payment and invoice rules server-side.
- Avoid adding packages without a specific requirement.
- Do not implement deferred AI/try-on/3D as MVP blockers.
- Every task ends with test evidence and documentation update.

## 2. Milestone 0 — Repository and project foundation

### DEV-0001 — Repository audit
Inspect branches, current tree, issue/PR status, README, docs, package managers, CI, secrets and deployment config.
**Done when:** an inventory report exists and no file is overwritten without review.

### DEV-0002 — Scaffold decision
Select Next.js stable release, Node runtime, package manager, exact package versions and lockfile after checking current official docs.
**Done when:** stack decision and versions are recorded in ADR and package lock committed.

### DEV-0003 — Quality scripts
Configure format, lint, typecheck, unit test, production build and CI checks.
**Done when:** clean baseline commands run locally and in CI.

### DEV-0004 — Environment templates
Create .env.example with variable names and safe placeholder descriptions only; validate env at startup.
**Done when:** no real credentials exist in repository or client bundles.

### DEV-0005 — Contribution rules
Document branch naming, commit style, PR checklist, review, test evidence and secret rules.
**Done when:** every PR can use the same workflow checklist.

## 3. Milestone 1 — Visual system and app shell

### DEV-0101 — Theme tokens
Implement semantic light/dark/system tokens and no-flash initialization.
### DEV-0102 — Responsive shell
Implement max-width containers, grid, breakpoints, spacing and typography.
### DEV-0103 — Shared primitives
Buttons, fields, select, checkbox, radio, tooltip, dialog, drawer, toast, badge, skeleton, empty/error states.
### DEV-0104 — Accessibility baseline
Focus rings, keyboard behavior, aria labels, reduced motion, contrast and touch targets.
### DEV-0105 — Navigation
Announcement bar, desktop header, mobile drawer, category menus, search trigger, account/wishlist/cart/theme.
### DEV-0106 — Footer and policies
Build footer links and policy page shells; publish only owner-approved text.
**Milestone gate:** shared shell is responsive in both themes and has component tests.

## 4. Milestone 2 — Supabase and security foundation

### DEV-0201 — Supabase project/environment
Configure local/test project and environment values.
### DEV-0202 — Schema migrations
Create migration files using installed CLI guidance; apply locally first.
### DEV-0203 — RLS/grants
Implement explicit table grants and per-table RLS; add allow/deny tests.
### DEV-0204 — Auth integration
Implement chosen email/OTP/recovery flow and secure session handling.
### DEV-0205 — Admin membership
Seed/grant owner membership through a controlled server/admin operation; never permit self-elevation.
### DEV-0206 — Storage buckets
Create product-media, homepage-media, QR, payment-proof and invoice storage with intended public/private boundaries.
### DEV-0207 — Audit events
Create server-side audit writer for sensitive admin/payment/stock/role/config actions.
**Milestone gate:** security tests prove customer separation and admin-only access.

## 5. Milestone 3 — Product and editorial management

### DEV-0301 — Category management
Create approved taxonomy and admin ordering/activation controls.
### DEV-0302 — Product editor
Basic info, slug, description, SEO, category and publication lifecycle.
### DEV-0303 — Media manager
Multiple images, alt text, ordering, replacement, validation and optimized delivery.
### DEV-0304 — Variants
Size, color, SKU, price override, active state.
### DEV-0305 — Inventory
On-hand/reserved quantities, adjustment reason, movement ledger, low-stock threshold.
### DEV-0306 — Collections
New arrivals, seasonal and manual featured/best-seller collections.
### DEV-0307 — Homepage content
Announcement, hero slides and featured sections with preview/scheduling.
### DEV-0308 — Journal CMS
Article draft, preview, schedule, publish, archive, cover image, body, tags, SEO and related products.
**Milestone gate:** admin can publish a valid product and article; only published content is public.

## 6. Milestone 4 — Storefront and discovery

### DEV-0401 — Homepage
Build section sequence and responsive campaign visual.
### DEV-0402 — Category/shop pages
Build taxonomy and product grids.
### DEV-0403 — Search
Search name/description/tags, query validation and empty states.
### DEV-0404 — Filters/sort
Derived options, multi-select, price range, active chips, clear, sort.
### DEV-0405 — Product card
Image hover, wishlist, compare, quick view and select options.
### DEV-0406 — Product Studio
Gallery/zoom, variant selection, price, size guide, stock and purchase controls.
### DEV-0407 — Wishlist and compare
Persist appropriately for guest/session and authenticated user; enforce max 4 compare items.
### DEV-0408 — Journal pages
Listing/article view, related products, related articles and share links.
**Milestone gate:** product discovery works without login and without WebGL/AI.

## 7. Milestone 5 — Cart, inventory and checkout

### DEV-0501 — Cart state
Implement local/session cart and merge behavior if user signs in.
### DEV-0502 — Server quote
Recalculate product, variant, price, quantity, shipping/discount configuration and total.
### DEV-0503 — Transaction command
Implement atomic order creation, stock reservation and idempotency.
### DEV-0504 — COD checkout
Create COD order with cod_due/payable-on-delivery status.
### DEV-0505 — QR payment methods
Admin-managed Easypaisa and bank QR images/instructions.
### DEV-0506 — Transfer submission
Transaction reference/proof upload via private object storage.
### DEV-0507 — Admin payment review
Verify/reject/request new proof; record actor/reason/time; prevent double approval.
### DEV-0508 — Order management
Valid fulfillment transitions and status event history.
**Milestone gate:** COD and QR test journeys pass, including invalid, duplicate and failure cases.

## 8. Milestone 6 — Invoice service

### DEV-0601 — Invoice snapshot
Create immutable seller/order/line/total snapshot as part of order transaction.
### DEV-0602 — Number allocator
Use atomic counter/sequence and unique constraint.
### DEV-0603 — PDF rendering
Render only from stored snapshot; use controlled template fields.
### DEV-0604 — Customer access
Owner or verified guest capability check; private file or authorized stream.
### DEV-0605 — Admin access
Role-checked invoice list, order linkage and PDF download.
### DEV-0606 — Recovery
Regenerate missing PDF from unchanged snapshot.
**Milestone gate:** invoice parity and cross-customer access-denial tests pass.

## 9. Milestone 7 — Notifications and alerts

Implement in this order:
1. Notification domain types and event catalogue.
2. Customer marketing consent/preferences and consent history.
3. Notification outbox and idempotency/deduplication.
4. Transactional email templates and provider adapter.
5. Event triggers for order created, payment pending/verified/rejected, order status and invoice availability.
6. In-app notification inbox and unread count.
7. Admin alert routing for new orders, QR review, stock thresholds and system failures.
8. Provider webhook receiver for delivered, bounced, complained and delayed events.
9. Suppression/unsubscribe and preference center.
10. Journal/product/offer campaign draft builder.
11. Admin audience preview, test send, approval and scheduled campaign.
12. Campaign analytics and resend safeguards.
13. Delivery logs and operational dashboard.
**Milestone gate:** transactional messages work; marketing goes only to explicitly opted-in contacts; unsubscribe/suppression is respected before every send.

## 10. Milestone 8 — Admin experience and operational finish

### DEV-0801 — Admin dashboard
Real counts and operational queues.
### DEV-0802 — Order/payment queues
Search, status filters, review details and audit.
### DEV-0803 — Subscriber and preferences
View consent status and preference history with privacy restrictions; do not expose raw secrets.
### DEV-0804 — Campaign manager
Create, preview, test, approve, schedule, pause/cancel and report campaign.
### DEV-0805 — Integration settings
Provider selection, masked credentials, health test, enable/disable and audit.
### DEV-0806 — Store settings
Contact, WhatsApp, shipping, COD and invoice fields.
**Milestone gate:** authorized admin can operate core store and communications without editing code.

## 11. Milestone 9 — SEO, analytics and release preparation

- Metadata and canonical URLs.
- Product/Article structured data only when accurate.
- Sitemap and robots.
- Consent-aware analytics; avoid sensitive personal event payloads.
- Error boundaries and request correlation IDs.
- Image and font optimization.
- Final content and broken-link audit.
- Staging deployment and test data reset.
**Milestone gate:** application is feature complete for Phase 4 QA; no production launch yet.

## 12. Definition of done for every development task

- Requirement ID linked.
- Design/state coverage reviewed.
- Server validation and permission boundary implemented.
- Unit/component/integration test added where relevant.
- Loading, empty, success and error states implemented.
- Keyboard/mobile behavior checked.
- Logs scrubbed of secrets/PII.
- Documentation updated.
- PR diff reviewed.
- CI checks pass.
- No claim of completion without proof.
