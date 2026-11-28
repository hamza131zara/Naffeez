# Naffeez — Light Theme Review and Onda Motion Pattern Evaluation

**Document ID:** NAF-P3-MOTION-002  
**Version:** 1.1  
**Status:** Owner-approved: Light/Dark visual directions and both proposed motion styles (2026-11-28). Exact section placement, native Figma import and full responsive/accessibility QA remain pending.

## 1. Source reviewed

- Owner-supplied preview: [Onda Design Studio Website Template on 21st](https://onda-design-studio-website-template-v1.21st.app/#contact)
- Matching 21st template listing: [Design Studio Website Template — Onda](https://dev.21st.dev/%408b/templates/onda-design-studio-website-template)
- Upstream source repository: [8bsite/design-studio-website-template](https://github.com/8bsite/design-studio-website-template)
- Upstream template/live description: [8B Onda template](https://8b.com/templates/onda/)

The supplied 21st preview URL could not be fetched directly from the research browser during this review. The matching Onda template listing and its upstream public repository were accessible and inspected. The evaluation below is based on those matching source materials, not an assertion that every 21st-hosted runtime detail was observed directly.

## 2. What Onda does

The upstream Onda source describes the following motion patterns:

1. **Hero photo punctuation:** a large circular photo acts as the full stop of an oversized greeting; on scroll it travels into the next statement heading.
2. **Statement text reveal:** two headline lines slide up, a dot appears, and the lead paragraph gains emphasis word by word.
3. **Pinned horizontal case-study track:** a section holds position while five project cards travel sideways and their images pan; the cards then bend into a curved composition.
4. **Rotating client wheel:** six cards ride around a large wheel and turn with scroll.
5. **Stacking service cards:** service cards stick, stack, shrink and darken as later cards arrive; their photographs open from circular masks.
6. **Process progress ring:** a violet arc draws around a pinned ring while four process stations activate.
7. **Collage deal-out:** studio/team photos begin in a pile and move to their positions as the visitor scrolls.
8. **Sticky Journal photo:** the photo frame stays in place while story rows pass and become emphasized; story images open in a circle.
9. **Contact typography:** a large contact headline grows in weight/scale as the section enters.
10. **Footer photo punctuation:** the closing word rises while a circular photo grows into its final punctuation.

These effects are designed for a studio/portfolio story. Their visual quality is useful inspiration, but many are too controlling for a shopping journey.

## 3. The two proposed Naffeez motion styles

Only these two styles are proposed for an initial Naffeez trial. They are **candidates for owner review**, not approved final behavior.

### Style 01 — restrained section text reveal

**Adapted from:** Onda's heading rise and statement lead emphasis.

**Behavior**
- As a section enters view, its eyebrow, heading and short supporting text rise approximately 12–16px and settle from reduced opacity to full opacity.
- The entire heading and paragraph stay readable as normal text; do not split every word into separate animated spans by default.
- If the user scrolls back up, the reveal may reverse naturally. No repeated bouncy replay, flicker or stagger cascade.
- Short duration and small distance; no movement on essential form controls, prices, stock labels or purchase buttons.

**Candidate placement**
- Homepage: category intro, New Arrivals heading and Journal teaser heading.
- Optionally a short Product Studio feature heading if it helps section hierarchy.
- Not on every product-card title, cart line, admin table or checkout field.

### Style 02 — circular image-mask reveal

**Adapted from:** Onda's service/story photos opening from a circular mask.

**Behavior**
- One large editorial image opens from a compact circular mask as it enters the viewport.
- Reveal runs once through the image's visible entrance range and reverses gently with scroll direction if supported.
- The image container has fixed dimensions/aspect ratio before animation to prevent layout shift.
- Use only a very small number of prominent editorial images. If the mask is unsupported or costly, use a simple opacity reveal/static image.
- Do not run it on the hero's active video, every product card, individual gallery thumbnails, texture zoom, or 360° spin.

**Candidate placement**
- Homepage Product Studio feature image.
- Optionally one Journal feature/cover image.
- The hero video already has its own motion, so do not add another circular transition over it.

## 4. Onda patterns not recommended for Naffeez

| Onda pattern | Decision | Reason |
|---|---|---|
| Pinned horizontal project/case-study track | Do not adopt | Interferes with normal vertical product browsing and makes product discovery harder to scan |
| Rotating six-card client wheel | Do not adopt | Decorative complexity; no useful shopping information |
| Sticky cards that stack/shrink/darken | Do not adopt for product cards | Can obscure products and control scroll; product cards need stable geometry and predictable actions |
| Hero photo travelling between section headings | Do not adopt | Strong studio-brand signature; conflicts with Naffeez's real-product video hero |
| Four-station process ring | Do not adopt | Naffeez is a store, not a design process/service journey |
| Photo collage dealing out | Do not adopt at launch | Extra movement and content load without clear purchase value |
| Sticky image while Journal stories scroll | Defer | Could be considered only if Journal becomes a substantial editorial destination; not needed for MVP |
| Contact headline growing into view | Do not adopt | No conversion benefit for the current store contact page |

## 5. Implementation approach for performance

The 21st listing advertises the GSAP/ScrollTrigger/Lenis version. The upstream repository also describes a lighter version that uses CSS scroll-driven animations and a small inline script without an animation library; its README reports 31 KB gzipped for that version versus 76 KB for its GSAP build. This is source-repository-reported comparison, not a Naffeez performance guarantee.

**Naffeez recommendation:**
- Do not bring in Lenis or replace native wheel/touch scrolling.
- Do not add GSAP just for the two selected effects.
- Prefer CSS scroll-driven/view-timeline effects where supported, with an explicit feature-query/fallback path.
- For browsers/devices without the relevant scroll-timeline support, render the final static state or use a small IntersectionObserver trigger only if necessary.
- Animate transform and opacity for text reveal. Keep image mask animation to one or two images per page and benchmark it on low-end mobile.
- Do not animate width/height/top/left in the scroll path; reserve the layout space before reveal.
- Keep media loading (hero video, image gallery, spin frames) independent from scroll animation.
- No scroll hijacking, horizontal pinned sections, forced smooth-wheel behavior or long pinned scenes.

MDN marks ScrollTimeline/ViewTimeline as newly broadly available across latest devices/browsers since October 2026, but notes older devices/browsers may not support them. Use a fallback rather than assuming support: [ScrollTimeline](https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline), [ViewTimeline](https://developer.mozilla.org/en-US/docs/Web/API/ViewTimeline), [CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations).

## 6. Accessibility and interaction safeguards

- Respect `prefers-reduced-motion: reduce`: omit nonessential movement and show all final content immediately.
- Do not delay availability, price, size selection, Add to Bag, checkout submission, invoice actions or admin controls.
- Do not make text legibility depend on animation progress.
- Maintain visible focus and keyboard order; no scroll animation may capture keyboard focus.
- No flashing, parallax zoom, persistent movement or auto-playing sound.
- Provide a pause control for any auto-moving carousel/video as specified in the hero-media document.
- Verify up-scroll and down-scroll behavior on touch and mouse/trackpad.
- Check for CLS/layout shifts, frame drops and reduced battery on mobile.
- The W3C lists the CSS `prefers-reduced-motion` query as a sufficient technique for preventing motion triggered by user interaction. See [WCAG 2.2 SC 2.3.3 — Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions) and [MDN accessibility media-query guidance](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using_for_accessibility).

## 7. Light theme visual review

The existing design system already defines Light, Dark and System semantic tokens. However, the first native Figma screen set was presented mainly in Dark mode; a complete Light-mode screen set was not created or visually reviewed in that file.

An additional repository vector review board has now been created:
- [Light Theme Review Board](design-assets/LIGHT_THEME_REVIEW_BOARD.svg)

It demonstrates the light canvas/surfaces, navigation, editorial hero, product cards, hover actions, Product Studio purchase panel, and accessibility checkpoints. It is a static SVG review asset, not a native Figma page/frame. The Figma Starter-plan edit quota prevented importing it into the existing native file in this session.

### Light-mode rules to verify
- Canvas `#F5F5F5`; surfaces `#FFFFFF`; soft controls `#EEEEEE`.
- Primary text `#111111`; secondary text `#626262`; muted text must still meet contrast for its use.
- Borders remain visible as subtle neutral outlines; do not rely solely on shadows.
- Silver accent `#565656`; dark primary CTA with white text.
- Product photo stage uses a neutral solid backdrop selected per photo; product details remain on white.
- Glass is limited to floating utility overlays and falls back to opaque white.
- Focus, success, warning, danger and disabled states use readable contrast plus explicit labels/icons.
- The same screen inventory must be tested in Light and Dark; this SVG is a review starting point, not proof that every screen has passed.

## 8. Owner review checklist

**Owner decision recorded — 2026-11-28:** Light and Dark visual directions are accepted, and both motion styles in the preview are accepted as the two Naffeez animation styles. This approval is for the styles/directions; the exact section placements and final implementation QA remain open.

- [x] Review [Light Theme Review Board](design-assets/LIGHT_THEME_REVIEW_BOARD.svg).
- [x] Confirm the Light theme retains the Naffeez monochrome layout with theme-appropriate surfaces/tokens.
- [x] Review [Motion Pattern Preview](design-assets/MOTION_PATTERN_PREVIEW.svg).
- [x] Style 01 (restrained section text reveal) accepted by owner.
- [x] Style 02 (circular image-mask reveal) accepted by owner.
- [ ] Select exact Naffeez sections for each effect only after viewing the preview.
- [ ] Confirm that pinned horizontal scroll, client wheel and sticky card stacks are excluded.
- [ ] After approval, import boards into native Figma and complete both-theme responsive QA before Phase 3 sign-off.

## 9. Related source specifications

- [Design System and Theme](DESIGN_SYSTEM_AND_THEME.md)
- [Website Template and Page Specification](WEBSITE_TEMPLATE_AND_PAGE_SPECIFICATION.md)
- [Motion, Hover, Scroll and Product Image Inspection](MOTION_HOVER_SCROLL_AND_PRODUCT_ZOOM_SPEC.md)
- [Hero Video Campaign and 360° Spin Builder](HERO_VIDEO_AND_360_SPIN_BUILDER_SPEC.md)
- [Design Handoff and Acceptance](DESIGN_HANDOFF_AND_ACCEPTANCE.md)


## 10. Proposed placement after style approval

The two approved styles should be applied sparingly, with these placements proposed for final screen review:

- **Style 01 — section text reveal:** category-section heading, New Arrivals heading/supporting copy, and Journal teaser heading/supporting copy. Do not animate every product title, price, stock badge, form label or admin row.
- **Style 02 — circular image-mask reveal:** the large Product Studio feature image on the homepage. A Journal cover may be considered later, but should not be included in the first implementation unless the first use passes mobile performance/accessibility review.

The owner has approved both styles, not yet the exact per-section placement. Confirm placement during final native Figma review. Both remain subject to reduced-motion and browser-support fallbacks.
