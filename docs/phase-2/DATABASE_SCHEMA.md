# Naffeez — Database Schema and Data Model

**Document ID:** NAF-P2-DB-001  
**Version:** 0.1.0  
**Status:** Draft; logical model, not executable migration SQL  
**Last updated:** 2026-11-28

## 1. Modeling principles

- PostgreSQL is the source of truth for products, variant prices, stock, orders, payment state and invoice records.
- Use UUID primary keys unless a deliberate external identifier is needed.
- Store timestamps as timestamptz in UTC.
- Store money consistently as integer minor units (PKR paisa) or PostgreSQL numeric(12,2); recommendation: integer paisa for arithmetic, formatted as PKR in UI.
- Store product/order item snapshots so later catalog edits do not rewrite historical orders.
- Use soft archive/status for products; never hard-delete referenced historical order items.
- Use explicit foreign keys, unique constraints, checks and indexes.
- Keep secret material out of general application tables.
- No customer face/photo records in MVP.

## 2. Schema organization

**Proposed schemas**
- public: user-facing catalog and customer-owned commerce records that may be accessed via Supabase Data API with explicit grants and RLS.
- private: admin membership, audit events and internal counters/configuration not exposed through the Data API.
- auth: Supabase-managed identity tables; do not modify directly except through documented Auth workflows.
- storage: Supabase-managed file metadata and policies.

The exact schema exposure and grants must be verified in the Supabase project. A table's presence in public does not mean it should automatically be exposed.

## 3. Proposed entities

### Identity and customer data

| Table | Important columns | Notes |
|---|---|---|
| profiles | id (= auth.users.id), full_name, email, phone, created_at, updated_at | Customer profile; no role field editable by customer |
| customer_addresses | id, user_id, label, recipient_name, phone, address_line_1, address_line_2, city, postal_code, is_default | Own addresses only; guest addresses may be stored as order snapshots |

Admin membership belongs in private.admin_memberships, not customer-controlled profiles.

### Catalog and inventory

| Table | Important columns | Notes |
|---|---|---|
| categories | id, parent_id, name, slug, description, sort_order, is_active | Supports Shirts > Casual/Dress and Trousers > Seasonal/Winter |
| collections | id, name, slug, description, status, starts_at, ends_at | New arrivals, seasonal, curated best sellers/sale |
| products | id, slug, title, description, status, base_price_minor, category_id, material, fit, season, published_at, created_at, updated_at | Only published products appear publicly |
| product_media | id, product_id, storage_path, alt_text, sort_order, media_role, variant_id nullable, zoom_storage_path nullable, detail_label nullable | Public catalog image plus its own optional high-resolution inspection source; variant association is used when imagery differs by variant. Paths are storage paths, not customer uploads |
| product_variants | id, product_id, sku, size_label, color_name, color_code, price_override_minor, is_active | SKU unique; variant-specific price optional |
| inventory_levels | variant_id, quantity_on_hand, quantity_reserved, low_stock_threshold, updated_at | One row per variant; available = on_hand - reserved |
| inventory_movements | id, variant_id, movement_type, quantity_delta, reason, reference_type, reference_id, actor_id, created_at | Append-only stock ledger |
| inventory_reservations | id, variant_id, order_id, quantity, status, expires_at, released_at, created_at | Reservation lifecycle and expiry policy require owner decision |
| collection_products | collection_id, product_id, sort_order | Many-to-many collection membership |

Category and collection ordering are explicit; do not infer categories from arbitrary product titles.

### Customer shopping and orders

| Table | Important columns | Notes |
|---|---|---|
| wishlist_items | user_id, product_id, created_at | Composite unique key; authenticated customers only |
| orders | id, order_number, customer_user_id nullable, guest_contact fields, fulfillment_status, payment_method, payment_status, subtotal_minor, shipping_minor, discount_minor, total_minor, currency, idempotency_key, created_at | Guest and signed-in purchases; protect PII |
| order_items | id, order_id, product_id nullable, variant_id nullable, product_title_snapshot, sku_snapshot, size_snapshot, color_snapshot, unit_price_minor, quantity, line_total_minor | Immutable commerce snapshot |
| order_status_events | id, order_id, old_status, new_status, note, actor_id, created_at | Auditable status history |
| order_access_tokens (private) | id, order_id, token_hash, expires_at, consumed_at, created_at | Optional guest order recovery; never store raw bearer token |

