# Naffeez — Notifications, Email Marketing and Admin Alerts Specification

**Document ID:** NAF-P2-NOTIFY-001  
**Version:** 1.0  
**Status:** Draft for owner review; linked to Phase 1 notification/editorial addendum  
**Last updated:** 2026-11-28

## 1. Purpose

Define how Naffeez informs customers and staff about orders, payments, products, articles, offers, stock and operational events. Notifications must be useful, secure, consent-aware, measurable and unable to block checkout.

## 2. Core rule: transactional versus marketing

A customer providing an email address or signing in with email does **not** automatically subscribe to promotional campaigns.

### Transactional/essential messages
Triggered by an action or an operational event relevant to a particular customer:
- account/email verification and password recovery;
- order received/confirmation;
- QR transfer instructions and receipt of a payment submission;
- payment verification/rejection/request for new proof;
- fulfillment updates such as processing, shipped, delivered or cancelled;
- invoice ready or invoice access;
- security/account notices.

Send these to the address supplied for the relevant account/order as required to fulfil the service. Keep the message limited to that transaction and do not insert promotional content that changes it into a marketing campaign.

### Marketing/subscription messages
Promotional/editorial updates:
- new product drops and new arrivals;
- seasonal collections;
- discounts, offers and sales;
- new Journal articles/style guides;
- curated outfit edits and brand announcements;
- future event styling content.

These require a separate affirmative opt-in for the relevant marketing topics. A login email, purchase, checkout email, acceptance of Terms, or account creation is not marketing consent.

### Service/operational alerts
Messages to authorized staff about new orders, pending payments, inventory thresholds, failures and platform health. These are not customer marketing messages.

## 3. Customer subscription experience

### Signup/account
- Email verification and marketing consent are separate steps.
- Marketing controls start unchecked.
- Consent is optional and never blocks account creation or checkout.
- The customer can choose topics and frequency.
- Store the consent notice/version shown at the moment of opt-in.
- A confirmed email address is required before marketing campaigns are sent.
- Double opt-in is recommended for subscription lists to confirm mailbox control.

### Guest checkout
- Checkout email is used for order-related communication.
- Offer a separate optional marketing checkbox, unchecked by default.
- Do not infer consent from placing an order or from the email being required for order updates.
- A guest may subscribe without creating an account if the owner chooses to enable that flow; the address must still be confirmed.

### Preference center

Topics:
1. Product Drops & New Arrivals.
2. Offers, Discounts & Sales.
3. Naffeez Journal & Style Articles.
4. Seasonal Collections & Campaigns.
5. General Brand News (optional).

Frequency:
- Immediate: receive each approved campaign in selected topics.
- Weekly digest: combine selected editorial/product updates into a single digest where campaign content is suitable.
- Paused: retain preferences but send no marketing.
- Unsubscribe all: suppress all marketing topics.

Default: no marketing topics selected. A preference center must show current subscription state, allow topic-level changes, global unsubscribe, and explain that essential transactional messages still continue.

## 4. Customer notification matrix

| Event | Channel | Recipient | Consent | Priority |
|---|---|---|---|---|
| Email verification | Email | Account address | Account requested | P0 |
| Password reset/login recovery | Email | Account address | Security/essential | P0 |
| Order received (COD) | Email + in-app | Customer/order email | Transactional | P0 |
| QR payment instructions | On-screen + email | Customer/order email | Transactional | P0 |
| Payment proof/reference received | Email + in-app | Customer/order email | Transactional | P0 |
| Payment verified | Email + in-app | Customer/order email | Transactional | P0 |
| Payment rejected/needs new proof | Email + in-app | Customer/order email | Transactional | P0 |
| Order confirmed/processing | Email + in-app | Customer/order email | Transactional | P0 |
| Order shipped | Email + in-app | Customer/order email | Transactional | P0 |
| Order delivered | Email + in-app | Customer/order email | Transactional | P0 |
| Order cancelled | Email + in-app | Customer/order email | Transactional | P0 |
| Invoice ready | Email + in-app | Customer/order email | Transactional | P0 |
| New product announcement | Email + in-app campaign card | Opted-in topic subscribers | Marketing opt-in | P1 |
| New article announcement | Email + in-app campaign card | Opted-in Journal subscribers | Marketing opt-in | P1 |
| New offer/sale | Email + in-app campaign card | Opted-in offers subscribers | Marketing opt-in | P1 |
| Seasonal campaign | Email + in-app campaign card | Opted-in seasonal subscribers | Marketing opt-in | P1 |
| Back-in-stock alert | Email + in-app | Customer explicitly requests product alert | Specific request/consent | P1 |
| AI try-on/styling result | In-app; email only on request | Customer | Explicit feature action | Later |

