# Naffeez — Detailed Project Roadmap

**Roadmap version:** 3.0  
**Product baseline:** Phase 1 v1.0 + notification/editorial addendum v1.1  
**Technical baseline:** Phase 2 documentation approved and merged  
**Repository:** https://github.com/hamza131zara/Naffeez  
**Production domain:** https://naffeez.com  
**Current phase:** Phase 4 — MVP Development

## Project delivery principles

1. Use the accepted Phase 1 and Phase 2 baselines as sources of truth.
2. Phase 3 produces implementation-ready visual designs and detailed website architecture; it is not application coding.
3. Phase 4 starts only after Phase 3 design/architecture approval.
4. Each task has a requirement ID, output, acceptance check and owner where relevant.
5. Use focused branches and pull requests; substantive work is not committed directly to main.
6. Inspect repository state before edits and preserve working functionality.
7. Keep decisions marked Accepted, Proposed or Open; do not invent policy, price, stock or legal details.
8. Never commit API keys, service-role keys, passwords, production QR/account details, customer data, invoice PDFs, payment proofs or private images.
9. Core commerce must continue if email, AI, 3D or optional providers are unavailable.
10. No marketing send without confirmed address, topic-specific opt-in, suppression check, approved content and unsubscribe.
11. Every implementation task needs tests and a documentation update.
12. A phase is complete only after its exit gate and owner acceptance.

## Phase overview

| Phase | Name | Status | Primary result |
|---|---|---|---|
| 1 | Product definition and UI/UX baseline | Accepted | Product scope and initial user experience |
| 2 | Technical documentation and architecture | Approved and merged into main | PRD, logical architecture, data/API/security/workflow/notification contracts |
| 3 | Visual design, website templates and detailed frontend architecture | In progress; design pack prepared for review | Final screen designs, theme, components, flows and frontend handoff |
| 4 | MVP development | Planned | Working storefront, admin, commerce and notifications |
| 5 | QA, security, accessibility and performance | Planned | Verified release candidate with evidence |
| 6 | Deployment, operations and maintenance | Planned | Live naffeez.com and operational runbooks |
| Later | AI Style Studio, virtual try-on and advanced 3D | Deferred | Optional modules after provider/privacy/commercial review |

---

# Phase 1 — Product definition and UI/UX baseline

**Status:** Accepted by owner.  
**Purpose:** Decide what Naffeez is, launch scope, customers, key routes, major interactions and product priorities.

### Completed decisions
- Men's clothing only.
- Initial categories: Casual Shirts, Dress Shirts, Seasonal Trousers, Winter Trousers and Hoodies.
- English-only launch, PKR display and Pakistan delivery context.
- Admin-managed product entry.
- COD plus manually verified Easypaisa/bank QR.
- WhatsApp customer support/product enquiry.
- Customer and admin invoice view/download.
- Light, Dark and System theme direction.
- Monochrome Editorial + Functional Glassmorphism + Selective 3D.
- Product card opens dedicated Naffeez Product Studio.
- Journal and customer notification/marketing preferences added as v1.1 extension.
- AI try-on, photo preview, advanced AI and full 3D showroom deferred.

### Source documents
- `docs/phase-1/NAFFEEZ_PHASE_1_UI_UX_SPECIFICATION_v1.0.md`
- `docs/phase-1/EXECUTION_AND_DESIGN_HANDOFF.md`
- `docs/phase-1/NOTIFICATIONS_AND_JOURNAL_UX_ADDENDUM_v1.1.md`

### Exit gate
Owner accepted the Phase 1 baseline. Visual screen design and frontend architecture are expanded in Phase 3.

---

# Phase 2 — Technical documentation and architecture

**Status:** Approved by owner and merged into `main` through PR #2.  
**Purpose:** Establish product requirements, logical system architecture, database model, APIs, auth/RLS, commerce workflows, integrations, notification rules, privacy, deployment and tests.

### Approved document set
- PRD.
- Application architecture.
- Database schema.
- API specification.
- Authentication and RLS.
- Order/payment/invoice workflows.
- Integrations and plugin contracts.
- Notifications and alerts.
- Security and privacy.
- Deployment and operations.
- Test strategy.
- Decision log.
- Phase 2 review checklist.

### Important distinction
Phase 2 approval accepts the documentation baseline. It does not automatically resolve every operational decision, such as delivery fees, COD coverage, return policy, exact size charts, email provider, sender address, hosting plan or invoice legal fields. Open decisions remain documented and must be resolved before the affected implementation or launch.

### Exit gate
Completed and approved.

---

# Phase 3 — Visual design, website templates and detailed frontend architecture

