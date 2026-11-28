# Naffeez Documentation

This directory is the source of truth for product requirements, UX, visual design, frontend architecture, implementation, testing, notifications, security and operations.

## Project phase status

| Phase | Folder | Purpose | Status |
|---|---|---|---|
| 1 | [phase-1](phase-1/) | Product scope and initial UI/UX baseline | Accepted |
| 2 | [phase-2](phase-2/) | PRD, system architecture, data/API/security/workflow/notification contracts | Approved and merged into main |
| 3 | [phase-3](phase-3/) | Visual design system, website templates, complete customer/admin workflows, component library and frontend architecture | Written design pack, first native Figma tranche and additional SVG workflow boards prepared; owner review pending |
| 4 | [phase-4](phase-4/) | MVP development execution | Planned |
| 5 | [phase-5](phase-5/) | QA, security, accessibility and performance | Planned |
| 6 | [phase-6](phase-6/) | Deployment, operations and maintenance | Planned |
| Later | future | AI Style Studio, virtual try-on, optional Python worker and advanced 3D | Deferred |

## Accepted baseline documents

### Phase 1
1. [Product & UI/UX Baseline v1.0](phase-1/NAFFEEZ_PHASE_1_UI_UX_SPECIFICATION_v1.0.md)
2. [Detailed Execution and Design Handoff](phase-1/EXECUTION_AND_DESIGN_HANDOFF.md)
3. [Journal, Notifications and Email Preferences Addendum v1.1](phase-1/NOTIFICATIONS_AND_JOURNAL_UX_ADDENDUM_v1.1.md)

### Phase 2
1. [PRD](phase-2/PRD.md)
2. [Application Architecture](phase-2/ARCHITECTURE.md)
3. [Database Schema](phase-2/DATABASE_SCHEMA.md)
4. [API Specification](phase-2/API_SPECIFICATION.md)
5. [Authentication and RLS](phase-2/AUTHORIZATION_AND_RLS.md)
6. [Order, Payment and Invoice Workflows](phase-2/ORDER_PAYMENT_INVOICE_WORKFLOWS.md)
7. [Integrations and Plugin Contracts](phase-2/INTEGRATIONS_AND_PLUGIN_CONTRACTS.md)
8. [Notifications, Email Marketing and Admin Alerts](phase-2/NOTIFICATIONS_AND_ALERTS.md)
9. [Security and Privacy](phase-2/SECURITY_PRIVACY.md)
10. [Deployment and Operations](phase-2/DEPLOYMENT_AND_OPERATIONS.md)
11. [Test Strategy](phase-2/TEST_STRATEGY.md)
12. [Decision Log](phase-2/DECISION_LOG.md)
13. [Phase 2 Review Checklist](phase-2/PHASE_2_REVIEW_CHECKLIST.md)

## Phase 3 — Visual design and website architecture

1. [Design System and Theme](phase-3/DESIGN_SYSTEM_AND_THEME.md)
2. [Website Template and Page Specification](phase-3/WEBSITE_TEMPLATE_AND_PAGE_SPECIFICATION.md)
3. [Customer and Admin Workflow Design](phase-3/CUSTOMER_AND_ADMIN_WORKFLOW_DESIGN.md)
4. [Frontend Architecture and Route Map](phase-3/FRONTEND_ARCHITECTURE_AND_ROUTE_MAP.md)
5. [Admin Dashboard Design](phase-3/ADMIN_DASHBOARD_DESIGN.md)
6. [Component Library and Interaction Specification](phase-3/COMPONENT_LIBRARY_AND_INTERACTION_SPEC.md)
7. [Product Studio Room and 3D Visual Specification](phase-3/STUDIO_ROOM_AND_3D_VISUAL_SPEC.md)
8. [Visual Asset and Content Guide](phase-3/VISUAL_ASSET_AND_CONTENT_GUIDE.md)
9. [Design Handoff and Acceptance Checklist](phase-3/DESIGN_HANDOFF_AND_ACCEPTANCE.md)
10. [Motion, Hover, Scroll and Product Image Inspection](phase-3/MOTION_HOVER_SCROLL_AND_PRODUCT_ZOOM_SPEC.md)
11. [Figma Visual Design Handoff](phase-3/FIGMA_VISUAL_DESIGN_HANDOFF.md)
12. [Commerce and Admin Visual Workflow Blueprint](phase-3/COMMERCE_AND_ADMIN_VISUAL_WORKFLOW_BLUEPRINT.md)
13. [Hero Video Campaign and 360° Spin Builder](phase-3/HERO_VIDEO_AND_360_SPIN_BUILDER_SPEC.md)
11. [Figma Visual Design Handoff](phase-3/FIGMA_VISUAL_DESIGN_HANDOFF.md)
12. [Commerce and Admin Visual Workflow Blueprint](phase-3/COMMERCE_AND_ADMIN_VISUAL_WORKFLOW_BLUEPRINT.md)

### Phase 3 importable vector design boards
- [Product Card Hover Preview](phase-3/design-assets/PRODUCT_CARD_HOVER_PREVIEW.svg)
- [Customer Commerce Screens](phase-3/design-assets/COMMERCE_CUSTOMER_WORKFLOWS.svg)
- [Admin Operations Screens](phase-3/design-assets/ADMIN_OPERATIONS_WORKFLOWS.svg)
- [Customer and Admin Workflow Map](phase-3/design-assets/CUSTOMER_ADMIN_WORKFLOW_MAP.svg)
- [Customer Discovery and Journal](phase-3/design-assets/CUSTOMER_DISCOVERY_AND_JOURNAL.svg)
- [Order Confirmation and Invoice](phase-3/design-assets/ORDER_CONFIRMATION_AND_INVOICE.svg)
- [Journal, Offers and Support](phase-3/design-assets/JOURNAL_OFFERS_SUPPORT_PAGES.svg)
- [Admin Hero Campaign and 360° Spin Builder](phase-3/design-assets/ADMIN_HERO_CAMPAIGN_AND_SPIN_BUILDER.svg)
- [Inventory and Sold-out States](phase-3/design-assets/INVENTORY_STOCK_STATES.svg)
- [Responsive and State Coverage](phase-3/design-assets/RESPONSIVE_AND_STATE_COVERAGE.svg)
11. [Figma Visual Design Handoff](phase-3/FIGMA_VISUAL_DESIGN_HANDOFF.md)

## Phase 4–6 execution plans

- [Phase 4 — MVP Development Execution Plan](phase-4/DEVELOPMENT_EXECUTION_PLAN.md)
- [Phase 5 — QA, Security and Performance Plan](phase-5/QA_SECURITY_PERFORMANCE_PLAN.md)
- [Phase 6 — Deployment, Operations and Maintenance Runbook](phase-6/DEPLOYMENT_OPERATIONS_MAINTENANCE_RUNBOOK.md)

## Core documentation rules

1. Every substantial document has an ID, version, status and purpose.
2. Separate accepted decisions from proposals, assumptions and open owner decisions.
3. Every implementation task maps to a requirement, design, test and acceptance criterion.
4. Update impacted documents together when scope/schema/API/security/workflow changes.
5. No credentials, production QR/account details, payment proofs, customer personal data or secrets in Git.
6. Email login/checkout does not imply marketing consent; promotional email requires current topic opt-in and suppression checks.
7. Product, order, payment, stock and invoice truth is server/database authoritative.
8. Do not claim functionality is implemented, tested or deployed without evidence.
9. Phase 4 development begins only after Phase 3 design/architecture is approved.
