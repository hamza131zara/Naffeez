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

## 11. Motion and hover interaction requirements

All reusable components must follow [Motion, Hover, Scroll and Product Image Inspection Specification](MOTION_HOVER_SCROLL_AND_PRODUCT_ZOOM_SPEC.md).

### Button and icon controls
- Primary/secondary/quiet/danger buttons define hover, focus, pressed, loading and disabled states.
- Press feedback uses a very small scale/tonal change and never changes layout.
- Icon buttons have visible hover/focus surfaces and accessible names.
- Wishlist action uses one short fill/pop response; no endless pulse.
- Touch users receive pressed feedback and visible actions rather than hover-only controls.

### Product card behavior
- Desktop hover lifts card by only 2–3px.
- Product image uses a subtle 1.025–1.04 scale inside a clipped image frame.
- If a real alternate image exists, crossfade in 180–240ms.
- Quick View/Wishlist/Compare actions reveal smoothly and remain keyboard-focusable.
- Mobile exposes actions without requiring hover.
- No scale or transition may cause neighboring-card layout shift.

### Scroll and navigation
- Content sections use light direction-aware reveal.
- Product grids must not replay all card animations repeatedly on every scroll.
- Header may hide on downward scroll and reappear on upward intent only when no menu/modal/input focus is active.
- Checkout/admin headers remain stable by default.
- Reduced-motion mode removes nonessential movement.

## 12. ProductGallery magnifier contract

Every image object in ProductGallery—not only the active hero image—must carry or resolve its own matching high-resolution zoom source. The component API must not accept a single product-level zoomSrc reused for all gallery images.

Per-image contract:
`{ id, src, zoomSrc?, alt, width, height, sortOrder, variantId?, detailLabel? }`

Required behavior:
- Desktop pointer hover shows a lens/magnified crop that follows pointer coordinates.
- Zoom target is the currently active gallery image and its matching zoomSrc.
- Switching thumbnail resets lens coordinates and binds the new source.
- Clicking/tapping opens a larger viewer with zoom/pan/reset/close.
- Mobile supports tap-to-zoom, pinch/drag where supported, and explicit plus/minus/reset controls.
- Keyboard users have a visible Zoom Image action and accessible zoom controls.
- Missing zoomSrc falls back to ordinary lightbox; it never blocks purchase.
- Magnifier is independent of 3D/WebGL.

Optional product-detail hotspots may mark fabric/stitching/collar/cuff details only when the admin has attached a real, verified region to that exact image.

## 13. Motion component acceptance

- [ ] Hover, focus, pressed, disabled and loading variants exist.
- [ ] Product cards crossfade only to valid alternate images.
- [ ] Scroll reveal works in both directions without flicker.
- [ ] Header behavior respects focus and open overlays.
- [ ] Reduced-motion fallback exists.
- [ ] Every gallery image has its own image/zoomSrc association.
- [ ] Gallery switching never shows a previous image's zoom crop.
- [ ] Touch and keyboard magnification controls exist.
- [ ] High-resolution source failure falls back to standard image viewing.



## 10. Product card alternate-image hover preview

The product-card visual has two states for the **same SKU**. The hover preview is not a second product card with unrelated imagery.

### Default state
- Keep the compact 3:4 image stage and primary/front product image.
- Show a source-backed badge only when supplied by catalog data (for example, New).
- Keep product title and current PKR price visible below the image.
- Keep a discoverable Wishlist action; all other controls remain reachable through keyboard/touch patterns.

### Hover preview state
1. Crossfade to a distinct secondary image of the same SKU (front to back/alternate angle) over 180–240ms.
2. Lift the card by approximately 2–3px and scale only the clipped image to about 1.025–1.04.
3. Reveal Wishlist, Compare and Quick View as a compact action stack.
4. Reveal a `Select Options` CTA at the bottom of the image stage.
5. Keep image/card dimensions and the product metadata position unchanged to avoid layout shift.
6. On pointer leave, restore the primary image and default control presentation.

Keyboard focus inside the card exposes the same actions and visible focus styling. Touch layouts must not require a hover simulation or a first tap solely to reveal controls; keep essential actions visible or place them behind a labelled action control.

If `secondaryImage` is missing, do not crossfade to a blank/duplicate image. Wishlist and Compare do not navigate; Quick View opens a focus-managed dialog; Select Options opens variant selection or Product Studio. Reduced-motion mode swaps states without scale/lift animation.

**Visual source:** [Product Card — Default and Hover Preview](design-assets/PRODUCT_CARD_HOVER_PREVIEW.svg). Runtime behavior is specified here for Phase 4; the SVG is a static design specimen, not working interaction code.


## 15. Hero media, stock availability and 360° view components

### HeroSlideMedia
Props/data: poster image (required), optional video source, desktop/mobile crop, focal point, alt/accessible description, playback eligibility, slide active/visible state and reduced-motion/data-saving preference.
- Poster is always rendered first and remains the fallback.
- Video is muted/inline, plays only when the slide is active and visible, and pauses when inactive/offscreen.
- The carousel controls and slide CTA remain usable when video is unavailable.
- No audio autoplay and no initial download of all slide videos.

### HeroCampaignSlide
Fields: eyebrow, headline, description, CTA label/destination, optional published product/collection reference, poster, optional video, active dates, order and publication status. One primary CTA per slide.

### StockAvailabilityBadge
States derive from server-authoritative variant data: In Stock, Sold Out, Mixed Availability (product has available and unavailable variants), or Unavailable/unknown while data is loading/error. Do not use fabricated stock counts or urgency copy.
- Disable only the unavailable color/size combination.
- Product-level Sold Out appears only when all purchasable variants are unavailable.
- A product may remain published and browseable when sold out.
- Revalidate stock on cart/checkout.

### SpinViewer
An optional image-sequence viewer associated with a product/variant and approved frame list. Lazy-load only after explicit user activation; desktop drag/keyboard and mobile swipe; poster and standard gallery fallback. Do not conflate this component with a geometry-based 3D model viewer.
