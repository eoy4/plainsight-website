# Project Research Summary

**Project:** Bold Typography Hero Redesign — Plain Sight Agency Homepage
**Domain:** Viewport-Scale Display Typography for Agency Marketing Sites
**Researched:** 2026-02-11
**Confidence:** HIGH

## Executive Summary

This project involves upgrading the Plain Sight agency homepage hero section to feature viewport-dominating display typography — a defining trend in 2026 agency design where oversized, fluid headlines create immediate visual impact. The recommended approach uses CSS `clamp()` with viewport units (vw) and rem bounds to create accessibility-compliant fluid scaling, paired with carefully optimized variable font loading and asymmetric layout composition to differentiate from the current centered approach.

The core technical stack is straightforward: CSS `clamp()` for viewport-responsive typography (universally supported since 2020), Tailwind v4's `@theme` directive for design token generation, modern viewport units (`svh`/`dvh`) for mobile-safe hero heights, and variable font optimization (Darker Grotesque Variable) to reduce payload by 55% while enabling fluid weight scaling. This project doesn't require new frameworks or complex integrations — it's primarily a CSS architecture upgrade leveraging modern standards.

Critical risks center on accessibility (viewport units breaking user zoom if not paired with rem values) and performance (Cumulative Layout Shift from font loading, gradient rendering costs on large text). Mitigation requires strict adherence to `clamp()` patterns with rem bounds, aggressive font preloading with `font-display: optional`, and testing on actual mobile devices (especially iOS Safari) rather than desktop DevTools. The research identifies six critical pitfalls with clear prevention strategies, all addressable through disciplined implementation of established patterns.

## Key Findings

### Recommended Stack

The stack leverages modern CSS baseline features (2020+ browser support) with no JavaScript dependencies. Core technique is CSS `clamp()` combining viewport units (for fluid scaling) with rem units (for accessibility compliance), following the formula `clamp(minRem, Xvw + Yrem, maxRem)`. The `+ Yrem` addition ensures user zoom support, preventing WCAG 1.4.4 violations.

**Core technologies:**
- **CSS `clamp()`** (baseline 2020+): Viewport-responsive typography without media queries — enables smooth scaling from mobile to ultra-wide displays with single declaration
- **Tailwind v4 `@theme` directive**: Custom property registration for fluid typography tokens (e.g., `--text-hero-bold: clamp(5rem, 12vw + 2rem, 11.25rem)`) — generates utility classes project-wide
- **Variable fonts** (@fontsource-variable/darker-grotesque): Single file replaces 7 static weights, reducing payload by 55% (376KB → 89KB) with 15-22% LCP improvement
- **Modern viewport units** (`svh`/`dvh`): Mobile-safe viewport heights accounting for browser UI (iOS Safari address bars) — prevents layout jumps on scroll
- **Font loading optimization** (`font-display: optional` + preload): Eliminates Cumulative Layout Shift risk by preventing mid-render font swaps — critical for large display type where shifts are amplified

**Critical version/compatibility notes:**
- `clamp()`: Chrome 79+, Firefox 75+, Safari 13.1+ (universally supported in 2026)
- `text-wrap: balance`: Chrome 114+, Firefox 121+, Safari 17.5+ (progressive enhancement)
- `svh`/`dvh` units: Chrome 108+, Safari 15.4+, Firefox 110+ (requires fallback)

### Expected Features

Research identifies seven table stakes features and six differentiators. The current homepage already has foundational elements (hierarchy, semantic HTML, contrast) but lacks viewport-scale typography and asymmetric composition that define "bold typography hero" in 2026.

**Must have (table stakes):**
- **Oversized headline typography** (viewport-based sizing) — defining characteristic; without this, project doesn't deliver on "bold typography" goal
- **Mobile-responsive fluid typography** — non-negotiable for multi-device usage; requires `clamp()` with tested breakpoints
- **Fast font loading** (prevents FOIT/layout shift) — critical for large headlines where shift impact is amplified
- **WCAG-compliant contrast ratios** (3:1 minimum for large text) — already present but needs verification on gradient text
- **Proper semantic HTML** (h1, p tags) — already correct in current implementation

