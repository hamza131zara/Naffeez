# Naffeez — Frontend Architecture and Route Map

**Document ID:** NAF-P3-FE-ARCH-001  
**Version:** 1.0  
**Status:** Phase 3 design proposal for owner review

## 1. Architecture objective

Translate the approved Phase 2 modular-monolith architecture into a page/component structure that supports the Naffeez storefront, Product Studio, customer account, Journal, admin and notification center without scattering business logic across UI components.

## 2. Application shells

### Storefront shell
- Announcement bar.
- Responsive header/navigation.
- Main content container.
- Footer.
- Search, Quick View, cart drawer, mobile menu and global toast layers.
- Theme provider.

### Account shell
- Storefront visual identity.
- Account navigation and customer-specific content.
- Order/invoice/notification routes.
- No public caching of customer data.

### Admin shell
- Separate admin layout/sidebar.
- Top utility bar, alert center and current staff profile.
- Data tables/forms and operational queues.
- Server-side permission validation for every page/action.

## 3. Proposed route tree

~~~text
src/app/
  (store)/
    page.tsx
    shop/page.tsx
    shop/[category]/page.tsx
    collections/[slug]/page.tsx
    new-arrivals/page.tsx
    products/[slug]/page.tsx
    search/page.tsx
    wishlist/page.tsx
    compare/page.tsx
    cart/page.tsx
    checkout/page.tsx
    orders/[orderNumber]/page.tsx
    invoice/[invoiceNumber]/page.tsx
    journal/page.tsx
    journal/[slug]/page.tsx
    offers/page.tsx
    offers/[slug]/page.tsx
    about/page.tsx
    contact/page.tsx
    size-guide/page.tsx
    shipping-returns/page.tsx
    faqs/page.tsx
    privacy/page.tsx
    terms/page.tsx
    style-studio/page.tsx
  (auth)/
    sign-in/page.tsx
    sign-up/page.tsx
    verify-email/page.tsx
    recover/page.tsx
  account/
    layout.tsx
    page.tsx
    profile/page.tsx
    addresses/page.tsx
    orders/page.tsx
    orders/[id]/page.tsx
    invoices/page.tsx
    wishlist/page.tsx
    notifications/page.tsx
    notifications/preferences/page.tsx
  admin/
    layout.tsx
    page.tsx
    products/page.tsx
    products/new/page.tsx
    products/[id]/page.tsx
    categories/page.tsx
    collections/page.tsx
    inventory/page.tsx
    orders/page.tsx
    orders/[id]/page.tsx
    payments/page.tsx
    invoices/page.tsx
    customers/page.tsx
    journal/page.tsx
    journal/new/page.tsx
    journal/[id]/page.tsx
    offers/page.tsx
    campaigns/page.tsx
    campaigns/[id]/page.tsx
    templates/page.tsx
    subscribers/page.tsx
    notifications/page.tsx
    integrations/page.tsx
    staff/page.tsx
    audit-log/page.tsx
    settings/page.tsx
  api/v1/
    catalog/
    checkout/
    orders/
    invoices/
    account/
    marketing/
    journal/
    offers/
    admin/
    webhooks/
~~~

Routes are proposals; exact naming is finalized with Phase 3 design and Phase 4 implementation scaffold. No route may expose data solely because it is listed here.

## 4. Component architecture

### Shared foundations
- Button, IconButton, Input, Textarea, Select, Checkbox, Radio, Slider.
- Badge, Divider, Tooltip, Skeleton, Spinner, Toast.
- Dialog, Drawer, Popover, Dropdown, Tabs, Accordion.
- Breadcrumbs, Pagination, EmptyState, ErrorState, ConfirmDialog.
- ThemeToggle, StatusPill, Price, QuantityStepper.

### Storefront components
- AnnouncementBar, SiteHeader, DesktopMegaMenu, MobileNavDrawer.
- SearchOverlay, AccountMenu, CartIndicator, WishlistIndicator, CompareIndicator.
- HeroCarousel, CategoryTile, CollectionHeader, ProductGrid.
- ProductCard, ProductActions, QuickViewDialog.
- ProductGallery, ProductStudioStage, VariantSelector, SizeGuide.
- FilterSidebar, FilterDrawer, ActiveFilterChips, SortMenu.
- CartLineItem, CartSummary, CheckoutForm, PaymentMethodCard, QRInstructions.
- OrderStatusTimeline, InvoicePreview, NewsletterOptIn.
- JournalCard, ArticleBody, RelatedProducts.

