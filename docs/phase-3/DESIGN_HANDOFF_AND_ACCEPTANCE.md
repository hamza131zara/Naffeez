# Naffeez — Phase 3 Design Handoff and Acceptance Checklist

**Document ID:** NAF-P3-HANDOFF-001  
**Version:** 1.0  
**Status:** Design specification package prepared; high-fidelity visual frames/prototype are still to be produced and reviewed

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
