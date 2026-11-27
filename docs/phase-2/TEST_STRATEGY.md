# Naffeez — Test Strategy and Quality Gates

**Document ID:** NAF-P2-QA-001  
**Version:** 0.1.0  
**Status:** Draft  
**Last updated:** 2026-11-28

## 1. Quality objectives

Prove that shopping, stock, order, payment, invoice and admin behavior is correct and secure. Visual polish alone is not release evidence.

## 2. Test layers

| Layer | Tool proposal | Main coverage |
|---|---|---|
| Static | TypeScript strict, ESLint, formatter | Type errors and code hygiene |
| Unit | Vitest | Pricing, validation, state transitions, formatting |
| Component | Testing Library + Vitest | Accessible interactive states |
| Database | Supabase CLI DB tests / pgTAP where supported | Constraints, transactions, RLS allow/deny |
| API integration | Vitest or request-level tests | Server validation, authorization, error contract |
| E2E | Playwright | Critical shopper and admin journeys |
| Performance | Lighthouse/field metrics/k6 as appropriate | Core Web Vitals, load and DB hot paths |
| Security | Dependency audit, manual threat checks, upload probes | Auth, access control, secret exposure, injection |

Keep packages to the minimum required; do not add overlapping test frameworks without reason.

## 3. Unit test requirements

- Money calculations and rounding.
- Cart line and order totals.
- Shipping/discount rules once configured.
- Variant availability and quantity limits.
- Order/payment/fulfillment transition rules.
- Invoice numbering validation and snapshot serialization.
- Product publish eligibility.
- Integration adapter timeout/error mapping.
- Query/filter parsing and allowlisted sorting.
- Phone/email/checkout schema validation.

## 4. Database and RLS test requirements

Run each relevant operation as:
- anon;
- authenticated customer A;
- authenticated customer B;
- authorized payment operator;
- store manager;
- owner/super admin;
- server-only privileged role where used.

Test:
- public catalog reads only published records;
- anon cannot write catalog/inventory/orders/private records;
- Customer A cannot read/update Customer B's profile/address/wishlist/order/invoice;
- role metadata cannot elevate a customer;
- admin role revocation blocks the next sensitive server request;
- private proof/invoice storage denies unauthorized access;
- payment verification cannot be repeated or forged;
- table grant and RLS behavior are both correct.

## 5. Critical end-to-end journeys

### Customer
1. Browse homepage and navigate men's categories.
2. Search, filter, sort and clear filters.
3. Open product in Product Studio.
4. Select size/color and add to cart.
5. Change quantity/remove item.
6. Checkout as guest using COD.
7. View order confirmation and invoice.
8. Repeat checkout using QR method.
9. Submit reference/proof and see Pending Verification.
10. Access invoice after sign-in/guest verification.
11. Verify another customer cannot access order/invoice.

### Admin
1. Admin login and role rejection for customer.
2. Create draft product and upload images.
3. Add variants and stock.
4. Preview and publish product.
5. Update stock with a reason.
6. Confirm/process/ship/deliver order using valid transitions.
7. Review QR proof and verify/reject.
8. Download customer invoice.
9. Update homepage slide and payment QR configuration.
10. Confirm every sensitive action appears in audit history.

## 6. Concurrency and failure tests

- Last-unit simultaneous checkout race.
- Double-click/place-order retry with same idempotency key.
- Database failure during transaction creates no partial order/reservation.
- PDF storage failure does not lose order/invoice snapshot.
- Payment provider/config is disabled or missing; checkout displays safe alternative.
- Storage outage does not expose private files or corrupt order state.
- Expired guest access token is denied.
- Invalid/oversized/malicious file upload is rejected.
- Repeated payment approval is rejected.
- Network interruption during admin action does not create duplicate state change.

## 7. Responsive and accessibility matrix

Test at minimum:
- 320px and 375px mobile;
- common tablet width;
- 1280px desktop;
- wide desktop.

Test light and dark themes. Verify keyboard navigation, focus order, contrast, form labels, modal focus management, screen-reader status announcements, touch targets and reduced-motion behavior.

## 8. Performance acceptance

Targets:
- LCP <= 2.5 seconds.
- INP <= 200ms.
- CLS <= 0.1.

Measure key routes: home, shop/category, Product Studio, cart, checkout and admin dashboard. Measure realistic mobile/network conditions. Optimize images, fonts, JS bundles, server queries and caching separately. 3D is not part of MVP performance gates.

## 9. Release gates

### Pull request gate
- lint, typecheck, unit tests and build pass;
- relevant database/API tests pass;
- no secrets committed;
- diff reviewed.

### MVP QA gate
- every P0 journey passes;
- all high-risk RLS/authorization tests pass;
- no unresolved critical/high defects;
- invoice and manual payment behavior verified;
- responsive/accessibility checks complete.

### Production gate
- production smoke tests pass;
- backup/export and rollback procedures available;
- monitor and alert path tested;
- owner approves launch.

## 10. Defect severity

- Critical: data exposure, privilege escalation, payment/order corruption, checkout bypass or widespread outage. Blocks release.
- High: core purchase/admin/invoice flow broken or serious accessibility/performance issue. Blocks release.
- Medium: significant partial behavior or usability issue with workaround.
- Low: cosmetic or low-impact issue.

QA report must include environment, commit SHA, test command, result, reproducible evidence and unresolved risk. Never claim tests passed if they were not executed.


## 11. Notification and email test cases

### Consent and preferences
- New account starts with marketing topics unchecked.
- Email verification alone does not opt the customer into marketing.
- Checkout email alone does not opt the customer into marketing.
- Opt-in for Products only does not qualify for Offers or Journal.
- Topic change is saved and effective before the next campaign dispatch.
- Global unsubscribe suppresses all marketing.
- Transactional order updates still work after marketing unsubscribe.
- Unconfirmed address is excluded from marketing audience.
- Suppression remains effective after import, merge or campaign audience refresh.

### Transactional events
- Each order/payment/fulfillment/invoice event sends expected template to correct address.
- Duplicate event does not send duplicate email.
- Provider outage leaves the message queued and checkout successful.
- Temporary failure retries within the bounded policy.
- Permanent failure is surfaced to admin.
- Template missing/disabled is handled safely and creates alert.

### Campaign operations
- Audience preview count matches actual eligible subscriber rows.
- Draft/test/approved/scheduled/sending/paused/completed transitions are valid.
- Unapproved campaign cannot be scheduled or sent.
- Test-send is limited to internal allowlist.
- Repeated send click does not duplicate recipients.
- Unsubscribe immediately before dispatch prevents the send.
- Product/article publication alone does not send a campaign.
- Invalid, unpublished or expired offer/article/product link blocks campaign approval.

### Webhooks and deliverability
- Invalid provider signature rejected.
- Duplicate provider event is idempotent.
- Out-of-order delivered/bounce/complaint events resolve to safe terminal state.
- Hard bounce and complaint suppress address immediately.
- Soft bounce follows limited retry policy.
- One-click unsubscribe request is processed without login and is idempotent.
- Provider webhook outage generates operational alert.

### Admin alerts
- New order and new QR submission alert correct role.
- Low-stock alert only fires at threshold crossing or configured repeat window.
- Alert dedupe prevents noisy repeats.
- Critical provider/outbox issue alerts owner.
- Acknowledgement/resolution actions are authorized and audited.

