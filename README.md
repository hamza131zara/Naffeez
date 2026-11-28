# Naffeez

Premium men's fashion e-commerce platform for Pakistan. The approved direction is a monochrome editorial storefront with Light/Dark/System themes, a Product Studio shopping experience, admin-managed products and inventory, COD and manually verified Easypaisa/bank QR payments, invoices, a Journal and customer notification preferences.

**Website:** https://naffeez.com  
**Launch language:** English  
**Launch currency:** PKR  
**Initial catalog:** Casual Shirts, Dress Shirts, Seasonal Trousers, Winter Trousers and Hoodies.

AI styling, virtual try-on, face previews, 360° spin processing and geometry-based 3D are future modules, not MVP purchase dependencies.

## Project status

- [x] Phase 1 — Product/UI/UX baseline accepted.
- [x] Phase 2 — Technical documentation approved and merged into `main`.
- [x] Phase 3 — Visual design, both themes, motion directions, customer/admin workflows and frontend architecture accepted and merged into `main`.
- [ ] Phase 4 — MVP development in progress on `phase-4/mvp-implementation`.
- [ ] Phase 5 — QA, security, accessibility and performance.
- [ ] Phase 6 — Production deployment and maintenance.

## Phase 4 implementation slice

The initial implementation branch contains:
- Next.js App Router, React and strict TypeScript scaffold.
- Light/Dark/System theme preference and responsive shell.
- Responsive homepage, category/shop/search page and Product Studio route.
- Published-catalog Supabase read adapter (empty/setup state when configuration or published catalog is absent).
- Product card alternate-image hover, Quick View, guest wishlist and compare actions.
- Product Studio gallery, optional per-image zoom source, variant selection and local guest cart.
- Account/admin/checkout placeholders that do not bypass unresolved authentication, shipping, payment or authorization decisions.
- Node test runner and GitHub Actions workflow for lint, typecheck, tests and production build.

**This is an in-progress development slice, not a complete or production-ready store.** The dedicated Naffeez Supabase project is provisioned in Mumbai. The catalog foundation migrations, grants, RLS policies and private `product-media` bucket are applied and security-advisor checks are clear. The project has no product/category seed data yet. Checkout, COD/QR payment, invoices, customer authentication and admin operations remain gated on owner inputs and secure backend implementation.

## Run locally

Requires Node.js 22 or later.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Add the Naffeez Supabase URL and publishable key to `.env.local` (see `supabase/README.md`). Keep `SUPABASE_SECRET_KEY` blank until a protected server feature requires it. A secret key must remain server-only and must never use a `NEXT_PUBLIC_` prefix.

Quality commands:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

GitHub Actions run #106 passed install, typecheck, lint, unit tests and production build. A `package-lock.json` is still not committed; run `npm install` in the development environment and commit the generated lockfile so installs are reproducible.

## Documentation

- [Detailed project roadmap](docs/ROADMAP.md)
- [Documentation index](docs/README.md)
- [Phase 1 product/UI/UX baseline](docs/phase-1/NAFFEEZ_PHASE_1_UI_UX_SPECIFICATION_v1.0.md)
- [Phase 2 technical documentation](docs/phase-2/)
- [Phase 3 design and architecture pack](docs/phase-3/)
- [Phase 4 development execution plan](docs/phase-4/DEVELOPMENT_EXECUTION_PLAN.md)
- [Phase 4 implementation log](docs/phase-4/PHASE_4_IMPLEMENTATION_LOG.md)
- [Responsive layout implementation checklist](docs/phase-3/RESPONSIVE_LAYOUT_REFINEMENT_CHECKLIST.md)

## Working principles

- Preserve the accepted product scope and design. Responsive refinements are implemented and tested through Phase 4/5.
- Keep order, price, inventory, payment and invoice rules server-authoritative.
- Never trust client-supplied prices, totals, stock, payment states or admin roles.
- Keep secret keys server-only and customer/payment-proof data private.
- Marketing requires explicit topic opt-in; an account email or purchase is not consent.
- Core browsing and purchase flows must not depend on email, AI or 3D providers.
- Do not publish unapproved policy text, size measurements, delivery fees, QR account data or seller legal information.
- Do not claim a feature is implemented, tested or deployed without evidence.
