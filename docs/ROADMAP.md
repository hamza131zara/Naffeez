# Naffeez — Detailed Phase-Based Delivery Roadmap

**Roadmap version:** 2.0  
**Product baseline:** Phase 1 v1.0 + notification/editorial addendum v1.1  
**Repository:** https://github.com/hamza131zara/Naffeez  
**Production domain:** https://naffeez.com  
**Roadmap status:** Phase 1 accepted; Phase 2 documentation under owner review

## Project delivery rules

1. This roadmap is the execution index. Each phase has a dedicated detailed plan linked below.
2. Phase tasks are performed in dependency order unless the owner approves a documented exception.
3. A task is not complete because a file exists. Its outputs must be reviewed and acceptance criteria met.
4. Product, architecture, security and policy assumptions must be labelled Proposed or Open until approved.
5. Use feature branches and pull requests. Do not commit directly to main for substantive work.
6. Inspect existing repository content before edits; preserve working files.
7. Every implementation task includes tests and documentation updates.
8. No API keys, passwords, service-role keys, production QR/account details, customer data, invoices, payment proofs or personal photos in Git.
9. AI, virtual try-on and advanced 3D remain later modules and must never block core commerce.
10. Any email marketing send requires confirmed address, active topic consent, no suppression, admin approval and working unsubscribe.
11. Core commerce must continue working if email, AI, 3D or any optional provider is unavailable.

## Phase status summary

| Phase | Name | Status | Primary output |
|---|---|---|---|
| 1 | Product definition and UI/UX baseline | Accepted; additive notification/editorial handoff documented | Accepted experience baseline and screen handoff |
| 2 | Technical documentation and architecture | Draft set prepared; expanded review pending | Approved technical contracts and decisions |
| 3 | MVP development | Not started | Working commerce/admin/notification product |
| 4 | QA, security and performance | Not started | Evidence-based release candidate |
| 5 | Deployment and maintenance | Not started | Verified production store and operational runbooks |
| Later | AI Style Studio, virtual try-on and advanced 3D | Deferred | Optional modules after commercial/privacy feasibility review |

---

# Phase 1 — Product definition and UI/UX baseline

**Goal:** define the experience, every important screen, every customer/admin journey, and the expected behavior before code is built.

**Status:** Owner accepted the Phase 1 v1.0 baseline. Journal, email preferences and notification surfaces are recorded as an additive v1.1 addendum. Detailed design handoff is documented separately.

**References:**
- [Phase 1 baseline](phase-1/NAFFEEZ_PHASE_1_UI_UX_SPECIFICATION_v1.0.md)
- [Phase 1 detailed execution and design handoff](phase-1/EXECUTION_AND_DESIGN_HANDOFF.md)
- [Phase 1 Journal and notification addendum v1.1](phase-1/NOTIFICATIONS_AND_JOURNAL_UX_ADDENDUM_v1.1.md)

## P1 — Step-by-step tasks

### P1-01 — Confirm source and scope
- Read Phase 1 baseline and addendum.
- Confirm men's-only categories and current product taxonomy.
- Confirm English-only language and PKR currency.
- Confirm COD and admin-verified Easypaisa/bank QR.
- Confirm admin-managed product entry, invoices, WhatsApp and customer accounts.
- Record deferred AI/try-on/3D features.
**Output:** traceability matrix.
**Acceptance:** no undocumented category or channel is added.

### P1-02 — Brand assets and design tokens
- Collect logo/wordmark and approved brand photography.
- Confirm font licenses and font weights.
- Define light/dark/system semantic tokens.
- Define headings, body typography, spacing, radii, borders and elevation.
- Define glassmorphism surfaces only for selected navigation/overlays/panels.
- Define restrained motion and reduced-motion fallback.
- Check text/control contrast in both themes.
**Output:** brand asset inventory and token sheet.
**Acceptance:** every token has light/dark treatment and components do not hard-code theme-specific colors.

