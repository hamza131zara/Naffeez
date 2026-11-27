# Naffeez — Architecture and Product Decision Log

**Document ID:** NAF-P2-ADR-001  
**Version:** 0.1.0  
**Status:** Active draft  
**Last updated:** 2026-11-28

This log distinguishes owner-confirmed decisions from architecture proposals and unresolved questions. A proposal is not an owner-approved business policy until explicitly accepted.

## Accepted product decisions

| ID | Decision | Status | Source |
|---|---|---|---|
| NAF-001 | Initial store is men's clothing only | Accepted | Owner Phase 1 decisions |
| NAF-002 | Initial categories: Casual Shirts, Dress Shirts, Seasonal Trousers, Winter Trousers and Hoodies | Accepted | Owner Phase 1 decisions |
| NAF-003 | English-only launch, Pakistan market, PKR display | Accepted | Owner Phase 1 decisions / Phase 1 baseline |
| NAF-004 | Admin manages products through dashboard | Accepted | Owner Phase 1 decisions |
| NAF-005 | Checkout offers COD and admin-managed Easypaisa/bank QR transfer | Accepted | Owner Phase 1 decisions |
| NAF-006 | Manual transfers require admin verification | Accepted | Commerce workflow baseline |
| NAF-007 | WhatsApp is a customer support/product enquiry channel | Accepted | Owner Phase 1 decisions |
| NAF-008 | Generate invoices after checkout; customer and admin can view/download | Accepted | Owner Phase 1 decisions |
| NAF-009 | Light and Dark modes; monochrome editorial with restrained glass and selective 3D | Accepted | Owner Phase 1 decisions |
| NAF-010 | Product card click opens dedicated Naffeez Product Studio | Accepted | Owner Phase 1 decisions |
| NAF-011 | AI styling, face preview, virtual try-on and advanced 3D are later phases | Accepted | Owner Phase 1 scope |

## Architecture proposals for review

| ID | Proposal | Reason | Status |
|---|---|---|---|
| ADR-001 | Next.js App Router + TypeScript modular monolith for MVP | Small deployable footprint; storefront/admin/server in one app | Proposed |
| ADR-002 | Supabase PostgreSQL/Auth/Storage | Managed relational database, identity and object storage | Proposed |
| ADR-003 | Server components for public reads; server services for privileged writes | Performance and trust boundaries | Proposed |
| ADR-004 | Python/FastAPI only as optional future AI/image service | Avoid unnecessary runtime and deployment overhead | Proposed |
| ADR-005 | Fixed integration adapters; no arbitrary plugin code loader | Replaceable providers without unsafe dynamic execution | Proposed |
| ADR-006 | Client cart may be local-first; server is authoritative at checkout | Minimize initial backend complexity | Proposed |
| ADR-007 | Private storage for payment proof/invoices; public read for approved product media | Prevent PII and transaction evidence exposure | Proposed |
| ADR-008 | Atomic order creation and stock reservation | Prevent duplicate orders and overselling | Proposed |
| ADR-009 | Immutable order/invoice line snapshots | Preserve historic transaction details | Proposed |

## Open owner/business decisions

