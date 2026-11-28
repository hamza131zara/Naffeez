# Naffeez — Phase 3 Design Handoff and Acceptance Checklist

**Document ID:** NAF-P3-HANDOFF-001  
**Version:** 1.5  
**Status:** Owner accepted the design/theme direction and both motion styles. Responsive layout refinements have been assigned to Phase 4/5; remaining owner business decisions and any optional native Figma import remain tracked.

## 1. Phase 3 objective

Produce an implementation-ready visual and frontend architecture handoff before development. Phase 3 does not mean that the website is coded or deployed.

**Current artifact status:** The repository contains detailed written design specifications, page templates, interaction contracts, workflows and frontend architecture. The first editable Figma visual tranche now covers the design system, desktop/mobile homepage, desktop/mobile Product Studio and interaction studies. The full screen inventory below remains the production checklist; this first tranche is not the complete Phase 3 visual package.

## 2. Inputs
- Accepted Phase 1 baseline v1.0.
- Phase 1 Journal/notification UX addendum v1.1.
- Approved Phase 2 documentation.
- Blackenwhite reference used for pattern inspiration, not asset/layout copying.
- Naffeez brand/contact/product decisions from owner.

## 3. Design tasks

### DS-01 — Confirm theme and identity
Deliver semantic light/dark/system tokens, typography, spacing, border, radius, shadows, focus, status and motion. Check contrast. Record final choices.

### DS-02 — Approve global shell
Deliver desktop/mobile header, announcement, mega menu, search, account, wishlist, compare, cart, theme control and footer.

### DS-03 — Approve homepage
Deliver every homepage section in sequence, responsive behavior, hero slide states, empty behavior and CMS fields.

### DS-04 — Approve catalog
Deliver Shop All, five categories, search, filters, sorting, active chips, result count and no-result state.

### DS-05 — Approve product card and Product Studio
Deliver card variants, quick view, touch interaction, Product Studio studio-stage, gallery, variants, size guide, stock, quantity and purchase action states.

### DS-06 — Approve cart/checkout/invoice
Deliver cart, COD, QR payment, proof/reference, confirmation, order status and A4 invoice templates.

### DS-07 — Approve account/notifications
Deliver sign-in/recovery, orders, invoices, notification inbox, topic consent preferences, pause/unsubscribe.

### DS-08 — Approve Journal and campaign UX
Deliver Journal listing/detail, article editor, campaign builder, audience preview, test/approval and delivery reporting.

### DS-09 — Approve admin
Deliver admin shell, all primary module pages, sectioned product editor, variant/inventory tools, order/payment/invoice queues, campaigns, alert center and integrations.

### DS-10 — Approve component library
Deliver component inventory, variants, states, keyboard/touch behavior, responsive behavior and accessibility notes.

### DS-11 — Approve frontend architecture
Deliver route map, app shells, feature module boundaries, data ownership, server/client boundaries, cache rules and optional 3D loading strategy.

### DS-12 — Final design QA
Compare each design to approved tokens and user journeys; record design issues and accepted exceptions.

## 4. Required visual artifact inventory

The final design source should contain:
- Cover/brand overview.
- Theme token sheet (Light/Dark).
- Typography and spacing page.
- Component library page.
- Desktop homepage.
- Mobile homepage.
- Shop All/category listing desktop/mobile.
- Search overlay/results.
- Product card states.
- Quick View modal.
- Product Studio desktop/mobile.
- Filter drawer desktop/mobile.
- Wishlist and compare.
- Cart desktop/mobile.
- Checkout COD.
- Checkout QR and submission.
- Order confirmation.
- Customer invoice and print/PDF.
- Account/Orders.
- Notification inbox/preferences.
- Journal listing/article detail.
- Admin dashboard.
- Admin product editor.
- Inventory/order/payment review.
- Invoice management.
- Journal/campaign/subscriber manager.
- Alert center/settings.
- Responsive and empty/error states.

## 5. Review method

For each design:
1. Verify requirement ID and user intent.
2. Verify layout and hierarchy.
3. Verify CTA behavior and destination.
4. Verify data and content needed.
5. Verify theme.
6. Verify responsive states.
7. Verify keyboard/touch accessibility.
8. Verify loading/empty/error/success/permission states.
9. Verify performance and fallback.
10. Record approval/change request.