### P1-03 — Global shell and responsive layout
- Design desktop navigation and dropdown behavior.
- Design mobile header and drawer.
- Define search, account, wishlist, compare, cart and theme controls.
- Define announcement bar and footer.
- Define breadcrumbs, buttons, form controls, modals, drawers, toasts and skeletons.
- Define focus, hover, pressed, selected, disabled and loading states.
**Output:** global screen and component handoff.
**Acceptance:** keyboard and touch access; no hover-only action; 320px minimum width.

### P1-04 — Homepage and catalog discovery
- Design hero carousel slides, timing, arrows, pagination and pause behavior.
- Design category shortcuts for Casual Shirts, Dress Shirts, Seasonal Trousers, Winter Trousers and Hoodies.
- Design trending, new arrivals, curated/best-seller and featured collection sections.
- Design Product Studio teaser and Journal teaser.
- Design empty/hidden state when section data is unavailable.
- Design Shop All, category, search, filter, sort, result count and no-result states.
**Output:** homepage and catalog responsive screen inventory.
**Acceptance:** all CTAs lead to real routes; result counts and filter options are data-driven.

### P1-05 — Product cards and Product Studio
- Design image/title navigation.
- Design secondary image hover, wishlist, compare, Quick View and Select Options.
- Design sold-out, sale, new and best-seller badge states.
- Design Product Studio gallery, zoom, variants, size guide, stock, quantity, Add to Cart, Buy Now, WhatsApp and related products.
- Define image failure fallback and unavailable variant behavior.
- Keep heavy 3D out of the default product-page bundle.
**Output:** product card component states and Product Studio screens.
**Acceptance:** no invalid variant can be added to cart.

### P1-06 — Cart, checkout, payment and invoice UX
- Design empty/populated cart and changed-price/stock state.
- Design guest/customer delivery form and validation.
- Design COD state and order review.
- Design QR instructions for desktop and mobile.
- Design transfer reference/proof submission, pending, verified and rejected states.
- Design order confirmation and secure invoice view/download.
- Design invoice A4 print and mobile preview.
**Output:** annotated customer purchase journey.
**Acceptance:** QR display or uploaded proof never appears as confirmed payment.

### P1-07 — Customer account and notifications UX
- Design sign-in, sign-up, email verification and recovery.
- Design profile, addresses, order history and invoices.
- Design notification inbox and unread count.
- Design topic preference center and global unsubscribe.
- Design explicit marketing consent checkboxes, all unchecked by default.
- Separate order/security emails from promotional preferences.
**Output:** account and notification UX.
**Acceptance:** an account email is not automatically a marketing subscription.

### P1-08 — Journal and marketing UX
- Design Journal listing, category/tag view, article detail and related products.
- Design article cover, byline/date, reading layout and SEO/content preview.
- Design newsletter/preference signup for guests and account users.
- Design campaign preview, test-send and unsubscribe states in admin.
**Output:** Journal and campaign screen handoff.
**Acceptance:** only published articles are public; publication alone does not send marketing email.

### P1-09 — Admin operations UX
- Design dashboard, product editor, image manager, variants and inventory.
- Design categories, collections, hero slides and Journal CMS.
- Design orders, payment review, invoices and customer views.
- Design campaign templates, subscribers, consent preferences and delivery logs.
- Design payment/provider settings, staff roles and audit log.
**Output:** admin screen inventory with permissions.
**Acceptance:** sensitive actions require confirmation and permission; secrets are masked.

### P1-10 — Final UX review
- Verify all P0 requirements map to screens and flows.
- Verify desktop/tablet/mobile states.
- Verify light/dark states.
- Verify keyboard/accessibility and reduced motion.
- Verify empty, loading, error, permission-denied and success states.
- Record all remaining owner-provided assets/policies.
**Exit gate:** design handoff is complete enough for Phase 3 feature implementation without inventing core interaction behavior.

---

# Phase 2 — Technical documentation and architecture

**Goal:** translate the accepted experience into detailed, consistent implementation contracts.

**Status:** documentation draft prepared on branch phase-2/technical-documentation. Review and approval are still required; no production architecture is silently finalized.

