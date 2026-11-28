# Naffeez — Figma Visual Design Handoff

**Document ID:** NAF-P3-FIGMA-001  
**Version:** 1.0  
**Status:** First visual tranche created; owner review pending  
**Date:** 2026-11-28

## Source file

[Open Naffeez design file in Figma](https://www.figma.com/design/PEKxJAmDkJgfVpBL8nDTrT)

- Workspace: Ameer Hamza's team
- Page: `01 — Visual System & Screens`
- Design direction: Monochrome Editorial + Functional Glassmorphism + Selective 3D
- Typography: Space Grotesk for headings; Inter for body and UI
- Language/currency: English / PKR
- Theme approach: Light and Dark semantic token collections; System behavior remains an implementation concern for Phase 4.

## Frames in the first review tranche

| Frame | Node ID | Review focus |
|---|---:|---|
| Design system and components | `5:252` | Colour palette, typography, spacing, radius, button states and product card |
| Homepage desktop | `5:22` | Editorial hero, category navigation, curated products, Product Studio feature and Journal preview |
| Homepage mobile | `6:403` | Compact navigation, stacked hero, category grid and two-column product cards |
| Product Studio desktop | `6:237` | Image-first gallery, purchase details, cursor zoom lens and source-specific fabric detail |
| Product Studio mobile | `6:145` | Tap-to-zoom gallery, touch thumbnails, product options and sticky purchase bar |
| Motion and interaction studies | `6:556` | Button states, card hover, header scroll transition, scroll-direction reveals and reduced motion |

## Reusable Figma assets

The file contains locally editable icon and garment artwork components, a reusable product-card component, and a button component set with Default, Hover, Pressed and Disabled variants.

## Gallery zoom design

The Product Studio demonstrates separate image/zoom-source pairs for:
- Front view → front high-resolution zoom source
- Fabric texture → fabric high-resolution zoom source
- Stitching detail → stitching high-resolution zoom source

The intended implementation contract remains the one in [Motion, Hover, Scroll and Product Image Inspection](MOTION_HOVER_SCROLL_AND_PRODUCT_ZOOM_SPEC.md): a selected gallery item changes both its main image and its own matching `zoomSrc`. The design does not authorize reusing one global zoom image for every gallery item.

## Content and asset limitations

- Garment artwork is an editable visual placeholder, not a real Naffeez SKU photo.
- Product names and `PKR 0,000` are sample placeholders, not live catalog data.
- Actual product photographs, variants, prices, stock, care details, delivery and returns copy must be supplied or managed through the approved catalog/admin workflow.
- The Figma screens show design states only. No working hover animation, scroll observer, magnifier tracking, pinch-to-zoom, cart, checkout, API or payment behavior has been implemented.

## Verification status

The Figma creation calls returned frame IDs for all six deliverables. A rendered screenshot QA pass could not be completed because the Figma MCP Starter-plan call quota was reached during screenshot requests. Therefore, visual accuracy, clipping, wrapping, responsive spacing and interaction presentation remain **pending manual review in Figma**.

## Next visual work

Continue the full Phase 3 inventory in `DESIGN_HANDOFF_AND_ACCEPTANCE.md`: catalog/search/filter screens, quick view, wishlist/compare, cart, COD/QR checkout, confirmation, customer invoices/account/notifications, Journal, and the admin dashboard and operational screens. Complete the remaining responsive and empty/error states, use approved photography, then complete visual QA and collect owner approval before Phase 4.
