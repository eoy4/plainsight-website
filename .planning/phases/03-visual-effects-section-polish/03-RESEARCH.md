# Phase 3: Visual Effects & Section Polish - Research

**Researched:** 2026-02-11
**Domain:** CSS visual effects, scroll animations, typography hierarchy
**Confidence:** HIGH

## Summary

Phase 3 focuses on three areas: preserving gradient text performance, adding scroll-driven animations, and creating typography cohesion across sections. The research reveals that modern CSS provides native solutions for all requirements, with excellent browser support and performance characteristics.

**Key findings:**
- Gradient text with `background-clip: text` is well-supported; performance optimized by animating `background-position` instead of gradient stops
- CSS Scroll-Driven Animations API (Chrome 115+, Safari 26 beta) provides native scroll-timeline support; Intersection Observer provides robust fallback
- Typography hierarchy cohesion achieved through consistent scale ratios, shared font families, and semantic sizing tokens
- GPU-accelerated properties (`transform`, `opacity`) are essential for performant animations
- `prefers-reduced-motion` compliance is mandatory for accessibility

**Primary recommendation:** Use CSS native scroll-driven animations with Intersection Observer fallback. Animate only `transform` and `opacity`. Wrap all animations in `@media (prefers-reduced-motion: no-preference)`. Apply `contain: layout paint` to isolated sections for rendering optimization.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| CSS Scroll-Driven Animations | Baseline 2026 | Native scroll-timeline, view-timeline | Chrome 115+, Safari 26 beta; compositor-thread performance, no JS overhead |
| Intersection Observer API | Baseline | Fallback for scroll animations | 97%+ browser support; async, performant alternative to scroll listeners |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `scroll-timeline` polyfill | 1.0.6 | Polyfill for older browsers | Only if Firefox support required before native implementation |
| CSS Containment | Baseline 2023 | Rendering optimization | For isolated sections with heavy gradients/animations |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS Scroll-Driven Animations | GSAP ScrollTrigger | GSAP adds 43kb (minified), offers more advanced timeline controls; unnecessary for subtle effects |
| Intersection Observer | Scroll event listeners | Scroll listeners block main thread, cause jank; only justified if IE11 support required |
| Native CSS | Framer Motion | Framer Motion adds React dependency + 53kb; overkill for static Astro site |

**Installation:**
No installation required — CSS Scroll-Driven Animations and Intersection Observer are browser-native APIs. Optional polyfill:
```bash
npm install scroll-timeline
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── styles/
│   ├── tailwind.css        # Theme tokens, keyframes
│   └── custom.css           # Color definitions
└── pages/
    └── index.astro          # Component-scoped animation styles
```

### Pattern 1: Gradient Text Optimization
**What:** Use `background-clip: text` with gradient, animate `background-position` instead of gradient stops
**When to use:** Hero headlines, section titles with gradient treatment
**Example:**
```css
/* Source: https://web.dev/articles/speedy-css-tip-animated-gradient-text */
.hero-title {
  background: linear-gradient(
    to bottom right,
    var(--hero-title-gradient-start) 30%,
    var(--hero-title-gradient-end) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  /* Performance: Only if animating gradient */
  background-size: 200% 200%;
}

@media (prefers-reduced-motion: no-preference) {
  .hero-title {
    animation: move-bg 8s linear infinite;
  }
}

@keyframes move-bg {
  to { background-position: 200% center; }
}
```

### Pattern 2: CSS Scroll-Driven Animations
**What:** Native CSS scroll-timeline for scroll-linked effects
**When to use:** Fade-in, slide-in, or opacity changes triggered by scroll position
**Example:**
```css
/* Source: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations */
.fade-in-section {
  animation: fade-in-up linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Accessibility: disable for users with motion sensitivity */
@media (prefers-reduced-motion: reduce) {
  .fade-in-section {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

### Pattern 3: Intersection Observer Fallback
**What:** JavaScript fallback for browsers without scroll-timeline support
**When to use:** When Firefox support is critical, or as progressive enhancement
**Example:**
```javascript
/* Source: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -10% 0px'
});

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

### Pattern 4: GPU-Accelerated Animations
**What:** Limit animations to `transform` and `opacity` for compositor-thread rendering
**When to use:** All animations; avoid animating layout properties
**Example:**
```css
/* Source: https://developer.chrome.com/blog/hardware-accelerated-animations */

/* ✅ GOOD: GPU-accelerated properties */
.card {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}
.card:hover {
  transform: translateY(-4px) scale(1.02);
  opacity: 0.95;
}