**References:**
- [Phase 2 documentation index](phase-2/)
- [Phase 2 review checklist](phase-2/PHASE_2_REVIEW_CHECKLIST.md)
- [Notifications and alerts specification](phase-2/NOTIFICATIONS_AND_ALERTS.md)

## P2 — Step-by-step tasks

### P2-01 — Repository and requirement audit
- Inspect README, Phase 1 baseline/addendum and all current Phase 2 documents.
- Confirm route names, product taxonomy and launch priorities.
- Identify requirement duplicates, contradictions and missing owner decisions.
- Establish requirement IDs and traceability.
**Output:** PRD and traceability map.
**Acceptance:** every P0 flow has a requirement and test target.

### P2-02 — Architecture decision
- Confirm Next.js App Router and TypeScript modular monolith proposal.
- Confirm which logic runs in Server Components, Route Handlers and domain services.
- Confirm standard Node runtime vs alternative deployment adapter using a representative build.
- Confirm Supabase roles: database, Auth, Storage, request-scoped session client and server-only privileged client.
- Confirm when Python/FastAPI is justified and keep it deferred for MVP.
**Output:** approved architecture and ADRs.
**Acceptance:** hosting/runtime choice is supported by current docs and commercial terms.

### P2-03 — Route and module map
- Define public, customer, admin and API routes.
- Define feature modules for catalog, cart, orders, payments, invoices, content, notifications, campaigns and admin.
- Define shared UI components and server-only modules.
- Define caching rules for public versus user-specific data.
**Output:** route/module responsibility matrix.
**Acceptance:** private user content is never served from shared public cache.

### P2-04 — Database design
- Finalize tables, columns, types and naming.
- Define foreign keys, unique/check constraints and delete/archive rules.
- Define product/variant/stock/inventory ledger.
- Define guest and authenticated customer order records.
- Define order-item and invoice snapshots.
- Define payment submissions and audit events.
- Define articles/tags/related products.
- Define notification preferences, consent events, outbox, deliveries, campaigns, suppression and alerts.
- Define indexes and retention.
**Output:** logical schema and migration plan.
**Acceptance:** all entities used by API/workflows exist in the schema model.

### P2-05 — Authentication, roles and data access
- Select email/OTP/recovery flow and provider.
- Define guest order capability and recovery.
- Define Owner, Manager, Payment Operator, Marketing Editor and Campaign Approver capabilities.
- Define grants and RLS separately for every exposed table.
- Define private storage access policies.
- Define session revocation and admin MFA.
**Output:** role matrix and RLS policies.
**Acceptance:** customer A cannot access customer B; customer metadata cannot grant admin.

### P2-06 — Commerce state machines
- Define product publish/archive states.
- Define variant and inventory states.
- Define inventory reservation, expiry and release.
- Define checkout quote and idempotency.
- Define COD payment state separately from fulfillment.
- Define QR submission/verification/rejection.
- Define cancellation/refund state.
- Define invoice numbering and immutable snapshot.
**Output:** order/payment/inventory/invoice workflows.
**Acceptance:** no ambiguous money or stock transitions.

### P2-07 — API and integration contracts
- Define request/response/error schemas.
- Define endpoints and permission requirements.
- Define file upload contract and private signed access.
- Define PaymentMethod, EmailProvider, NotificationProvider, ImageStorageProvider and future AI adapter.
- Define provider health test, secret handling, timeouts, retry and idempotency.
**Output:** API specification and adapter contracts.
**Acceptance:** every mutation has server-side validation and authorization.

### P2-08 — Notification and editorial contracts
- Confirm transactional versus marketing categories.
- Define required event matrix for order, payment, fulfillment, invoice, account and admin events.
- Define marketing topics, explicit opt-in, confirmation, preferences, digest and unsubscribe.
- Define Journal publishing and campaign approval workflow.
- Define outbox, dedupe, delivery webhooks, bounce/complaint suppression and retries.
- Define admin alerts, recipients, acknowledgement and escalation.
- Define templates, sender identity and email DNS setup.
**Output:** notification/alert specification and linked data/API/security requirements.
**Acceptance:** login/email address alone never means marketing opt-in; unsubscribe prevents future marketing sends.

