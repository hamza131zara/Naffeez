# Naffeez — Admin Dashboard Design Specification

**Document ID:** NAF-P3-ADMIN-001  
**Version:** 1.0  
**Status:** Phase 3 design proposal for owner review

## 1. Admin design objective

The dashboard must let the owner manage the entire store without editing code or touching the database manually. Prioritize actionable queues and clear forms over decorative analytics. Admin screens use the same monochrome design tokens but mostly solid surfaces for readability.

## 2. Main admin navigation

1. Overview
2. Products
3. Categories
4. Collections
5. Inventory
6. Orders
7. Payments
8. Invoices
9. Customers
10. Journal
11. Offers
12. Email Campaigns
13. Subscribers & Preferences
14. Templates
15. Notifications & Alerts
16. Integrations
17. Staff & Roles
18. Audit Log
19. Store Settings
20. Homepage Hero Campaigns
21. Media / 360° Spin Builder

Show modules only to staff with permission. Navigation visibility is not an access-control mechanism.

## 3. Dashboard overview

### Operational summary cards
- New orders awaiting review.
- Orders in processing.
- Pending QR payment submissions.
- Low-stock variants.
- Out-of-stock variants.
- Invoice generation failures.
- Notification outbox backlog.
- Email provider health.

### Work queues
- Recent orders.
- QR payment review queue.
- Inventory attention queue.
- Latest admin activity.
- Failed notification/invoice tasks requiring action.

Do not display revenue, conversion, customer growth or campaign ROI until calculations/data sources are defined. Show date range and currency. Distinguish order value from collected cash and verified transfer.

## 4. Product management screens

### Product list
Columns: image, product name, category, status, price, variants, stock summary, updated date and actions. Filters: status, category, stock state, collection and search. Bulk actions only for safe operations (archive/publish after confirm); no bulk delete for historical products.

### Product editor — sectioned form
1. Basic details: title, slug, description, category.
2. Pricing: PKR base price, sale price and validity where supported.
3. Media: upload, reorder, alt text, crop preview.
4. Variants: size, color, SKU, active flag and optional price override.
5. Inventory: initial stock, threshold and movement.
6. Product details: fabric/material, fit, season, care and tags when supplied.
7. Collections: assigned and sort order.
8. SEO: title, description and social image.
9. Preview: product card and Product Studio.
10. Publish: draft, scheduled or publish now.

Validation:
- unique slug/SKU;
- non-negative price and valid sale period;
- at least one valid image before publish;
- size/color variant consistency;
- inventory count integer and non-negative;
- required attributes according to selected category.

### Media manager
- multiple image upload;
- progress/cancel/retry;
- MIME/signature/dimension/size validation;
- alt text;
- main image selection;
- drag/drop order;
- delete/replace with confirmation;
- preview in card/gallery ratios.

## 5. Inventory management

Inventory table by SKU/variant with on-hand, reserved, available and threshold. Admin adjustments require quantity and reason. Show movement history and linked order/reservation. Restrict manual stock overwrite; prefer adjustment transactions.

## 6. Order operations

Order list fields: order number, date, customer, phone (masked where appropriate), total, fulfillment state, payment method/state and action. Detail view includes item snapshot, delivery address, internal notes, status history, invoice and notification history.

Actions:
- confirm order;
- move to processing;
- mark shipped (tracking only if supplied);
- mark delivered;
- cancel with reason;
- contact customer via WhatsApp.
Only valid transitions are enabled. Each change is logged and may trigger customer notification after commit.

## 7. Manual payment review

Queue filters: pending, older than threshold, rejected/resubmitted, verified. Detail includes payment method, expected amount, customer reference, proof private preview, reviewer state and order context.

Buttons:
- Verify Payment (confirm dialog).
- Reject Submission (mandatory reason).
- Request New Proof (customer message/reason).
- Open Order.

Show reminder that proof upload is not payment confirmation. Verify against actual account receipt before committing. Record actor, timestamp, previous/new state and reason.

## 8. Invoice management

Invoice list by number/order/date/payment state. Detail shows snapshot and PDF preview. Actions: open/download, regenerate missing PDF, view history. Issued snapshot cannot be silently edited. Any correction requires an auditable revision process.

## 9. Journal and offers CMS

Article editor sections:
- Title/slug.
- Summary.
- Cover image/alt.
- Author/byline if supplied.
- Body editor.
- Category/tags.
- Related products.
- SEO.
- Draft/preview/schedule/publish/archive.

Offer editor:
- Title/summary/body/cover.
- CTA label and URL.
- Terms and valid dates.
- Linked products.
- Status.
- If a coupon/discount is needed, that is a separate pricing configuration and must be verified at checkout.

## 10. Email campaign and notification manager

### Campaign list
Columns: campaign name/type, topic/audience, status, schedule, eligible count, sent/delivered/bounced/complained/failed and actions.

### Campaign creation steps
1. Select Product, Article, Offer, Seasonal or Digest.
2. Link published content.
3. Select topic audience.
4. Preview eligible and excluded counts.
5. Edit subject, preview text and template content.
6. Preview desktop/mobile/plain text.
7. Send internal test.
8. Request/record approval.
9. Send now or schedule.
10. Monitor delivery and pause unsent recipients.