## 6. Phase 3 acceptance criteria

- [ ] Theme and token system approved.
- [ ] Homepage and navigation approved.
- [ ] All customer P0 pages visually specified.
- [ ] Product Studio studio-room concept approved.
- [ ] Cart/checkout/COD/QR/invoice workflows visually approved.
- [ ] Customer account and notifications preferences designed.
- [ ] Journal/editorial and campaign views designed.
- [ ] Admin dashboard and critical screens designed.
- [ ] Component library and interaction states complete.
- [ ] Desktop/tablet/mobile coverage complete.
- [ ] Frontend route/module/cache architecture reviewed.
- [ ] Asset/content requirements documented.
- [ ] Open business decisions are clearly marked.
- [ ] No unresolved high-impact design ambiguity remains.
- [ ] Owner explicitly approves the design package.

## 7. Handoff to Phase 4 development

Phase 4 begins only after:
- this design pack is accepted;
- design source files/frames or agreed visual artifacts are available;
- Phase 2 technical docs remain consistent or are updated through a decision record;
- the owner accepts any deferred or reduced-scope elements;
- all P0 screens have final component/interaction specifications.

## 8. Motion and product image inspection handoff

Required motion specification: [Motion, Hover, Scroll and Product Image Inspection](MOTION_HOVER_SCROLL_AND_PRODUCT_ZOOM_SPEC.md).

Visual artifacts must include:
- Product-card hover and keyboard-focus state with alternate-image crossfade.
- Primary/secondary/outline/icon button idle, hover, pressed, focus, loading and disabled states.
- Scroll-down section reveal and scroll-up/re-entry behavior.
- Header top/scroll state, with open-menu and focused-input exceptions.
- Product Studio gallery with cursor lens over a fabric/stitching detail image.
- Zoom viewer with zoom-in/out/reset/close and previous/next image states.
- Mobile tap-to-zoom and pinch/drag layout.
- Gallery thumbnail change proving that the magnifier uses each selected image's own zoom source.
- Reduced-motion and standard-image fallback states.

## 9. Additional motion acceptance criteria

- [ ] Motion remains subtle and never delays primary purchase actions.
- [ ] Product card image scale is clipped and does not shift neighboring content.
- [ ] Image crossfade occurs only when a distinct secondary image exists.
- [ ] Scroll-down and scroll-up states are defined.
- [ ] Header remains available when keyboard focus or overlay is active.
- [ ] Every gallery image can be magnified independently.
- [ ] Fabric/stitching inspection is source-resolution accurate.
- [ ] Mobile and keyboard alternatives work without hover.
- [ ] Reduced-motion removes parallax and nonessential scale/reveal animation.
- [ ] All zoom assets load on demand rather than all at initial page load.

## 10. Linked motion and product zoom specification

Read [Motion, Hover, Scroll and Product Image Inspection Specification](MOTION_HOVER_SCROLL_AND_PRODUCT_ZOOM_SPEC.md). The final design prototype must visibly demonstrate:
- Button hover/focus/press/loading/disabled states.
- Product card subtle lift and image crossfade.
- Scroll-down and scroll-up reveals.
- Header state over hero and after scrolling.
- Desktop cursor magnifier on at least front, fabric and stitching-detail gallery images.
- Thumbnail changes binding a distinct high-resolution zoom source for each image.
- Mobile tap/pinch/drag plus visible zoom controls.
- Reduced-motion behavior and no-high-resolution fallback.



## 11. First high-fidelity visual tranche — created