Do not send a marketing email for every individual product row created. Product/article publication can create a campaign draft or trigger an admin notification; a human must preview and approve the campaign before it sends.

## 5. Admin and operational alert matrix

| Event | Dashboard alert | Staff email | Recipient/owner | Default severity |
|---|---|---|---|---|
| New order created | Yes | Optional | Order operator/manager | High |
| New QR payment submission | Yes | Optional | Payment operator | High |
| Transfer waiting beyond configured SLA | Yes | Optional digest/escalation | Payment operator/manager | Medium |
| Payment verified/rejected | Audit/activity | Optional | Order operator/manager | Medium |
| Product stock reaches low threshold | Yes | Optional digest | Inventory manager | Medium |
| Product variant becomes out of stock | Yes | Optional | Inventory manager | Medium |
| Order/invoice generation failure | Yes | Yes | Owner/manager | High |
| Email outbox backlog exceeds threshold | Yes | Yes | Owner/technical operator | High |
| Email provider unavailable/webhook failing | Yes | Yes | Owner/technical operator | High |
| Hard-bounce/complaint spike | Yes | Yes; pause campaign | Owner/marketing operator | High |
| Scheduled campaign ready for approval | Yes | Optional | Marketing admin | Low |
| Campaign send completed/failed | Yes | Optional | Marketing admin | Medium |
| Admin role/integration/payment setting changed | Audit | Optional security alert | Owner | High |
| Database/storage/hosting quota threshold | Yes | Yes | Owner/technical operator | Medium/High |

Staff recipients are configured by role and verified addresses. Do not hard-code admin email addresses in application components.

## 6. Notification lifecycle

1. A domain event occurs (order created, payment state changed, product/article published, low-stock threshold crossed).
2. Domain service validates the event and creates an outbox record with a unique deduplication key.
3. Notification policy determines whether the message is transactional, marketing or admin operational.
4. Recipient and channel eligibility are checked.
5. For marketing, current consent, confirmed email, topic, frequency, suppression and campaign audience snapshot are checked immediately before sending.
6. A renderer selects the approved template and inserts escaped, validated data.
7. Provider adapter sends the email or notification.
8. Provider response and delivery events update delivery state.
9. Failures are retried only when safe; terminal failures are surfaced to an operator.
10. In-app notifications are stored with read/unread state and expiry/retention policy.
11. Every send decision is traceable without logging full sensitive payloads.

## 7. Email templates

Create versioned templates for:
- verify email;
- password reset/recovery;
- order received;
- COD order confirmation;
- QR transfer instructions;
- payment submission received;
- payment verified;
- payment rejected/request new proof;
- order processing;
- order shipped;
- order delivered;
- order cancelled;
- invoice ready;
- marketing: new products;
- marketing: new article;
- marketing: offer/sale;
- marketing: seasonal collection;
- weekly digest;
- subscription confirmation;
- unsubscribe confirmation.

Each template needs:
- template ID/version and active state;
- subject and preview text;
- sender name/address and reply-to policy;
- responsive HTML and plain-text fallback;
- approved logo/brand tokens;
- localization field (English at launch);
- data variables and fallback behavior;
- legal/brand footer where applicable;
- unsubscribe/preferences link for marketing;
- test/preview fixtures;
- owner approval before activation.

Never allow arbitrary customer-supplied HTML. Escape product/article/customer data. Verify all URLs are HTTPS and use canonical Naffeez domain.

## 8. Marketing campaign workflow

1. Admin creates a campaign and selects type: product, article, offer, seasonal, digest.
2. Campaign links to published products/articles/offers; unpublished or expired content is rejected.
3. Admin chooses approved audience topic(s), not a raw unfiltered customer list.
4. System estimates eligible recipients and excludes unconfirmed, unsubscribed, suppressed, bounced and complained addresses.
5. Admin chooses immediate send or scheduled time.
6. Admin previews desktop/mobile and plain text.
7. Admin sends test only to an internal allowlist.
8. A second authorized approver may be required for discounts or large campaigns; owner decides threshold.
9. Admin confirms audience, subject, offer validity and end date.
10. System snapshots eligible recipient IDs/preferences for the campaign.
11. Campaign job enqueues recipient deliveries with unique campaign-recipient keys.
12. Worker sends at configured rate and records provider IDs.
13. Admin can pause/cancel unsent recipients; already accepted messages cannot be recalled.
14. Dashboard reports queued, sent, delivered, delayed, bounced, complained, unsubscribed and failed states where provider supports them.
15. Campaign closeout records learnings and any incident.