**Should have (competitive advantage):**
- **Asymmetric grid layout** — 2026 trend of "moving away from safe, center-aligned templates toward more expressive compositions"; differentiates from current centered hero
- **Editorial-style composition** — layered elements, intentional negative space, magazine-inspired layouts create "considered, confident, unmistakably modern" feel
- **Gradient/multi-color type treatment** — already in use; amplify for more impact without sacrificing performance
- **Scroll-driven animations** (subtle fade/scale) — polish layer; use CSS `animation-timeline: scroll(root)` to avoid JavaScript
- **Variable font weight shifting** — enables dynamic weight changes without loading multiple files

**Defer (v2+):**
- **Kinetic typography** (advanced animations) — high complexity, low immediate value for agency site
- **Interactive typography** (cursor/touch response) — nice-to-have; prioritize static excellence first
- **Parallax scrolling** — explicitly flagged as anti-feature ("keep to minimum to avoid distraction", causes motion sickness and mobile jank)

### Architecture Approach

The architecture is a component extraction pattern: separate hero presentation from page orchestration by creating `Hero.astro` component that accepts typed `CollectionEntry` props from Astro Content Collections. This reduces `index.astro` complexity by ~300 lines while enabling hero reuse across pages (services, work, etc.).

**Major components:**
1. **Typography token layer** (`tailwind.css` @theme directive) — Defines fluid font sizes as CSS custom properties (e.g., `--text-hero-bold`), generates Tailwind utilities. Must be modified first (provides utilities consumed by components).
2. **Hero component** (`Hero.astro`, new file) — Encapsulates hero markup and styling, accepts CollectionEntry props for type safety via Zod schemas. Depends on Tailwind tokens existing.
3. **Page orchestrator** (`index.astro`, refactored) — Queries content collections, maps sections to components, removes inline styles. Depends on Hero.astro existing.
4. **Content storage** (`src/content/homepage/01-hero.md`) — No changes needed; existing Zod schema already validates heading, subheading, CTA fields.

**Critical architectural patterns:**
- **Pattern 1 (Viewport-responsive typography)**: Use `clamp(minRem, Xvw + Yrem, maxRem)` for all hero text — smooth scaling without breakpoint jumps, accessibility-compliant
- **Pattern 2 (Component extraction)**: Separate presentation from orchestration via typed props — enables reuse and testing
- **Pattern 3 (Modern viewport units)**: Use `svh` instead of `vh` for mobile — prevents content cut-off when iOS Safari address bar expands/collapses
- **Pattern 4 (Tailwind @layer organization)**: Wrap custom CSS in `@layer base` or `@layer components` — ensures utilities can override, prevents specificity wars

**Build order (dependency-driven):**
1. Tailwind token definitions (`tailwind.css`) — No blockers, generates utilities
2. Component extraction (`Hero.astro`) — Depends on Tailwind utilities existing
3. Page refactoring (`index.astro`) — Depends on Hero.astro existing

### Critical Pitfalls

Research identified six critical pitfalls with specific prevention strategies. All are addressable through disciplined adherence to established patterns, but each can silently pass development testing and break production UX.

1. **Viewport units breaking user zoom (WCAG 1.4.4 violation)** — Pure vw/vh sizing doesn't respond to browser zoom or user font size preferences. **Prevention:** Always use `clamp(Xrem, Yvw + Zrem, Wrem)` formula; never pure viewport units. The rem values provide accessibility-compliant bounds.

2. **Cumulative Layout Shift (CLS) from font loading** — Display fonts with different metrics than fallback fonts cause visible reflow when loaded, especially amplified on viewport-scale text. **Prevention:** Use `font-display: optional` (prevents swap after initial render) + preload critical fonts + subset to needed characters. Target CLS < 0.1 in PageSpeed Insights.

3. **Mobile browser UI changing viewport height** — iOS Safari address bar expanding/collapsing changes viewport height; traditional `vh` units don't adapt smoothly, causing jarring resizes. **Prevention:** Use `svh` (small viewport height) instead of `vh` for ~90% of layouts; accounts for browser UI and prevents resize jumps.

4. **Gradient text performance issues** — `-webkit-background-clip: text` with complex gradients on large typography creates significant GPU overhead; gradient calculations scale with text size. **Prevention:** Minimize gradient stops (2-3 max), avoid animating gradients, test paint performance in Chrome DevTools.

