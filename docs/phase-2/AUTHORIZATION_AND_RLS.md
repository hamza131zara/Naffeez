# Naffeez — Authentication, Authorization and RLS

**Document ID:** NAF-P2-AUTH-001  
**Version:** 0.1.0  
**Status:** Draft for owner review  
**Last updated:** 2026-11-28

## 1. Security model

Authentication answers who a user is. Authorization answers what that identity may do. Database grants decide whether a role can access an object through the Data API; Row Level Security (RLS) decides which rows it may access. These controls are complementary.

Every exposed Supabase table must have an explicit grant plan and RLS enabled. The 2026 Supabase Data API exposure change means new public-schema tables must not be assumed to be API-accessible automatically.

## 2. Authentication proposal

### Guest shoppers
- Can browse catalog and create checkout order without an account.
- Guest order access uses a restricted, high-entropy capability/token or a verified contact recovery flow.
- Raw access tokens must not be stored; store a hash, expiry and revocation/consumption state.
- The complete order must never be returned from a guessable order number alone.

### Registered customers
- Supabase Auth.
- Proposed low-friction initial option: email OTP/magic-link, subject to SMTP configuration and owner decision.
- Phone OTP requires an approved SMS provider and cost/privacy assessment; do not assume it is free.
- Customers may read/update their own profile, addresses and wishlist.
- A customer can read only orders and invoices associated with their verified account.

### Admins and staff
- Customer signup never creates admin status.
- Admin membership stored in a protected source such as private.admin_memberships.
- Server-side helper checks active membership and requested capability for every admin page/action.
- Strongly recommend MFA for owner/admin accounts before production.
- Role grants/revocations are owner-only and audit logged.

## 3. Proposed roles and capabilities

| Capability | Guest | Customer | Payment Operator | Store Manager | Owner |
|---|---:|---:|---:|---:|---:|
| Read published catalog | Yes | Yes | Yes | Yes | Yes |
| Manage own wishlist/address | No | Yes | No | No | Yes |
| Place order | Yes | Yes | No | No | Yes |
| Read own order/invoice | Verified guest only | Own only | Assigned operational view | Operational | All |
| Manage products/media | No | No | No | Yes | Yes |
| Adjust inventory | No | No | No | Yes | Yes |
| Process orders | No | No | Limited if assigned | Yes | Yes |
| Verify manual payment | No | No | Yes | Yes | Yes |
| Manage payment QR settings | No | No | No | Optional explicit grant | Yes |
| Manage staff roles/integrations | No | No | No | No | Yes |
| Read audit log | No | No | Limited relevant entries | Relevant entries | Yes |

Implement granular permissions rather than one broad admin boolean where feasible.

## 4. RLS policy model

### Public catalog
- Anonymous and authenticated users may SELECT active/published categories, products, public product media, active public variants, collections and active homepage content.
- Public roles cannot INSERT/UPDATE/DELETE product, inventory, collection or homepage records.
- Draft/archived products must not be visible via public API or page routes.

### Customer-owned data
- Profiles: SELECT/UPDATE only where row ID equals verified auth.uid(); users cannot modify admin role fields.
- Addresses: owner-only SELECT/INSERT/UPDATE/DELETE.
- Wishlist: owner-only SELECT/INSERT/DELETE.
- Orders/order items: read only when linked to authenticated owner; guest read is handled by separate verified capability route, not a permissive public RLS predicate.
- Payment submissions and proof metadata: customer can create/read submissions for an order they can prove they own; review fields are admin-only.
- Invoices: customer can read only their order's invoice through a guarded route or RLS policy; private PDF download requires authorized signed URL.

### Admin data
- Admin memberships and audit tables remain in a non-exposed schema where possible.
- Admin actions go through server-side authorization.
- Do not grant public users access to private schema objects.
- If a table is in exposed public, it still needs RLS and explicit least-privilege grants.

## 5. RLS implementation rules

1. Enable RLS on every exposed table.
2. Grant only required SQL privileges to anon and/or authenticated.
3. Write operation-specific policies; do not use one generic policy for all tables.
4. An UPDATE policy needs a matching SELECT policy and must include both USING and WITH CHECK ownership conditions.
5. TO authenticated only means the request is authenticated; it does not prove row ownership.
6. Do not use user_metadata/raw_user_meta_data for roles or authorization.
7. Do not rely on stale JWT claims as the only immediate source of admin revocation.
8. Do not use auth.role() in policies; specify the role in TO clauses.
9. Views must not accidentally bypass RLS; on PostgreSQL 15+ use security_invoker = true where appropriate.
10. Prefer SECURITY INVOKER functions. Any SECURITY DEFINER function needs a separate security review, restricted schema/execution grants and explicit caller checks.
11. After each change, run database allow/deny tests for anon, authenticated owner, authenticated non-owner and admin contexts.
12. Test both allowed and denied SELECT/INSERT/UPDATE/DELETE cases.

