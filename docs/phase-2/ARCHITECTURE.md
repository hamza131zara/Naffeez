# Naffeez — Application Architecture

**Document ID:** NAF-P2-ARCH-001  
**Version:** 0.1.0  
**Status:** Draft for owner review  
**Last updated:** 2026-11-28

## 1. Architecture goals

- Launch quickly with a small operational footprint.
- Keep core commerce understandable and maintainable.
- Separate storefront UI, domain rules, infrastructure adapters and admin workflows.
- Preserve server-side control over price, stock, order creation, payment status and invoice numbers.
- Use Supabase for managed PostgreSQL, Auth and Storage where appropriate.
- Keep AI, virtual try-on and advanced 3D optional and replaceable.
- Avoid microservices until independent scaling or operational requirements justify them.

## 2. Recommended architecture

**Decision proposal:** a modular monolith using Next.js App Router + TypeScript, deployed to a commercially permitted Node.js hosting target, with Supabase PostgreSQL/Auth/Storage. Use server components for read-heavy storefront screens and server-side route handlers/actions for validated mutations.

The main application contains storefront, admin, server endpoints and domain services in one deployable unit. Python/FastAPI is not part of MVP deployment.

~~~mermaid
flowchart TB
  C[Customer browser] --> N[Next.js storefront]
  A[Admin browser] --> N
  N --> D[Domain services]
  D --> S[Supabase Auth and PostgreSQL]
  D --> ST[Supabase Storage]
  D --> W[WhatsApp deep link]
  D --> P[Payment instructions and manual review]
  D -. future adapter .-> AI[Optional AI provider]
  D -. future adapter .-> VT[Optional virtual try-on provider]
  VT -. future only .-> PY[Optional Python FastAPI worker]
~~~

## 3. Technology choices

| Layer | Recommendation | Rationale |
|---|---|---|
| Framework | Next.js App Router | One application for storefront, admin and server endpoints |
| Language | TypeScript, strict mode | Shared types and safer domain contracts |
| UI | React + Tailwind CSS + accessible component primitives | Reusable responsive components |
| Theme | CSS semantic tokens + theme preference | Both light and dark themes without duplicated component styling |
| Database | Supabase PostgreSQL | Relational commerce data and transactions |
| Auth | Supabase Auth | Customer/admin identity; admin authorization remains app-owned |
| File storage | Supabase Storage | Product media, QR assets, private payment proof and private invoices |
| Server Supabase client | @supabase/ssr + @supabase/supabase-js, isolated behind adapters | Cookie-based SSR session integration |
| Validation | Zod | Validate every external input on the server |
| Forms | React Hook Form + Zod | Admin product forms and checkout validation |
| Local UI state | Zustand, used selectively | Cart draft/UI state, not trusted totals |
| Server state | Next.js server data fetching; TanStack Query only where interactive client refresh is justified | Avoid duplicate data/state layers |
| Testing | Vitest + Playwright + Supabase DB tests | Domain, browser and database security coverage |
| Monitoring | Provider logs first; Sentry or equivalent after privacy/config review | Cost-conscious visibility |
| 3D | Three.js/React Three Fiber, lazy-loaded later | No 3D bundle on standard product browsing |

### Version policy

Research snapshot on 2026-11-28:
- The official Next.js GitHub release feed identifies v16.4.6 as the latest stable release found; v16.5 entries remain canary. Start implementation on the current stable patch after checking again, pin exact versions and commit the lockfile. Do not use canary in production by default.
- Supabase documents @supabase/ssr as beta. It is the documented cookie-session integration for SSR, but its API can change. Encapsulate it in a small auth adapter, pin its exact version and re-check release/docs before implementation.
- Supabase client packages dropped Node.js 20 support in 2026. Use a supported Node.js 22+ runtime and verify package engine requirements at scaffold time.

Do not blindly upgrade core dependencies. Review release notes/security advisories and run typecheck, tests and build after each upgrade.

## 4. Hosting and runtime strategy

The hosting provider is intentionally not locked in by this architecture draft. The selected target must:
- support the required Next.js App Router/server rendering and route handlers;
- permit commercial e-commerce use under its chosen plan and terms;
- support environment secrets, custom domain, TLS and deploy previews;
- have a realistic free/low-cost path without implying a free plan is suitable for guaranteed production uptime;
- support logs, rollback and reasonable regional latency.

A standard Node.js runtime is the least surprising initial target. Cloudflare currently recommends its vinext path for new Next.js applications on Workers, while its OpenNext guide is framed for maintaining existing applications. Because the deployment adapter path is evolving, test a representative build before choosing it; do not make it an assumption in application code.

## 5. Application boundaries

### Presentation layer
- Storefront routes and layouts.
- Admin routes/layouts.
- Reusable product, form, modal, drawer and navigation components.
- Theme, responsive behavior and accessible interaction states.

### Application/domain layer
- Catalog query services.
- Product/variant availability rules.
- Cart quote and order placement.
- Inventory reservation and movement.
- Payment submission and verification.
- Invoice issue/render/download authorization.
- Admin permission checks and audit events.

### Infrastructure layer
- Supabase request-scoped client.
- Server-only administrative client, if required.
- Storage adapter.
- Email/WhatsApp link adapter.
- Provider adapters for future integrations.
- Monitoring and structured logging.

