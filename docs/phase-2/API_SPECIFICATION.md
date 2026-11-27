# Naffeez — API Specification

**Document ID:** NAF-P2-API-001  
**Version:** 0.1.0  
**Status:** Draft; route contracts to validate during implementation  
**Last updated:** 2026-11-28

## 1. API principles

- Internal storefront reads may use server-side Supabase queries directly; public API routes are not required for every server component.
- All writes affecting commerce must pass through server-side application services.
- Validate request bodies with Zod or equivalent server-side schemas.
- Recalculate price, stock, discount, shipping and totals on the server.
- Never accept client-supplied payment status, invoice number, stock count, admin role or authoritative price.
- Use idempotency for order creation and payment submission.
- Return safe messages; never leak database errors, stack traces, tokens or secrets.
- Use private/no-store cache headers for account, order, payment and invoice responses.

## 2. Route conventions

Base path proposal: /api/v1. Route handlers may be renamed before implementation, but contracts and access controls must remain equivalent.

| Method and route | Purpose | Access |
|---|---|---|
| GET /catalog/categories | Active categories and hierarchy | Public |
| GET /catalog/products | Product listing/search/filter/sort | Public |
| GET /catalog/products/{slug} | Published product detail and variants | Public |
| POST /checkout/quote | Validate cart and return server-calculated quote | Guest/customer |
| POST /orders | Create order and initial invoice atomically | Guest/customer |
| GET /orders/{orderNumber} | Retrieve limited order summary | Owner or verified guest capability |
| POST /orders/{orderNumber}/payment-submissions | Submit transfer reference/proof | Order owner/verified guest |
| GET /orders/{orderNumber}/invoice | View authorized invoice metadata/document | Order owner or admin |
| GET /invoices/{invoiceNumber}/pdf | Download or stream invoice PDF | Order owner or admin |
| GET /account/orders | Customer order history | Authenticated owner |
| GET /account/wishlist | Customer wishlist | Authenticated owner |
| PUT /account/wishlist/{productId} | Add/remove wishlist item | Authenticated owner |
| GET /admin/products | Search/manage products | Authorized admin |
| POST /admin/products | Create draft product | Product admin |
| PATCH /admin/products/{id} | Update product | Product admin |
| POST /admin/products/{id}/publish | Publish/archive product | Product admin |
| POST /admin/inventory/adjustments | Record stock adjustment | Inventory admin |
| GET /admin/orders | Filter/search orders | Authorized admin |
| PATCH /admin/orders/{id}/status | Change fulfillment status | Order admin |
| GET /admin/payments/pending | List transfer submissions awaiting review | Payment admin |
| POST /admin/payments/{submissionId}/verify | Verify received transfer | Payment admin |
| POST /admin/payments/{submissionId}/reject | Reject submission with reason | Payment admin |
| GET /admin/invoices | Search invoices | Invoice admin |
| GET /admin/settings/payment-methods | View configured payment methods | Settings admin |
| PUT /admin/settings/payment-methods/{id} | Enable/configure QR method | Settings admin |

All admin routes require server-side authentication and permission checks on every request. Hiding UI controls is not authorization.

## 3. Request rules

### Checkout quote

Input:
- Cart lines: variant identifier and positive quantity.
- Shipping destination fields sufficient to calculate configured delivery rules.
- Coupon code only if promotions become launch scope.

Server behavior:
1. Validate shape and line limits.
2. Load current active product and variant records.
3. Reject disabled/unavailable variants.
4. Calculate current prices, stock, discounts and shipping.
5. Return a quote summary and short-lived quote reference/hash.
6. Do not reserve stock during quote unless explicitly designed.

Client-provided prices/totals are ignored.

### Order creation

Required header:
- Idempotency-Key: unique opaque value for a checkout submission.

Input:
- Quote reference or cart lines revalidated by server.
- Customer name, phone, email if required.
- Delivery address.
- Payment method code: cod/easypaisa_qr/bank_qr.
- Optional customer notes.
- For authenticated purchase, identity derives from verified session, never request body.

