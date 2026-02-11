# Stack Research: Bold Agency Typography

**Domain:** Viewport-filling display typography for agency hero sections
**Researched:** 2026-02-11
**Confidence:** HIGH

## Recommended Stack

### Core CSS Techniques

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| CSS `clamp()` | Baseline (2020+) | Fluid responsive typography with min/max bounds | **HIGH confidence** - Universally supported since July 2020 across all major browsers. Eliminates media queries, provides smooth scaling, and ensures accessibility by respecting user zoom. Mathematically equivalent to `max(MIN, min(VAL, MAX))`. |
| Viewport units (`vw`, `dvw`) | CSS3 / New variants (2023+) | Viewport-relative scaling | **HIGH confidence** - Use `vw` in `clamp()` for preferred value. Modern `dvh/dvw` units (dynamic viewport) recommended for mobile to account for browser UI. `svh/svw` (small viewport) safer for hero sections to prevent toolbar cutoff. |
| `rem` units | CSS3 | Minimum/maximum bounds in `clamp()` | **HIGH confidence** - Use `rem` for min/max values, NOT `px`. Respects user font-size preferences per WCAG 1.4.4. Critical for accessibility - `px` values won't scale when users adjust font settings. |
| CSS Custom Properties | CSS Variables (2016+) | Theme token definition in Tailwind v4 | **HIGH confidence** - Tailwind v4 uses `--text-*` namespace for font sizes. Define with `@theme` directive. Can include optional associated properties: `--text-{name}--line-height`, `--text-{name}--letter-spacing`, `--text-{name}--font-weight`. |

### Typography-Specific CSS Properties

| Property | Version | Purpose | Why Recommended |
|----------|---------|---------|-----------------|
| `text-wrap: balance` | Baseline (2023+) | Balanced line lengths for headlines | **MEDIUM confidence** - Use ONLY for headlines/hero text (6 lines or less in Chrome, 10 in Firefox). Computationally expensive. Prevents awkward short last lines. Chromium limits to 4 lines for performance. |
| `text-wrap: pretty` | Safari TP / Chrome stable | Improved paragraph wrapping | **LOW confidence** - For body text only, not hero headlines. Just shipped in Safari Technology Preview (Feb 2026). Chrome stable support. Eliminates orphans and adjusts hyphenation. Slower algorithm, not suitable for performance-critical hero text. |
| `font-display: swap` | CSS Font Loading (2016+) | Font loading strategy | **HIGH confidence** - Shows text immediately in fallback, swaps when font loads. Zero block period, infinite swap period. Preferred over `optional` when web font is brand-critical. Risk: CLS if font arrives late. Mitigation: preload font early. |
| `font-display: optional` | CSS Font Loading (2016+) | Performance-first font loading | **HIGH confidence** - 100ms block period, zero swap period. Most performant - no layout shift. Use if performance > brand consistency. Font won't display if it arrives after 100ms. |

### Font Loading Optimization

| Technique | Purpose | Implementation | Why Recommended |
|-----------|---------|----------------|-----------------|
| Variable fonts | Reduce HTTP requests, enable fluid weight scaling | Use `@fontsource-variable/darker-grotesque` | **HIGH confidence** - Darker Grotesque IS a variable font (Weight axis 300-900). Single file replaces 7+ static weights. Real-world case: 376KB → 89KB = 22% LCP improvement. Enables `font-weight: 300` to `900` continuously. |
| WOFF2 format | Superior compression, universal support | WOFF2 only, drop WOFF/TTF | **HIGH confidence** - "Use only WOFF2 and forget about everything else" (Bram Stein, web.dev). 30% better compression than WOFF. Supported in all modern browsers since 2020+. |
| Font subsetting | Reduce file size by removing unused glyphs | Subset to Latin + Vietnamese for Darker Grotesque | **MEDIUM confidence** - Darker Grotesque supports Latin/Vietnamese. If site only uses Latin, subset to Latin only. Can reduce hundreds of KB. Use tools like `glyphanger` or Fontsource subsets. |
| Font preloading | Trigger early download before CSSOM | `<link rel="preload" as="font" type="font/woff2" crossorigin>` | **HIGH confidence** - Triggers request early in critical rendering path. Use for hero font only (not all fonts). MUST include `crossorigin` even for same-origin fonts (CORS requirement). |
| Self-hosting | Eliminate external requests, improve privacy | Host WOFF2 files in `/public/fonts/` | **HIGH confidence** - Eliminates Google Fonts external request. Full GDPR compliance. No FOUT from slow CDN. Vercel edge network serves fonts from same domain. |