| ID | Question | Why it matters | Status |
|---|---|---|---|
| OPEN-001 | Which customer sign-in/recovery method: email link/OTP, phone OTP, or guest-only for first launch? | Auth and guest order recovery | Needs owner decision |
| OPEN-002 | Which email/SMS provider is acceptable and within budget? | OTP, order/invoice notifications | Needs owner decision |
| OPEN-003 | What size chart and measurement units will products use? | Product schema and Product Studio |
| OPEN-004 | Which delivery cities/areas are served and how is shipping charged? | Checkout price calculation |
| OPEN-005 | Where is COD available and what rules apply? | Checkout eligibility |
| OPEN-006 | What are return/exchange time limits and conditions? | Policy pages and order workflows |
| OPEN-007 | Which Easypaisa/bank QR/account details are approved for public checkout display? | Payment-method configuration |
| OPEN-008 | Is transaction reference mandatory, proof upload mandatory, or both? | Payment submission flow |
| OPEN-009 | When is stock reserved and for how long for COD and QR orders? | Inventory transaction design |
| OPEN-010 | What exact invoice seller/legal information and numbering pattern are required? | Invoice document correctness |
| OPEN-011 | Which commercial hosting plan/provider will be used? | Deployment, cost and runtime choice |
| OPEN-012 | Which user accounts receive Owner, Manager and Payment Operator roles? | Admin access |
| OPEN-013 | Are customer accounts, persisted cart and compare all required at launch? | Scope/time trade-off |
| OPEN-014 | Are sales tax/VAT or additional legal fields applicable? | Invoice compliance; requires owner/professional confirmation |

## Technical facts to re-check before implementation

- Next.js release channel and current stable patch.
- Supabase @supabase/ssr maturity/API.
- Supabase Data API grants and RLS defaults.
- Node.js supported versions for selected package versions.
- Hosting plan commercial-use terms and limits.
- Current Supabase quotas, backup behavior and project pausing.
- Current provider terms, quotas, data use, licensing and commercial rights for any future AI feature.

## Change procedure

1. State the current decision and reason for change.
2. Identify affected documents/schema/API/UI.
3. Record owner approval when the decision is a business policy or material cost/security choice.
4. Update this log and all dependent docs in the same PR.
5. Increment the affected document version if baseline meaning changes.


## Notification and editorial decisions

| ID | Decision | Status | Notes |
|---|---|---|---|
| NAF-012 | Add a Naffeez Journal for style articles/editorial content | Owner-requested | Additive to accepted Phase 1 baseline through v1.1 addendum |
| NAF-013 | Provide customer notification inbox and preferences page | Owner-requested | Covers order/account notifications and marketing topics |
| NAF-014 | Send transactional order/payment/fulfillment/invoice emails | Required product behavior | Separate from marketing preference |
| NAF-015 | Provide email updates for new products, articles and offers | Owner-requested | Campaigns only to confirmed subscribers with relevant topic opt-in |
| NAF-016 | Email account sign-in alone does not enable marketing | Privacy safeguard | Explicit opt-in and unsubscribe required |
| NAF-017 | Provide admin alerts for new orders, QR review, stock thresholds and critical notification failures | Required operational behavior | Configurable role routing and escalation |

## New architecture proposals

| ID | Proposal | Reason | Status |
|---|---|---|---|
| ADR-010 | Durable notification outbox plus scheduled worker | Reliable sends without blocking order transactions | Proposed |
| ADR-011 | Separate transactional and marketing email streams/subdomains where supported | Protect order/security email deliverability | Proposed |
| ADR-012 | Email provider adapter with signed webhooks and normalized delivery states | Swap provider without changing domain rules | Proposed |
| ADR-013 | Explicit topic-based consent, preference center and suppression records | Prevent unintended promotional email and honor preferences | Proposed |
| ADR-014 | Product/article publication creates campaign draft, never automatic bulk send | Human review of offer facts, stock and audience | Proposed |

## Additional owner decisions

| ID | Question | Why it matters |
|---|---|---|
| OPEN-015 | Which email provider/plan should be used for transactional and marketing streams? | Pricing, quotas, deliverability and data processing |
| OPEN-016 | Which sender display name/from/reply-to addresses will be used? | Brand and response handling |
| OPEN-017 | Who is allowed to approve marketing campaigns? | Brand and offer accuracy |
| OPEN-018 | Should first marketing frequency be immediate, weekly digest, or customer-selectable? | Campaign cadence |
| OPEN-019 | Which staff roles receive operational alerts and escalation? | Response ownership |
| OPEN-020 | What is the approved marketing consent wording and privacy notice? | Customer transparency and legal review |

