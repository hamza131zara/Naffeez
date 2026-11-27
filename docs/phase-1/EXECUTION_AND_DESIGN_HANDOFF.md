# Phase 1 — Detailed Execution and Design Handoff

**Document ID:** NAF-P1-HANDOFF-001  
**Version:** 1.0  
**Status:** Detailed handoff companion to the accepted Phase 1 v1.0 baseline  
**Baseline:** NAFFEEZ_PHASE_1_UI_UX_SPECIFICATION_v1.0.md  
**Purpose:** Turn the accepted product/UI/UX baseline into a screen-by-screen design and implementation handoff. This companion does not silently replace the accepted baseline; additive notification/editorial requirements are recorded in the Phase 1 addendum.

## 1. Phase 1 completion boundary

The owner accepted the written product/UI/UX baseline. That approval confirms product direction, launch scope and intended behaviors. It does not claim that hi-fi Figma files, final photography, production content, or coded screens already exist.

Before implementation of each UI area, the team must have:
- the approved screen layout or a documented low-fidelity wireframe;
- desktop and mobile behavior;
- component inventory and variants;
- interactions and state behavior;
- content and asset requirements;
- accessibility and responsive rules;
- acceptance criteria;
- dependencies and unresolved owner inputs.

## 2. Step-by-step design handoff

### P1-D01 — Repository and source-of-truth review
1. Read the accepted Phase 1 baseline.
2. Read the notification/editorial addendum.
3. Read Phase 2 PRD and architecture draft.
4. List conflicts, missing requirements and open owner decisions.
5. Create a traceability list from requirement IDs to screen IDs.
**Output:** design traceability matrix.
**Acceptance:** every approved P0 requirement maps to at least one screen, flow or system behavior.

### P1-D02 — Brand assets and visual tokens
1. Collect approved logo variants, wordmark, campaign photographs and icon preference.
2. Confirm font licensing and required weights.
3. Define dark/light semantic color tokens.
4. Check text, controls, disabled states, alerts and glass surfaces for contrast.
5. Define spacing, grid, container widths, radii, shadows and motion.
6. Define image ratios for hero, category tile, product card, gallery and article cover.
7. Define focus, hover, pressed, selected and disabled states.
**Output:** token sheet and asset inventory.
**Acceptance:** all tokens have light/dark values and no UI component depends on hard-coded theme-specific colors.

### P1-D03 — Global shell
Design:
- announcement bar;
- desktop navigation and category mega-menu;
- mobile header and navigation drawer;
- search overlay and search results;
- account menu;
- wishlist and cart counters;
- theme selector;
- footer;
- breadcrumbs;
- toast/status messages;
- modal, drawer and confirmation primitives.

For each component, document keyboard, touch, hover, focus, loading, empty and error behavior.
**Output:** global component specification.
**Acceptance:** all shared controls work without hover and remain usable at 320px viewport width.

### P1-D04 — Homepage
Design in this order:
1. announcement bar;
2. transparent-to-solid header;
3. editorial hero with three-slide target;
4. category shortcuts for the five initial subcategories;
5. trending/curated product section;
6. new arrivals;
7. Product Studio introduction;
8. best sellers only when actual or admin-curated;
9. Naffeez Journal/Articles teaser;
10. brand story;
11. Instagram/social section;
12. newsletter/marketing opt-in;
13. footer.

For each section specify title, copy limit, image ratio, CTA, responsive grid, loading placeholder, empty behavior and admin-managed fields.
**Output:** desktop/tablet/mobile homepage designs and section configuration schema.
**Acceptance:** hero controls are pauseable; images have reserved aspect ratios; all CTAs have real destinations; absent content does not leave broken empty blocks.

### P1-D05 — Catalog and discovery
Design:
- Shop All;
- Shirts category;
- Casual Shirts subcategory;
- Dress Shirts subcategory;
- Trousers category;
- Seasonal Trousers;
- Winter Trousers;
- Hoodies;
- search results;
- no-results state;
- filter drawer/sidebar;
- active filter chips;
- sort menu;
- pagination/load-more behavior.

Filter options must be derived from catalog data. Do not display a size, color, occasion, style or collection option if no published product supports it.
**Output:** catalog screen templates and filter interaction spec.
**Acceptance:** result count updates correctly; clear-all restores default; filter state survives navigation where agreed; mobile filter panel is accessible.

### P1-D06 — Product card and Product Studio
Product card design states:
- default;
- image hover;
- wishlist on/off;
- compare on/off;
- quick view;
- select options;
- sold out;
- sale/new/bestseller badge only when configured.

Product Studio design:
1. gallery stage and thumbnail rail;
2. zoom/lightbox;
3. product identity, SKU where appropriate, description and PKR price;
4. available colors;
5. size selection and size-guide overlay;
6. variant-specific stock;
7. quantity selector;
8. Add to Cart and Buy Now;
9. wishlist and compare;
10. delivery/returns summary;
11. WhatsApp enquiry;
12. related products;
13. future Try It On placeholder only when clearly labelled inactive.