**Figma source:** [Naffeez design file](https://www.figma.com/design/PEKxJAmDkJgfVpBL8nDTrT)

**Owner workspace:** Ameer Hamza's team  
**Figma page:** `01 — Visual System & Screens`

Created editable Figma frames and reusable local components for this first review tranche:

| Deliverable | Figma node ID | Scope |
|---|---:|---|
| Design system, tokens and component examples | `5:252` | Light/dark palette references, Space Grotesk + Inter typography, spacing/radius rhythm, buttons and product card specimen |
| Desktop homepage | `5:22` | Announcement, navigation, hero, five launch categories, product cards, Product Studio feature, Journal preview and footer |
| Mobile homepage | `6:403` | Mobile navigation, hero, category tiles, two-column products, Studio feature and footer |
| Desktop Product Studio | `6:237` | Gallery, product purchase panel, cursor magnifier, texture inset and per-image zoom-source mapping |
| Mobile Product Studio | `6:145` | Touch gallery, thumbnail strip, tap-to-zoom affordance, product options and sticky purchase action |
| Motion and interaction studies | `6:556` | Button states, product-card hover comparison, header scroll states, scroll-up/down reveals, reduced-motion and independent zoom-source examples |

Reusable local components created in the Figma file include icon artwork, garment artwork placeholders, a product-card component and a button component set with Default, Hover, Pressed and Disabled states. Semantic Light and Dark colour tokens are represented as separate collections because the current Figma Starter workspace allows one mode per collection.

### Important review boundaries

- This is a **design artifact**, not working storefront code. Hover, scroll and zoom states are static Figma review examples; Phase 4 must implement and test the runtime behavior.
- Garment illustrations are editable placeholders, not approved product photography. Replace them with owner-approved product photography and corresponding high-resolution zoom assets before final visual sign-off.
- Product names and `PKR 0,000` values are sample placeholders. Actual SKU, price, availability, material, size and policy content must come from the admin-managed catalog and approved business decisions.
- The initial tranche does not include the remaining catalog, cart, checkout, QR payment, invoice, account, Journal management and admin screens listed in Section 4.
- Rendered screenshot QA could not be completed in this session because the Figma MCP Starter-plan tool-call quota was reached. The frames were successfully created and their node IDs returned, but they are **not being marked visually verified or owner-approved**.

### Next review actions

1. Open the Figma source and review desktop/mobile homepage and Product Studio hierarchy.
2. Confirm the design direction and request changes against specific frames.
3. Supply approved product imagery (including separate front/fabric/stitching high-resolution files) for the next visual pass.
4. Continue the remaining customer/admin screens and states from Section 4.
5. Complete visual QA and update the acceptance checklist before Phase 4 begins.


## 12. Additional visual tranche — commerce and admin workflow screens

The next screen inventory is now defined in [Commerce, Cart, Checkout, Invoice, Account, Notifications and Admin Visual Workflow Blueprint](COMMERCE_AND_ADMIN_VISUAL_WORKFLOW_BLUEPRINT.md).

Importable vector design boards have been added to `docs/phase-3/design-assets/`:
- [Product card hover preview](design-assets/PRODUCT_CARD_HOVER_PREVIEW.svg) — same-SKU default/front and hover/alternate image with action controls and Select Options CTA.
- [Customer commerce screens](design-assets/COMMERCE_CUSTOMER_WORKFLOWS.svg) — catalog, cart, checkout, QR pending-verification result, account/invoice access and notification preferences.
- [Admin operations screens](design-assets/ADMIN_OPERATIONS_WORKFLOWS.svg) — overview queues, product editor/gallery mapping, order/payment review, Journal/campaign operations, inventory alerts, invoice/audit/integrations.
- [Customer/admin workflow map](design-assets/CUSTOMER_ADMIN_WORKFLOW_MAP.svg) — COD and QR branches, payment truth, actual receipt check and customer status updates.

**Figma import status:** These boards are SVG source assets committed to this Phase 3 branch. They are not yet native frames inside the Naffeez Figma file because the Figma Starter-plan MCP edit quota was reached. Import the SVG boards into the existing Figma file, organize them on the workflow page and complete visual QA when editing capacity is available.

## 13. Additional visual acceptance criteria

- [ ] Same-SKU product card switches from primary to a distinct alternate image on hover.
- [ ] Wishlist, Compare and Quick View controls appear in the hover state.
- [ ] Select Options appears without moving product title/price.
- [ ] Keyboard focus exposes the same actions; mobile does not depend on hover.
- [ ] Catalog filters use only current published product attributes.
- [ ] Cart/checkout totals are recalculated server-side and delivery charges use confirmed configuration.
- [ ] COD remains due until actual collection is recorded.
- [ ] QR payment remains pending until an authorized operator checks actual account receipt.
- [ ] Invoice is generated from immutable order snapshot and protected for customer/admin access.
- [ ] Transactional inbox is separate from optional topic-based marketing consent.
- [ ] Admin role checks, private proof/invoice access and audit reasons are visibly represented.
- [ ] SVGs are imported to the native Figma source, visually checked and owner-reviewed.


## 14. Additional visual deliverables — remaining customer/admin routes

Importable SVG vector boards:
- [Customer discovery and Journal](design-assets/CUSTOMER_DISCOVERY_AND_JOURNAL.svg).
- [Order confirmation and invoice](design-assets/ORDER_CONFIRMATION_AND_INVOICE.svg).
- [Journal, Offers and Support pages](design-assets/JOURNAL_OFFERS_SUPPORT_PAGES.svg).
- [Inventory and sold-out states](design-assets/INVENTORY_STOCK_STATES.svg).
- [Responsive and state coverage](design-assets/RESPONSIVE_AND_STATE_COVERAGE.svg).
- [Admin hero campaigns and 360° Spin Builder](design-assets/ADMIN_HERO_CAMPAIGN_AND_SPIN_BUILDER.svg).

Detailed media specification: [Hero Video Campaign and 360° Spin Builder](HERO_VIDEO_AND_360_SPIN_BUILDER_SPEC.md).

**Native Figma status:** the additional SVGs remain repository assets awaiting import into the native Figma file. They are not being marked as native Figma frames or visually QA'd there. The existing native first tranche remains identified in Section 11.

New acceptance checks:
- [ ] Search, Quick View, Wishlist, Compare and order tracking states reviewed.
- [ ] A4 invoice print layout reviewed against the immutable snapshot contract.
- [ ] Journal listing/detail, offers/collection, size guide and contact/support pages reviewed.
- [ ] Admin hero campaign manager includes poster-first video fallback and responsive preview.
- [ ] Hero video does not download/play for all inactive slides and respects reduced motion/data-saving.
- [ ] Inventory sold-out state is driven by available quantity per variant.
- [ ] 360° photo spin is distinguished from geometry-based 3D and only uses reviewed real capture frames.
- [ ] Responsive desktop/tablet/mobile states and loading/empty/error/retry states are reviewed.


## 15. Light theme and reference-motion review

- [Light Theme Review Board](design-assets/LIGHT_THEME_REVIEW_BOARD.svg) — first Light-mode companion board for homepage, cards, hover state and Product Studio.
- [Motion Pattern Preview](design-assets/MOTION_PATTERN_PREVIEW.svg) — two proposed motion patterns for owner inspection.
- [Motion Pattern Evaluation](MOTION_PATTERN_EVALUATION.md) — source review, selected/rejected Onda patterns, proposed placements and performance/accessibility guardrails.

**Approval recorded — 2026-11-28:** the owner accepted the Light and Dark visual directions and both motion styles (section text reveal and circular image-mask reveal). The Light-mode board is a repository SVG visual review asset, not a complete native Figma screen set. The original Figma page still primarily demonstrates Dark mode. Import the assets into native Figma and review corresponding screens in both themes when editing capacity is available.

Additional acceptance checks:
- [ ] Full Light-mode screen set is reviewed across homepage, catalog, Product Studio, cart, checkout, account, invoice, Journal and admin.
- [ ] Contrast, borders, focus, muted/disabled and status states pass in Light mode.
- [x] The two Onda-inspired candidate effects are individually reviewed and accepted by the owner.
- [ ] Owner confirms final section placement for each accepted effect.
- [ ] No horizontal pinned track, wheel, stacked-card sequence or scroll hijacking is included without separate approval.


## 16. Owner approval record and remaining Phase 3 gates

### Approved on 2026-11-28
- Light and Dark visual directions are accepted.
- Both proposed motion styles are accepted: restrained section text reveal and circular image-mask reveal.
- The selected styles remain subject to accessibility, reduced-motion, performance and responsive implementation checks.

### Still required for Phase 3 exit
1. Import the additional SVG boards into the native [Naffeez design file](https://www.figma.com/design/PEKxJAmDkJgfVpBL8nDTrT) and organize them into customer, admin and Light/motion pages.
2. Rebuild/review the complete Light-mode counterpart for all P0 routes; the existing native Figma tranche is Dark-led and the Light board is only a repository SVG companion.
3. Complete actual desktop, tablet and mobile visual QA for every P0 route and key state; schematic SVG boards do not prove pixel-level responsive behavior.
4. Complete contrast, keyboard/focus, touch-target, dialog, form-error, status-label and reduced-motion QA in both themes.
5. Confirm exact section placements for the two accepted motion styles. Proposed first placement: text reveal on category/New Arrivals/Journal headings; circular reveal on the homepage Product Studio feature image.
6. Resolve any owner inputs that materially change P0 screens or data behavior before locking the Phase 4 implementation handoff.
7. Confirm official logo/wordmark and provide real product imagery, alternate angles, size measurements and approved policies where applicable.
8. Record final Phase 3 owner sign-off and close the PR only after all exit criteria are evidenced.

### Open owner/business decisions carried from the Phase 2 decision log

| Decision IDs | Remaining input |
|---|---|
| OPEN-001, OPEN-013 | Customer sign-in/recovery choice; guest/account requirement and persisted cart/compare scope |
| OPEN-003 | Approved size charts and measurement units |
| OPEN-004, OPEN-005 | Delivery coverage, shipping charges and COD eligibility |
| OPEN-006 | Return/exchange time limits and conditions |
| OPEN-007, OPEN-008 | Approved Easypaisa/bank QR details and proof/reference requirements |
| OPEN-009 | Stock reservation timing and expiry rules |
| OPEN-010, OPEN-014 | Invoice seller/legal fields, numbering and applicable tax fields |
| OPEN-012, OPEN-017, OPEN-019 | Staff identities/roles, campaign approver and alert recipients |
| OPEN-002, OPEN-015, OPEN-016, OPEN-018, OPEN-020 | Email provider/plan, sender identities, marketing cadence and approved consent wording |
| OPEN-011 | Hosting provider/plan and cost ceiling |

These are not silently assumed. Some provider/hosting choices can be finalized during the relevant Phase 4/6 integration/deployment work, but authentication, checkout rules, inventory reservations, invoice data and access roles must be settled before implementing those P0 flows.

### Deferred features (not Phase 3 blockers)
- The 360° photograph-sequence Spin Builder is P1/post-MVP after the standard gallery, per-image zoom, stock validation and purchase journey are stable.
- Geometry-based 3D, AI-generated intermediate spin frames and virtual try-on are later enhancements, not MVP purchase dependencies.


## 17. Homepage layout review — owner feedback accepted

**Review source:** owner-provided `Homepage Desktop` screenshot, 2026-11-28.

The owner confirmed that the remaining visual design and theme templates are acceptable. The feedback is specifically about layout responsiveness and spacing:
- logo/wordmark area padding and non-wrapping alignment;
- desktop navigation spacing;
- hero container width and copy/media proportions;
- consistent shared content-container edges across sections;
- category/product grids and footer sizing at narrower widths.

The approved visual styling, component look, Light/Dark theme direction and both accepted motion styles remain unchanged.

**Scheduling decision:** The owner is comfortable handling the responsive layout refinements during development. They are now explicit Phase 4 implementation requirements and Phase 5 browser-QA gates, not a reason to redesign the approved visual system.

See [Responsive Layout Refinement Checklist](RESPONSIVE_LAYOUT_REFINEMENT_CHECKLIST.md) for exact container/gutter values, header/hero rules, breakpoint behavior and acceptance tests.

### Figma source boundary
The additional review boards are committed as SVG design assets in this branch. Importing every SVG into native Figma is still outstanding because the connected Figma team seat currently reports View access. The repository SVGs and written specs remain the available design handoff source; native Figma import is a follow-up handoff convenience, not permission to claim the SVGs have already been imported.

### Remaining Phase 3/business handoff items
- Reconcile owner decisions in the Phase 2 decision log before implementing affected features.
- Confirm real logo/brand assets and product photography when available.
- Keep the 360° Spin Builder and geometry-based 3D out of MVP scope as already recorded.
