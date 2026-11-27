# Naffeez — Deployment and Operations Plan

**Document ID:** NAF-P2-OPS-001  
**Version:** 0.1.0  
**Status:** Draft; hosting provider and production budget not selected  
**Last updated:** 2026-11-28

## 1. Deployment goals

- Deploy a working responsive commerce platform on naffeez.com.
- Keep production secrets outside source control.
- Separate development/staging from production where budget permits.
- Use a commercial-permitted hosting plan; do not assume every free tier permits a commercial storefront.
- Maintain a rollback and backup process before launch.

## 2. Environment model

| Environment | Purpose | Data |
|---|---|---|
| Local | Development and automated tests | Seed/demo data only |
| Staging | QA, payment flow rehearsal and owner review | Synthetic/test customer data; payment sandbox/manual test details |
| Production | Public commerce operations | Real customer/order/payment data |

If cost constraints prevent separate hosted Supabase projects, use local Supabase for development and a single carefully protected staging/production project only after explicit approval. Never use real customer data in development.

## 3. Provider selection

The hosting provider remains an owner decision. Evaluate:
- commercial-use terms;
- Next.js App Router and server runtime compatibility;
- region/latency for Pakistan customers;
- custom domain and TLS;
- build minutes, request/runtime limits and bandwidth;
- environment secrets;
- deploy previews and rollback;
- logs and error visibility;
- total expected cost after free allowance.

Default technical target: standard Node.js runtime. Cloudflare Workers is a candidate only after a representative app build is tested against the current recommended Next.js adapter path. Avoid tying domain, storage and business logic to one vendor where unnecessary.

## 4. Supabase plan and limitations

Official pricing/docs checked 2026-11-28 show:
- Free plan has 500 MB database size per project, 1 GB file storage and 5 GB egress in current pricing details.
- Free projects can pause after a week of insufficient activity.
- Free plan does not include automatic database backups for download.
- Pro includes daily backups retained for 7 days at the time checked; pricing/quotas can change.

Implications:
- Free plan is suitable for development, demos and early validation, not guaranteed production availability.
- A store relying on orders should plan paid production capacity or a tested backup/export process.
- Product media can consume file storage/egress; optimize images and monitor usage.
- Do not promise uptime or backups that the selected plan does not provide.
- Re-check current pricing and terms immediately before deployment.

## 5. Domain and DNS

- Domain: naffeez.com.
- Configure DNS records exactly as required by the selected host.
- Enable TLS/HTTPS and redirect HTTP to HTTPS.
- Verify apex and www behavior; choose one canonical host.
- Configure domain in Supabase Auth redirect allowlist if Auth email links are used.
- Keep DNS change record in deployment notes.
- Do not modify DNS until production host and rollback path are ready.

## 6. Secrets and configuration

Keep a documented variable inventory with name, purpose, environment and rotation owner. Do not document values.

Expected categories:
- Supabase project URL and publishable key.
- Supabase server-only secret/service key if required.
- Auth redirect URLs.
- Database connection string if direct transactional connection is selected.
- Email provider credentials if enabled.
- Monitoring DSN if enabled.
- Approved integration API keys when future modules are activated.

Only public/publishable values may use NEXT_PUBLIC_*. Service role, database passwords and API secrets must remain server-only. Never paste production values into GitHub issues, PRs or docs.

## 7. Build and release process

1. Work on a feature branch.
2. Run format/lint/typecheck/unit tests.
3. Run database and security tests.
4. Build production bundle.
5. Review diff and dependency changes.
6. Open PR with acceptance evidence.
7. Merge only after review and passing checks.
8. Apply database migrations in the correct environment.
9. Deploy application.
10. Run smoke tests for catalog, Product Studio, cart, checkout, admin login, payment review and invoice download.
11. Monitor logs and errors.
12. Roll back app/deployment if critical behavior regresses; database rollback requires a separately reviewed migration plan.

## 8. Database migration operations

- All schema changes must be versioned in supabase/migrations/.
- Create migrations through the installed Supabase CLI's documented workflow; inspect supabase --help and version before relying on flags.
- Apply to local/test first.
- Run RLS/DB tests and advisors supported by the current CLI/MCP.
- Review migration SQL manually.
- Back up production before destructive migrations.
- Do not run experimental DDL directly in production without a reversible migration plan.

## 9. Monitoring and maintenance

Monitor:
- application 4xx/5xx rates;
- checkout/order creation errors;
- failed invoice generation;
- pending payment queue age;
- database/storage/egress usage;
- authentication failures;
- slow catalog/admin queries;
- Core Web Vitals;
- deployment success/failure.

Maintenance cadence:
- Weekly: review pending payment/order queues, error alerts and storage growth.
- Monthly: dependency/security updates, admin account review and backup restore spot-check as feasible.
- Before major campaign: load test expected traffic and verify payment/admin staffing.
- After a critical change: smoke test all P0 flows.

## 10. Backup and recovery

- Select a plan with backups or implement regular encrypted logical exports.
- Keep backup copies outside the same project/account where practical.
- Define RPO/RTO with the owner; do not invent them.
- Test restore to a separate project.
- Store migration state and operational instructions alongside code.
- Document who can access backups and how access is revoked.

## 11. Launch checklist

- [ ] Production host approved for commercial use.
- [ ] Domain DNS and TLS verified.
- [ ] Production environment secrets configured.
- [ ] Supabase database grants/RLS reviewed.
- [ ] Admin owner MFA enabled.
- [ ] Real products/prices/images approved.
- [ ] Size guide, delivery, COD, returns and privacy policies approved.
- [ ] Easypaisa/bank QR/account details configured privately by owner.
- [ ] Manual payment verification tested end-to-end.
- [ ] Customer/admin invoice PDF tested.
- [ ] Backup/export and restore path tested.
- [ ] Error monitoring and rollback plan ready.
- [ ] Mobile and desktop smoke tests pass.
- [ ] Owner explicitly authorizes launch.