**Output:** product card component variants and Product Studio desktop/mobile screens.
**Acceptance:** variant is selected before purchase when needed; unavailable variants cannot be purchased; image failure fallback exists; no heavy 3D is loaded for ordinary product viewing.

### P1-D07 — Cart, checkout and invoice
Design:
- empty/populated cart;
- quantity update/removal;
- price or stock changed state;
- guest/customer checkout;
- COD choice;
- Easypaisa QR instructions;
- bank QR instructions;
- reference/proof upload;
- pending verification state;
- order success/failure;
- invoice screen;
- print/PDF layout;
- unauthorized/expired order access.

Show a clear distinction between order received, payment pending verification, payment verified and COD payable.
**Output:** annotated checkout journey and invoice template.
**Acceptance:** the page never implies that displaying/scanning a QR or uploading proof confirms payment.

### P1-D08 — Accounts and notification center
Design:
- sign-up/sign-in/recovery;
- email verification;
- account profile;
- order history and order detail;
- invoice access;
- saved addresses;
- wishlist;
- notification inbox;
- notification preferences and marketing consent;
- unsubscribe confirmation and preference center.

The marketing preference area must separately control:
- new product drops;
- offers and sales;
- Journal/style articles;
- seasonal collections/campaigns;
- frequency (immediate campaign or weekly digest where supported);
- pause/all marketing unsubscribe.

Transactional order/security messages are separated from marketing preferences.
**Output:** account and preference-center designs.
**Acceptance:** no marketing checkbox is preselected; sign-in/email address alone does not subscribe a customer to promotions; preference changes are understandable and reversible.

### P1-D09 — Journal and editorial content
Design:
- Journal listing;
- article detail;
- article category/tag;
- related articles/products;
- social sharing;
- newsletter/marketing CTA;
- unavailable/draft article state.

Admin content fields: title, slug, summary, cover image, author/byline, body, category/tags, SEO title/description, draft/scheduled/published status, publication time, related products and email announcement eligibility.
**Output:** Journal templates and content-editor field specification.
**Acceptance:** unpublished articles are not publicly accessible; article email announcement is a separate admin-approved campaign action.

### P1-D10 — Admin screens
Design:
- overview dashboard;
- products and variant editor;
- inventory;
- categories and collections;
- orders;
- manual payment verification;
- invoices;
- Journal/articles;
- homepage content;
- email templates and notification rules;
- marketing subscribers/preferences;
- campaign composer/preview/schedule;
- delivery status and suppression list;
- store settings/integrations;
- staff roles;
- audit log.

Every destructive or financially sensitive action requires a confirmation and audit trail.
**Output:** admin screen inventory, permission matrix annotations and responsive tables/forms.
**Acceptance:** admin cannot view secrets after saving; operators only see authorized functions.

### P1-D11 — Content and accessibility review
1. Review real brand language, product copy and policies.
2. Confirm English-only launch copy.
3. Provide useful alt text for editorial/product images.
4. Check heading hierarchy, labels, contrast and focus.
5. Check reduced motion.
6. Check empty/error messages for clear recovery actions.
**Output:** content and accessibility review report.
**Acceptance:** no placeholder legal/policy wording reaches production.

## 3. Screen and flow IDs

| ID | Screen/flow | Main acceptance |
|---|---|---|
| UX-001 | Homepage | Editorial hero, category discovery and fast product entry |
| UX-002 | Catalog/search | Accurate search, filters, sort and counts |
| UX-003 | Product Studio | Variant-aware product purchase |
| UX-004 | Cart/checkout | Server-calculated total and valid order submission |
| UX-005 | QR payment | Pending review until admin verifies |
| UX-006 | Customer account | Own orders/profile/invoices only |
| UX-007 | Notification preferences | Separate transactional/marketing choices |
| UX-008 | Journal | Published editorial content and related products |
| UX-009 | Admin product ops | Safe product/variant/stock management |
| UX-010 | Admin payment/order ops | Auditable state changes |
| UX-011 | Admin campaigns | Consent-filtered audience and approval |
| UX-012 | Invoice | Same order snapshot for customer/admin |

## 4. Design deliverable checklist

- [ ] Brand asset inventory and approved logo.
- [ ] Light/dark token sheet.
- [ ] Responsive grid and spacing rules.
- [ ] Component library and interaction states.
- [ ] Homepage desktop/tablet/mobile.
- [ ] Catalog/category/search desktop/mobile.
- [ ] Product Studio desktop/mobile.
- [ ] Cart and checkout flows.
- [ ] QR payment screens.
- [ ] Invoice PDF and responsive invoice view.
- [ ] Account, order history and recovery screens.
- [ ] Notification inbox and preferences.
- [ ] Journal listing/article detail.
- [ ] Admin product/order/payment/invoice screens.
- [ ] Admin notification/campaign screens.
- [ ] Accessibility and responsive review.
- [ ] Requirement-to-screen traceability.

## 5. Owner-provided design inputs still needed

Logo source files, exact product photography, product descriptions, size chart, delivery/returns policy, invoice seller details, Journal content/authoring rules, approved marketing sender identity and exact brand voice. Use visibly labelled design placeholders until provided; never invent business claims.