Server behavior:
- Revalidate every quote detail.
- Create order, item snapshots, stock reservation/decrement, initial payment event and invoice number in one transaction.
- For QR method, return payment instructions and Pending Verification state.
- For COD, return Payable on Delivery state.
- Repeating the same idempotency key returns the original result rather than creating a duplicate order.

### Payment submission

Input:
- transaction reference (when available);
- submitted amount (informational and validated against order);
- proof upload identifier/path created by the secure upload flow.

The submission remains pending until admin review. Do not infer success from client claims, a QR scan event or file upload.

### Admin verification

Input:
- decision: verified/rejected/request_new_proof;
- mandatory reason for rejection/request;
- optional internal note.

Server checks current user role, submission state and whether it has already been reviewed. Record reviewer, time, prior/new status and reason in an immutable event.

## 4. Response envelope

Success:
~~~json
{
  "data": {},
  "meta": {
    "requestId": "opaque-request-id"
  }
}
~~~

Error:
~~~json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please review the highlighted information.",
    "fieldErrors": {
      "phone": ["Enter a valid phone number."]
    },
    "requestId": "opaque-request-id"
  }
}
~~~

Do not expose raw SQL errors, internal exception text, access tokens or provider secrets.

## 5. HTTP status and error codes

| HTTP | Code | Meaning |
|---|---|---|
| 400 | VALIDATION_ERROR | Request shape/field invalid |
| 401 | UNAUTHENTICATED | Valid session required |
| 403 | FORBIDDEN | User lacks permission |
| 404 | NOT_FOUND | Resource absent or not visible |
| 409 | CONFLICT | Stale stock/variant, duplicate state transition or idempotency conflict |
| 413 | FILE_TOO_LARGE | Upload exceeds configured limit |
| 415 | UNSUPPORTED_MEDIA_TYPE | File type not allowed |
| 422 | BUSINESS_RULE_VIOLATION | Valid syntax but invalid business action |
| 429 | RATE_LIMITED | Request rate exceeded |
| 500 | INTERNAL_ERROR | Unexpected application failure |
| 503 | TEMPORARILY_UNAVAILABLE | Dependency unavailable |

## 6. Pagination and filtering

- Use cursor pagination for orders/admin tables when datasets grow.
- Public catalog can use page/limit initially; enforce a server maximum.
- Allow only enumerated sort keys; do not interpolate raw sort strings into SQL.
- Validate filter values against catalog taxonomy and supported query fields.
- Return total count only where affordable/useful; otherwise return page metadata.

## 7. File upload contracts

- Browser requests an authorized upload target or uploads through a server-validated flow.
- Validate actual content type, extension, file signature, byte size and image dimensions.
- Use randomized object names; never trust the client filename as storage path.
- Product media may be public after admin publication.
- Payment proof must use a private bucket and be attached to the correct order only after authorization.
- Do not allow SVG/HTML/script uploads without a specific sanitization policy.
- Signed URLs must be short-lived and created only after authorization.

## 8. Rate limits and abuse controls

Initial proposed limits (final values to tune after testing):
- Checkout/order creation: per IP/session/contact fingerprint, plus idempotency.
- Login and OTP: provider-aligned throttles, CAPTCHA/risk checks if abuse appears.
- Payment proof submission: per order and per time window.
- Search: per IP/session.
- Admin mutations: authenticated role and CSRF/origin protections where applicable.

Do not block shared households solely by IP; combine signals and return useful retry guidance.

## 9. API compatibility and versioning

- Keep /api/v1 contracts backward-compatible during MVP.
- Breaking changes require a version update or migration plan.
- Generate/maintain API schemas from source validation models where practical.
- Document status-code and error-contract tests.
- Internal server component calls may call domain services directly; do not self-fetch the public API unnecessarily.