Business rules must not be embedded only in React components. Any rule affecting money, permissions, inventory, payment or invoices must execute on the server and/or in the database transaction.

## 6. Suggested repository layout

~~~text
src/
  app/
    (store)/
      page.tsx
      shop/
      collections/
      products/[slug]/
      search/
      wishlist/
      compare/
      cart/
      checkout/
      orders/
      account/
      contact/
      about/
      size-guide/
      shipping-returns/
      privacy/
      terms/
    (admin)/
      admin/
        dashboard/
        products/
        categories/
        collections/
        inventory/
        orders/
        payments/
        invoices/
        customers/
        content/
        settings/
        staff/
    api/
      v1/
  components/
    ui/
    layout/
    catalog/
    product-studio/
    cart/
    checkout/
    account/
    admin/
  features/
    catalog/
    cart/
    orders/
    payments/
    invoices/
    inventory/
    customers/
    content/
    admin/
  server/
    auth/
    authorization/
    services/
    repositories/
    integrations/
    validation/
    observability/
  lib/
    supabase/
    config/
    format/
  styles/
supabase/
  migrations/
  tests/
  seed/
docs/
~~~

Keep route files thin. Route handlers call validated services; services coordinate repositories/transactions; UI components render state and collect input.

## 7. Rendering and data fetching

- Public catalog/category/product pages: server-render or statically render where safe; revalidate/purge after admin product/content changes.
- Customer-specific account, wishlist, cart state and invoices: user-scoped requests; never cache across users.
- Admin pages: authenticated server-side checks on every page/action; do not rely on hidden navigation.
- Product imagery: optimized image components and CDN-backed storage; reserve image aspect ratio.
- Interactive drawers, carousel, compare and selectors: client components only where browser interaction is required.
- Use cache only for public content. Explicitly opt out of shared caching for personalized, order, payment and invoice responses.

## 8. Supabase client model

- Browser client: publishable key only; used for permitted user-scoped operations.
- Server request client: cookie-aware, request-scoped session client for user identity and RLS-protected reads/writes.
- Admin/service client: server-only, never imported into client components; use narrowly after server-side admin authorization for tasks that need privileged access.
- Never place service-role/secret keys in NEXT_PUBLIC variables.
- Verify user identity on the server for sensitive operations; do not trust a client-supplied user ID.

Because @supabase/ssr is currently documented as beta, isolate its usage under src/lib/supabase and do not scatter cookie/session helper calls through the app.

## 9. Transaction boundaries

Order placement must be a single atomic operation:
1. Validate request and idempotency key.
2. Re-read products, variants, current prices and stock.
3. Validate active variants and purchase limits.
4. Calculate totals using server-owned rules.
5. Reserve/decrement inventory atomically.
6. Create order and immutable order-item snapshot.
7. Create initial payment state and invoice record/number.
8. Commit once, then generate/store PDF asynchronously or recoverably.
9. Return order reference and a restricted customer access path.

Implementation must select one transactional approach in Phase 2 implementation design: a narrowly scoped server-only database transaction/RPC with tightly constrained execution rights. Do not implement order creation as multiple independent browser requests.

## 10. Security boundaries

- All admin actions are authorized server-side.
- Customer records are owner-scoped through RLS.
- Payment proof and invoice objects are private.
- Public catalog assets are separated from private uploads.
- Order totals and payment states cannot be supplied as trusted client values.
- All admin payment verification, inventory adjustment and order status changes are audit logged.
- Webhook signature verification and idempotency are required if a provider is added.
- No customer photos are accepted in MVP.

## 11. Future Python boundary

Only create a Python service when an actual AI/image workload is selected. Preferred future design:
- FastAPI service or worker in a separately deployable module.
- Server-to-server authentication from Next.js.
- Narrow request/response contract and provider adapter.
- Async job IDs for long-running image work.
- Private image URLs or one-time signed URLs with short validity.
- Usage quota, timeout, retry, cost and consent enforcement.
- No direct Python access to the whole production database unless a specific need and least-privilege role are approved.

## 12. Architecture decisions still open

- Final commercial hosting plan/provider.
- Exact authentication method and transactional email provider.
- Whether customer accounts are required at launch or guest order access is sufficient.
- Inventory reservation duration and cancellation/release policy.
- Transaction mechanism details for the atomic order command.
- Whether product reviews/promotions are launch scope.
- Whether a dedicated background job runner is required for invoice PDF generation.


## 13. Official references checked for this draft

Checked on 2026-11-28; re-check before scaffolding because package and platform guidance can change.

- Next.js official releases: https://github.com/vercel/next.js/releases
- Next.js v16 upgrade guide: https://nextjs.org/docs/app/guides/upgrading/version-16
- Supabase SSR guide: https://supabase.com/docs/guides/auth/server-side
- Supabase package selection: https://supabase.com/docs/guides/auth/choosing-a-server-package
- Supabase SSR client setup for Next.js: https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs
- Supabase Node.js 20 support notice: https://supabase.com/changelog
- Cloudflare Next.js / vinext guide: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- Cloudflare OpenNext guide: https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/

The current Supabase SSR guide describes @supabase/ssr as beta. The current Cloudflare guide recommends vinext for new Next.js Worker deployments. These facts are reasons to isolate adapters and run a representative compatibility test, not reasons to assume a production deployment target today.
