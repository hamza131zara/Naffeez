# Phase 5 — QA, Security and Performance Execution Plan

**Document ID:** NAF-P5-QA-001  
**Version:** 1.0  
**Status:** Planned; execute against a fixed release candidate

## 1. Entry requirements

- Phase 5 P0 features are implemented.
- Staging environment and representative synthetic data exist.
- Build SHA and dependency lockfile are frozen for test run.
- Test accounts exist for guest, customer A/B, payment operator, manager and owner.
- Payment QR is a test asset; no real transfer is used unless owner approves a controlled test.
- No real customer PII is copied to staging.

## 2. Step-by-step QA workflow

### QA-001 — Baseline build and static quality
Run format, lint, typecheck, production build, dependency audit and CI.
Record command, version, exit code and commit SHA.

### QA-002 — Requirements traceability
Map every P0 PRD requirement to a test case and result. Record accepted exceptions.

### QA-003 — Unit tests
Test price arithmetic, rounding, filters, variant eligibility, inventory, state transitions, idempotency, invoice snapshots, number allocator and notification routing.

### QA-004 — Component tests
Test nav, theme toggle, carousel pause, product cards, gallery, size selector, dialogs, forms, filter drawers, notification preferences, unsubscribe and admin campaign controls.

### QA-005 — Database tests
Test constraints, foreign keys, atomic operations, concurrent last-stock purchase, idempotency and migration rollback/recovery where applicable.

### QA-006 — RLS and authorization
Test anon, Customer A, Customer B, Payment Operator, Store Manager and Owner. Verify both allowed and forbidden operations, including storage object access.

### QA-007 — Storefront E2E
Home → category → search/filter → product studio → wishlist/compare → cart → checkout.

### QA-008 — COD journey
Create COD order, confirm cod_due state, verify invoice, advance fulfillment, record COD collection only after actual collection.

### QA-009 — QR journey
Display QR → submit reference/proof → pending verification → admin verifies/rejects → customer sees state. Confirm upload itself never changes payment to verified.

### QA-010 — Inventory concurrency
Two test sessions attempt last unit simultaneously. Confirm no oversell. Test cancellation/release and duplicate release.

### QA-011 — Invoice checks
Test invoice uniqueness, snapshot immutability, customer/admin access, IDOR denial, PDF layout, mobile rendering and regeneration after file loss.

### QA-012 — Email transactional checks
Trigger each approved transactional event. Check recipient, subject, correct localized/English copy, status URL, invoice access, deduplication, retry and no duplicate sends.

### QA-013 — Marketing consent checks
Test opt-in unchecked by default, consent captured only after affirmative action, email verification, category preference, frequency, unsubscribe, one-click unsubscribe, global opt-out, resubscribe and no send to suppressed/unconfirmed contacts.

### QA-014 — Campaign tests
Preview audience count; exclude unsubscribed, bounced, complained and unconfirmed recipients; test send only to internal allowlist; scheduled send; cancel/pause; duplicate campaign prevention; article/product/offer link correctness.

### QA-015 — Delivery event tests
Simulate delivered, hard bounce, soft bounce/delay, complaint, provider rejection and webhook duplicate/out-of-order delivery. Confirm idempotent processing and suppression logic.

### QA-016 — Admin alert tests
New order, QR pending, stock threshold, out of stock, invoice failure, outbox backlog, email provider outage and webhook failure. Confirm correct role/channel and no noisy duplicate alerts.

### QA-017 — Security abuse tests
IDOR, privilege escalation, CSRF/origin, injection, XSS, rate limit, upload signature, oversized media, signed URL expiry, secret exposure, session expiry and brute-force safeguards.

### QA-018 — Accessibility
Keyboard-only, screen reader, labels, focus order, dialog focus trap, error announcement, contrast in both themes, target sizes and reduced motion.

### QA-019 — Responsive matrix
320px, 375px, 768px, 1024px, 1280px and wide desktop. Check shop, Product Studio, cart, checkout, invoice, account and admin tables.

### QA-020 — Performance
Measure Home, Shop, Product Studio, Cart, Checkout, Journal and Admin. Record LCP, INP, CLS, JS bytes, image bytes, server latency, database query time and error rates under representative mobile conditions.

### QA-021 — SEO/content
Check title/description, canonical, sitemap, robots, product/article structured data, alt text, noindex for admin/account/checkout, no draft content exposure and broken links.

### QA-022 — Failure recovery
Simulate DB unavailable, storage unavailable, email provider timeout, PDF render failure, webhook delay, duplicate webhook, queue backlog, cron missed run and deploy rollback.

### QA-023 — Regression
Run the complete P0 suite after fixes; attach results to release candidate.

### QA-024 — Final report
For each issue record severity, steps to reproduce, expected/actual, environment, screenshots/log correlation ID, owner and retest result.

## 3. Notification-specific acceptance tests

- Login alone does not set marketing consent.
- Order confirmations and essential fulfillment updates are sent to the transaction email provided for that order.
- Marketing categories are independent and require affirmative subscription.
- A new article/product/offer cannot send a campaign automatically without admin preview and approval.
- A recipient unsubscribing from offers continues to receive permitted order messages.
- A global marketing unsubscribe suppresses all marketing categories but not essential transactional messages.
- Hard bounce and spam complaint suppress future marketing sends.
- Provider webhook events are signature-verified and idempotent.
- Campaign audience snapshot is recorded at send time.
- A campaign cannot be sent twice by repeated button clicks.
- Admin test-send is restricted to approved test addresses.
- The admin dashboard shows sent, delivered, bounced, complained and failed counts where provider events are available.
- Opens/clicks are optional analytics; never treat pixel opens as reliable proof of interest.

## 4. Severity and release rules

- Critical: cross-customer data exposure, admin takeover, false payment verification, order/stock corruption, secret leakage or widespread outage. Blocks release.
- High: checkout, invoice, admin payment review or required transactional email failure. Blocks release.
- Medium: partial capability failure with safe workaround.
- Low: cosmetic/noncritical defect.

Never hide failures by lowering severity without written rationale and owner approval.

## 5. Release report template

- Release candidate/version/commit SHA.
- Environment and test data description.
- Test command/tool versions.
- Total/pass/fail/skipped counts.
- P0 traceability status.
- Security/RLS results.
- Payment/order/invoice results.
- Notification/consent/delivery results.
- Performance metrics.
- Accessibility/responsive results.
- Open defects and accepted risks.
- QA owner and owner approval.
