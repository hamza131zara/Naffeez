# Phase 2 — Technical Documentation Review and Approval Checklist

**Document ID:** NAF-P2-REVIEW-001  
**Version:** 1.0  
**Status:** Draft review procedure

## 1. Review order

1. Read Phase 1 baseline and additive notification/editorial addendum.
2. Review PRD priorities and make sure every P0 flow has a requirement ID.
3. Review architecture boundaries and validate hosting/runtime feasibility.
4. Review database entities, constraints, indexes and transaction boundaries.
5. Review API contract against data model and user permissions.
6. Review authentication, RLS, storage and guest-order access.
7. Review order/payment/invoice state machines.
8. Review notification/alert event matrix and consent rules.
9. Review integration/plugin adapters and provider configuration.
10. Review security/privacy, sender authentication and photo privacy.
11. Review deployment, backups, maintenance and provider costs.
12. Review test strategy against every critical requirement.
13. Resolve contradictions and open owner decisions.
14. Update decision log and cross-document references.
15. Obtain explicit owner approval before Phase 3 begins.

## 2. Document review method

For each document:
- confirm title, ID, version and status;
- validate links to other repository documents;
- distinguish Accepted, Proposed, Assumed and Open;
- verify every named route/table/API has matching permission rules;
- verify money/status fields are server controlled;
- verify private objects have a private storage/access plan;
- verify background processes have retries, idempotency and monitoring;
- verify failure and recovery states;
- verify acceptance criteria are objectively testable;
- verify no credentials or personal data appear in examples.

## 3. Technical consistency matrix

| Concern | Must agree across |
|---|---|
| Product and category model | PRD, DB, API, admin UI, test strategy |
| Customer identity and guest orders | PRD, architecture, DB, API, RLS, security |
| Inventory and reservation | PRD, DB, order workflow, API, tests |
| COD/QR payment | PRD, DB, API, admin roles, workflow, security, tests |
| Invoice numbering/snapshot | PRD, DB, workflow, API, tests |
| Journal and articles | Phase 1 addendum, PRD, DB, API, admin UI, SEO/tests |
| Marketing preferences/consent | Phase 1 addendum, PRD, DB, API, RLS, security |
| Transactional email | PRD, notification spec, integration contract, DB, API, operations |
| Campaign email | consent model, campaign API/admin UI, suppression, tests |
| Admin alerts | event matrix, role matrix, alert routing, operations |
| Hosting/secrets | architecture, deployment, security |
| Performance | Phase 1 UX, architecture, test strategy, deployment |

## 4. Decisions that must be resolved before implementation

- Authentication method and email verification flow.
- Guest order access and recovery.
- Customer account requirement for marketing subscription.
- Size chart and product variant dimensions.
- Delivery coverage, fees and COD availability.
- Return/exchange policy and customer messaging.
- QR proof/reference requirement and manual verification responsibility.
- Stock reservation and expiry rules.
- Invoice seller/legal fields, numbering and retention.
- Hosting and Supabase environment strategy.
- Email sending provider, sending domain and transactional/marketing separation.
- Marketing subscription topics, frequency defaults and opt-in language.
- Admin and operator identities/permissions.
- Article publishing roles and marketing announcement approval.
- Backup target, RPO/RTO and operational alert recipients.

## 5. Phase 2 exit gate

Phase 2 is approved only when:
- every P0 feature has traceable requirements;
- data model supports all agreed P0 flows;
- API contracts match permissions and data model;
- admin roles and RLS boundaries are tested on paper and ready for automated tests;
- order, payment, inventory and invoice state transitions are unambiguous;
- notification consent, transactional/marketing separation, delivery status and suppression are defined;
- no security-critical open question remains unresolved;
- hosting/provider assumptions are explicitly identified;
- owner accepts any remaining cost or scope trade-off;
- Phase 3 implementation plan and acceptance tests are ready.

A document being present in GitHub does not mean it is approved or implemented.