/* ❌ BAD: Forces layout recalculation on main thread */
.card-bad {
  transition: top 0.3s, width 0.3s, margin 0.3s;
}
.card-bad:hover {
  top: -4px;
  width: 102%;
  margin: 0 -1%;
}
```

### Pattern 5: CSS Containment for Isolated Sections
**What:** Use `contain: layout paint` to isolate rendering scope
**When to use:** Sections with heavy gradients, animations, or complex children
**Example:**
```css
/* Source: https://developer.chrome.com/blog/css-containment */
.section-hero {
  contain: layout paint;
  /* Tells browser: changes inside this element don't affect outside layout/paint */
}

.section-with-heavy-effects {
  contain: layout paint;
  will-change: transform; /* Only if actively animating */
}

/* Remove will-change after animation completes to free GPU memory */
.section-with-heavy-effects:not(.is-animating) {
  will-change: auto;
}
```

### Pattern 6: Fluid Typography with Clamp
**What:** Responsive font sizes without media queries using `clamp()`
**When to use:** Section headings, body text that scales with viewport
**Example:**
```css
/* Source: https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/ */

/* Format: clamp(MIN, PREFERRED, MAX) */
.section-title {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  /* 1.75rem at small screens, scales with 3vw, caps at 2.5rem */
}

/* Accessibility: combine vw with rem to respect zoom */
.section-prose {
  font-size: clamp(1.125rem, 1.5vw + 0.5rem, 1.3125rem);
  /* vw scales with viewport, rem scales with user zoom setting */
}
```

### Pattern 7: Typography Scale Cohesion
**What:** Use consistent modular scale ratio across all text sizes
**When to use:** Defining type system for design system or multi-section site
**Example:**
```css
/* Source: https://www.designsystems.com/typography-guides/ */

/* Modular scale with 1.25 ratio (Major Third) */
:root {
  --text-base: 1rem;           /* 16px */
  --text-scale-1: 1.25rem;     /* 20px = 16 × 1.25 */
  --text-scale-2: 1.5625rem;   /* 25px = 20 × 1.25 */
  --text-scale-3: 1.953rem;    /* 31px = 25 × 1.25 */
  --text-scale-4: 2.441rem;    /* 39px = 31 × 1.25 */
  --text-scale-5: 3.052rem;    /* 49px = 39 × 1.25 */
}

