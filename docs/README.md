# Naffeez Documentation

This directory is the source of truth for product requirements, design, architecture, implementation, testing, notifications, security and operations.

## Baselines

- [Phase 1 Product & UI/UX Baseline v1.0](phase-1/NAFFEEZ_PHASE_1_UI_UX_SPECIFICATION_v1.0.md) — accepted and merged into main.
- [Phase 1 detailed execution/design handoff](phase-1/EXECUTION_AND_DESIGN_HANDOFF.md).
- [Phase 1 Journal and Notifications Addendum v1.1](phase-1/NOTIFICATIONS_AND_JOURNAL_UX_ADDENDUM_v1.1.md).
- [Detailed Phase-Based Roadmap v2.0](ROADMAP.md).

## Phase-based documentation status

| Phase | Folder | Purpose | Status |
|---|---|---|---|
| 1 | [phase-1](phase-1/) | Product scope, UX screens, interactions, Journal and notification UX | Baseline accepted; addenda documented |
| 2 | [phase-2](phase-2/) | PRD, architecture, data model, APIs, permissions, workflows, notifications, security, operations and tests | Expanded draft; owner review pending |
| 3 | [phase-3](phase-3/) | Detailed MVP development milestones and task-level definition of done | Planned |
| 4 | [phase-4](phase-4/) | QA, security, notification, responsive and performance execution | Planned |
| 5 | [phase-5](phase-5/) | Deployment, email sender setup, operational runbooks and maintenance cadence | Planned |
| Later | future | AI styling, virtual try-on, optional Python worker and advanced 3D | Deferred |

## Phase 1 documents

1. [Accepted product/UI/UX baseline](phase-1/NAFFEEZ_PHASE_1_UI_UX_SPECIFICATION_v1.0.md)
2. [Detailed execution and design handoff](phase-1/EXECUTION_AND_DESIGN_HANDOFF.md)
3. [Journal, Notifications and Email Preferences Addendum](phase-1/NOTIFICATIONS_AND_JOURNAL_UX_ADDENDUM_v1.1.md)

## Phase 2 documents

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

## Phase 3–5 execution plans

- [Phase 3 — MVP Development Execution Plan](phase-3/DEVELOPMENT_EXECUTION_PLAN.md)
- [Phase 4 — QA, Security and Performance Plan](phase-4/QA_SECURITY_PERFORMANCE_PLAN.md)
- [Phase 5 — Deployment, Operations and Maintenance Runbook](phase-5/DEPLOYMENT_OPERATIONS_MAINTENANCE_RUNBOOK.md)

## Required documentation rules

1. Every substantial document has an ID, version, status and purpose.
2. Keep confirmed decisions separate from assumptions, proposals and open owner decisions.
3. Every implementation task maps to a requirement, design, test and acceptance criterion.
4. Update impacted documents together when scope/schema/API/security/workflow changes.
5. No credentials, production QR/account details, payment proofs, customer personal data or secrets in Git.
6. Email login/checkout does not imply marketing consent. Promotional emails require current opt-in and suppression checks.
7. Do not claim functionality is implemented, tested or deployed without evidence.