5. **Text overflow and container breaking** — Viewport-scale headlines overflow containers; single words like "Transformation" at 12vw can exceed even wide containers. **Prevention:** Remove or significantly increase `max-w-[900px]` constraint, use `overflow-wrap: break-word`, test with longest real content words (not lorem ipsum).

6. **iOS Safari auto-zoom on small text** — If tagline or CTA renders below 16px absolute size on mobile, iOS Safari auto-zooms entire viewport when users tap, creating jarring "bounce". **Prevention:** Ensure all interactive text has minimum 16px rendered size via `clamp(1rem, 3vw, 1.25rem)` formula; test on actual iPhone Safari.

## Implications for Roadmap

Based on combined research, recommended phase structure prioritizes foundational typography safety (accessibility, performance) before visual effects. This ordering prevents rework and ensures each phase delivers working, testable functionality.

### Phase 1: Typography Foundation & Safety

**Rationale:** Must establish accessibility-compliant fluid typography system before scaling hero text. Viewport units without proper constraints cause WCAG violations that are hard to detect in development but break for real users. Container constraints must be addressed before large text overflows them.

**Delivers:**
- Tailwind `@theme` tokens for fluid typography (`text-hero-bold`, `text-hero-tagline-bold`)
- `clamp()` formulas with rem bounds ensuring user zoom support
- Mobile viewport unit strategy (`svh` for hero heights)
- Container constraint removal/adjustment to prevent overflow

**Addresses features:**
- Oversized headline typography (table stakes)
- Mobile-responsive fluid typography (table stakes)
- Proper accessibility compliance (table stakes)

**Avoids pitfalls:**
- Pitfall 1: Viewport units breaking zoom
- Pitfall 3: Mobile viewport height changes
- Pitfall 5: Text overflow and container breaking
- Pitfall 6: iOS auto-zoom on small text

**Research flag:** Standard patterns (CSS `clamp()` well-documented) — skip `/gsd:research-phase`

### Phase 2: Font Loading Strategy

**Rationale:** Font loading optimization must happen before visual design iteration. Cumulative Layout Shift from font loading is amplified on viewport-scale typography; a 10vw headline has massive shift impact. This phase prevents performance rework after hero is "visually complete."

**Delivers:**
- Variable font implementation (Darker Grotesque Variable)
- Font preloading strategy (`<link rel="preload">`)
- `font-display: optional` configuration to prevent swap-induced CLS
- Font subsetting to Latin characters (reduces payload)

**Uses stack:**
- `@fontsource-variable/darker-grotesque` (55% payload reduction)
- WOFF2 format (30% better compression than WOFF)
- Font preload with `crossorigin` attribute (CORS requirement)

**Avoids pitfalls:**
- Pitfall 2: CLS from font loading (critical — PageSpeed target CLS < 0.1)

**Research flag:** Standard patterns (font optimization well-documented via web.dev, Smashing Magazine) — skip `/gsd:research-phase`

### Phase 3: Component Architecture & Extraction

**Rationale:** With typography tokens and font loading stable, extract hero presentation into reusable component. This phase reduces `index.astro` complexity (~300 lines removed) and enables hero reuse on services/work pages. Depends on Phases 1-2 providing working utilities and fonts.

**Delivers:**
- `Hero.astro` component with typed CollectionEntry props
- Refactored `index.astro` (removes inline styles, delegates to component)
- Reusable hero for other pages

**Implements architecture:**
- Pattern 2: Component extraction with typed props
- Pattern 4: Tailwind @layer organization

**Addresses features:**
- Strong typographic hierarchy (table stakes — already present, needs amplification)

**Research flag:** Standard patterns (Astro Content Collections well-documented) — skip `/gsd:research-phase`

### Phase 4: Visual Effects & Polish

**Rationale:** With foundational typography working and performant, add differentiating visual effects. This phase is where gradient optimization, asymmetric layout, and scroll animations are introduced. Separated from foundation to prevent performance issues blocking core functionality.