Cart should begin client-side/local-first to keep MVP small. Persisted cross-device cart can be added after customer account needs are validated.

### Payments and invoices

| Table | Important columns | Notes |
|---|---|---|
| payment_methods | id, method_code, display_name, instructions, qr_storage_path, is_enabled, sort_order | Contains only customer-displayable instructions; no API keys |
| payment_submissions | id, order_id, payment_method_id, transaction_reference, proof_storage_path, submitted_amount_minor, status, reviewed_by, reviewed_at, review_reason, created_at | Each submission is a distinct attempt; proof is private |
| payment_events | id, order_id, previous_status, new_status, actor_id, reason, created_at | Immutable payment audit trail |
| invoices | id, order_id, invoice_number, issued_at, snapshot_json, pdf_storage_path nullable, created_at | Unique invoice number and one invoice per order unless revisions later approved |
| private.invoice_counters | year, last_value | Atomic yearly sequence allocation |

Manual QR payment states: Awaiting Transfer, Verification Pending, Verified, Rejected. COD is a separate method/state: Payable on Delivery, then collected/paid when operations confirm collection. Refund fields are future/controlled states only.

### Content and administration

| Table | Important columns | Notes |
|---|---|---|
| hero_slides | id, image_path, eyebrow, title, body, cta_label, cta_url, sort_order, is_active, active_from, active_until | Admin-managed homepage content |
| announcements | id, message, destination_url, is_active, active_from, active_until | One active static banner preferred for MVP |
| private.admin_memberships | user_id, role, is_active, granted_by, created_at | Authoritative admin membership |
| private.audit_events | id, actor_id, action, entity_type, entity_id, before_json, after_json, request_id, created_at | Sensitive operations; redact PII/secrets |
| private.store_settings | key, value_json, updated_by, updated_at | Non-secret configuration; secrets belong in deployment secret store |
| private.integration_registry | provider_id, enabled, capability_list, public_settings_json, status_checked_at | Registry metadata only; never store raw API keys here |

## 4. Relationships