### Responsive Typography Strategies

| Strategy | Formula | Use Case | Why Recommended |
|----------|---------|----------|-----------------|
| Fluid hero (8-12vw scale) | `clamp(3rem, 10vw + 1rem, 12rem)` | Main hero headline | **HIGH confidence** - `10vw` = 10% viewport width. `+ 1rem` ensures user zoom respected. `3rem` min prevents mobile illegibility. `12rem` max prevents desktop excess (192px at 16px base). |
| Fluid subhead (4-6vw scale) | `clamp(1.5rem, 4vw + 0.5rem, 3rem)` | Hero subheading | **HIGH confidence** - Maintains proportion to main headline. Smaller scaling factor (4vw vs 10vw) creates hierarchy. |
| Container query units (`cqi`) | `clamp(1.5em, 1.23em + 2cqi, 3em)` | Component-scoped typography | **MEDIUM confidence** - Supported Chrome 105+, Safari 16+, Firefox 110+. `cqi` = 1% of container inline size. Better than `vw` for reusable components (sidebars, cards). Use for future-proofing, NOT for main hero (viewport-based makes more sense). |
| Viewport math optimization | `10vw + 1rem` over `calc(10vw + 1rem)` | Within `clamp()` function | **HIGH confidence** - `clamp()` accepts math expressions directly. No need for `calc()` wrapper. Cleaner syntax. |

### Tailwind v4 Implementation

| Technique | Syntax | Purpose | Why Recommended |
|-----------|--------|---------|-----------------|
| Theme custom properties | `--text-hero: clamp(3rem, 10vw + 1rem, 12rem);` | Define fluid font size tokens | **HIGH confidence** - Tailwind v4 `@theme` directive. Use `--text-*` namespace (NOT `--font-size-*`). Generates `text-hero` utility class. |
| Associated properties | `--text-hero--line-height: 1.1;` | Tight leading for large display | **HIGH confidence** - Auto-applied when using `text-hero`. Large display type needs tighter line-height (1.0-1.2 vs default 1.5). |
| Arbitrary values | `text-[clamp(3rem,10vw+1rem,12rem)]` | One-off sizing without theme | **MEDIUM confidence** - Use sparingly. Prefer theme tokens for maintainability. Useful for prototyping before committing to token. |
| CSS variable reference | `text-(length:--custom-size)` | Use external custom property | **LOW confidence** - Shorthand for `text-[length:var(--custom-size)]`. Useful if size defined in `[data-theme]` context outside `@theme` block. |

## Installation

