# Naffeez Documentation

This folder contains the source of truth for product requirements, design, architecture, implementation, testing and operations.

## Current baselines

- [Phase 1 — Product & UI/UX Baseline v1.0](phase-1/NAFFEEZ_PHASE_1_UI_UX_SPECIFICATION_v1.0.md) — accepted and merged into main.
- [Project Roadmap and Delivery Workflow](ROADMAP.md).

## Phase-based documentation

| Phase | Folder | Contents | Status |
|---|---|---|---|
| 1 | [phase-1](phase-1/) | Product scope, UI/UX, screens, interactions and acceptance baseline | Accepted |
| 2 | [phase-2](phase-2/) | PRD, architecture, database, APIs, RLS, workflows, integrations, security, deployment and test strategy | Draft set prepared; owner review pending |
| 3 | phase-3 | Development plans, module implementation notes and change records | Not started |
| 4 | phase-4 | QA plans, test evidence, security and performance reports | Not started |
| 5 | phase-5 | Deployment, operations, backup, rollback and maintenance guides | Not started |
| Later | future | AI styling, virtual try-on and advanced 3D plans | Deferred |

## Phase 2 documents

1. [Product Requirements Document](phase-2/PRD.md)
2. [Application Architecture](phase-2/ARCHITECTURE.md)
3. [Database Schema](phase-2/DATABASE_SCHEMA.md)
4. [API Specification](phase-2/API_SPECIFICATION.md)
5. [Authentication and RLS](phase-2/AUTHORIZATION_AND_RLS.md)
6. [Order, Payment and Invoice Workflows](phase-2/ORDER_PAYMENT_INVOICE_WORKFLOWS.md)
7. [Integrations and Plugin Contracts](phase-2/INTEGRATIONS_AND_PLUGIN_CONTRACTS.md)
8. [Security and Privacy](phase-2/SECURITY_PRIVACY.md)
9. [Deployment and Operations](phase-2/DEPLOYMENT_AND_OPERATIONS.md)
10. [Test Strategy](phase-2/TEST_STRATEGY.md)
11. [Decision Log](phase-2/DECISION_LOG.md)

## Documentation rules

1. Keep documents in the relevant phase folder.
2. Use Markdown unless another format materially improves the artifact.
3. Give each substantial document a version, status, owner/reviewer where relevant, and last-updated date.
4. Separate confirmed decisions from assumptions and unresolved questions.
5. Do not fabricate prices, policies, account details, provider capabilities or test results.
6. Keep secrets, production credentials and customer data out of Git.
7. Update the roadmap and decision log when scope or architecture decisions change.
8. Implementation must follow approved requirements and technical contracts; changes must be recorded.
