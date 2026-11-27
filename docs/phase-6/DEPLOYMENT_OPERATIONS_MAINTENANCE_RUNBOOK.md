# Phase 6 — Deployment, Operations and Maintenance Runbook

**Document ID:** NAF-P6-OPS-001  
**Version:** 1.0  
**Status:** Planned; values depend on approved providers and business inputs

## 1. Entry gate

- Phase 6 release candidate has no unresolved critical/high defects.
- Owner has approved hosting plan, production budget and provider terms.
- Production product content, size guide, policies, invoice details and QR instructions are approved.
- Admin owner account and MFA are ready.
- Email sender identity and consent/campaign rules are tested.
- Backup/restore and rollback procedures are documented.

## 2. Pre-deployment preparation

1. Confirm production branch and merge commit.
2. Review lockfile and dependency advisories.
3. Confirm Node/runtime version supported by pinned packages.
4. Configure production environment variables outside Git.
5. Configure database project, connection settings and network restrictions.
6. Verify schema migration ordering and backup before destructive change.
7. Apply migrations and verify schema/version.
8. Verify grants, RLS and private storage policies.
9. Configure product-media and homepage assets.
10. Configure private invoices and payment-proof buckets.
11. Configure production admin membership and MFA.
12. Configure shipping/COD/store settings approved by owner.
13. Configure payment QR through admin settings; do not commit QR/account secrets.
14. Configure email sender domain and provider.
15. Publish SPF/DKIM/DMARC records as required by provider/Gmail sending rules; verify DNS propagation and alignment before campaigns.
16. Configure separate transactional and marketing streams/subdomains where supported.
17. Configure notification webhooks, signature secrets, retry and health alert routes.
18. Confirm marketing consent defaults and suppression lists are imported only with a lawful/verified basis.
19. Configure custom domain, canonical host, TLS and redirect.
20. Configure robots, sitemap, metadata and analytics consent.
21. Verify backup schedule/export and restore location.
22. Run production build and deployment preview checks.

## 3. Deployment procedure

1. Freeze code and record release SHA.
2. Confirm owner sign-off and change window.
3. Apply reviewed database migrations.
4. Deploy application.
5. Run health check.
6. Smoke-test homepage, category, product, cart and checkout.
7. Test COD with a controlled test order and cancel/close it.
8. Test QR flow using a test method without claiming a real payment.
9. Verify admin can review a test payment submission.
10. Verify invoice view/download and access denial.
11. Verify transactional email in authorized test inboxes.
12. Verify unsubscribe page and test campaign in internal-only allowlist.
13. Verify notification webhooks and admin alerts.
14. Verify SPF/DKIM/DMARC results using provider tools and message headers.
15. Check app/database/storage/error logs.
16. Confirm no staging/noindex or test data leaked into production.
17. Owner explicitly authorizes public launch.

## 4. Immediate post-launch monitoring

First 24–72 hours:
- new order volume and failure rate;
- checkout and invoice generation errors;
- COD and QR payment-review queue;
- inventory consistency and low-stock alerts;
- email outbox backlog and provider rejection;
- bounce/complaint rate and unsubscribe handling;
- admin access and unusual login events;
- application 4xx/5xx and database latency;
- Core Web Vitals and storage/egress consumption.

Do not increase marketing send volume rapidly. Warm a new sending domain/provider gradually and follow the provider's current guidance.

## 5. Routine operating procedures

### Daily
- Review new orders and unconfirmed orders.
- Review pending QR submissions and verify against actual account receipt.
- Process packing/shipping and update status.
- Check low-stock and out-of-stock alerts.
- Review failed invoice/email jobs.
- Review critical error alerts.

### Weekly
- Review marketing campaign results and audience complaints/unsubscribes.
- Check newsletter consent/suppression health.
- Review bounced/complained contacts and delivery provider health.
- Review pending support requests and WhatsApp enquiries.
- Check product availability, article publication calendar and active offers.
- Check storage usage, email usage and hosting/database quotas.

### Monthly
- Review staff accounts/roles and remove stale access.
- Review admin audit log and unusual payment actions.
- Test backup restoration.
- Review dependencies/security advisories.
- Review DNS sender authentication and domain reputation.
- Review notification templates and preference defaults.
- Review provider costs and free-tier changes.
- Review performance and top customer journeys.

### Per campaign
1. Verify offer/article/product facts and end date.
2. Confirm available stock and price.
3. Confirm audience segment and consent criteria.
4. Exclude suppressed/unconfirmed/bounced/complained recipients.
5. Preview desktop/mobile email.
6. Test links, unsubscribe and personalization fallback.
7. Send test to internal allowlist.
8. Obtain campaign approver sign-off.
9. Schedule/send and record campaign ID/audience snapshot.
10. Monitor provider delivery events and pause if complaints/bounces exceed configured guardrails.
11. Record results and lessons.

## 6. Incident runbooks

### Email provider unavailable
- Queue eligible notifications in outbox.
- Do not mark as delivered.
- Retry transient failures with bounded exponential backoff and jitter.
- Alert owner if queue age/size exceeds configured threshold.
- Keep orders and checkout functional.
- Never replay non-idempotent campaign sends without checking campaign state.

### High bounce or spam complaint
- Pause marketing campaigns.
- Process provider webhooks and suppression immediately.
- Verify DNS authentication, list source and content.
- Do not remove suppression simply to retry sending.
- Resume only after owner/operator review.

### QR payment discrepancy
- Keep payment pending/rejected; do not mark paid.
- Compare account receipt and transaction details.
- Record internal note and audit event.
- Contact customer through a verified support channel if more evidence is needed.

### Inventory mismatch
- Stop affected variant sale if necessary.
- Reconcile stock ledger against physical stock.
- Record authorized adjustment reason.
- Review affected orders and contact customers.

### Customer data exposure
- Restrict affected endpoint/bucket immediately.
- Revoke exposed credentials/signed URLs where possible.
- Preserve security logs.
- Determine affected records and recipients.
- Follow applicable notification/legal response process after specialist review.

### Failed deployment
- Roll back application to last known good release.
- Do not reverse database migrations blindly.
- Verify checkout/order/invoice after rollback.
- Communicate operational status through approved channels.

## 7. Backup and recovery

- Define RPO/RTO with owner before launch.
- Keep backups/exports encrypted and access-controlled.
- Retain backups according to business/legal needs.
- Test restores to an isolated environment.
- Keep migration files and schema version.
- Never assume a free hosting/database plan has production-grade automatic backups.

## 8. Operational dashboards and alerts

Monitor:
- application uptime/5xx;
- database connection/query health;
- storage size/egress;
- queue backlog and oldest pending job;
- invoice-generation failures;
- new order and pending payment queues;
- stock thresholds;
- email provider health;
- notification outbox sent/failed/bounced/complained counts;
- campaign send state and unsubscribe/complaint spikes;
- auth/admin security events.

Each alert needs severity, owner, acknowledgement, runbook link and resolution record.

## 9. Launch and maintenance handoff

Provide owner:
- hosting and DNS account ownership;
- environment-variable inventory without values;
- admin account recovery process;
- provider/plan and billing owner;
- backup/restore instructions;
- deployment and rollback commands;
- payment verification SOP;
- invoice/customer support SOP;
- notification/campaign SOP;
- incident contacts and escalation path.
