# Naffeez — Visual Design System and Theme Specification

**Document ID:** NAF-P3-DESIGN-001  
**Version:** 1.0  
**Status:** Phase 3 design proposal for owner review  
**Date:** 2026-11-28  
**Depends on:** Accepted Phase 1 v1.0, Phase 1 addendum v1.1, approved Phase 2 architecture

## 1. Design direction

**Monochrome Editorial + Functional Glassmorphism + Selective 3D**

Naffeez should feel like a premium men's fashion editorial that is still an effortless online shop. Product photography, typography and spacing are the visual anchors. Glass surfaces are used only for selected utility layers. 3D exists to enrich the Product Studio, not to slow down basic browsing or checkout.

The reference site is Blackenwhite Official. We retain useful retail patterns—announcement strip, clear category navigation, account/search/wishlist/compare/cart utilities, collection-led grids, quick view, select options, social proof and reassurance—while making a distinct Naffeez identity. Do not copy its logo, imagery, text, or exact layout.

## 2. Brand personality

| Attribute | Direction | Avoid |
|---|---|---|
| Premium | Spacious, precise, confident | Over-decoration |
| Modern | Geometric typography, clean controls | Futuristic neon overload |
| Editorial | Large campaign photography, deliberate hierarchy | Dense marketplace look |
| Functional | Clear product actions and prices | Hidden interactions |
| Masculine fashion | Refined, versatile, contemporary styling | Stereotyped or exclusionary copy |
| Trustworthy | Visible price, stock, delivery/payment terms | Fake urgency or invented claims |

## 3. Theme architecture

Offer three settings:
- Light
- Dark
- System (follows OS/browser preference)

Persist the customer's choice locally. Prevent a flash of the wrong theme during first render. Theme switching must not reload the page or reset cart/filter/product selections.

### 3.1 Semantic color tokens

| Token | Dark mode | Light mode | Usage |
|---|---|---|---|
| `--background` | `#000000` | `#F5F5F5` | App canvas |
| `--surface` | `#0A0A0A` | `#FFFFFF` | Standard surface |
| `--surface-raised` | `#141414` | `#FFFFFF` | Panels/dialog content |
| `--surface-soft` | `#1D1D1D` | `#EEEEEE` | Secondary controls |
| `--text-primary` | `#FFFFFF` | `#111111` | Main text |
| `--text-secondary` | `#A3A3A3` | `#626262` | Supporting text |
| `--text-muted` | `#777777` | `#767676` | Disabled/subtle; use contrast checks |
| `--border` | `rgba(255,255,255,.15)` | `rgba(0,0,0,.12)` | Dividers and outlines |
| `--border-strong` | `rgba(255,255,255,.28)` | `rgba(0,0,0,.24)` | Emphasis |
| `--glass-surface` | `rgba(12,12,12,.74)` | `rgba(255,255,255,.78)` | Floating layers only |
| `--glass-border` | `rgba(255,255,255,.18)` | `rgba(255,255,255,.68)` | Glass edge |
| `--accent-silver` | `#C6C6C6` | `#565656` | Restrained brand accent |
| `--focus-ring` | `#FFFFFF` | `#171717` | Keyboard focus |
| `--success` | `#75B98A` | `#267A42` | Success state |
| `--warning` | `#E6B85C` | `#8B5A00` | Warning state |
| `--danger` | `#E47E7E` | `#B3261E` | Error/destructive state |
| `--info` | `#8CB5D8` | `#245C89` | Informational state |

Status must always have text/icon in addition to color. Test all foreground/background pairs against WCAG contrast targets. In light mode, do not use light grey as body text.

### 3.2 Theme behavior by surface

- Homepage: hero image may occupy the full viewport; text scrim adapts to photography.
- Navigation: transparent over hero when contrast permits; becomes opaque/glass-on-scroll.
- Product photography: clean neutral backdrop, never a glass overlay across the garment.
- Product details: solid readable panel, restrained border and shadow.
- Modals/filter drawers: glass outer shell can be used, but form controls remain solid.
- Admin: primarily solid surfaces and dense data layouts; glass only for top-level overlays.
- Forms: solid controls with clear border/focus/error states.
- Footer: solid dark/light contrast section, not a floating glass collage.

## 4. Typography

Proposed font pairing:
- Display/headings: Space Grotesk, weights 500–700.
- UI/body: Inter, weights 400–600.
- Optional price numerals: Inter with tabular numerals.

Use licensed web fonts; self-host optimized WOFF2 where permitted. Load only used weights. Avoid loading several families or full variable files if they noticeably increase initial transfer.

