# Naffeez — Component Library and Interaction Specification

**Document ID:** NAF-P3-COMP-001  
**Version:** 1.0  
**Status:** Phase 3 design proposal for owner review

## 1. Component contract

Every reusable component must have:
- one clear responsibility;
- documented variants and sizes;
- semantic theme tokens;
- keyboard/touch support;
- accessible name and state;
- loading, disabled, success and error behavior where relevant;
- mobile behavior;
- unit/component tests in implementation;
- no hidden dependency on a specific page route.

## 2. Foundation components

| Component | Variants/props | Interaction and state |
|---|---|---|
| Button | Primary, secondary, quiet, danger; sm/md/lg | Idle, hover, focus, pressed, loading, disabled |
| IconButton | Icon, accessible label, tooltip | 44px min target, pressed/selected state |
| TextInput | Text, email, phone, search, number | Label, hint, error, disabled, clear |
| Textarea | Rows/limit | Character count, validation |
| Select | Single, searchable if needed | Keyboard navigation, empty/loading |
| Checkbox | Checked/unchecked/disabled | Label click, accessible state |
| Radio | Grouped options | One selected; keyboard arrows |
| Switch | On/off | State announced; avoid using for consent without explanatory copy |
| Badge | New, Sale, Stock, Status | Only source-backed status |
| Tooltip | Short hint | Hover/focus; no essential info only in tooltip |
| Divider | Solid/subtle | Semantic separator |
| Skeleton | Text/image/card | Same dimensions as content |
| Spinner | Small/medium | Label for long operation |
| Toast | Success/info/warning/error | Auto-dismiss only for noncritical; action where useful |
| Dialog | Confirm/Quick View | Focus trap, Escape behavior, restore focus |
| Drawer | Filters/mobile nav/size guide | Focus management, close action, body scroll lock |
| Tabs | Account/admin sections | Keyboard and URL state where useful |
| Accordion | FAQs/details | Keyboard and expanded state |
| EmptyState | Icon/title/body/CTA | Helpful next action |
| ErrorState | Message/retry | Safe user-facing copy |
| Price | PKR formatted, sale/current | Tabular digits; accessible price label |

## 3. Navigation components

### AnnouncementBar
Fields: message, optional link, active dates, dismissal policy. Only one active message in MVP. If hidden/expired, layout should collapse without jump.

### SiteHeader
Fields: logo, nav configuration, theme preference, cart/wishlist/compare counts. Transparent at hero top where contrast works; becomes solid/glass-on-scroll. Avoid sticky jump.

### DesktopMegaMenu
Groups exact approved categories. Keyboard focus and escape behavior. Menu closes on route change and outside click.

### MobileNavDrawer
Full-height menu. Focus stays inside while open. Selected category and expanded subcategory are announced. Close after navigation.

### SearchOverlay
Input focus on open; Escape closes; clear and recent search controls. Debounce requests and cancel stale calls.

## 4. Catalog components

### ProductCard
Props/data: product ID, slug, title, current price, valid original price, main image, optional secondary image, badge, availability, sizes/colors summary.
Actions: open Product Studio, wishlist, compare, Quick View, Select Options.
- Image click and title click navigate.
- Wishlist/compare action does not navigate.
- Mobile action buttons visible on tap or always, not hover-only.
- No placeholder stock count or invented rating.
- If no secondary image, don't show a blank hover.

### ProductGrid
Responsive columns and gap. Preserve card aspect ratio. Loading skeleton matches final geometry. No-results state appears outside grid.

### FilterPanel / FilterDrawer
Filter values are derived from current catalog. Support apply/reset, active chips and clear all. On mobile, changes are staged until Apply or applied immediately only if UX design explicitly chooses it.

### SortMenu
Allowed values only: Featured, Newest, Price Low–High, Price High–Low, Popularity if backed by real metric. Selected sort is visible and URL state is shareable where practical.

## 5. Product Studio components

### ProductGallery
Images, thumbnails, active index, zoom/lightbox and image failure fallback. Swipe on mobile, arrow/keyboard on desktop. Primary image is eager/high priority; secondary gallery images lazy-load.