### Account/notification components
- AccountSidebar, OrderCard, AddressForm.
- NotificationList, NotificationItem, UnreadCounter.
- PreferenceTopicToggle, FrequencySelector, UnsubscribeControl.
- EmailConsentCheckbox, ConsentConfirmation.

### Admin components
- AdminSidebar, AdminTopbar, AdminDataTable, AdminFormSection.
- ProductEditor, MediaManager, VariantEditor, InventoryAdjustment.
- OrderDetailPanel, PaymentReviewPanel, InvoiceAdminPanel.
- ArticleEditor, OfferEditor, CampaignBuilder, AudiencePreview.
- TemplateEditor, DeliveryStatusTable, AlertCenter, AuditLogTable.
- IntegrationProviderCard, SecretInput, ConnectionStatus.

## 5. Feature module boundaries

~~~text
src/features/
  catalog/
  products/
  collections/
  search/
  wishlist/
  compare/
  cart/
  checkout/
  orders/
  inventory/
  payments/
  invoices/
  customers/
  journal/
  offers/
  notifications/
  campaigns/
  admin/
src/server/
  auth/
  authorization/
  domain/
  repositories/
  services/
  integrations/
  jobs/
  validation/
  audit/
  observability/
src/lib/
  supabase/
  config/
  money/
  dates/
  urls/
~~~

A feature module owns its types, validation, UI composition and tests where practical. Shared UI belongs in components; business policy belongs in server/domain services.

## 6. Rendering and caching map

| Route/data | Rendering plan | Cache |
|---|---|---|
| Home/public category/collection | Server-rendered with revalidation | Public content only |
| Product detail | Server-rendered published product with client gallery controls | Revalidate after product publish/update |
| Search/filter | URL-driven server results; client controls | Safe public cache only |
| Journal/offer public pages | Server-render published content | Revalidate on publish |
| Cart | Client/local state, server quote | Never trust cached totals |
| Checkout | Dynamic request and server quote | No shared cache |
| Account | Dynamic, authenticated | Private/no-store |
| Invoice/order | Dynamic, ownership checked | Private/no-store |
| Admin | Dynamic, permission checked | Private/no-store |
| Marketing unsubscribe/preferences | Token/user-authorized dynamic handling | No shared cache |

Use Next.js Image or equivalent optimized media handling. Reserve image aspect ratio before load. Lazy-load below-the-fold media; do not lazy-load the primary LCP image.

## 7. State management

- URL search params: search query, category, sort, filter and pagination state where useful.
- Zustand: only transient cross-component client UI/cart state if required.
- Server state: Next.js server fetch/actions; TanStack Query only when polling, optimistic updates or client refresh materially helps.
- Form state: React Hook Form + Zod.
- Database: source of truth for products, variants, stock, orders, payment, invoice, consent and preferences.
- Theme: shared theme provider and semantic CSS variables.
- Notification inbox: server-persisted with optimistic read state only.

Do not store price/payment state as trusted client state. Recalculate totals and re-check stock server-side.

## 8. API and service boundaries

UI invokes typed application actions/routes. Route handlers:
1. authenticate;
2. authorize;
3. validate request;
4. call domain service;
5. return typed safe response;
6. log correlation ID without sensitive payload.

Domain services coordinate repository access and transaction calls. Providers are adapters under `src/server/integrations`.

## 9. Error boundary structure

- Storefront global error and not-found.
- Product not-found/unavailable state.
- Catalog/search empty and API failure.
- Checkout field/quote/order submission errors.
- Invoice regeneration/unavailable state.
- Account unauthorized/session expired.
- Admin permission-denied and operational error.
- Notification provider/outbox delayed state.

Never show stack traces, raw Supabase error text or provider credentials.

## 10. Bundle and performance strategy

