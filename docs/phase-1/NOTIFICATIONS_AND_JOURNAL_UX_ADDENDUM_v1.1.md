# Naffeez — Phase 1 Addendum: Journal, Notifications and Email Preferences

**Document ID:** NAF-P1-ADD-002  
**Version:** 1.1  
**Status:** Owner-requested additive requirements; supplements the accepted Phase 1 v1.0 baseline  
**Last updated:** 2026-11-28

## 1. Purpose and relationship to v1.0

The Phase 1 v1.0 baseline remains intact. This addendum extends the sitemap and UX to support editorial articles, customer notifications, email marketing preferences and admin campaign management. If an additive detail conflicts with v1.0, record a decision rather than silently changing the approved baseline.

## 2. Customer-facing Journal

Add a Journal destination to the site:
- Main navigation item where space allows; otherwise prominent footer and homepage link.
- Route: /journal.
- Article route: /journal/[slug].
- Journal listing with newest/featured articles, category/tag filters when content volume supports them.
- Article detail with title, summary, cover image, author/byline when supplied, published date, body, tags, related articles and related products.
- Social share links and canonical URL.
- Responsive reading layout and accessible images.
- Draft/scheduled articles must never appear publicly.

Homepage addition:
- “From the Naffeez Journal” or “Style Notes” section.
- Show a small curated set of published articles.
- Admin can select featured articles.
- If there are no published articles, hide the section or show owner-approved editorial placeholder; never show fake articles.

## 3. Customer notification inbox

Add account route: /account/notifications.

Include:
- unread count;
- All / Orders / Account / Updates filters;
- notification title, short message, timestamp and relevant action;
- read/unread state;
- mark one as read and mark all as read;
- empty state and loading/error state;
- pagination or progressive loading;
- links that still require normal authorization when opened.

Notifications must not expose private order or invoice data in a push/email preview or unauthenticated route.

## 4. Email notification preferences

Add /account/notifications/preferences or a clearly named Notifications tab in Account.

Topics:
- New Products & Drops;
- Offers, Discounts & Sales;
- Journal & Style Articles;
- Seasonal Collections & Campaigns;
- General Brand News (optional).

Customer can select topics independently and choose supported frequency: immediate, weekly digest or pause. Add “Unsubscribe from all marketing” action and a clear explanation that essential order/account emails continue.

### Critical consent behavior

- Marketing controls are unchecked by default.
- Creating an account with an email address does not subscribe the customer to marketing.
- Entering an email at checkout does not subscribe the customer to marketing.
- Placing an order does not subscribe the customer to marketing.
- Terms/privacy acceptance is separate from marketing consent.
- The customer must actively select one or more marketing topics and confirm the subscription.
- Verify the address before marketing is sent.
- Save the version of the consent wording and timestamp.
- Provide a preference link and visible unsubscribe in marketing emails.
- An unsubscribe must be honored before the next campaign is sent.

This is a product privacy/sender-reputation safeguard. Applicable local and recipient-country legal requirements must also be checked before production campaigns.

## 5. Transactional versus promotional email

### Transactional emails
Triggered by an account action or a specific order:
- email verification;
- password reset/recovery;
- order received;
- COD order confirmation;
- QR payment instructions;
- payment submission received;
- payment verified/rejected/request for new proof;
- order processing/shipped/delivered/cancelled;
- invoice ready.

These are separate from marketing preferences and must not be disguised as promotions.

### Marketing emails
- newly published product campaign;
- new Journal article campaign;
- offer/sale campaign;
- seasonal collection campaign;
- weekly digest.

These must use the customer's current topic consent and suppression status.

## 6. Admin Journal and campaign screens

Add admin sections:
- Articles/Journal;
- Email Templates;
- Marketing Subscribers;
- Campaigns;
- Notification Rules;
- Delivery Logs/Suppressions.

Article workflow:
1. Author creates draft.
2. Adds title, slug, summary, body, cover, tags, SEO and related products.
3. Saves draft and previews.
4. Authorized editor publishes or schedules.
5. Published article is shown on website.
6. Optional “Create email campaign” action creates a draft campaign; it does not immediately send.

Campaign workflow:
1. Choose Product / Article / Offer / Seasonal / Digest.
2. Link to published content or valid offer.
3. Select a consent-based topic audience.
4. Show estimated eligible audience and exclusions.
5. Preview desktop/mobile and plain text.
6. Send internal test.
7. Obtain authorized approval.
8. Send now or schedule.
9. Monitor delivery, bounces, complaints and unsubscribes.
10. Pause/cancel unsent recipients if necessary.

No send-to-all raw contact button.

## 7. In-app and admin alert UX

Customer-facing in-app events:
- order received;
- payment submission state;
- payment verification/rejection;
- order fulfillment state;
- invoice availability;
- selected subscribed editorial campaign cards.

Admin dashboard alerts:
- new order;
- pending QR review;
- review aged beyond configured threshold;
- low/out-of-stock variant;
- invoice generation failure;
- email outbox backlog/provider outage;
- campaign complaint/bounce spike;
- admin role or sensitive setting change.

Alerts need severity, role recipient, timestamp, acknowledge/resolve action and audit history.

## 8. Mobile and accessibility

- Preference controls must be easy to understand and not hidden behind multi-step settings.
- No preselected marketing topics.
- The unsubscribe action must be clearly visible and keyboard operable.
- Email preview links must not contain private order data.
- Notification badges must not rely only on color.
- Respect reduced motion and screen reader announcements.
- On mobile, notification list and preference forms must fit without horizontal scrolling.

## 9. Acceptance criteria

- Journal listing and detail pages are defined.
- Homepage can display published articles only.
- Customer has a notification inbox and notification preference center.
- Transactional and marketing emails are visibly distinct in settings and implementation.
- Account email is never treated as marketing consent.
- Customer controls topic preferences, frequency and unsubscribe.
- Admin can author articles and create, test, approve, schedule and monitor campaigns.
- Product/article/offer content publication never sends a campaign without explicit campaign approval.
- Admin alerts cover new orders, pending QR, stock and notification-system failures.
- All notification surfaces have loading, empty, error and success states.