~~~mermaid
erDiagram
  categories ||--o{ products : categorizes
  products ||--o{ product_media : has
  products ||--o{ product_variants : offers
  product_variants ||--|| inventory_levels : tracks
  product_variants ||--o{ inventory_movements : records
  product_variants ||--o{ inventory_reservations : reserves
  products ||--o{ collection_products : appears_in
  collections ||--o{ collection_products : contains
  orders ||--|{ order_items : snapshots
  orders ||--o{ payment_submissions : receives
  orders ||--o{ payment_events : records
  orders ||--o| invoices : issues
~~~

The diagram is conceptual; implementation migrations must define exact foreign keys and deletion rules.

## 5. Constraints and invariants

1. Product slug unique; SKU unique when present.
2. quantity_on_hand >= 0, quantity_reserved >= 0, and quantity_reserved <= quantity_on_hand.
3. Order quantity must be a positive integer.
4. Stored order totals equal server-calculated line totals + shipping - discounts.
5. Order currency is PKR for launch; store currency code explicitly for future compatibility.
6. Invoice number is unique and generated atomically.
7. One initial invoice per order; any adjustment/reissue must be traceable.
8. Payment submissions are append-only attempts; a rejected submission is not overwritten by a later attempt.
9. Payment verification requires an authenticated authorized admin actor and an audit event.
10. Product status transitions are controlled (draft -> published -> archived).
11. Historical order snapshots remain available if the underlying product/variant is archived.
12. Idempotency key is unique within its defined scope and retained long enough to cover retry behavior.

## 6. Indexing proposal

- Unique indexes: products.slug, categories.slug, collections.slug, product_variants.sku, orders.order_number, invoices.invoice_number.
- Catalog: products(status, published_at), products(category_id, status), product_variants(product_id, is_active), collection_products(collection_id, sort_order).
- Search: PostgreSQL full-text search index over product title, description and approved tags; evaluate trigram indexes only if substring search is needed.
- Orders: orders(created_at), orders(fulfillment_status, created_at), orders(payment_status, created_at), orders(customer_user_id, created_at).
- Payments: payment_submissions(status, created_at), payment_submissions(order_id, created_at).
- Inventory: inventory_levels low-stock query index only if justified by dashboard query.
- Foreign-key indexes for frequently joined references.

Validate query plans with representative catalog and admin queries before adding extra indexes.

## 7. Data retention and deletion

- Retain orders/invoices in accordance with owner-approved legal/accounting requirements; do not assume a retention period.
- Delete customer-uploaded payment proof only according to approved operational, dispute and legal retention policy.
- Audit events should record operational actions but avoid duplicating full customer PII.
- On account deletion, follow documented anonymization/deletion rules while preserving legally required transaction records.
- No face/body images in MVP.

## 8. Supabase API grants and exposure

Supabase changed Data API exposure behavior in 2026: newly created public-schema tables are not automatically exposed by default after the rollout. For each table:
1. Decide whether the Data API needs access.
2. Grant only the required SQL privileges to anon and/or authenticated.
3. Enable RLS and create operation-specific policies.
4. Test allow and deny behavior with Supabase DB tests.

RLS policies do not grant table privileges; grants do not replace RLS. Never grant every table simply to make the client work.

## 9. Schema decisions still open

- Whether guest contact details are stored directly on orders or in a separate guest-contact table.
- Exact checkout/address fields and postal-code requirement.
- Inventory reservation timing, TTL and release policy.
- Invoice revision/credit-note behavior.
- Search strategy and whether extensions are needed.
- Whether carts need account persistence in MVP.
- Final role matrix and private schema exposure model.


## 10. Journal and notification data model additions

The following logical entities are required for the approved notification/editorial direction. Exact SQL definitions, indexes and retention fields must be finalized in migrations.

### Journal/content
| Table | Important columns | Notes |
|---|---|---|
| articles | id, slug, title, summary, body, cover_media_path, author_label, status, published_at, seo_title, seo_description, created_by, updated_by | Draft/scheduled/published/archived lifecycle |
| article_tags | id, name, slug | Controlled editorial taxonomy |
| article_tag_links | article_id, tag_id | Many-to-many |
| article_products | article_id, product_id, sort_order | Related product links |

### Subscriber and preference data
| Table | Important columns | Notes |
|---|---|---|
| subscribers | id, normalized_email, user_id nullable, email_verified_at, status, created_at, updated_at | Support signed-in and optionally guest subscribers; unique normalized address |
| notification_preferences | subscriber_id, topic_code, channel, enabled, frequency, timezone, updated_at | One row per subscriber/topic/channel |
| marketing_consent_events | id, subscriber_id, topic_code, channel, action, source, consent_text_version, confirmation_state, occurred_at | Append-only opt-in/withdrawal evidence |
| notification_suppressions | id, normalized_email, reason, source, provider_event_id, created_at, cleared_at, cleared_by | Unsubscribe, hard bounce, complaint or admin suppression; do not automatically clear |

### Delivery and in-app
| Table | Important columns | Notes |
|---|---|---|
| notification_outbox | id, event_type, channel, recipient_ref, payload_ref, dedupe_key, status, attempts, available_at, last_error_code, provider_message_id, created_at, sent_at | Durable intent and retry state |
| notification_deliveries | id, outbox_id, campaign_recipient_id nullable, provider_message_id, delivery_status, accepted_at, delivered_at, failed_at | Delivery projection |
| notification_provider_events | id, provider_event_id, event_type, signature_valid, received_at, processed_at, processing_status | Unique provider event ID; idempotent webhook handling |
| in_app_notifications | id, recipient_user_id, recipient_role nullable, notification_type, title, body, action_path, read_at, expires_at, created_at | Must not include confidential payload in preview |
| notification_templates | id, template_key, version, subject, html_source, text_source, status, updated_by, created_at | Versioned and admin-controlled |

### Campaign and admin alert entities
| Table | Important columns | Notes |
|---|---|---|
| marketing_campaigns | id, campaign_type, title, subject, content_ref, audience_topic, status, scheduled_at, approved_by, approved_at, audience_snapshot_at, created_by | Draft/test/approved/scheduled/sending/paused/completed/cancelled |
| campaign_recipients | id, campaign_id, subscriber_id, dedupe_key, status, provider_message_id, sent_at | Unique campaign/subscriber key |
| admin_alerts | id, alert_type, severity, dedupe_key, target_role/user, payload_ref, acknowledged_at, resolved_at, resolution_note, created_at | Role-routed operational alerts |
| notification_settings | key, value_json, updated_by, updated_at | Non-secret settings only; credentials stay in secret manager |

### Invariants and indexes
- Normalize email addresses consistently for lookup/deduplication; preserve display casing separately only if needed.
- Consent events are append-only; current topic state may be materialized in preferences.
- A marketing send requires verified email, active topic preference and no suppression at send time.
- A customer email alone does not create a consent event.
- One outbox dedupe key per event/recipient/channel/template purpose.
- Provider event ID is unique; duplicate webhook is harmless.
- One campaign-recipient row per campaign/subscriber.
- Index outbox(status, available_at), suppression(normalized_email), preferences(subscriber_id, topic_code), campaign(status, scheduled_at), inbox(recipient_user_id, read_at, created_at), alert(target_role, acknowledged_at, created_at).
- Do not store full rendered emails, raw API keys, access tokens or payment proof in notification payload JSON.

## 11. Retention notes for notification data

- Retain minimal suppression evidence after unsubscribe so an address is not re-added accidentally.
- Keep consent audit events according to reviewed privacy retention policy.
- Do not retain email body copies unless a clear compliance/operational need exists.
- In-app notifications should expire or archive according to a documented policy.
- Campaign audience snapshots should store subscriber identifiers and consent decision evidence references, not unnecessary profile data.

## 12. Offer content model

A simple published offer is editorial/marketing content, not necessarily a checkout discount rule.

| Table | Important columns | Notes |
|---|---|---|
| offers | id, slug, title, summary, body, image_path, cta_label, cta_url, terms_text, starts_at, ends_at, status, created_by, updated_by | Draft/scheduled/published/expired lifecycle |
| offer_products | offer_id, product_id, sort_order | Optional linked products |

Only published, currently valid offers are publicly visible or eligible for a new campaign. If an offer needs a coupon/discount to be enforced at checkout, add a separate promotion rule model with server-side validation, limits, and audit; do not treat a marketing email's text as authoritative discount logic.



## 13. Phase 4 additive media contract

The first Phase 4 Product Studio implementation requires the gallery contract to be stored per image rather than on the product as one global zoom source. The `product_media` implementation contract is therefore extended additively with:

| Column | Type | Purpose |
|---|---|---|
| `variant_id` | uuid nullable | Associates an image/angle with an exact variant when colors materially differ |
| `zoom_storage_path` | text nullable | High-resolution file matching this exact gallery image |
| `detail_label` | text nullable | Visible label such as Fabric, Stitching, Collar or Cuff |

Each row's `storage_path` is the normal gallery source. Its optional `zoom_storage_path` must show the same image/variant at higher resolution. Missing zoom paths mean no magnifier/inspection action is shown. Do not infer a zoom file from a different gallery angle.

This is a logical-schema update only. An executable migration and storage policy have not been applied because the Naffeez Supabase project has not yet been selected or configured. Generate the migration through the Supabase CLI after project initialization and test it against a local/test project before applying it to a shared environment.