- Product card never imports 3D viewer.
- Product Studio loads optional 3D chunk only when a product supports 3D and user chooses the viewer.
- Image zoom/lightbox loads on demand.
- Admin bundles are route-split and not sent to storefront routes.
- Email campaign builder is admin-only and route-split.
- Avoid loading analytics, social embeds and notification providers before consent/need.
- Monitor bundle analyzer output and remove redundant libraries.

## 11. Architecture acceptance

- [ ] Route tree covers P0 screens.
- [ ] Storefront, account and admin shells separated.
- [ ] Feature/domain/infrastructure boundaries are clear.
- [ ] Public and private caching rules defined.
- [ ] Money/stock/payment/invoice are server-authoritative.
- [ ] Product Studio 3D is optional/lazy.
- [ ] Notification/campaign routes are permission scoped.
- [ ] Error boundaries and accessibility behavior documented.

## 12. Motion and ProductGallery implementation boundary

Detailed behavior: [Motion, Hover, Scroll and Product Image Inspection Specification](MOTION_HOVER_SCROLL_AND_PRODUCT_ZOOM_SPEC.md).

### Product gallery media contract
Each image entry is independent and has its own zoom source. Conceptual TypeScript contract:

```ts
export interface ProductGalleryMedia {
  id: string;
  src: string;
  zoomSrc?: string;
  alt: string;
  width: number;
  height: number;
  sortOrder: number;
  variantId?: string;
  detailLabel?: string;
  inspectionRegion?: {
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
  };
}
```

`zoomSrc` is optional only when a high-resolution source is not available. It must correspond to the same `id`, image and variant. Do not put one zoomSrc on the product record and reuse it for all gallery images.

ProductGallery owns:
- active media ID/index;
- current pointer/lens coordinates;
- zoom level and pan offset;
- viewer open/closed state;
- loading/error state for the selected zoom source;
- variant-to-gallery mapping.

On thumbnail or variant change, reset stale lens/pan state and bind the matching media source. Load high-resolution source on pointer/keyboard/tap intent rather than downloading all zoom files on initial page load.

### Motion implementation boundary
- CSS transitions for button/card/thumbnail micro-interactions.
- IntersectionObserver or equivalent lightweight viewport trigger for section reveal.
- Optional direction-aware scroll state for header only; no page scroll hijacking.
- ProductGallery zoom logic is separate from Three.js and React Three Fiber.
- Use transform/opacity for reveals; keep content visible if JS fails.
- Honor reduced-motion.
- Avoid installing a large motion library solely for simple hover/fade interactions.

### Testing boundary
Test media ID → zoom source mapping; thumbnail navigation; variant switch; zoom reset; pointer boundaries; lens coordinate mapping; source failure fallback; keyboard controls; touch pan/pinch; reduced motion; and ensuring a gallery image's old zoom crop cannot remain after switching images.



## 13. Hero media and optional product spin boundaries

### Homepage hero
- Treat hero video as optional media attached to a CMS-controlled slide, not a hard-coded page animation.
- The slide data includes poster (required), optional video source, desktop/mobile crop/focal point, text/CTA and optional published product/collection binding.
- The first poster is available as a stable render/LCP fallback. Do not put all slide video sources into initial browser loading.
- A client-side media controller should mount/play only the active visible slide, pause inactive/offscreen slides and fall back to poster on playback failure or constrained preferences.
- Carousel navigation, pause, reduced-motion and manual interaction state must be independent of video decoding.
- Exact video transformations/hosting and byte budgets are an implementation/provider decision and must be verified in Phase 4/5.

### Product 360° spin
- Keep the standard ProductGallery as the default and source of truth.
- Add an optional, lazy-loaded SpinViewer module only when the product/variant has an approved frame sequence.
- Spin frames and viewer code must not enter the homepage bundle or initial Product Studio media download.
- The first implementation is an image-sequence viewer. Treat an actual GLB/glTF model viewer as a separate later module and content type.
- A missing, failed or unsupported spin returns to the normal image gallery without blocking purchase.

### Inventory state boundary
- Public availability is derived from server-authoritative available quantity per variant; available quantity is on-hand minus reserved quantity under the Phase 2 inventory model.
- A variant is sold out when its available quantity is zero or below. Product-level sold-out state applies only when all purchasable variants are unavailable.
- The browser can present disabled size/color selectors and sold-out badges, but checkout/order creation revalidates stock on the server.