### Subscriber/preferences view
- Masked email by default.
- Confirmed/unconfirmed status.
- Topic preferences and frequency.
- Consent date/source/version.
- Suppression reason.
- Support correction with audit trail; never silently override consent.

### Templates
Versioned transactional and marketing templates. Preview/test/send disabled until required variables are validated. Marketing footer contains preferences/unsubscribe. Transactional templates remain separate.

## 11. Alert center

Severity:
- Critical: provider unavailable, notification queue stuck, payment/invoice failure affecting many orders, security event.
- High: new order, QR pending, repeated checkout failures, invoice failure.
- Medium: low stock, pending review aging, delivery delay.
- Informational: campaign scheduled/sent, content published.

Each alert has event ID, affected record, recipient role, created time, acknowledge, resolution note and runbook link. Deduplicate repeat alerts and avoid noisy polling.

## 12. Integrations/settings

Sections:
- Email provider.
- Storage and image service.
- Payment methods/QR display.
- Future AI providers.
- WhatsApp contact settings.
- Operational thresholds and notification routing.

For API credentials:
- Save server-side only.
- Never show the original secret again.
- Show Configured/Not Configured status.
- Provide connection test only if supported by a non-billable endpoint.
- Provide rotation/remove controls.
- Audit changes.

## 13. Staff roles

- Owner/Super Admin: all settings, staff, payments, campaigns and audit.
- Store Manager: products, inventory, orders, content and operational views.
- Payment Operator: payment review and assigned order context.
- Content Editor: Journal/offers/homepage content and campaign drafts.
- Campaign Approver: approve campaign send; can be owner-only at first.
- Read-only Analyst: approved metrics/records only.

Use granular permission keys rather than broad frontend role names alone.

## 14. Admin interaction states

Every table/form includes loading, empty, validation error, server error, permission denied, success and stale/conflict states. Confirm financial/destructive actions. Preserve unsaved edits after recoverable failures.

## 15. Admin design acceptance

- [ ] Sidebar and mobile admin nav.
- [ ] Dashboard shows real actionable work queues.
- [ ] Product editor covers all required data.
- [ ] Variants and inventory are explicit.
- [ ] Payment verification is safe and auditable.
- [ ] Customer/admin invoice access specified.
- [ ] Journal/offer CMS specified.
- [ ] Campaign/consent/suppression controls specified.
- [ ] Alert acknowledge/resolve specified.
- [ ] Secrets remain masked/server-only.
- [ ] Roles map to each module and action.


## 16. Homepage hero campaign manager

Provide a dedicated Homepage → Hero Campaigns management surface. This is a CMS workflow, not a developer-only configuration.

### Campaign list
- Campaign name, slide count/order, draft/scheduled/published/expired state, active dates, media completeness, last editor and actions.
- Draft, preview, duplicate, schedule/publish and archive actions.
- Publishing homepage content does not automatically create or send an email marketing campaign.

### Slide editor
- Internal slide name, eyebrow, headline, short description and one primary CTA.
- CTA label and destination.
- Optional association to a published product or collection.
- Required desktop poster; mobile poster/crop or focal point when needed.
- Optional muted 6–10 second video loop with validation and poster fallback.
- Slide order, enabled state and active dates where scheduling is enabled.
- Preview for desktop/mobile, poster-only/video state and text contrast.

### Media and publishing rules
- Poster required even when video exists.
- Video contains no audio track and never autoplays sound.
- Only active/in-view slide media loads and plays; pause inactive/offscreen videos.
- Respect reduced-motion, data-saving and constrained playback by using the poster.
- Validate CTA destination and published product/collection binding before publish.
- Keep campaign revision/history and require confirmation before replacing active content.
- If video fails, retain the poster and keep the homepage CTA usable.

## 17. 360° Spin Builder

The first proposed version creates a **photograph-sequence 360° spin**, not a true geometry-based 3D model.

### Input and output
- Select product and exact color/variant/SKU.
- Upload a complete fixed-camera rotation video or an ordered real frame sequence.
- Output preset: 24 / 36 / 72 frames; 36 proposed default.
- Extract/validate frames, preserve consistent dimensions and provide a preview.
- Admin reviews blur, duplicates, missing angles, crop, lighting and product-shape continuity.
- Approve and attach to the exact product/variant before public display.

Four to ten sparse photographs may be used as ordinary gallery angles, but must not be represented as a smooth factual 360° turn by silently inventing intermediate angles. Any experimental AI frame interpolation requires separate human review and must not become the default publication path.

### Customer behavior
- Product Studio remains image-gallery-first.
- Show a separate “360° view” option only when an approved spin exists.
- Desktop drag and keyboard controls; mobile swipe/drag.
- Load frames only after explicit activation; show a poster first.
- Return to the standard gallery on processing/asset failure.
- 360° photo spin does not replace high-resolution fabric/stitch zoom and does not imply a geometry-based 3D model.