**Status:** Owner accepted Light/Dark visual directions and both motion styles (2026-11-28); native Figma import, full responsive/accessibility QA, remaining P0 detail and owner business inputs remain before Phase 3 exit.  
**Purpose:** Turn the accepted UX and technical baselines into the final website design and implementation-ready frontend plan before any application coding starts.

## P3-01 — Design baseline and reference analysis
1. Read Phase 1 and Phase 2 baselines.
2. Review the Blackenwhite reference for general retail patterns.
3. Record which patterns to adapt: category navigation, collection-led discovery, product cards, Quick View, Select Options, social proof and reassurance.
4. Record what must remain unique to Naffeez: wordmark, photography, copy, page composition and Product Studio.
5. Confirm the design direction: Monochrome Editorial + Functional Glassmorphism + Selective 3D.
**Output:** design rationale and reference adaptation rules.
**Acceptance:** inspiration does not become an asset/layout copy.

## P3-02 — Brand and theme system
1. Confirm logo/wordmark asset and clear-space use.
2. Confirm heading/body font pairing and licenses.
3. Define semantic light/dark/system tokens.
4. Define typography scale, spacing, grid, border, radius and shadow.
5. Define glass surface and fallback rules.
6. Define hover/focus/pressed/disabled/loading/success/error states.
7. Define motion and reduced-motion behavior.
8. Check contrast and touch targets.
**Output:** token sheet and typography/spacing guide.
**Acceptance:** all surfaces work in both themes and glass is limited to selected components.

## P3-03 — Global shell and navigation
1. Design announcement bar.
2. Design desktop header and category mega-menu.
3. Design mobile header and menu drawer.
4. Design Search overlay and search results.
5. Place Account, Wishlist, Compare, Cart and Theme controls.
6. Design footer, breadcrumbs and contextual support.
7. Specify sticky/transparent/scroll transitions.
**Output:** desktop/tablet/mobile global shell.
**Acceptance:** no mobile header overflow, hover-only controls or contrast failure over hero images.

## P3-04 — Homepage and content template
1. Design editorial hero carousel and slide variants.
2. Design five category shortcut tiles.
3. Design Trending/curated product section.
4. Design New Arrivals.
5. Design Product Studio introduction.
6. Design Best Sellers only where data/admin curation supports it.
7. Design Journal teaser.
8. Design brand story and Instagram/social section.
9. Design optional marketing subscription.
10. Design footer and empty section behavior.
**Output:** complete responsive homepage template and CMS field mapping.
**Acceptance:** every CTA destination and content fallback is defined.

## P3-05 — Catalog, product card and Product Studio
1. Design Shop All.
2. Design each initial category and subcategory.
3. Design search, filter sidebar/drawer, active chips, sort and count.
4. Design product card default/hover/focus/wishlist/compare/sold-out states.
5. Design Quick View.
6. Design Product Studio gallery and studio-stage.
7. Design variant, size guide, stock, quantity and purchase actions.
8. Design optional 3D view and static fallback.
**Output:** catalog, card and Product Studio component/screen designs.
**Acceptance:** customer can select a real variant and purchase without relying on 3D.

## P3-06 — Cart, checkout and invoice design
1. Design empty/populated cart.
2. Design contact/address form.
3. Design server-quoted price/shipping/discount summary.
4. Design COD payment path.
5. Design Easypaisa QR and Bank QR paths.
6. Design transaction reference/proof submission.
7. Design pending/verified/rejected payment states.
8. Design order confirmation and order status.
9. Design responsive invoice screen and A4 PDF.
**Output:** complete customer commerce journey.
**Acceptance:** no screen implies a QR scan/upload itself confirms payment.

## P3-07 — Customer account and notification UX
1. Design sign-in/sign-up/recovery using the Phase 2-approved auth decision.
2. Design profile, addresses, wishlist, orders and invoices.
3. Design notification inbox and unread count.
4. Design marketing topic preferences.
5. Design consent confirmation, pause and unsubscribe.
6. Design transactional/marketing distinction.
7. Design notification empty/error states.
**Output:** customer account and notification screens.
**Acceptance:** email login or purchase never silently subscribes a customer to marketing.

## P3-08 — Journal, offers and campaign templates
1. Design Journal listing/detail.
2. Design article cards and related products.
3. Design Offer detail and valid-date states.
4. Design admin article editor and preview.
5. Design campaign builder, audience preview and test-send.
6. Design approval, schedule/send, pause and delivery report.
**Output:** editorial and campaign screens.
**Acceptance:** publish action does not automatically send marketing.

