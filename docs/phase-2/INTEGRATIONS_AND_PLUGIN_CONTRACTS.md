# Naffeez — Integrations and Plugin Contracts

**Document ID:** NAF-P2-INT-001  
**Version:** 0.1.0  
**Status:** Draft; MVP uses minimal integrations  
**Last updated:** 2026-11-28

## 1. Design intent

Naffeez should be modular and provider-replaceable without loading a large plugin runtime or deploying a microservice for every capability.

For this project, “plugin-based” means reviewed adapters with fixed interfaces and typed configuration, not arbitrary code uploaded by administrators or customers.

## 2. MVP integrations

| Capability | MVP implementation | Status |
|---|---|---|
| Database | Supabase PostgreSQL | Core |
| Authentication | Supabase Auth, exact method to be selected | Core |
| File storage | Supabase Storage | Core |
| Manual payment | Static QR + instructions + admin review | Core |
| WhatsApp | Customer-initiated wa.me/deep link | Core |
| Transactional email | Provider to be selected if account/order email is required | Decision needed |
| SMS/phone OTP | Not assumed; provider and cost decision required | Deferred |
| AI text | Not active in MVP | Deferred |
| Virtual try-on | Not active in MVP | Deferred |
| Python/FastAPI | No runtime in MVP | Deferred |
| 3D rendering | No 3D bundle on standard storefront | Deferred |

## 3. Integration adapter interfaces

Conceptual contracts; exact TypeScript types will be created with implementation.

### Payment method adapter
Responsibilities:
- return customer-displayable payment instructions;
- identify supported method code;
- validate enabled/disabled configuration;
- provide admin health/status when a real provider exists.

For MVP QR transfer, the adapter is a configuration-backed manual method. It does not claim to verify payment automatically.

### AI text provider
Future responsibilities:
- accept a bounded task such as event/style recommendations;
- use catalog context assembled by Naffeez;
- return structured product IDs and reasoning;
- enforce timeouts, quotas and error normalization;
- never invent products or availability.

### Virtual try-on provider
Future responsibilities:
- accept consent-verified image references and a product/garment reference;
- create an asynchronous job;
- return job ID/status and a short-lived result asset;
- expose deletion/retention behavior if provider supports it;
- report cost/quota and provider request identifiers without logging photos.

### Image storage provider
Responsibilities:
- store public catalog media separately from private customer/payment media;
- issue signed access only after authorization;
- support deletion and lifecycle policy.

### Notification provider
Future responsibilities:
- send approved transactional message template;
- return delivery status and provider message ID;
- support retries/idempotency;
- never send sensitive data beyond approved message fields.

## 4. Integration registry/settings model

Admin settings should be section-based:

- Provider catalog (fixed, reviewed integrations).
- Enable/disable capability.
- Provider selection for a capability.
- API credential input (where applicable), secret saved only server-side.
- “Test connection” action when the provider supports a safe health/test endpoint.
- Connection state: Not configured, Configured, Healthy, Unavailable, Error, Disabled.
- Last checked time and sanitized error summary.
- Usage/quota information only if provider exposes reliable usage data.
- Credential rotation and removal.
- Audit record for enable/disable/credential changes.

Do not display raw secrets after saving; show masked/“configured” state. Do not write API keys into ordinary settings JSON, browser-readable database rows, logs or Git. Use deployment secrets or an encrypted secrets manager appropriate to the chosen host.

## 5. Adapter registry rules

- Allowlist provider identifiers in code.
- Validate configuration against a provider-specific schema.
- Provider adapters are imported/registered at build time; no arbitrary dynamic package installation.
- Every adapter must have timeout, error mapping, retry and circuit-breaker policy appropriate to the operation.
- Payment verification and order creation are not delegated to an AI provider.
- A failing optional provider cannot block browsing/cart/checkout.
- Test connection must not make a billable generation unless clearly disclosed.
- Avoid automatic retries for non-idempotent paid API calls unless provider idempotency is supported.

## 6. Python and FastAPI boundary

Python is useful for image processing, AI orchestration or a model runtime, not for ordinary product/category CRUD.

Add a separate FastAPI service only when a selected model/provider needs Python dependencies or long-running processing:
- Next.js backend calls a private authenticated endpoint.
- Request includes task ID, provider selection, allowed product IDs and private asset references.
- FastAPI returns structured result/job status.
- Long work runs asynchronously with job state and retries.
- Python service gets least-privilege storage access, not unrestricted production DB credentials.
- Store images in private storage; use short-lived signed URLs or controlled proxy.
- Apply quota, concurrency, cost ceilings and deletion policy.

## 7. AI provider selection checklist

Before enabling a provider:
1. Free-tier quota and rate limits verified.
2. Commercial use and model/provider terms reviewed.
3. Submitted input/data use and model-training terms reviewed.
4. Data retention, deletion and geographic processing reviewed.
5. Image/photo restrictions reviewed where applicable.
6. Pricing after free allowance understood.
7. API key handling and rotation defined.
8. Failure, timeout and provider outage behavior tested.
9. Output schema and catalog grounding tested.
10. User-facing disclosure and consent written.

“Free API” does not mean unlimited, free for commercial use, privacy-safe or suitable for customer face images. Provider terms must be rechecked before use.

## 8. MVP constraints

- No plugin marketplace.
- No user-uploaded plugin code.
- No arbitrary npm/pip install from admin panel.
- No Python process in the Next.js application runtime.
- No API keys in NEXT_PUBLIC variables.
- No customer photo data sent to a text API.
- No background monitoring or billing without clear user/admin action.
