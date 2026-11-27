# Naffeez — Project Roadmap and Delivery Workflow

**Roadmap version:** 1.0  
**Baseline:** Phase 1 UI/UX v1.0  
**Repository:** https://github.com/hamza131zara/Naffeezz  
**Product:** https://naffeez.com

## Delivery principles

- Work phase by phase; do not silently skip a gate.
- Keep approved scope and decisions in version-controlled documents.
- Inspect the current repository before changing it.
- Make focused commits and preserve working behavior.
- Do not report a feature complete until it is implemented and verified.
- Keep the MVP small, fast and operational; AI/3D are optional future modules.
- Never commit credentials, API keys, private customer data or production payment details.
- Do not put secrets into client code or public documentation.

## Phase overview

| Phase | Name | Status | Exit gate |
|---|---|---|---|
| 1 | Product planning and UI/UX baseline | Baseline added; review/sign-off | UI/UX baseline accepted |
| 2 | Technical documentation and architecture | Next | Required technical documents reviewed |
| 3 | MVP development | Not started | Feature acceptance and implementation tests pass |
| 4 | QA, security and performance | Not started | Release blockers resolved and QA sign-off |
| 5 | Deployment and maintenance | Not started | Production deployment and smoke tests verified |
| Later | AI styling, virtual try-on and advanced 3D | Deferred | Provider/privacy/licensing/budget decision approved |

---

## Phase 1 — Product planning and UI/UX

**Goal:** establish what Naffeez is, how customers shop, how admins operate the store and what the first release includes.

### Steps
1. Confirm business scope and launch decisions.
2. Confirm men's-only taxonomy and product categories.
3. Define brand direction, type, spacing and light/dark theme.
4. Define sitemap and page priorities.
5. Define desktop/tablet/mobile navigation.
6. Define homepage section order and carousel behavior.
7. Define product card, Quick View and Product Studio interactions.
8. Define search, filter, sort, wishlist and comparison behavior.
9. Define cart, checkout, COD and QR transfer journeys.
10. Define customer/admin invoice behavior.
11. Define admin screens and roles.
12. Define loading, empty, error, success and permission states.
13. Record accessibility, responsive and performance targets.
14. Record future AI/Python/3D boundaries.
15. Review and approve the baseline.

### Deliverables
- `docs/phase-1/NAFFEEZ_PHASE_1_UI_UX_BASELINE_v1.0.md`
- Phase 1 screen inventory, flows, components and acceptance criteria (inside baseline).

### Exit gate
Owner confirms the baseline or requests a tracked revision. No application implementation begins before Phase 2 architecture is sufficiently documented.

---

## Phase 2 — Technical documentation and architecture

**Goal:** convert the approved UI/UX baseline into implementation-ready technical contracts.

### Step-by-step workflow
1. Inspect repository state, branch strategy and existing files.
2. Record product requirements and P0/P1 scope in PRD.
3. Choose and justify the minimum-footprint application architecture.
4. Define frontend routes, layouts, feature modules and shared components.
5. Define server-side responsibilities and API boundaries.
6. Design database entities, relationships, constraints and indexes.
7. Define authentication, roles and permission matrix.
8. Define Row Level Security (RLS) policies and access tests.
9. Define product/variant/stock and inventory reservation rules.
10. Define cart, checkout and order lifecycle/state transitions.
11. Define COD and manual QR payment submission/verification states.
12. Define immutable invoice snapshot, numbering and PDF generation.
13. Define image storage, upload validation and payment-proof access.
14. Define WhatsApp/contact integration boundaries.
15. Define integration adapter/plugin contracts and admin configuration rules.
16. Define optional Python/FastAPI boundary, only for future justified workloads.
17. Define API request/response schemas and error conventions.
18. Define environment variables, secret management and configuration.
19. Define deployment topology, backups, logging and monitoring.
20. Define testing strategy, test data and acceptance criteria.
21. Perform documentation consistency review.
22. Approve architecture and implementation plan.

### Required documents
- `docs/phase-2/PRD.md`
- `docs/phase-2/ARCHITECTURE.md`
- `docs/phase-2/DATABASE_SCHEMA.md`
- `docs/phase-2/API_SPECIFICATION.md`
- `docs/phase-2/AUTHORIZATION_AND_RLS.md`
- `docs/phase-2/ORDER_PAYMENT_INVOICE_WORKFLOWS.md`
- `docs/phase-2/INTEGRATIONS_AND_PLUGIN_CONTRACTS.md`
- `docs/phase-2/SECURITY_PRIVACY.md`
- `docs/phase-2/DEPLOYMENT_AND_OPERATIONS.md`
- `docs/phase-2/TEST_STRATEGY.md`
- `docs/phase-2/DECISION_LOG.md`

### Exit gate
All P0 data models, state transitions, roles, payment verification rules, invoice behavior, API contracts and deployment/security decisions are documented and mutually consistent. Owner reviews unresolved business decisions.

---

## Phase 3 — MVP development

**Goal:** implement the launchable commerce platform using the approved contracts.