| Use | Desktop | Mobile |
|---|---:|---:|
| Hero heading | 56–80px | 36–48px |
| Page heading | 40–52px | 30–36px |
| Section heading | 28–36px | 24–30px |
| Product title | 16–18px | 15–17px |
| Body | 16px / 1.55 | 15–16px / 1.55 |
| Label/meta | 12–14px | 12–13px |
| Button | 14–16px | 14–16px |

Avoid all-caps for long body text. Use uppercase only for small editorial labels or short navigation labels.

## 5. Spacing, grid and geometry

Spacing scale: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96px.

- Content max width: 1440px; wide editorial sections may use full bleed.
- Desktop page gutter: 40–64px.
- Tablet gutter: 24–32px.
- Mobile gutter: 16–20px.
- Product image ratio: 3:4 portrait.
- Editorial/hero imagery: 16:9, 2:1 or campaign-specific crop.
- Category cards: 4:5 or 3:4 depending on artwork.
- Card radius: 10–14px.
- Dialog/drawer radius: 14–20px.
- Button radius: 8–12px; avoid making everything pill-shaped.
- Minimum touch target: 44×44px; aim 48px for key mobile actions.

## 6. Glassmorphism rules

Glass is a functional layer, not the brand's default surface.

Approved use:
1. Header after scrolling over imagery.
2. Search overlay.
3. Mega-menu panel if the background remains legible.
4. Quick View modal outer shell.
5. Mobile filter drawer header/action area.
6. Floating gallery controls and small utility actions.
7. AI Style Studio panels in a future release.
8. Small notification/toast overlays.

Not approved:
- Every product card.
- Text over product photography without a readability scrim.
- Checkout forms or invoice body.
- Admin data tables.
- Full-page frosted overlays that obscure shopping.
- Controls that rely on blur for contrast.

Fallback: when backdrop-filter is unsupported or disabled, use an opaque surface token with border and shadow.

## 7. Motion and interaction language

- Standard UI transition: 140–220ms.
- Drawer/modal entrance: 180–260ms.
- Product image transition: 180–260ms, no layout shift.
- Hero slide duration: 6–7 seconds; pause on hover/focus and allow manual control.
- Hover lift: subtle, at most 2–4px; avoid large scaling that shifts nearby cards.
- Button press: quick state change, not a springy bounce.
- Respect `prefers-reduced-motion`; no auto-moving carousel when reduced motion is requested.
- No auto-play audio.

## 8. Breakpoints and responsive behavior

Initial breakpoints:
- Small mobile: 320–374px.
- Mobile: 375–767px.
- Tablet: 768–1023px.
- Desktop: 1024–1439px.
- Wide: 1440px+.

Grid proposal:
- 320–767px: 2 product columns; one-column checkout.
- 768–1023px: 2–3 product columns; compact filter drawer.
- 1024–1439px: 3–4 product columns; desktop sidebar or toolbar filter.
- 1440px+: 4 columns default; allow 5 only if card width remains readable.

No page-level horizontal scrolling. Wide tables use responsive cards or a clearly contained scroll region.

## 9. Photography and product media direction

- Product imagery remains the hero of a product card.
- Prefer consistent 3:4 crops and consistent background/lighting per collection.
- Include front, back, detail, fabric/texture, fit and styled images where available.
- Do not invent fabric, fit, model or product attributes.
- Avoid inconsistent crops between variants.
- Use AVIF/WebP, responsive sizes and reserved dimensions.
- Use descriptive alt text for meaningful images; decorative imagery uses empty alt.
- Product imagery must remain crisp on retina displays without shipping oversized originals to mobile.

## 10. Accessibility and design QA

- WCAG 2.2 AA target for contrast and keyboard operation.
- Visible focus ring in both themes.
- Buttons have accessible names and 44px minimum target.
- Dialogs trap and restore focus; Escape closes where safe.
- Forms always have labels, errors and hints.
- Color is never the only status cue.
- Respect reduced-motion settings.
- Carousel supports pause/stop, keyboard and manual controls.
- Theme choice and preference controls expose current state to assistive technology.

## 11. Design tokens and component handoff

Tokens should be implemented as CSS variables and documented centrally. Components consume semantic tokens—not literal colors or hardcoded theme conditionals. Any new color, spacing or radius must be justified and added to the token sheet before being used across multiple screens.

## 12. Acceptance checklist

- [ ] Light, Dark and System modes defined.
- [ ] Every token has theme-specific values.
- [ ] Text/control contrast checked in both themes.
- [ ] Glass surfaces limited to approved use cases.
- [ ] Product photography is not obscured.
- [ ] Typography and spacing scale documented.
- [ ] Responsive breakpoints and grids documented.
- [ ] Motion and reduced-motion behavior documented.
- [ ] 3D/photo fallbacks defined.
- [ ] Accessibility requirements are testable.