### StudioStage
Neutral studio scene/backdrop with subtle depth and lighting. Default is an optimized image stage. If 3D model exists, a user-activated view option can load GLB/GLTF. Show loading/error/unsupported fallback and never block Add to Cart.

### VariantSelector
Size/color selection derived from variant data. Show sold-out choices as disabled with label. Selecting color updates sizes and relevant image. Validate variant on server at cart/checkout.

### SizeGuide
Accessible modal/drawer with category-specific chart, units, fit instructions and last updated. If owner hasn't provided the chart, show “Size guide coming soon” rather than invented measurements.

### QuantityStepper
Minimum 1; maximum is current available/purchase limit. Disable plus at max. Revalidate server stock later.

### PurchaseActions
Add to Cart, Buy Now, Wishlist and Compare. Loading prevents repeated submission. Success updates cart count and a confirmation message.

## 6. Cart and checkout components

- CartLineItem: image/name/variant/price/quantity/remove.
- CartSummary: subtotal/shipping/discount/total with clear labels.
- CheckoutSteps: contact/address/payment/review; progress indicator must not imply steps are complete early.
- AddressForm: explicit labels, field errors and preserved values.
- PaymentMethodCard: COD/Easypaisa QR/Bank QR; only enabled methods appear.
- QRInstructions: QR, exact amount, account details, order ref, copy/save controls and warning about manual verification.
- ProofUploader: file type/size guidance, upload progress, remove/retry and privacy note.
- OrderResult: received/pending/verified/error state, order reference and invoice access.

## 7. Account and notification components

- AccountNav and OrderCard.
- NotificationList/NotificationItem with unread state.
- PreferenceTopicToggle with topic explanation.
- FrequencySelector for immediate/weekly/pause where enabled.
- MarketingConsentControl unchecked by default.
- SubscriptionConfirm and UnsubscribeResult.
- InvoiceDownloadButton with loading/error/retry.

Essential transactional email settings must not be presented as an optional marketing switch.

## 8. Admin components

- AdminDataTable: search, filters, pagination, responsive fallback.
- AdminFormSection: section label, description, validation summary.
- ProductMediaManager: upload, reorder, crop preview, alt text and delete.
- VariantMatrix: size/color/SKU/stock relationships.
- InventoryAdjustmentForm: quantity delta and required reason.
- OrderTimeline: fulfillment/payment state clearly separate.
- PaymentReviewPanel: private proof, expected amount, reference, verification actions.
- InvoicePreview: screen/print preview from snapshot.
- ArticleEditor and OfferEditor.
- CampaignBuilder: type, source content, audience, preview, test, approval, schedule/send.
- DeliveryTable: accepted, delivered, soft bounce, hard bounce, complaint, failed.
- AlertCenter: severity, recipient, acknowledge, resolve, runbook.
- IntegrationProviderCard: masked secret state, configured/healthy/error status, safe connection test.
- AuditLogTable: actor/action/entity/time with restricted data exposure.

## 9. Interaction and feedback rules

- Destructive action requires confirmation and clear object name.
- Financial actions show amount and current state before confirmation.
- Loading state prevents duplicate clicks.
- Success toast is short and specific.
- Error preserves recoverable form state and provides retry.
- Stale stock/price returns to quote review rather than silently accepting.
- Every icon-only action has accessible label and tooltip for desktop.
- Do not place two primary CTAs with equal visual weight in one small card unless the journey genuinely needs it.

## 10. Component acceptance

- [ ] Components listed have theme tokens and responsive behavior.
- [ ] All controls meet minimum touch-target and keyboard rules.
- [ ] Product card behavior is identical across Home/Shop/Search/Collections.
- [ ] Product Studio variants and purchase actions are fully specified.
- [ ] Checkout controls distinguish payment states.
- [ ] Consent and unsubscribe controls cannot be mistaken for transactional settings.
- [ ] Admin components include role/permission states.
- [ ] Error/loading/empty/success states defined before code.