### Workstreams and order
1. Repository setup, lint/typecheck/test scripts and CI baseline.
2. Next.js application shell, design tokens, light/dark mode and responsive layout.
3. Shared navigation, footer, announcement bar and accessible controls.
4. Supabase schema, migrations, RLS and server-side data access.
5. Admin authentication, roles and protected dashboard shell.
6. Product/category/collection administration.
7. Image upload, product gallery and product publishing.
8. Catalog, category pages, search, filters and sorting.
9. Product cards, wishlist and Quick View.
10. Naffeez Product Studio product detail.
11. Compare and cart.
12. Checkout forms and server-side order validation.
13. COD order flow.
14. QR payment instructions, reference/proof submission and admin verification queue.
15. Order status management and customer order access.
16. Invoice numbering, immutable order snapshot and PDF view/download for both customer and admin.
17. WhatsApp contact/enquiry actions.
18. Homepage content management and final content population.
19. SEO metadata, sitemap, robots and structured data where accurate.
20. Feature documentation updates and handoff to QA.

### Exit gate
Every P0 feature works end-to-end against a non-production test environment; core tests pass; critical security controls are in place. No fake integrations or placeholder payment-success behavior.

---

## Phase 4 — QA, security and performance

**Goal:** prove the application behaves correctly before launch.

### Test workflow
1. Run formatting, lint and type checks.
2. Run unit tests for business rules and validation.
3. Run database/RLS tests with distinct customer/admin roles.
4. Run API integration tests.
5. Run Playwright critical customer journeys.
6. Test all product variant/stock edge cases.
7. Test cart price and stock revalidation.
8. Test COD checkout and QR pending/verify/reject paths.
9. Test invoice generation, authorization and PDF consistency.
10. Test admin permissions and audit logs.
11. Test responsive layouts at agreed viewport sizes.
12. Test keyboard accessibility, focus, labels and reduced motion.
13. Run dependency/security review and upload validation tests.
14. Measure Core Web Vitals and optimize critical images/scripts.
15. Run failure-mode tests for database, storage and optional integrations.
16. Fix defects and rerun regression suites.
17. Produce QA report with evidence, severity and remaining risks.

### Exit gate
No unresolved critical/high-severity defects; payment, order, inventory and invoice workflows are verified; performance and security acceptance criteria are met or documented with explicit owner-approved exceptions.

---

## Phase 5 — Deployment and maintenance

**Goal:** deploy safely to the production domain and operate the store.

### Deployment workflow
1. Confirm hosting/Next.js compatibility and costs/free-tier limitations.
2. Create production environment and secrets outside Git.
3. Configure production database, migrations and RLS.
4. Configure object storage and private payment-proof access.
5. Configure DNS for `naffeez.com` and SSL.
6. Configure production email/WhatsApp settings as applicable.
7. Configure live payment display data through admin settings (never commit bank/account secrets to the repository).
8. Run production build and automated pre-deployment checks.
9. Deploy and run smoke tests.
10. Verify checkout, order creation, payment pending state, admin verification and invoice downloads.
11. Verify SEO, sitemap, robots and analytics/monitoring.
12. Configure backups and test restore procedure.
13. Document rollback and incident-response steps.
14. Announce launch only after domain and critical journeys are verified.

### Ongoing maintenance
- Monitor application errors, uptime and database/storage usage.
- Review orders and payment-verification queue.
- Keep dependencies updated with regression tests.
- Monitor Core Web Vitals and image weight.
- Review backups and restore readiness.
- Audit admin roles, access logs and payment changes.
- Review provider costs/free-tier limits.
- Keep policies and product information current.

### Exit gate
The production domain resolves correctly with SSL; smoke tests pass; monitoring, backups and rollback instructions are active; owner has the operational handoff.

---

## Later phase — AI Style Studio, virtual try-on and advanced 3D

Do not make these launch blockers.

### Suggested sequence
1. Validate event-styling use cases and user consent UX.
2. Compare text/image providers for pricing, free-tier constraints, privacy and commercial terms.
3. Implement product-grounded outfit recommendations.
4. Prototype virtual try-on with non-sensitive test images and approved providers.
5. Review provider data retention, training use, licensing and regional processing.
6. Add private image storage, deletion and rate limits.
7. Integrate a replaceable VirtualTryOnProvider adapter.
8. Add generation quota, usage tracking and cost controls.
9. Add selected 3D product assets with static fallbacks.
10. Test on mobile/low-end devices before activation.

---

## Cross-phase workflow and repository rules

- All requirements, architecture decisions, API contracts and test evidence belong in version-controlled documentation.
- Each phase has its own folder under `docs/phase-N/`.
- Update `docs/ROADMAP.md` only when a phase status or approved scope changes.
- Keep an unresolved-decision list; do not assume business policy.
- Use focused feature branches and pull requests for implementation changes.
- Commit documentation separately from application code where practical.
- Review diffs before merging; do not force-push shared branches.
- Never commit `.env`, service-role keys, API keys, customer photos, payment proofs or real bank/Easypaisa account secrets.
- Do not deploy production or enable live payments without explicit verification.