### P2-09 — Security, privacy and sender deliverability
- Define data classification and threat model.
- Define customer/order/invoice/photo access.
- Define upload validation and private storage.
- Define secrets, logs, rate limits and audit.
- Define consent records and suppression.
- Define SPF/DKIM/DMARC, visible unsubscribe and one-click unsubscribe.
- Review legal requirements for target customer jurisdictions with qualified advice.
**Output:** security/privacy and sender setup checklist.
**Acceptance:** no secret or private proof/invoice/photo in public storage or logs.

### P2-10 — Hosting, deployment and operations
- Compare commercial hosting/runtime plans.
- Compare Supabase plan/backup/project-pause/storage limits.
- Define environments and secrets.
- Define migration and release procedures.
- Define backup/export/restore and rollback.
- Define monitoring and incident response.
- Define sender DNS, email webhooks and scheduled notification worker.
**Output:** deployment/operations plan.
**Acceptance:** no unverified free-tier or uptime assumptions.

### P2-11 — Test strategy and traceability
- Map P0 requirements to unit, DB, API and browser tests.
- Include RLS allow/deny matrix.
- Include concurrency and idempotency tests.
- Include notification consent, unsubscribe, webhook and campaign tests.
- Include responsive/accessibility/performance/security tests.
**Output:** test strategy and test traceability.
**Acceptance:** every P0 critical path has a reproducible test.

### P2-12 — Cross-document review and owner decisions
- Check schema/API/RLS/workflow agreement.
- Check notification matrix and consent model agreement.
- Resolve owner decisions on shipping, auth, QR, inventory and invoice rules.
- Resolve hosting and email provider selection or explicitly keep them as implementation-stage decisions.
- Update decision log.
- Obtain owner approval.
**Exit gate:** PRD, architecture, data model, API, RLS, workflows, notification contracts, security, operations and tests are mutually consistent and approved.

---

# Phase 3 — MVP development

**Goal:** implement and integrate the real customer store and admin operation platform.

**Status:** not started. Begin only after Phase 2 exit gate and owner approval.

**Reference:** [Phase 3 detailed development execution plan](phase-3/DEVELOPMENT_EXECUTION_PLAN.md)

## P3 — Development milestones

### P3-00 — Repo/tooling foundation
- Audit branch and working tree.
- Scaffold selected framework/runtime.
- Pin versions and commit lockfile.
- Configure lint, format, strict typecheck, tests, build and CI.
- Add safe environment template and secret scanning.
**Gate:** clean baseline build and CI.

### P3-01 — Design system and shell
- Implement semantic theme tokens.
- Implement responsive container/grid and typography.
- Implement UI primitives and state variants.
- Implement announcement bar, desktop nav, mobile drawer and footer.
- Implement search overlay and theme preference.
**Gate:** shell passes responsive, theme and accessibility checks.

### P3-02 — Supabase and permissions
- Configure local/staging Supabase.
- Add migrations for schema.
- Implement request-scoped client and server-only admin client.
- Implement auth/recovery and admin membership.
- Apply grants/RLS/storage policies.
- Add seed/test fixtures.
**Gate:** authorization and storage tests pass.

### P3-03 — Admin catalog/content
- Build categories and collections.
- Build product create/edit/draft/publish flow.
- Build image gallery upload/reorder/alt text.
- Build size/color/SKU variants.
- Build inventory and stock adjustments.
- Build homepage announcement/hero content.
- Build Journal article editor and publication lifecycle.
**Gate:** admin can publish a real product and article; drafts remain private.

### P3-04 — Storefront discovery
- Build homepage sections.
- Build Shop All and category pages.
- Build search, filters, sort, result count and empty states.
- Build product cards and quick view.
- Build Product Studio and gallery.
- Build wishlist and compare.
- Build Journal listing/detail.
**Gate:** customers can discover product/article content without login.

