# Naffeez — Security and Privacy Plan

**Document ID:** NAF-P2-SEC-001  
**Version:** 0.1.0  
**Status:** Draft for implementation and owner review  
**Last updated:** 2026-11-28

## 1. Scope and data classification

| Data | Classification | Main controls |
|---|---|---|
| Public product images/descriptions/prices | Public | Admin publication controls, validation, CDN |
| Customer name, phone, email, address | Personal | Data minimization, auth/ownership, access logs |
| Orders and invoices | Confidential | RLS/server authorization, no public URLs |
| Payment references/proof | Highly sensitive operational data | Private storage, narrow access, retention policy |
| Admin credentials/roles | Restricted | MFA, least privilege, server-side verification, audit |
| Provider API keys | Secret | Secret manager/environment; never log or expose |
| Future face/body photos | Sensitive personal images | Not collected in MVP; later explicit consent, deletion and provider review |

## 2. Threat model summary

Threats to design against:
- IDOR/BOLA: customer changes an order/invoice ID and reads another customer's data.
- Privilege escalation: user edits metadata/profile fields to become admin.
- Payment fraud: fake transfer screenshot or duplicate manual approval.
- Price/stock tampering: client submits lower price, invalid variant or inflated quantity.
- Overselling: concurrent checkout races.
- Upload abuse: malicious or oversized file uploaded as product media/proof.
- Secret leakage: service-role key or provider key enters browser bundle, logs or Git.
- CSRF/session abuse: sensitive admin mutation triggered from an untrusted site.
- Brute-force/automation: checkout, OTP, proof upload or login abuse.
- Supply-chain compromise: unreviewed packages or unpinned dependency updates.
- Privacy leakage: public storage bucket or cache exposes invoices/payment proof.

## 3. Identity and access controls

- Customer identity derived from verified server session.
- Admin role stored in server-controlled admin membership source; not customer-editable user metadata.
- Verify admin membership for each sensitive action.
- MFA strongly recommended for owner/admin accounts.
- Restrict staff by capability; payment operators cannot manage credentials or staff roles.
- Sign out/revoke sessions on role removal where required; do not assume an existing JWT instantly reflects a role change.
- Use short-lived guest order access capabilities and a verified recovery flow.

## 4. Supabase controls

- Enable RLS on all exposed tables.
- Review GRANTs separately from RLS.
- Expose only intended tables through Data API.
- Avoid user_metadata for authorization.
- Do not use auth.role() in policies; specify policies for anon or authenticated.
- UPDATE policies must include correct SELECT visibility and WITH CHECK ownership.
- Review views for RLS bypass; use security-invoker views where supported/appropriate.
- Avoid SECURITY DEFINER functions unless there is a documented reason and a separate review.
- Service-role/secret key remains server-only and is never supplied to browser components.
- Run Supabase DB tests for both permitted and denied row operations.
- Keep internal tables in a non-exposed schema where possible.

## 5. Payment fraud controls

- Never treat customer screenshot/reference as proof of receipt.
- Verify actual account/statement receipt before marking verified.
- Store proof privately.
- Record amount, reference, reviewer, time and decision.
- Enforce valid payment state transitions and prevent duplicate verification.
- Keep fulfillment and payment status separate.
- Refund status only changes after actual refund completion.
- Do not expose bank/Easypaisa secrets or internal reconciliation notes to public endpoints.

## 6. Upload security

- Use allowlisted file types and content-signature verification.
- Enforce configurable file size and image dimension limits.
- Generate storage object names server-side.
- Do not trust file extension or MIME header supplied by browser.
- Separate product-media, QR, payment-proof and invoice assets.
- Payment proofs/invoices are private.
- Signed URLs are short-lived and created after authorization.
- Scan/transform untrusted images where practical; strip unnecessary metadata.
- Disallow HTML/SVG/script files unless a reviewed safe handling method exists.

## 7. Application security

- Validate all request bodies and query parameters.
- Authorize every route/action on the server.
- Use secure cookie/session settings from supported Auth integration.
- Use CSRF/origin controls for cookie-authenticated mutations as appropriate.
- Configure security headers and a practical Content Security Policy.
- Restrict CORS to required origins.
- Rate-limit login, checkout, search, uploads and payment submissions.
- Use idempotency for money/order-related writes.
- Re-check total, price, stock and discounts on server.
- Avoid unsafe HTML rendering and sanitize owner-provided rich content if rich text is allowed.
- Pin dependencies and commit lockfile; review dependency advisories.
- Keep errors generic to users and detailed/scrubbed in server logs.