```bash
# Variable font (recommended)
npm install @fontsource-variable/darker-grotesque

# Static weights fallback (if variable font issues)
npm install @fontsource/darker-grotesque

# Optional: Font subsetting tool (if custom subsetting needed)
npm install -D glyphanger
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| `clamp(3rem, 10vw + 1rem, 12rem)` | Media queries with fixed sizes | Never for modern projects. `clamp()` eliminates breakpoint jumps, reduces CSS, and provides smoother UX. Only use media queries if supporting IE11. |
| `vw` units in `clamp()` | Container query units (`cqi`) | Use `cqi` for reusable components rendered in variable-width containers (cards, sidebars). Hero sections should use `vw` since they're inherently viewport-relative. |
| Variable fonts | Static font files per weight | Only if variable font has rendering bugs in target browsers (rare). Variable fonts are smaller, more flexible, enable `font-weight` animation. |
| `font-display: swap` | `font-display: optional` | Use `optional` if performance metrics (LCP, CLS) are priority over brand consistency. Acceptable for agency site if fallback font is visually close. |
| `rem` for min/max bounds | `px` for min/max bounds | NEVER use `px` - fails WCAG 1.4.4. `rem` respects user font-size settings. Critical for accessibility. |
| `dvw`/`dvh` (dynamic viewport) | `vw`/`vh` (classic viewport) | Use `dvw`/`dvh` for mobile to account for disappearing browser chrome. Use `svw`/`svh` (small viewport) for hero sections to prevent toolbar cutoff (90% of cases). |
| `text-wrap: balance` | Manual `<br>` tags | Use `balance` for automatic line balancing. Manual breaks aren't responsive. ONLY for headlines (≤6 lines). |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Pure `vw` units without `clamp()` | Fails accessibility - doesn't respect user zoom/font-size settings. Text becomes illegible on small screens or too large on wide screens. | `clamp(minRem, Xvw + Yrem, maxRem)` - adding `rem` enables zoom support. |
| `px` values in `clamp()` min/max | Violates WCAG 1.4.4 - won't scale when users adjust font settings. Hard accessibility fail. | Use `rem` for all min/max bounds: `clamp(3rem, 10vw + 1rem, 12rem)` |
| Google Fonts CDN | External request delays LCP. GDPR concerns. No control over cache. Slower than self-hosting on Vercel edge. | Self-host with `@fontsource-variable/darker-grotesque`. Same domain = faster. |
| Multiple static font weights | 7 files (Light, Regular, Medium, SemiBold, Bold, ExtraBold, Black) = 7 HTTP requests. Larger total payload. | Variable font: 1 file, all weights 300-900. Real case: 376KB → 89KB. |
| `text-wrap: pretty` for hero headlines | Computationally expensive. Designed for body text, not large display. Limits to 10 lines in Firefox. Performance cost not justified for 1-2 line hero. | `text-wrap: balance` for headlines ≤6 lines. |
| `font-display: block` | Invisible text during font load (FOIT). Delays FCP. Poor UX. Only acceptable if font arrives <100ms. | `font-display: swap` (show fallback immediately) or `font-display: optional` (use fallback if font late). |
| Container queries for main hero | Hero is viewport-relative by nature. Container queries add complexity without benefit for full-width hero sections. | Use `vw`/`dvw` units for hero. Reserve container queries for reusable components. |
| Tailwind v3 plugins for fluid type | Tailwind v4 has native `@theme` support for custom properties. Plugins like `tailwindcss-fluid-type` are v3-focused. | Define fluid sizes in `@theme { --text-hero: clamp(...); }` |
| `--font-size-*` namespace | Tailwind v4 uses `--text-*` for font sizes, NOT `--font-size-*`. Wrong namespace = no utility generation. | `--text-hero`, `--text-xl`, etc. Generates `text-hero`, `text-xl` classes. |

## Stack Patterns by Variant

### If targeting widest possible browser support (IE11+):
- Use media queries instead of `clamp()` (no IE11 support)
- Skip `text-wrap: balance` (Chrome 114+, Firefox 121+, Safari 17.5+)
- Use `vw`/`vh` not `dvw`/`dvh` (2023+ only)
- Because: `clamp()` and new viewport units are modern features

### If performance is absolute priority (Core Web Vitals):
- Use `font-display: optional` not `swap` (eliminates CLS risk)
- Preload hero font: `<link rel="preload" as="font">`
- Subset font to Latin only (if no Vietnamese needed)
- Skip `text-wrap: balance` (computation cost)
- Because: Every millisecond affects LCP and CLS scores

### If brand consistency is absolute priority:
- Use `font-display: swap` with aggressive preloading
- Variable font self-hosted (guaranteed availability)
- Accept potential CLS for perfect font rendering
- Because: Brand > performance trade-off

### If building reusable component library:
- Use container query units (`cqi`) in components
- Keep viewport units (`vw`) for page-level heroes
- Define fluid type tokens: `--text-body`, `--text-heading`, etc.
- Because: Components need context-independent scaling

## Version Compatibility

| Package | Version | Compatible With | Notes |
|---------|---------|-----------------|-------|
| `@fontsource-variable/darker-grotesque` | 5.x | Astro 5, Tailwind v4 | Variable font format. Weight axis 300-900. WOFF2 included. Self-hosted fonts work with Astro's static output. |
| Tailwind CSS | v4.x | Astro 5 | Uses `@theme` directive for custom properties. `--text-*` namespace for font sizes. CSS-first configuration (no JS config). |
| Astro | 5.x | Static output mode | Fonts in `/public/fonts/` are served directly. No processing needed. Use `@font-face` in CSS. |
| CSS `clamp()` | Baseline 2020+ | All modern browsers | Chrome 79+, Firefox 75+, Safari 13.1+. No polyfill needed for 2026. |
| `text-wrap: balance` | Baseline 2023+ | Chrome 114+, Firefox 121+, Safari 17.5+ | Progressive enhancement - degrades gracefully in older browsers. |
| `dvh`/`dvw` units | New 2023+ | Chrome 108+, Safari 15.4+, Firefox 110+ | Partial Firefox support. Use with fallback: `height: 100vh; height: 100dvh;` |

## Implementation Checklist

1. **Install variable font**: `npm install @fontsource-variable/darker-grotesque`
2. **Import in CSS**: `@import "@fontsource-variable/darker-grotesque/index.css";`
3. **Define Tailwind tokens**:
   ```css
   @theme {
     --font-display: "Darker Grotesque Variable", sans-serif;
     --text-hero: clamp(3rem, 10vw + 1rem, 12rem);
     --text-hero--line-height: 1.1;
     --text-hero--letter-spacing: -0.02em;
   }
   ```
4. **Use in markup**: `<h1 class="font-display text-hero">Dominating Headline</h1>`
5. **Add text-wrap for balance**: `<h1 class="font-display text-hero text-balance">`
6. **Preload font** (optional, for LCP):
   ```html
   <link rel="preload" as="font" type="font/woff2"
         href="/fonts/darker-grotesque-variable.woff2" crossorigin>
   ```

## Performance Expectations

| Metric | Before (4.5rem static) | After (10vw fluid variable) | Delta |
|--------|------------------------|----------------------------|-------|
| Font payload | ~200KB (3 weights) | ~89KB (variable) | -55% |
| HTTP requests | 3 (Light, Bold, ExtraBold) | 1 (variable) | -67% |
| LCP improvement | Baseline | +15-22% (from font optimization) | Based on case studies |
| CLS risk | Low (system fallback) | Medium (`swap`) / Low (`optional`) | Trade-off |
| Viewport scaling | Fixed at all sizes | Smooth 320px-3840px | Better UX |

## Sources

**HIGH Confidence:**
- [CSS clamp() - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp) - Official spec documentation
- [Best practices for fonts - web.dev](https://web.dev/articles/font-best-practices) - Google Web Fundamentals guidance
- [Font display - Chrome for Developers](https://developer.chrome.com/blog/font-display) - Official Chrome guidance
- [Darker Grotesque - Fontsource](https://fontsource.org/fonts/darker-grotesque) - Variable font availability confirmed
- [Container queries - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) - Official CSS spec
- [Tailwind CSS Font Size](https://tailwindcss.com/docs/font-size) - Official Tailwind v4 documentation

**MEDIUM Confidence:**
- [Modern Fluid Typography Using CSS Clamp - Smashing Magazine](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/) - WebSearch, authoritative source
- [8 Web Font Optimization Strategies - NitroPack](https://nitropack.io/blog/post/font-loading-optimization) - WebSearch, practical guide
- [Container Query Units and Fluid Typography - Modern CSS](https://moderncss.dev/container-query-units-and-fluid-typography/) - WebSearch, technical deep-dive
- [When to use CSS text-wrap - LogRocket](https://blog.logrocket.com/css-text-wrap-balance-vs-text-wrap-pretty/) - WebSearch, comparison guide
- [Understanding Mobile Viewport Units - Medium](https://medium.com/@tharunbalaji110/understanding-mobile-viewport-units-a-complete-guide-to-svh-lvh-and-dvh-0c905d96e21a) - WebSearch, practical guide

**LOW Confidence (Training Data):**
- Fluid typography calculator formulas - Based on training, not verified for 2026
- Specific Tailwind v4 `@theme` directive nuances - Confirmed via Tailwind docs but implementation details may vary

---
*Stack research for: Bold agency hero typography redesign*
*Researched: 2026-02-11*
*Confidence: HIGH (CSS techniques), HIGH (font loading), MEDIUM (newer features like text-wrap, dvh)*