### P3-05 — Cart and checkout
- Implement local/session cart.
- Implement quote endpoint and server recalculation.
- Implement guest checkout and selected authentication behavior.
- Implement idempotency and atomic stock reservation.
- Implement COD.
- Implement QR payment instructions and proof/reference submission.
- Implement admin payment review and status.
**Gate:** end-to-end COD and QR workflows pass.

### P3-06 — Orders and invoices
- Implement customer order confirmation/history/access.
- Implement order status history.
- Implement invoice number allocator.
- Implement immutable invoice snapshot.
- Implement PDF rendering and recovery.
- Implement customer/admin invoice view/download authorization.
**Gate:** invoice and order access tests pass.

### P3-07 — Notification and alert subsystem
- Implement transactional/marketing categories.
- Implement subscriber and consent model.
- Implement preferences center and confirmation.
- Implement durable outbox and idempotency.
- Implement transactional email templates and provider adapter.
- Trigger order/payment/fulfillment/invoice emails.
- Implement in-app inbox and unread count.
- Implement admin alert queues and escalation.
- Implement provider webhooks, delivery states and suppression.
- Implement product/article/offer campaign draft, test, approval and schedule.
- Implement delivery dashboard.
**Gate:** no marketing without opt-in; provider failure never blocks purchase.

### P3-08 — Admin operations finish
- Dashboard and real operational metrics.
- Order/payment/invoice queues.
- Staff role enforcement.
- Notification templates and campaign manager.
- Integration settings with masked secrets and test status.
- Audit log and store settings.
**Gate:** authorized owner/team can operate core store without direct database edits.

### P3-09 — SEO and feature completion
- Add metadata/canonical/sitemap/robots.
- Add accurate Product/Article structured data.
- Optimize images/fonts/scripts.
- Add error boundaries and logging.
- Verify policy/content pages.
- Update docs and prepare staging build.
**Exit gate:** feature complete P0 MVP with testable evidence; no production launch yet.

---

# Phase 4 — QA, security and performance

**Goal:** verify correctness, security, accessibility, responsiveness and speed on a release candidate.

**Status:** not started.

**Reference:** [Phase 4 QA/security/performance plan](phase-4/QA_SECURITY_PERFORMANCE_PLAN.md)

## P4 — Step-by-step QA tasks

1. Freeze release candidate SHA and test environment.
2. Confirm test accounts and synthetic data.
3. Run formatting, lint, strict typecheck and production build.
4. Run unit tests for price, stock, state transitions and invoices.
5. Run component tests for shared UI and theme states.
6. Run database constraints and transaction tests.
7. Run RLS tests as anon, customer A/B, payment operator, manager and owner.
8. Run storage object access tests.
9. Run customer browse/search/filter/Product Studio journey.
10. Run wishlist/compare/cart journey.
11. Run COD checkout and order confirmation.
12. Run QR transfer submission and pending/verify/reject.
13. Run inventory concurrency and oversell tests.
14. Run invoice generation, PDF parity, access and regeneration tests.
15. Run Journal draft/publish and SEO visibility tests.
16. Run transactional email event and duplicate-send tests.
17. Run marketing consent, topic, preference, unsubscribe and suppression tests.
18. Run campaign preview/test/approval/schedule/pause tests.
19. Run signed email webhook, duplicate and out-of-order event tests.
20. Run admin alert routing, dedupe, acknowledge and escalation tests.
21. Run file upload validation and private-storage tests.
22. Run responsive tests at agreed viewports and both themes.
23. Run accessibility and reduced-motion tests.
24. Run Core Web Vitals and server/database latency measurements.
25. Run dependency/security review and secret scan.
26. Run outage/retry/dead-letter/rollback scenarios.
27. Fix defects and rerun full regression.
28. Produce evidence report with severity and release recommendation.
**Exit gate:** no unresolved critical/high defects; all P0 workflows and notification consent rules pass; owner accepts any documented residual risk.

---