## 8. Privacy requirements

- Collect only customer information needed for fulfillment, support and legal record keeping.
- Publish privacy and retention disclosures before launch.
- Do not collect customer face/body photos in MVP.
- Future AI image features require purpose-specific consent, provider disclosure, storage/retention rules and deletion control.
- Do not send identifiable photos to a free AI API until provider data-use and training terms have been reviewed and approved.
- Do not use customer photos for model training without separate explicit consent and legal review.
- Provide a contact path for data access/correction/deletion requests.
- Keep personal data out of analytics events and error logs.

## 9. Logging and audit

Audit:
- admin login/security events where supported;
- product publication and price changes;
- inventory adjustments;
- order status changes and cancellations;
- payment verification/rejection;
- invoice issue/revision;
- staff-role changes;
- integration configuration and credential rotations.

Logs must not include raw secrets, session tokens, full payment proofs, unnecessary address/phone data or full invoice contents. Use correlation/request IDs.

## 10. Backup and incident readiness

- Define backup cadence and off-site export before production.
- Test a restore procedure, not merely backup creation.
- Document key rotation and compromised admin account response.
- Document leaked payment proof or customer data response.
- Have rollback and incident contact process.
- On a security incident, preserve relevant audit evidence and revoke credentials/sessions as appropriate.

## 11. Security acceptance gate

- [ ] Public/anonymous access reviewed for every exposed table.
- [ ] Customer ownership tests pass.
- [ ] Admin role escalation tests fail safely.
- [ ] Invoice/order IDOR tests pass.
- [ ] Payment proof is private.
- [ ] Upload validation tests pass.
- [ ] Service-role and API secrets absent from client output and Git.
- [ ] Rate limits and idempotency tested.
- [ ] Sensitive admin actions are audited.
- [ ] Restore and incident procedures are documented.


## 12. Marketing email consent and communication privacy

- Treat transactional/account messages separately from promotional/marketing messages.
- A customer email address from login, checkout or purchase is not marketing permission.
- Marketing subscription is optional, topic-specific and unchecked by default.
- Record affirmative action, topic, channel, consent wording/version, source, timestamp and email confirmation state.
- Provide a usable preference center and prompt unsubscribe processing.
- Keep a minimal suppression record after unsubscribe, hard bounce or complaint to prevent accidental re-import/resubscription.
- Resubscription requires a new affirmative action and confirmation; do not clear complaint/hard-bounce suppression without a reviewed reason/provider rule.
- Do not sell, share or export subscriber lists to unapproved tools.
- Keep subscriber and campaign recipient tables private and role-restricted.
- Avoid exposing recipient addresses in admin lists unless needed for the operator's task; use masked display by default.
- Review laws applicable to Naffeez and each recipient's jurisdiction before campaigns. This plan is not legal advice.

## 13. Email deliverability and sender-domain security

- Verify sender domain ownership.
- Configure SPF/DKIM according to provider.
- Configure DMARC and monitor reports/alignment.
- Use a stable From identity and monitored reply-to.
- Use TLS and provider-supported message authentication.
- Separate transactional and promotional streams/subdomains when practical.
- Do not spoof free mailbox From addresses; send from an authenticated Naffeez-owned domain.
- Provide visible unsubscribe and one-click unsubscribe for marketing.
- Monitor bounces and complaints; suppress hard bounces/complaints.
- Avoid purchased lists, misleading subjects, deceptive urgency and hidden promotional content in transactional email.
- Keep a record of approved sender identity and DNS change.

## 14. Notification abuse and data protection

- Campaign audience selection is server-side.
- User cannot change another subscriber's topics.
- Unsubscribe endpoints use opaque tokens and do not reveal user IDs/emails in URL paths.
- Webhooks require signature validation and idempotency.
- Campaign send/approval and template changes are audit logged.
- Test-send recipients are limited to configured internal addresses.
- Email content should expose only minimum order details; private invoices remain behind authorized links.
- Security/alert email should avoid including password, tokens, proof images or full account/payment information.

