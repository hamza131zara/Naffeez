# Supabase setup for Naffeez

**Status:** A dedicated Naffeez Supabase project has been provisioned and is healthy. The initial catalog schema, grants/RLS, and private product-media bucket have been applied. Do not use another inactive project from this account; those projects belong to separate work.

## Dedicated project

- Project name: `Naffeez`
- Project reference: `tglnolhzjapcbkzdwybe`
- Region: Mumbai (`ap-south-1`)
- Project URL: `https://tglnolhzjapcbkzdwybe.supabase.co`
- Organization plan at creation: Free
- Project creation quote: `$0/month` on 2026-11-28

The quoted creation cost is not a guarantee that every future usage pattern or plan change will remain free. Monitor the Supabase billing and usage pages. Never commit API keys, database passwords or access tokens.

## Local project linking

The remote project is provisioned and the initial migrations are tracked in this repository. The current Phase 2 schema document remains a logical reference; use the executable migration files in `supabase/migrations/`. Public-schema defaults are hardened so new tables, sequences and functions created by postgres are not automatically exposed. Future migrations must explicitly grant only the required permissions. The repository still needs the CLI-generated `supabase/config.jsonc` and local replay verification. The current CLI creates JSONC by default; TOML is optional.

## Local setup after the project is selected

From the repository root, use the project-scoped npm CLI install (this also creates/updates `package-lock.json`):

```powershell
npm install --save-dev supabase
npx supabase login
npx supabase init
npx supabase link --project-ref tglnolhzjapcbkzdwybe
npx supabase start
npx supabase db reset
npx supabase migration list --remote
```

`supabase init` creates `supabase/config.jsonc` by default. `supabase start` requires Docker Desktop or another Docker-compatible container runtime. The plain `supabase db reset` command resets only the local database and replays committed migrations plus `supabase/seed.sql`; verify remote migration history with `supabase migration list --remote`. Never add `--linked` or `--remote` to `db reset`: those options target the hosted project and are destructive. The generated `src/lib/supabase/database.types.ts` was generated from the remote schema and committed; regenerate it after future schema changes:

```powershell
npx supabase gen types --lang typescript --linked > src/lib/supabase/database.types.ts
```

The committed `supabase/seed.sql` contains only the five approved launch categories. It is idempotent and does not add sample products, prices or stock.

## Applied catalog foundation

The logical source of truth remains the Phase 2 Database Schema at docs/phase-2/DATABASE_SCHEMA.md. The following catalog foundation is applied through the committed migrations:

- Categories and product taxonomy.
- Products, product media and per-image optional zoom metadata (zoom_storage_path, detail_label, optional variant_id).
- Product variants and SKU-level inventory levels/movements/reservations.
- Collections and collection-product ordering.
- Store settings and private admin membership/audit boundaries.
- Public read grants and RLS for published catalog records only.
- Admin writes are not enabled for public/authenticated roles. Admin write paths must be implemented only through an authenticated, authorized server path.
- A private `product-media` Storage bucket. The bucket and Storage SELECT policy are applied; the policy permits objects referenced by published products and active variants where applicable. The storefront adapter requests 1-hour signed URLs.
- QR/payment-proof and invoices remain private and are deferred until their relevant features and policies are implemented.
- Anonymous public-read visibility and write-denial checks have been run against the catalog foundation. Customer ownership and admin-only workflow tests remain pending their corresponding features.

## Important implementation/security boundary

- Public catalog pages use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` with explicit grants and RLS; missing env configuration produces the app's setup/empty state.
- SUPABASE_SECRET_KEY is server-only. Never prefix it with NEXT_PUBLIC_, return it from a route or import the server admin client into a Client Component.
- Never trust a client-side role, price, stock count, payment state or order total.
- Do not implement admin CRUD until the membership table, owner-approved role policy, storage policies and audit writer have been applied and tested.
- Do not enable checkout until shipping/COD/QR/stock-reservation and invoice owner decisions are resolved.