# Phase 5 — Deployment and maintenance

**Goal:** deploy safely to naffeez.com and operate customer orders, payments, email and platform health.

**Status:** not started.

**Reference:** [Phase 5 deployment, operations and maintenance runbook](phase-5/DEPLOYMENT_OPERATIONS_MAINTENANCE_RUNBOOK.md)

## P5 — Deployment steps

1. Select approved commercial hosting/runtime and plan.
2. Confirm production/staging separation and budget.
3. Configure environment secrets outside Git.
4. Configure production database and access policies.
5. Back up before production migrations.
6. Apply reviewed migrations and verify schema.
7. Verify RLS, grants and storage policies.
8. Create owner/admin identities and enable MFA.
9. Configure products, categories, size guides and policies.
10. Configure delivery/COD settings.
11. Configure Easypaisa/bank QR privately in admin settings.
12. Configure sender identity and provider credentials.
13. Publish SPF/DKIM/DMARC DNS records and verify sender alignment.
14. Configure webhook secret and endpoint.
15. Configure notification worker/scheduler, limits and alerts.
16. Configure suppression/consent policy; never import unverified/purchased lists.
17. Configure custom domain, canonical host and TLS.
18. Run production build and deployment.
19. Run smoke test for catalog, product, cart, COD, QR pending, invoice and admin.
20. Run authorized email test and verify transactional deliverability.
21. Run internal-only campaign test and verify unsubscribe.
22. Verify dashboards, logs, alerts, backup and rollback.
23. Obtain explicit owner launch approval.
24. Monitor closely after launch and document any incidents.

## P5 — Ongoing operation cadence

### Daily
- Review new orders and order confirmations.
- Review pending QR transfers against actual account receipt.
- Process order fulfilment and update statuses.
- Check low-stock and out-of-stock alerts.
- Check failed invoices, outbox backlog and critical errors.

### Weekly
- Review marketing campaign delivery, bounces, complaints and unsubscribes.
- Review subscriber consent/suppression integrity.
- Review article/product/offer publishing calendar.
- Review WhatsApp support and customer enquiries.
- Review storage, bandwidth, database and provider quotas.

### Monthly
- Review admin users/roles and audit logs.
- Test backups/restoration.
- Update dependencies with regression.
- Review sender authentication and domain reputation.
- Review templates, notification preferences and campaign performance.
- Review provider costs and service plan limits.
- Review Core Web Vitals and slow queries.

### Per campaign
- Verify product/article/offer accuracy and validity dates.
- Check stock and price.
- Preview eligible consented audience.
- Exclude unconfirmed/unsubscribed/suppressed recipients.
- Preview responsive HTML and text version.
- Test links and unsubscribe.
- Send internal test.
- Get approval.
- Send/schedule and monitor results.
- Pause if provider health or complaint guardrail is breached.

**Exit gate:** production domain/SSL verified, purchase journeys pass, email delivery/suppression works, backups and rollback documented, owner receives operational handoff.

---

# Later — AI Style Studio, virtual try-on and advanced 3D

These features remain deferred until MVP operations are stable.

1. Validate exact feature scope and customer value.
2. Select an AI/virtual try-on provider using current terms, quota, pricing and commercial rights.
3. Review image privacy, retention, deletion, geographic processing and training terms.
4. Obtain explicit customer consent and build private image flow.
5. Build product-grounded AI styling against real active catalog products.
6. Build asynchronous virtual try-on jobs with quota/cost controls.
7. Integrate optional Python/FastAPI worker only if the selected model requires it.
8. Add provider health/status and graceful fallbacks.
9. Add selective 3D Product Studio assets with static fallback.
10. Test low-end mobile and performance before enabling publicly.

## Cross-phase completion and change control

- Update the relevant phase task and roadmap status only with evidence.
- Update PRD/schema/API/RLS/workflows together when a requirement changes.
- Record owner decisions in DECISION_LOG.md.
- Keep open decisions visible; do not substitute guesses.
- A phase is complete only after its exit gate is met and owner accepts it.