## P3-09 — Admin dashboard design
1. Design admin shell/sidebar and mobile navigation.
2. Design overview and actionable work queues.
3. Design product editor and media manager.
4. Design variants, SKU and inventory.
5. Design orders and fulfillment.
6. Design manual QR payment review.
7. Design invoice list/preview/download.
8. Design categories, collections, homepage CMS, Journal and Offers.
9. Design subscribers, preferences, templates, campaigns and delivery logs.
10. Design alerts, settings, integrations, staff roles and audit.
**Output:** admin screen and permission annotation pack.
**Acceptance:** each control maps to a documented role and audit requirement.

## P3-10 — Component library and interaction system
1. Define primitive controls and component variants.
2. Define product, gallery, filter, cart, checkout and account components.
3. Define admin tables, forms, dashboards and review panels.
4. Define loading, empty, success, error, stale and permission states.
5. Define touch, keyboard, focus and reduced-motion interactions.
**Output:** component library specification and design source.
**Acceptance:** same component behaves consistently on Home, Shop, Search and Collections.

## P3-11 — Frontend architecture and route map
1. Define Storefront, Account and Admin shells.
2. Define route tree and page responsibilities.
3. Map routes to feature modules.
4. Define server/client component boundaries.
5. Define source-of-truth data ownership.
6. Define local/server state and forms.
7. Define public/private caching rules.
8. Define error boundaries and server authorization.
9. Define optional 3D code-split boundary.
**Output:** frontend architecture map.
**Acceptance:** private account/order/invoice/admin data cannot enter shared public cache.

## P3-12 — Visual QA and approval
1. Review every P0 route on desktop/tablet/mobile.
2. Review Light, Dark and System modes.
3. Review product photography and layout hierarchy.
4. Review component states and interaction paths.
5. Review accessibility and performance budgets.
6. Check UI against Phase 1/2 requirements.
7. Resolve contradictions and mark open owner inputs.
8. Obtain owner sign-off.
**Exit gate:** all P0 screens/workflows and frontend route architecture approved; design handoff is ready for Phase 4.

### Phase 3 deliverables
- `DESIGN_SYSTEM_AND_THEME.md`
- `WEBSITE_TEMPLATE_AND_PAGE_SPECIFICATION.md`
- `CUSTOMER_AND_ADMIN_WORKFLOW_DESIGN.md`
- `FRONTEND_ARCHITECTURE_AND_ROUTE_MAP.md`
- `ADMIN_DASHBOARD_DESIGN.md`
- `COMPONENT_LIBRARY_AND_INTERACTION_SPEC.md`
- `STUDIO_ROOM_AND_3D_VISUAL_SPEC.md`
- `VISUAL_ASSET_AND_CONTENT_GUIDE.md`
- `DESIGN_HANDOFF_AND_ACCEPTANCE.md`
- `MOTION_HOVER_SCROLL_AND_PRODUCT_ZOOM_SPEC.md`

---

# Phase 4 — MVP development

**Status:** Planned; begin only after Phase 3 design/architecture sign-off.  
**Detailed plan:** [Phase 4 Development Execution Plan](phase-4/DEVELOPMENT_EXECUTION_PLAN.md)

Milestones:
1. Repository/tooling foundation, pinned dependencies and CI.
2. Theme tokens, responsive shell and component primitives.
3. Supabase setup, migrations, grants, RLS, auth and storage.
4. Admin catalog, variant, inventory, collection and content management.
5. Storefront, category, search, filter, product cards and Product Studio.
6. Wishlist, compare, cart and checkout quote.
7. COD and manual QR payment verification.
8. Orders, invoices and secure customer/admin access.
9. Transactional email, in-app notifications, marketing consent/preferences, admin alerts and basic campaigns.
10. Journal and Offers publishing.
11. SEO, performance and staging preparation.

**Exit gate:** all P0 features work end-to-end in a non-production environment; implementation tests pass; no production deployment claim.

---

# Phase 5 — QA, security, accessibility and performance

**Status:** Planned; execute against a fixed Phase 4 release candidate.  
**Detailed plan:** [Phase 5 QA/Security/Performance Plan](phase-5/QA_SECURITY_PERFORMANCE_PLAN.md)

1. Freeze release SHA and synthetic test data.
2. Run format, lint, typecheck and production build.
3. Run unit/component tests.
4. Run DB constraints, transaction and concurrency tests.
5. Run RLS/authorization and private-storage tests.
6. Run catalog, Product Studio, cart and checkout E2E tests.
7. Verify COD and QR payment state transitions.
8. Verify inventory reservation and oversell protection.
9. Verify invoice snapshot, PDF and authorization.
10. Verify Journal/Offers publish rules.
11. Verify transactional messages, consent, unsubscribe and suppression.
12. Verify campaigns, provider webhooks, bounce/complaint and dedupe.
13. Verify admin alerts and audit.
14. Run security, upload and dependency review.
15. Run responsive, accessibility and both-theme visual QA.
16. Measure Core Web Vitals and JS/image budgets.
17. Test provider outage and recovery.
18. Fix and rerun regression.
19. Publish evidence-based QA report.