Publishing an article or product must not automatically send a campaign unless an explicit, reviewed automation rule is later enabled.

## 9. Frequency and quiet-hour controls

Proposed initial defaults for owner approval:
- Transactional: send immediately after event; never batch essential order/security messages.
- Marketing immediate campaigns: admin schedules; never send to customers who opted out.
- Weekly digest: one per week per subscribed address, consolidated across selected topics.
- Per-customer marketing cap: proposed maximum 2 campaign emails in 7 days, excluding service messages. Owner may reduce/adjust after observing engagement.
- Quiet hours: avoid scheduled marketing delivery between 21:00 and 09:00 in the recipient's known timezone; if unknown, use a conservative configured default and allow provider scheduling policy.
- No back-to-back sends of the same campaign/topic to the same subscriber.
- Campaign throttling and gradual ramp-up for new sending domains.

These values are proposals and must be adjustable in admin settings; they are not legal limits.

## 10. Data model requirements

Add logical entities:
- notification_preferences: user/guest subscriber reference, channel, topic flags, frequency, timezone, updated_at.
- marketing_consents: append-only consent/withdrawal events including email/subscriber, topic, channel, action, consent-text version, source, created_at and confirmation state.
- subscribers: normalized email, verification state, created_at, updated_at; unique normalized address per subscription identity.
- notification_outbox: event type, channel, recipient, payload reference, dedupe key, state, attempts, available_at, last_error_code, provider_message_id, created_at, sent_at.
- notification_deliveries: outbox/campaign linkage, delivery state and timestamps.
- notification_events: provider event ID, type, signature-verification result, received_at and processing state.
- in_app_notifications: user_id, type, title, body, action URL, read_at, expires_at.
- notification_templates: template key, version, subject, HTML/text source, active flag, updated_by.
- marketing_campaigns: type, status, content links, audience topic, schedule, approval actor, audience snapshot metadata, counters.
- campaign_recipients: campaign, subscriber/user, delivery key, status, provider ID.
- notification_suppressions: normalized email, reason (unsubscribe/hard bounce/complaint/admin suppression), source, created_at, reactivation audit.
- admin_alerts or generalized admin notifications: event, severity, target role/user, acknowledgement and resolution.
- notification_settings: channel enabled state, limits, sender display config; never raw secret values.

Prefer a single generalized notification event/outbox model where it reduces duplication, but maintain separate consent and suppression records. Consent history must be append-only; current state may be derived/materialized.

## 11. Delivery states, retries and webhooks

Internal states:
- queued;
- processing;
- accepted_by_provider;
- delivered;
- delayed/soft_bounce;
- hard_bounced;
- complained;
- failed_terminal;
- cancelled/suppressed.

Provider acceptance is not the same as inbox delivery. Store provider message ID and later webhooks.

- Verify webhook signatures using provider's current documented method.
- Deduplicate provider event IDs.
- Handle duplicate/out-of-order events safely.
- Acknowledge webhooks quickly and process asynchronously.
- Retry transient errors with bounded exponential backoff and jitter.
- Do not retry hard bounces, complaints or unsubscribed recipients.
- On complaint, suppress marketing immediately.
- On hard bounce, suppress further sends until the address is corrected/reconfirmed.
- Soft bounce may retry within a limited policy window.
- Keep an operator-visible dead-letter/failed queue.
- Never retry a campaign delivery without idempotency protection.

## 12. Email sender and deliverability setup

- Use a verified sending domain/subdomain, e.g. a dedicated transactional and/or marketing subdomain under naffeez.com, subject to provider instructions.
- Configure SPF and DKIM records exactly as provider specifies.
- Publish DMARC and begin with a monitored policy suitable for the actual sending setup; tighten after reviewing legitimate senders and reports.
- Align visible From domain with SPF/DKIM authentication where supported.
- Use TLS, valid sender identity and monitored reply-to address.
- Separate transactional and marketing streams/subdomains if provider supports it to protect critical order email reputation from campaigns.
- Warm a new sending domain gradually; do not import a purchased list.
- Monitor sender reputation, bounce and complaint rate.
- Re-check provider pricing, sending limits, data processing terms, retention and commercial use before production.