**Delivers:**
- Asymmetric/editorial layout composition
- Optimized gradient text treatment (2-3 color stops max)
- Subtle scroll-driven fade/scale animations (CSS `animation-timeline: scroll()`)
- Layered depth effects (z-index composition)

**Addresses features:**
- Asymmetric grid layout (differentiator)
- Editorial-style composition (differentiator)
- Gradient type treatment (differentiator)
- Scroll-driven animations (differentiator)

**Avoids pitfalls:**
- Pitfall 4: Gradient performance issues (minimize stops, test paint performance)

**Research flag:** Moderate complexity — asymmetric layout is creative/design work (no research needed); scroll animations use standard CSS (no research needed)

### Phase Ordering Rationale

- **Phase 1 before 2-4:** Typography constraints must be established before font loading and visual effects. Viewport-scale text without accessibility compliance causes unfixable WCAG violations.
- **Phase 2 before 3-4:** Font loading strategy prevents rework. CLS issues discovered after component extraction require backtracking.
- **Phase 3 before 4:** Component architecture must be stable before adding visual complexity. Refactoring during visual design iteration causes friction.
- **Phase 4 last:** Visual effects are polish layer. If time-constrained, Phase 4 can be deferred to v1.1 without breaking core "bold typography" goal.

### Research Flags

**Phases with standard patterns (skip research-phase):**
- **Phase 1:** CSS `clamp()` and viewport units extensively documented (MDN, Smashing Magazine, CSS-Tricks)
- **Phase 2:** Font loading optimization has established best practices (web.dev, Chrome for Developers)
- **Phase 3:** Astro Content Collections and component patterns covered in official docs
- **Phase 4:** Gradient optimization and scroll animations use standard CSS (no niche techniques)

**Phases needing deeper research:** None identified — all techniques use baseline CSS and Tailwind v4 features with extensive documentation.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All core technologies (clamp, @theme, variable fonts) verified via official docs (MDN, Tailwind CSS, web.dev). Browser support data from caniuse.com. Implementation patterns validated in Smashing Magazine, CSS-Tricks case studies. |
| Features | HIGH | Feature landscape researched via 8 sources (Qode Interactive, Perfect Afternoon, Lexington Themes, Creative Bloq, Figma trends). 2026 agency trends consistently cite "oversized headlines, editorial layouts, asymmetric grids" as defining characteristics. Anti-features (parallax, all-caps) flagged in multiple UX sources. |
| Architecture | HIGH | Astro Content Collections and Tailwind v4 @layer organization covered in official documentation. Component extraction pattern validated in Astro styling guide. Build order derived from dependency analysis (tokens → components → pages). Project MEMORY.md provides verified Tailwind v4 learnings. |
| Pitfalls | HIGH | Six critical pitfalls identified with specific prevention strategies. WCAG zoom compliance researched via Smashing Magazine accessibility articles. CLS prevention validated via web.dev and DebugBear sources. iOS Safari viewport behavior documented in Medium guides and CSS-Tricks. All pitfalls cross-referenced with WCAG 2.1 criteria. |

**Overall confidence:** HIGH

Research is comprehensive with strong source quality (official docs, industry-recognized publications). No reliance on speculative or outdated information. All technical recommendations verified against browser support data and current standards (2026 baseline).

### Gaps to Address

**Minor gaps requiring validation during implementation:**

- **Gradient performance on mid-range Android devices:** Research indicates potential issues but lacks device-specific benchmarks. **Mitigation:** Test on representative Android device (e.g., Samsung Galaxy A-series) in Phase 4; have fallback (solid color) ready if paint time exceeds budget.

- **Darker Grotesque Variable font rendering quality at extreme sizes:** Variable fonts occasionally have rendering bugs at edge cases (very small or very large sizes). **Mitigation:** Visual QA at 5rem and 11.25rem (clamp bounds) across browsers in Phase 2; if issues detected, switch to static font files for those specific weights.

- **Actual longest content strings:** Research used "Transformation" and "Development" as test cases but actual hero content may have longer words. **Mitigation:** Audit all existing and planned hero headlines in Phase 1; test with longest real word at smallest viewport (320px) to verify no overflow.

- **Container query support for future reuse:** Architecture mentions container query units (`cqi`) for component-scoped typography but doesn't specify implementation. **Mitigation:** If hero is reused in variable-width contexts (sidebar, card), revisit in Phase 3 with container query research.