**Exit gate:** no unresolved critical/high defects; all P0 customer/admin/notification flows pass; residual risks are documented and owner accepted.

---

# Phase 6 — Deployment, operations and maintenance

**Status:** Planned; execute after Phase 5 release approval.  
**Detailed plan:** [Phase 6 Deployment/Operations Runbook](phase-6/DEPLOYMENT_OPERATIONS_MAINTENANCE_RUNBOOK.md)

1. Confirm commercial hosting plan/runtime and total cost.
2. Confirm production/staging environments and secrets.
3. Configure database, migrations, RLS and storage.
4. Configure admin identities/MFA.
5. Configure domain, DNS and SSL.
6. Configure products, policies, shipping/COD and invoice details.
7. Configure approved Easypaisa/bank QR through admin.
8. Configure email sender identity, SPF, DKIM, DMARC and webhooks.
9. Configure outbox scheduler, admin alerts and monitoring.
10. Deploy application and run production smoke tests.
11. Verify COD, QR pending state, admin verification and PDF access.
12. Verify transactional email and internal-only campaign test.
13. Verify backup, restore and rollback.
14. Obtain owner launch approval.
15. Monitor orders, payment queue, stock, email, uptime and performance.
16. Run daily/weekly/monthly maintenance and incident procedures.

**Exit gate:** naffeez.com, HTTPS and all critical customer/admin flows are verified; alerts, backup/rollback and operational handoff are in place.

---

# Later — AI Style Studio, virtual try-on and advanced 3D

These are explicitly outside the initial launch dependency chain:
1. Validate customer use cases and consent UX.
2. Re-check current provider quotas, pricing, commercial licensing, data use and retention.
3. Implement catalog-grounded outfit recommendation.
4. Prototype photo-based try-on with approved providers and test images.
5. Build private photo storage/deletion and usage quota.
6. Add optional Python/FastAPI worker only where model runtime requires it.
7. Add virtual try-on provider adapter and asynchronous job state.
8. Add selected 3D models/room experiences with static fallbacks.
9. Test on low-end mobile before public enablement.

## Cross-phase change control

- Update the affected requirement, design, architecture, schema, API and tests together.
- Record material changes in Phase 2 decision log.
- Do not treat an unresolved business policy as an implementation default.
- Keep old decisions traceable; don't silently rewrite accepted baselines.
- Use a pull request for each phase gate.


## Phase 3 owner approval update — 2026-11-28

The owner accepted the Light and Dark visual directions and both proposed Onda-inspired motion styles: restrained section text reveal and circular image-mask reveal. This closes the visual-direction decision for theme and motion. It does not close native Figma import, all-route responsive/accessibility QA, exact motion placement, P0 design completeness or the owner business decisions listed in the Phase 3 handoff.

Phase 4 remains gated on documented Phase 3 exit sign-off.


## Responsive refinement decision — 2026-11-28

The owner accepted the existing visual design and theme templates and confirmed that the remaining screenshot concerns are layout responsiveness (logo/header spacing, hero width/proportions and consistent section containers). These are not a new visual redesign. They are scheduled as Phase 4 implementation tasks and Phase 5 browser/accessibility QA gates.

Follow `docs/phase-3/RESPONSIVE_LAYOUT_REFINEMENT_CHECKLIST.md` for concrete container gutters, header, hero, section, Product Studio, checkout and admin responsive acceptance criteria.


## Phase 3 closure and Phase 4 start — 2026-11-28

Phase 3 PR #3 was squash-merged into `main` (merge commit `a003124acda2645af9341983d7ca27370bf037b7`). The owner accepted the Light/Dark directions and both scroll-animation styles. The homepage spacing/width feedback remains an explicit Phase 4 implementation and Phase 5 QA workstream.

Phase 4 branch: `phase-4/mvp-implementation`.

Initial development slice:
- Next.js App Router/React/TypeScript scaffold and GitHub CI workflow.
- Light/Dark/System theme shell and shared responsive storefront layout.
- Homepage, shop/search/category route, Product Studio gallery, product card hover/quick view, guest wishlist/compare and local cart foundations.
- Published-catalog Supabase adapter with explicit empty/setup states.

Not yet configured: a dedicated Naffeez Supabase project, executable schema migrations, auth choice, production catalog/media, approved delivery/returns/QR/legal invoice details and staff role assignments. No other inactive Supabase project has been re-used.
See `docs/phase-4/PHASE_4_IMPLEMENTATION_LOG.md`.