Google's current sender guidance asks senders to authenticate their domain; bulk senders to Gmail must meet SPF, DKIM and DMARC requirements, and marketing/subscribed messages need easy unsubscribe with one-click support at the applicable bulk threshold. Naffeez should implement a visible unsubscribe link and one-click unsubscribe from the beginning, even before reaching bulk volume. References:
- https://support.google.com/mail/answer/81126
- https://support.google.com/mail/answer/14229414
- https://www.rfc-editor.org/rfc/rfc8058

## 13. Privacy and consent controls

- Separate transactional and marketing message categories.
- No pre-ticked marketing boxes.
- Keep terms acceptance separate from marketing consent.
- Store when, where, what wording/version and which topics the customer selected.
- Provide a clear unsubscribe and preference center.
- Process unsubscribes promptly and before the next campaign send.
- Maintain minimal suppression records so an opted-out or complained address is not accidentally re-imported.
- Do not reveal subscriber lists to unauthorized staff.
- Do not log complete email bodies or sensitive order details unnecessarily.
- Define retention and deletion periods with owner/legal review.
- Review local and recipient-country marketing/privacy rules before campaigns are sent globally; this specification is an engineering baseline, not a legal opinion.

## 14. Admin configuration

Admin settings should include:
- transactional email provider and connection status;
- marketing email provider and connection status;
- sender name/from/reply-to (verified addresses only);
- sender authentication status/last checked (where provider can report it);
- template management/preview/test send;
- campaign topic/audience rules;
- quiet hours/frequency cap;
- retry limits and alert thresholds;
- notification channel toggles;
- admin alert recipient roles;
- suppression list search/reason;
- webhook status and last successful event;
- usage/quota status when provider exposes it.

API keys are saved server-side in the host's secret manager/configuration layer, never echoed in full, never stored in client-readable settings and never committed to Git.

## 15. Customer-facing UX

Account > Notifications:
- marketing topic toggles;
- frequency preference;
- pause all marketing;
- unsubscribe all marketing;
- show last preference change;
- save and confirm.

Notification inbox:
- unread count;
- filter All / Orders / Account / Updates;
- mark read / mark all read;
- link only to authorized page;
- pagination and retention.

Email footer:
- brand identity and contact;
- why the recipient received the email;
- preference link;
- one-click unsubscribe support for marketing;
- physical/legal sender details as required by applicable law/provider policy.

## 16. Alert escalation

Each operational alert must have:
- severity;
- event/dedupe key;
- recipient role/user;
- created and acknowledged timestamps;
- runbook link;
- retry/escalation rule;
- resolution note.

Example: if pending QR review age exceeds owner-configured SLA, show dashboard alert and escalate to Store Manager; do not repeatedly email every staff member every minute.

## 17. Notification acceptance criteria

- Account email alone never subscribes a customer to marketing.
- Customer can independently select products, offers, articles and seasonal topics.
- Marketing consent can be withdrawn and is enforced before enqueue/send.
- Transactional order/payment/security messages are independent from marketing opt-out.
- Admin must preview and approve product/article/offer campaigns.
- Email templates have plain-text and responsive HTML variants.
- Every send is deduplicated and traceable.
- Provider webhooks are signature-verified and idempotent.
- Bounce/complaint/unsubscribe events suppress further promotional sends.
- Admin sees delivery failures and outbox backlog.
- Notification provider outage never blocks checkout/order creation.
- Notification rules, templates, changes and campaign approvals are auditable.

## 18. P0 and P1 rollout boundary

### P0 for the first production release
- Transactional order/account/payment/invoice email.
- In-app order/payment notification inbox.
- Customer topic preferences, consent evidence, confirmation and unsubscribe.
- Basic Product, Offer and Journal campaign creation, audience preview, internal test, approval and send-now.
- Provider webhook processing for delivery, hard bounce and complaint.
- Admin alert center and critical email/outbox failure alerts.
- Basic Journal article publishing and valid Offer content records.

### P1 after the core store is stable
- Scheduled campaign calendar and recurring weekly digest.
- Advanced segmentation and behavior-based automation.
- Campaign A/B testing and deeper analytics.
- Automated back-in-stock and personalized product journeys.
- Browser push and optional SMS.

The P0 campaign system is intentionally simple: no arbitrary recipient upload, no auto-send on publish, no complex drip automation, and no marketing send without current consent/suppression evaluation.