Example ownership policy pattern for a customer-owned table (adapt table/columns and grants before use):

~~~sql
alter table public.wishlist_items enable row level security;

create policy "customer reads own wishlist"
on public.wishlist_items
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "customer adds to own wishlist"
on public.wishlist_items
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "customer removes own wishlist"
on public.wishlist_items
for delete
to authenticated
using ((select auth.uid()) = user_id);
~~~

This is a pattern example, not a complete migration. Explicit GRANT statements and table-specific tests are also required.

## 6. Supabase Data API exposure model

For each table, the migration must document:
- whether the Data API needs access;
- which roles need table privileges;
- which operations each role needs;
- which RLS policies restrict rows;
- whether direct server/database access is required instead.

Default preference:
- Expose only public catalog read tables and user-scoped tables where client access materially helps.
- Keep admin/internal tables in non-exposed private schema.
- Do not expose orders, payment proofs, invoice storage paths, audit logs or integration secrets publicly.
- Do not broadly grant anon/authenticated to all public tables.

## 7. Storage access policy

| Bucket | Public/private | Access |
|---|---|---|
| product-media | Public read | Only authorized admin writes/updates/deletes |
| homepage-media | Public read | Only authorized admin writes/updates/deletes |
| payment-qr | Public read only if intended for customer checkout; otherwise private signed read | Admin manages QR assets |
| payment-proofs | Private | Upload only for a verified order; customer/admin scoped read; admin review |
| invoices | Private | Owner/admin authorized download via short-lived signed URL |

Storage object policies are required for upload, select, update, delete and signed URL creation. A public bucket URL is readable by anyone, so never store customer proof or invoices there.

## 8. Server-side access rules

- Read identity from verified server session/token.
- Check admin membership on every sensitive operation, not only at login.
- Derive customer identity from auth context, not request body.
- Use service-role/secret client only in server-only modules and only after explicit authorization and validation.
- Prefer request-scoped RLS client for customer reads.
- Do not import server secret clients into client components.
- Ensure guest access capability is limited to one order and expires/revokes.

## 9. Authorization test matrix

| Scenario | Expected |
|---|---|
| Anonymous reads published product | Allow |
| Anonymous reads draft product | Deny/not returned |
| Anonymous modifies product | Deny |
| Customer A reads Customer A address | Allow |
| Customer A reads Customer B address | Deny |
| Customer A changes Customer B wishlist | Deny |
| Customer A reads Customer B order | Deny |
| Guest guesses order number | Deny |
| Verified guest accesses own order capability | Allow limited fields |
| Payment operator verifies payment | Allow with audit event |
| Payment operator changes admin role | Deny |
| Store manager updates product | Allow |
| Store manager edits integration secret | Deny unless separately granted |
| Revoked admin performs old session request | Deny after server-side membership check |

## 10. References

- Supabase RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- Securing the Data API: https://supabase.com/docs/guides/api/securing-your-api
- Storage access control: https://supabase.com/docs/guides/storage/security/access-control


## 11. Notification, subscriber and Journal authorization

### Customer rules
- A customer may read/update only their own in-app notifications and preference records.
- A customer cannot create a consent record for another email/user.
- Guest subscription requires a one-time confirmation token sent to the email being subscribed.
- Public confirmation/unsubscribe tokens must be high entropy, purpose-limited, time-bounded where appropriate and stored hashed.
- Public Journal read returns published articles only.
- Draft/scheduled articles are accessible to authorized editors only.

### Marketing admin roles
- Marketing Editor: create/edit draft campaigns and articles, preview audience and send internal tests.
- Campaign Approver: approve campaign content/audience/send; owner may be the only approver initially.
- Marketing Operator: schedule/pause approved campaigns and review delivery reports.
- Only Owner/Super Admin can manage staff roles, provider credentials and sender configuration.
- No marketing role can change consent or suppression status on behalf of a customer except documented support correction with an audit reason.

### RLS/data exposure
- Subscribers, consent events, suppressions, outbox, delivery events and provider events are never publicly readable.
- Customer preferences/inbox use authenticated owner-scoped predicates.
- Campaign and recipient data are private to authorized marketing staff.
- Article public views expose published content fields only; draft body and editorial notes remain private.
- Webhook processing is server-only and validates provider signatures before any state change.
- Never use user-editable metadata as marketing permission or staff authorization.

