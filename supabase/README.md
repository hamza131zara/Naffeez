# Supabase setup for Naffeez

**Status:** No dedicated Naffeez Supabase project is currently linked. Do not use another inactive project from this account; those projects belong to separate work.

## Required owner action

Choose/provision a dedicated Supabase project for Naffeez and confirm the organization, region and any cost/plan implications before connecting it. Once provisioned, record only the project reference and safe configuration guidance here; never commit keys.

## Local setup after the project is selected

Install the Supabase CLI using the official instructions for the developer's OS, then:

```bash
supabase login
supabase init
supabase link --project-ref <NAFFEEZ_PROJECT_REF>
```

Create each migration through the CLI:

```bash
supabase migration new catalog_foundation
```

Do not paste an unreviewed schema into a live project. Apply/test the migration against a local or dedicated development database first, then run:

```bash
supabase db push
supabase gen types typescript --linked > src/lib/supabase/database.types.ts
```

## Initial schema scope

The logical source of truth is the Phase 2 Database Schema at docs/phase-2/DATABASE_SCHEMA.md. The implementation migration must include, at minimum:

- Categories and product taxonomy.
- Products, product media and per-image optional zoom metadata (zoom_storage_path, detail_label, optional variant_id).
- Product variants and SKU-level inventory levels/movements/reservations.
- Collections and collection-product ordering.
- Store settings and private admin membership/audit boundaries.
- Public read grants and RLS for published catalog records only.
- Admin writes only through an authenticated, authorized server path.
- Storage buckets with product imagery public only after publication; QR/payment-proof and invoices private.
- A database test plan for anonymous public reads, customer ownership and admin-only operations.

## Important implementation/security boundary

- Public catalog pages use the publishable key and RLS; missing env configuration produces the app's setup/empty state.
- SUPABASE_SECRET_KEY is server-only. Never prefix it with NEXT_PUBLIC_, return it from a route or import the server admin client into a Client Component.
- Never trust a client-side role, price, stock count, payment state or order total.
- Do not implement admin CRUD until the membership table, role policy, storage policies and audit writer have been applied and tested.
- Do not enable checkout until shipping/COD/QR/stock-reservation and invoice owner decisions are resolved.