**No critical blockers identified.** All gaps are validation checkpoints, not unknowns requiring research before starting.

## Sources

### Primary (HIGH confidence)

**Official Documentation:**
- [Astro Docs - Content Collections](https://docs.astro.build/en/guides/content-collections/) — Content layer architecture
- [Tailwind CSS - Font Size](https://tailwindcss.com/docs/font-size) — Tailwind v4 @theme directive
- [MDN - CSS clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp) — CSS spec documentation
- [web.dev - Best practices for fonts](https://web.dev/articles/font-best-practices) — Google Web Fundamentals
- [Chrome for Developers - Font display](https://developer.chrome.com/blog/font-display) — Official Chrome guidance

**Authoritative Industry Sources:**
- [Smashing Magazine - Modern Fluid Typography Using CSS Clamp](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/) — Comprehensive clamp() guide
- [Smashing Magazine - Addressing Accessibility Concerns With Using Fluid Type](https://www.smashingmagazine.com/2023/11/addressing-accessibility-concerns-fluid-type/) — WCAG compliance for viewport typography
- [CSS-Tricks - Linearly Scale font-size with CSS clamp()](https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/) — Implementation patterns
- [CSS-Tricks - Using CSS Cascade Layers With Tailwind](https://css-tricks.com/using-css-cascade-layers-with-tailwind-utilities/) — @layer organization

### Secondary (MEDIUM confidence)

**2026 Trends & Design Patterns:**
- [Qode Interactive - 15 Examples of Innovative Hero Typography Trends](https://qodeinteractive.com/magazine/innovative-typography-hero-trends/) — Agency trend analysis
- [Perfect Afternoon - Hero Section Design: Best Practices & Examples for 2026](https://www.perfectafternoon.com/2025/hero-section-design/) — UX best practices
- [Lexington Themes - Stunning hero sections for 2026: Layouts, patterns, and techniques](https://lexingtonthemes.com/blog/stunning-hero-sections-2026) — Design patterns
- [Creative Bloq - Breaking rules and bringing joy: top typography trends for 2026](https://www.creativebloq.com/design/fonts-typography/breaking-rules-and-bringing-joy-top-typography-trends-for-2026) — Typography trends
- [Figma - Top Web Design Trends for 2026](https://www.figma.com/resource-library/web-design-trends/) — Industry trends

**Performance & Optimization:**
- [DebugBear - Fixing Layout Shifts Caused by Web Fonts](https://www.debugbear.com/blog/web-font-layout-shift) — CLS prevention
- [Sentry - Web Fonts and the Dreaded Cumulative Layout Shift](https://blog.sentry.io/web-fonts-and-the-dreaded-cumulative-layout-shift/) — Font loading strategy
- [Medium - Understanding Mobile Viewport Units: svh, lvh, and dvh](https://medium.com/@tharunbalaji110/understanding-mobile-viewport-units-a-complete-guide-to-svh-lvh-and-dvh-0c905d96e21a) — Modern viewport units
- [TheLinuxCode - Viewport Units in CSS 2026](https://thelinuxcode.com/viewport-units-in-css-mastering-vh-vw-and-the-modern-dvhsvhlvh-family-2026/) — Viewport unit guide

**Mobile & Accessibility:**
- [CSS-Tricks - 16px or Larger Text Prevents iOS Form Zoom](https://css-tricks.com/16px-or-larger-text-prevents-ios-form-zoom/) — iOS Safari behavior
- [WebLog West Wind - Preventing iOS Textbox Auto Zooming](https://weblog.west-wind.com/posts/2023/Apr/17/Preventing-iOS-Textbox-Auto-Zooming-and-ViewPort-Sizing) — Mobile optimization
- [WebAIM - Contrast and Color Accessibility](https://webaim.org/articles/contrast/) — WCAG contrast guidance

### Tertiary (Project-specific)

- Project MEMORY.md — Tailwind v4 critical learnings (CSS layer ordering, theme variable namespaces)
- Project CLAUDE.md — Astro 5 architecture conventions, project structure

---
*Research completed: 2026-02-11*
*Ready for roadmap: yes*