/* Apply semantic names */
.body { font-size: var(--text-base); }
.subtitle { font-size: var(--text-scale-1); }
.section-title { font-size: var(--text-scale-3); }
.hero-title { font-size: var(--text-scale-5); }
```

### Anti-Patterns to Avoid
- **Animating gradient stops:** Causes expensive recalculations; animate `background-position` instead
- **Scroll event listeners without debounce:** Blocks main thread, causes jank; use Intersection Observer or CSS scroll-timeline
- **Missing `prefers-reduced-motion` queries:** Fails WCAG 2.3.3; always wrap animations in media query
- **Using `will-change` permanently:** Wastes GPU memory; only apply during active animation
- **Animating layout properties:** Avoid `width`, `height`, `top`, `left`, `margin`; use `transform` equivalents
- **Inconsistent type scales:** Creates visual chaos; use modular scale ratio (1.2, 1.25, 1.5, or 1.618)

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-triggered animations | Custom scroll position calculations + RAF loop | CSS `animation-timeline: view()` or Intersection Observer | Native APIs are compositor-optimized, async, and battle-tested for edge cases (momentum scrolling, resize, orientation change) |
| Gradient animation | JavaScript gradient manipulation | CSS `background-position` animation | JS gradient updates force style recalculation every frame; CSS leverages GPU |
| Responsive typography | Manual media query breakpoints for every size | CSS `clamp()` with vw + rem | Clamp provides continuous scaling, respects user zoom, eliminates breakpoint maintenance |
| Animation performance monitoring | Custom FPS counters or profilers | Browser DevTools Performance panel + Rendering tab | DevTools shows compositor layers, paint flashing, layout shifts; custom solutions miss browser internals |
| Modular scale calculations | Manual ratio math for each font size | CSS custom properties with calc() or design tokens | One ratio change updates entire system; manual math creates inconsistencies |

**Key insight:** Modern CSS (scroll-timeline, clamp, containment) and browser APIs (Intersection Observer) solve 95% of scroll animation and typography problems. Custom JavaScript solutions introduce main-thread work, bundle size, and accessibility risks. Only reach for libraries (GSAP, Framer Motion) when requirements exceed native capabilities (complex timelines, physics-based motion).

## Common Pitfalls

### Pitfall 1: Gradient Text Breaks on Firefox (Older Versions)
**What goes wrong:** `-webkit-background-clip: text` historically had Firefox quirks; text becomes invisible without fallback
**Why it happens:** Firefox only supported background-clip: text starting in Firefox 49 (2016), but older mobile browsers may still exist
**How to avoid:** Always provide fallback color before gradient
**Warning signs:** Text disappears in browser testing, especially on mobile
```css
/* ✅ SAFE: Fallback color before gradient */
.hero-title {
  color: var(--color-text); /* Fallback for unsupported browsers */
  background: linear-gradient(to right, var(--start), var(--end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Feature detection */
@supports not (background-clip: text) {
  .hero-title {
    /* Remove transparent fill, show fallback color */
    -webkit-text-fill-color: unset;
  }
}
```

### Pitfall 2: Scroll Animations Trigger Before Content is Visible
**What goes wrong:** Animation completes before user scrolls element into view; feels broken
**Why it happens:** Default `animation-range` starts too early, or Intersection Observer threshold is 0
**How to avoid:** Set `animation-range: entry 0% cover 30%` for scroll-timeline, or `threshold: 0.1` + `rootMargin` for Intersection Observer
**Warning signs:** Animations play when element is still below fold, or play instantly on page load
```css
/* ✅ GOOD: Animation starts when 0% enters viewport, completes at 30% coverage */
.fade-in {
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}

/* Intersection Observer equivalent */
const observer = new IntersectionObserver(callback, {
  threshold: 0.1,        // Trigger when 10% visible
  rootMargin: '0px 0px -10% 0px' // Delay trigger until element is 10% into viewport
});
```

### Pitfall 3: Animations Cause Accessibility Violations
**What goes wrong:** Users with vestibular disorders experience discomfort or nausea; site fails WCAG 2.3.3
**Why it happens:** Animations play regardless of user's `prefers-reduced-motion` setting
**How to avoid:** Wrap ALL animations (CSS and JS) in `@media (prefers-reduced-motion: no-preference)` or respect `matchMedia()` result
**Warning signs:** Automated accessibility scans flag missing motion preferences, user complaints about motion sickness
```css
/* ✅ MANDATORY PATTERN */
/* Default: no animation */
.section {
  opacity: 1;
  transform: none;
}

/* Only animate if user hasn't disabled motion */
@media (prefers-reduced-motion: no-preference) {
  .section {
    animation: fade-in 0.6s ease-out;
  }
}
```

```javascript
// JavaScript equivalent
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  element.animate([
    { opacity: 0, transform: 'translateY(24px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 600, easing: 'ease-out' });
}
```

### Pitfall 4: will-change Applied Globally
**What goes wrong:** GPU memory exhaustion, slower performance than no optimization
**Why it happens:** Developer applies `will-change: transform` to every animated element permanently
**How to avoid:** Only add `will-change` immediately before animation starts, remove after animation ends; limit to 3-5 elements simultaneously
**Warning signs:** Mobile devices slow down, browser DevTools shows excessive compositor layers
```css
/* ❌ BAD: Permanent will-change on all cards */
.card {
  will-change: transform;
  transition: transform 0.3s;
}

/* ✅ GOOD: Add will-change only during interaction */
.card {
  transition: transform 0.3s;
}
.card:hover,
.card:focus {
  will-change: transform;
  transform: translateY(-4px);
}
.card:not(:hover):not(:focus) {
  will-change: auto;
}
```

```javascript
// For scripted animations
element.style.willChange = 'transform';
element.animate(/* ... */);
element.addEventListener('animationend', () => {
  element.style.willChange = 'auto';
}, { once: true });
```

### Pitfall 5: Typography Sizes Don't Respect User Zoom
**What goes wrong:** Users zoom in, but font sizes don't increase proportionally; fails WCAG 1.4.4
**Why it happens:** Font sizes defined in `px` or pure `vw` units
**How to avoid:** Always use `rem` or combine `vw` with `rem` in `clamp()` for fluid typography
**Warning signs:** Text stays same size when user zooms, accessibility audit flags text resize issue
```css
/* ❌ BAD: Pure vw ignores user zoom */
.title {
  font-size: 5vw; /* Won't scale when user zooms */
}

/* ✅ GOOD: Combine vw with rem */
.title {
  font-size: clamp(2rem, 5vw, 4rem);
  /* OR: Mix vw + rem in preferred value */
  font-size: clamp(2rem, 2vw + 1rem, 4rem);
}

/* rem scales with user's browser zoom setting */
```

### Pitfall 6: Inconsistent Type Hierarchy Across Sections
**What goes wrong:** Hero uses 6rem headline, next section uses 2.5rem title; feels disjointed
**Why it happens:** No modular scale system; sizes chosen arbitrarily per section
**How to avoid:** Define modular scale with consistent ratio (1.25, 1.5, 1.618); apply semantic tokens
**Warning signs:** Designers complain sections "don't feel cohesive," type sizes seem random
```css
/* ❌ BAD: Random sizes */
.hero-title { font-size: 6rem; }
.section-title { font-size: 2.5rem; }
.card-title { font-size: 1.8rem; }
/* No relationship between sizes */

/* ✅ GOOD: Modular scale (1.25 ratio) */
:root {
  --text-scale-base: 1rem;
  --text-scale-1: calc(var(--text-scale-base) * 1.25);
  --text-scale-2: calc(var(--text-scale-1) * 1.25);
  --text-scale-3: calc(var(--text-scale-2) * 1.25);
  --text-scale-4: calc(var(--text-scale-3) * 1.25);
  --text-scale-5: calc(var(--text-scale-4) * 1.25);
}

.hero-title { font-size: var(--text-scale-5); }
.section-title { font-size: var(--text-scale-3); }
.card-title { font-size: var(--text-scale-2); }
/* Clear visual hierarchy */
```

## Code Examples

Verified patterns from official sources:

### Gradient Text with Animation (Performance-Optimized)
```css
/* Source: https://web.dev/articles/speedy-css-tip-animated-gradient-text */
.gradient-text {
  --bg-size: 400%;
  background: linear-gradient(
    90deg,
    var(--color-1),
    var(--color-2),
    var(--color-3),
    var(--color-1)
  ) 0 0 / var(--bg-size) 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (prefers-reduced-motion: no-preference) {
  .gradient-text {
    animation: move-bg 8s linear infinite;
  }
}

@keyframes move-bg {
  to {
    background-position: var(--bg-size) 0;
  }
}
```

### Scroll-Driven Fade-In (CSS Native)
```css
/* Source: https://scroll-driven-animations.style/ */
.animate-in {
  animation: fade-in-up linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-in {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

### Intersection Observer Setup (Fallback)
```javascript
/* Source: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API */
// Check for scroll-timeline support
const supportsScrollTimeline = CSS.supports('animation-timeline', 'view()');

if (!supportsScrollTimeline) {
  // Fallback to Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // One-time animation
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
  });

  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
}
```

### Containment for Heavy Sections
```css
/* Source: https://developer.chrome.com/blog/css-containment */
.hero,
.section-with-effects {
  contain: layout paint;
  /* Isolate rendering: changes inside won't trigger reflows outside */
}

/* content-visibility for off-screen sections (advanced) */
.lazy-section {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px; /* Reserve height to prevent layout shift */
}
```

### Fluid Typography System
```css
/* Source: https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/ */
:root {
  /* Base scale */
  --text-base: clamp(1rem, 0.5vw + 0.875rem, 1.125rem);

  /* Modular scale with 1.25 ratio */
  --text-sm: clamp(0.875rem, 0.4vw + 0.75rem, 1rem);
  --text-md: clamp(1.125rem, 0.6vw + 0.95rem, 1.375rem);
  --text-lg: clamp(1.375rem, 1vw + 1rem, 1.75rem);
  --text-xl: clamp(1.75rem, 1.5vw + 1.2rem, 2.25rem);
  --text-2xl: clamp(2.25rem, 2vw + 1.5rem, 3rem);
  --text-3xl: clamp(3rem, 3vw + 2rem, 4rem);
  --text-hero: clamp(3rem, 10vw, 8rem);
}

/* Apply semantically */
body { font-size: var(--text-base); }
.section-title { font-size: var(--text-xl); }
.hero-title { font-size: var(--text-hero); }
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Scroll event listeners + RAF | CSS `animation-timeline: scroll()` / `view()` | Chrome 115 (Aug 2023), Safari 26 beta | Offloads scroll calculations to compositor thread; eliminates JS overhead and jank |
| JavaScript gradient manipulation | CSS `background-position` animation | Always available | GPU-accelerated vs. CPU-bound; massive performance gain |
| Media query breakpoints for typography | CSS `clamp()` with vw + rem | IE11 end-of-life (2022) | Continuous scaling, fewer breakpoints, respects user zoom |
| Manual Intersection Observer setups | CSS scroll-timeline (preferred), IO fallback | CSS spec finalized 2024 | Native CSS replaces JS boilerplate for 90% of use cases |
| `will-change` as permanent optimization | Dynamic `will-change` (add before animation, remove after) | Best practice since 2016 | Prevents GPU memory exhaustion on mobile |

**Deprecated/outdated:**
- **Scroll event listeners for animations:** Replaced by CSS scroll-timeline and Intersection Observer. Only justified for complex interactive logic (e.g., scroll progress bars with dynamic content).
- **JavaScript libraries for simple scroll effects:** AOS.js, ScrollReveal.js no longer necessary; CSS scroll-timeline + IO cover 95% of use cases with better performance.
- **Pure `vw` units for typography:** Fails WCAG 1.4.4 (text resize); always combine with `rem` or use `rem` alone.
- **`position: sticky` polyfills:** Baseline since 2020; no polyfill needed.

## Open Questions

1. **Browser support threshold for CSS scroll-timeline**
   - What we know: Chrome 115+ (Aug 2023), Safari 26 beta (2026), Firefox in development
   - What's unclear: Whether Firefox support timeline is acceptable for Phase 3 delivery
   - Recommendation: Implement CSS scroll-timeline as primary, Intersection Observer as fallback. Test in Firefox; if fallback works well, ship both. Re-evaluate Firefox adoption in 6 months.

2. **Performance impact of containment on hero section**
   - What we know: `contain: layout paint` isolates rendering scope, reduces reflows
   - What's unclear: Whether hero section (with existing gradient glow, grid pattern) would see measurable improvement
   - Recommendation: Implement containment, measure before/after with Chrome DevTools Performance panel. Look for reduced "Recalculate Style" and "Layout" times. If < 5% improvement, remove complexity.

3. **Modular scale ratio for existing design**
   - What we know: Current sizes use fluid `clamp()` with vw; no consistent ratio across sections
   - What's unclear: Whether retrofitting modular scale improves cohesion or creates breaking visual changes
   - Recommendation: Audit existing sizes to identify implicit ratio (if any). Propose modular scale (1.25 recommended) as refinement, not replacement. Test with designer before committing.

## Sources

### Primary (HIGH confidence)
- [MDN: CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) - Spec, syntax, browser support
- [Chrome: Scroll-driven animations guide](https://developer.chrome.com/docs/css-ui/scroll-driven-animations) - Implementation patterns, performance
- [web.dev: Animated gradient text](https://web.dev/articles/speedy-css-tip-animated-gradient-text) - Performance optimization techniques
- [scroll-driven-animations.style](https://scroll-driven-animations.style/) - Demos, polyfill, tools
- [MDN: Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) - Fallback implementation
- [Chrome: CSS containment](https://developer.chrome.com/blog/css-containment) - Rendering optimization
- [Smashing Magazine: Fluid typography with clamp](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/) - Responsive typography
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) - Accessibility compliance

### Secondary (MEDIUM confidence)
- [Design Systems Typography Guide](https://www.designsystems.com/typography-guides/) - Modular scale patterns
- [Chrome: Hardware-accelerated animations](https://developer.chrome.com/blog/hardware-accelerated-animations) - GPU compositing
- [LogRocket: CSS contain property](https://blog.logrocket.com/using-css-contain-property-deep-dive/) - Containment use cases
- [TestMu AI: CSS GPU acceleration](https://www.testmuai.com/blog/css-gpu-acceleration/) - Performance optimization
- [Speed Kit: CSS containment field testing](https://www.speedkit.com/blog/field-testing-css-containment-for-web-performance-optimization) - Real-world performance data

### Tertiary (LOW confidence)
- [Elementor: CSS Gradients 2026 Guide](https://elementor.com/blog/css-gradients/) - General gradient info (marketing-focused, less technical)
- [WebPeak: CSS/JS Animation Trends 2026](https://webpeak.org/blog/css-js-animation-trends/) - Industry trends (opinion-based)

## Metadata

**Confidence breakdown:**
- Standard stack: **HIGH** - MDN docs, Chrome official guidance, established browser APIs
- Architecture: **HIGH** - Patterns verified from official sources (MDN, web.dev, Chrome), used in production sites
- Pitfalls: **MEDIUM-HIGH** - Common issues documented in developer communities, some from official sources

**Research date:** 2026-02-11
**Valid until:** 2026-04-11 (60 days - CSS features stable, but browser support for scroll-timeline evolving)
