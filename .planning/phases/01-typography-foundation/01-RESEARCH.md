# Phase 1: Typography Foundation & Container Architecture - Research

**Researched:** 2026-02-11
**Domain:** Fluid typography, container architecture, mobile viewport units, accessibility
**Confidence:** HIGH

## Summary

Viewport-filling hero typography requires coordinated changes across fluid type scale, container width constraints, mobile viewport units, and accessibility compliance. The current implementation uses `clamp(2.75rem, 5vw + 1rem, 4.5rem)` which caps at 4.5rem (~72px). Achieving ~10vw scale on desktop requires higher maximum bounds while maintaining accessibility through rem-based minimums for user zoom support.

The project already uses Tailwind v4's `@theme` directive with custom properties for typography. The standard approach is to define new fluid type values using `clamp()` with format: `clamp(MIN_rem, PREFERRED_vw + BASE_rem, MAX_rem)` where min/max use rem for zoom accessibility and preferred uses vw for viewport scaling.

Mobile viewport stability requires switching from `vh` to `svh` (small viewport height) units, which assume browser UI is fully expanded, preventing content from being cut off by address bars. The ecosystem consensus for 2026 is to use `svh` for ~90% of layouts rather than `dvh` (dynamic), which causes jarring layout shifts during scroll.

**Primary recommendation:** Use `clamp()` with rem bounds for fluid typography, expand container max-width beyond 900px to allow headline breathing room, implement `svh` for mobile viewport height, and apply `overflow-wrap: break-word` for long word handling.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Headline scale & feel
- Mixed case (sentence case), not uppercase
- Large with breathing room — bold but with comfortable margins, not edge-to-edge
- Allow natural wrapping — headline wraps to 2-3 lines on narrower viewports to keep font size larger
- Font weight: Black / Extra Bold (800-900) for maximum visual commanding presence

#### Hero layout & spacing
- Full viewport height (100vh) — hero section takes the full screen, scroll to see next section
- Left-aligned text — strong editorial feel, content anchored to the left
- Tight grouping between headline, tagline, and CTA — unified block where headline dominates by size contrast
- Vertical positioning: Claude's discretion (see below)

#### Mobile viewport behavior
- Full viewport on mobile — hero fills mobile screen, handle address bar quirks with dvh/svh
- Stay left-aligned on mobile — consistent with desktop
- Headline still dominant on mobile — scaled proportionally, biggest element on screen
- No special landscape treatment — responsive scaling handles it naturally

#### Accessibility & overflow
- At 200% zoom: headline shrinks to fit container (prevent overflow, not maintain scale)
- Long word overflow: break anywhere (force break mid-word without hyphens if needed)
- Tagline and CTA also scale fluidly with viewport (proportionally smaller than headline)

### Claude's Discretion
- Vertical positioning of hero content within viewport (centered vs upper third)
- Minimum headline font size at extreme zoom/narrow viewports
- Exact spacing values between headline, tagline, and CTA within the tight grouping
- Fluid type scale calculations and clamp() breakpoints

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| CSS `clamp()` | Native | Fluid typography with bounds | Baseline widely available since July 2020, eliminates media queries, accessibility-friendly with rem bounds |
| CSS viewport units (`svh`, `dvh`, `lvh`) | Native | Mobile-aware viewport sizing | Baseline widely available since July 2015, solves mobile address bar problem |
| Tailwind v4 `@theme` | 4.x | Design token registration | Already in use, generates utilities from custom properties |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Utopia Fluid Type Calculator | Web tool | Generate clamp() values | Optional - helps calculate precise min/preferred/max for type scales |
| `overflow-wrap: break-word` | Native CSS | Word breaking without hyphens | Required for long word overflow per user constraints |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `svh` | `dvh` | Dynamic viewport causes layout shift during scroll - ecosystem recommends `svh` for ~90% of use cases |
| `overflow-wrap: break-word` | `overflow-wrap: anywhere` | Safari compatibility - `anywhere` not fully supported, `break-word` is safer choice |
| Manual clamp() | Tailwind fluid plugins | Project already uses `@theme` custom properties, no plugin needed |

**Installation:**
```bash
# No installation needed - using native CSS features
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── styles/
│   ├── tailwind.css        # @theme definitions, existing location
│   └── custom.css           # Theme-specific overrides, existing location
├── pages/
│   └── index.astro          # Hero section markup
```

### Pattern 1: Fluid Typography with clamp()
**What:** Define font sizes using `clamp(MIN, PREFERRED, MAX)` where MIN and MAX use rem for accessibility, PREFERRED uses vw for viewport scaling.

**When to use:** Any text that should scale with viewport while maintaining readable minimums and preventing oversized maximums.

**Example:**
```css
/* Source: MDN clamp() documentation + Smashing Magazine fluid typography guide */
@theme {
  /* Current hero headline: clamp(2.75rem, 5vw + 1rem, 4.5rem) */
  /* Target ~10vw on desktop (assuming 1440px viewport = ~144px max) */
  --text-hero-headline: clamp(3rem, 10vw, 9rem);

  /* Tagline scales proportionally smaller */
  --text-hero-tagline: clamp(1.25rem, 2.5vw + 0.5rem, 2rem);

  /* CTA scales subtly */
  --text-hero-cta: clamp(1rem, 1.5vw + 0.5rem, 1.25rem);
}
```

**Rationale:**
- **Min in rem:** Ensures user zoom/font size preferences work (WCAG 1.4.4 compliance)
- **Preferred with vw:** Scales smoothly with viewport width
- **Max in rem:** Prevents absurdly large text on ultra-wide screens
- **Formula:** For viewport scaling, `PREFERRED = X vw + Y rem` where Y acts as base offset

### Pattern 2: Mobile Viewport Units (svh/dvh/lvh)
**What:** Use `svh` (small viewport height) instead of `vh` for full-height sections to account for mobile browser UI.

**When to use:** Hero sections, full-screen panels, or any element meant to fill viewport height.

**Example:**
```css
/* Source: MDN length units documentation + web.dev viewport units guide */

/* OLD approach - doesn't account for mobile address bar */
.hero {
  min-height: 100vh;
}

/* NEW approach - assumes browser UI fully expanded (safest) */
.hero {
  min-height: 100svh; /* small viewport height */
}

/* Alternative if you need dynamic resizing (use sparingly) */
.hero-dynamic {
  min-height: 100dvh; /* dynamic viewport height - can cause layout shift */
}
```

**When to use each:**
- **`svh`** (90% of cases): Ensures content fits even when address bar is visible
- **`dvh`** (rarely): When layout shift during scroll is acceptable and you need exact fit
- **`lvh`** (rare): When you want maximum space and it's okay if content gets cut off

### Pattern 3: Container Width for Hero Typography
**What:** Expand container max-width beyond current 900px to give large headlines breathing room while maintaining comfortable margins.

**When to use:** Hero sections with viewport-filling typography that need space to scale without feeling cramped.

**Example:**
```css
/* Source: Current project patterns + 2026 hero section design trends */

/* Current hero container */
.hero-content {
  max-width: 900px; /* Current - too narrow for 10vw headlines */
}

/* Recommended for viewport-filling headlines */
.hero-content {
  max-width: clamp(900px, 80vw, 1400px); /* Fluid container width */
  /* OR fixed larger size: */
  max-width: 1200px; /* Allows ~144px headline on 1440px viewport at 10vw */
}
```

**Rationale:**
- Current 900px constrains headline to ~90px max if headline fills container
- 10vw on 1440px viewport = 144px, needs wider container
- `clamp()` for container creates responsive width boundaries
- User wants "breathing room" - comfortable margins maintained via padding

### Pattern 4: Accessibility-Compliant Text Overflow
**What:** Use `overflow-wrap: break-word` to force long words to break mid-word without hyphens.

**When to use:** Hero headlines or any text that might contain long URLs, technical terms, or concatenated words.

**Example:**
```css
/* Source: MDN overflow-wrap documentation */

.hero-title {
  overflow-wrap: break-word; /* Breaks long words, better Safari support */
  /* Alternative (not recommended): overflow-wrap: anywhere; - Safari issues */
}

/* Combined with other text handling */
.hero-title {
  overflow-wrap: break-word;
  word-break: normal; /* Don't break at every character */
  hyphens: none; /* No hyphens per user preference */
}
```

**Why `break-word` over `anywhere`:**
- Both have same browser support (since October 2018)
- `break-word` has better Safari compatibility
- Difference is in min-content intrinsic sizing calculation (rarely matters for hero text)

### Pattern 5: Visual Hierarchy Through Size Contrast
**What:** Use modular scale to create clear size relationships where headline dominates and secondary elements are proportionally smaller.

**When to use:** Any layout requiring clear hierarchy - hero sections, landing pages, editorial layouts.

**Example:**
```css
/* Source: Typography scale calculators + visual hierarchy design guides */

/* Using ratio-based scale for proportional sizing */
@theme {
  /* Headline: 9rem max (144px) */
  --text-hero-headline: clamp(3rem, 10vw, 9rem);

  /* Tagline: ~4.5rem max (72px) - 2:1 ratio to headline */
  --text-hero-tagline: clamp(1.5rem, 5vw, 4.5rem);

  /* CTA: ~1.125rem (18px) - subordinate to both */
  --text-hero-cta: clamp(1rem, 1.5vw, 1.125rem);
}
```

**Recommended ratios for hierarchy:**
- **Major Third (1.25):** Subtle, conservative - good for text-heavy content
- **Perfect Fourth (1.414):** Moderate contrast - balanced for most websites
- **Golden Ratio (1.618):** High contrast - dramatic editorial feel

For hero sections, 2:1 or higher ratios create commanding presence.

### Pattern 6: Vertical Positioning Options
**What:** Position hero content block within full-viewport container using flexbox alignment.

**When to use:** Full-height hero sections where vertical position affects visual impact.

**Example:**
```css
/* Source: 2026 hero section design trends + editorial layout patterns */

/* Option 1: Centered (classic) */
.hero {
  min-height: 100svh;
  display: flex;
  align-items: center; /* vertical center */
  justify-content: flex-start; /* horizontal left */
}

/* Option 2: Upper third (editorial, asymmetric) */
.hero {
  min-height: 100svh;
  display: flex;
  align-items: flex-start; /* top alignment */
  padding-top: clamp(8rem, 15vh, 12rem); /* responsive top offset */
}

/* Option 3: Optical center (slightly above mathematical center) */
.hero {
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding-bottom: 8vh; /* shifts content up by offsetting from bottom */
}
```

**2026 trends favor:**
- Asymmetric, editorial positioning over centered
- Upper-third creates bold, statement-making composition
- Optical center (slightly above true center) feels more balanced to human eye

### Anti-Patterns to Avoid
- **Don't use viewport units without rem bounds:** `font-size: 10vw` fails at 200% zoom, use `clamp(MIN_rem, 10vw, MAX_rem)` instead
- **Don't use `vh` on mobile:** Causes content cutoff when address bar expands, use `svh` or `dvh` instead
- **Don't use `dvh` by default:** Causes jarring layout shifts during scroll, use `svh` for 90% of cases
- **Don't use pixel-based min/max in clamp():** Breaks user zoom preferences, always use rem for bounds
- **Don't use `overflow-wrap: anywhere`:** Safari compatibility issues, use `break-word` instead

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Fluid typography calculations | Manual media query breakpoints for each font size | `clamp()` with vw + rem | Eliminates 3-5 media queries per font size, maintains accessibility, supported since 2020 |
| Mobile viewport height detection | JavaScript to measure viewport minus browser UI | `svh` or `dvh` viewport units | Native CSS solution, no JS overhead, handles orientation changes automatically |
| Responsive container widths | Multiple breakpoints with fixed widths | `clamp()` for container `max-width` | Fluid scaling without discrete jumps, fewer breakpoints to maintain |
| Typography scale systems | Manual calculation of each heading size | Modular scale calculator (Utopia, Type Scale Generator) | Mathematically consistent ratios, generates entire scale from base + ratio |
| Zoom overflow detection | JavaScript to detect zoom level and adjust layout | CSS with rem-based clamp() bounds | Native browser zoom support, no detection needed, follows user preferences |

**Key insight:** Modern CSS (`clamp()`, viewport units, `overflow-wrap`) has native solutions for problems that previously required JavaScript or complex media query systems. The ecosystem has matured to provide declarative, accessible solutions that respect user preferences.

## Common Pitfalls

### Pitfall 1: Using vw units without rem bounds breaks zoom accessibility
**What goes wrong:** `font-size: 10vw` looks great on first load, but when user zooms to 200% (WCAG requirement), text size stays locked to viewport percentage instead of growing with zoom.

**Why it happens:** Viewport units are absolute to viewport dimensions, not relative to user font size preferences.

**How to avoid:** Always wrap viewport units in `clamp()` with rem-based min/max: `clamp(3rem, 10vw, 9rem)`. The rem bounds ensure text grows with user zoom.

**Warning signs:**
- Font sizes defined as bare `vw` or `vh` values
- Text doesn't grow when browser zoom increases
- Failing WCAG 1.4.4 Resize Text criterion

**Sources:**
- [WCAG SC 1.4.4 Resize Text (W3C)](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html)
- [Modern Fluid Typography Using CSS Clamp (Smashing Magazine)](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/)

### Pitfall 2: Using 100vh on mobile causes address bar cutoff
**What goes wrong:** Hero section set to `min-height: 100vh` works on desktop but cuts off content on mobile when address bar is visible. As user scrolls and address bar hides, layout jumps.

**Why it happens:** `vh` units on mobile represent the largest possible viewport (browser UI retracted), not the current viewport with UI visible.

**How to avoid:** Use `svh` (small viewport height) which assumes browser UI is fully expanded. This prevents cutoff and layout shift: `min-height: 100svh`.

**Warning signs:**
- Hero content cut off on mobile Safari/Chrome initial load
- Layout shifts when scrolling on mobile
- CTA buttons positioned below visible area

**Sources:**
- [Understanding Mobile Viewport Units (Medium)](https://medium.com/@tharunbalaji110/understanding-mobile-viewport-units-a-complete-guide-to-svh-lvh-and-dvh-0c905d96e21a)
- [The large, small, and dynamic viewport units (web.dev)](https://web.dev/blog/viewport-units)

### Pitfall 3: Container max-width too narrow for large fluid type
**What goes wrong:** Large fluid headline (`clamp(3rem, 10vw, 9rem)`) placed inside narrow container (900px max-width) causes text to wrap excessively or appear cramped despite being technically sized correctly.

**Why it happens:** Container width limits available horizontal space for text, forcing wrapping before headline can reach its intended scale. A 10vw headline on 1440px viewport wants to be 144px, but 900px container forces wrap.

**How to avoid:** Expand container max-width proportionally to headline scale. If headline is `10vw`, container should be at least `1200-1400px` to allow breathing room. Use `clamp()` for container: `max-width: clamp(900px, 80vw, 1400px)`.

**Warning signs:**
- Headline wraps to 4+ lines on desktop
- Large viewport shows cramped text despite available space
- Headline feels "squished" despite correct font-size

**Sources:**
- [Stunning hero sections for 2026 (Lexington Themes)](https://lexingtonthemes.com/blog/stunning-hero-sections-2026)
- Project context: Current hero uses `max-w-[900px]`

### Pitfall 4: Forgetting to scale tagline and CTA proportionally
**What goes wrong:** Headline scales to massive size but tagline and CTA stay fixed, creating awkward hierarchy and making secondary elements look like bugs rather than intentional design.

**Why it happens:** Developer focuses on headline implementation and forgets that visual hierarchy requires proportional scaling of all related elements.

**How to avoid:** Create fluid scale for all text elements in the hero with consistent ratios. If headline is `10vw`, tagline might be `5vw`, CTA `1.5vw` - all using proportional `clamp()` values.

**Warning signs:**
- Headline looks huge but tagline looks tiny
- CTA button text unreadable compared to headline
- Visual hierarchy breaks at large viewports

**Sources:**
- [Visual Hierarchy in Web Design (Clay)](https://clay.global/blog/web-design-guide/visual-hierarchy-web-design)
- User constraint: "Tagline and CTA also scale fluidly with viewport (proportionally smaller than headline)"

### Pitfall 5: Using dvh instead of svh causes jarring layout shifts
**What goes wrong:** Hero section with `min-height: 100dvh` causes content to jump up/down as user scrolls on mobile and address bar animates in/out.

**Why it happens:** `dvh` (dynamic viewport height) updates in real-time as browser UI changes, causing continuous layout recalculation.

**How to avoid:** Use `svh` for 90% of layouts. Only use `dvh` when you specifically need dynamic behavior and have tested that layout shift is acceptable.

**Warning signs:**
- Content jumps during scroll on mobile
- Users report "jittery" or "unstable" layout
- Performance issues from constant layout recalculation

**Sources:**
- [A Better Way to Handle Viewport Units in 2025 (Medium)](https://aravishack.medium.com/a-better-way-to-handle-viewport-units-in-2025-2bf125224642)
- Ecosystem consensus: "Use svh for approximately 90% of your layout"

### Pitfall 6: Not testing at 200% zoom during development
**What goes wrong:** Hero looks perfect at 100% zoom but breaks at 200% zoom - text overflows container, layout breaks, functionality becomes inaccessible.

**Why it happens:** Developers test at default zoom and don't verify WCAG compliance until late in process when fixes are expensive.

**How to avoid:** Test at 200% zoom continuously during development. Use browser DevTools zoom or browser's native zoom (Cmd/Ctrl +). Verify no horizontal scroll, no overflow, all text readable.

**Warning signs:**
- Text cut off at edges
- Horizontal scrolling required to read full headline
- Container doesn't expand to accommodate zoomed text

**Sources:**
- [Understanding WCAG SC 1.4.4 Resize Text (DigitalA11Y)](https://www.digitala11y.com/understanding-sc-1-4-4-resize-text/)
- User constraint: "At 200% zoom: headline shrinks to fit container (prevent overflow, not maintain scale)"

## Code Examples

Verified patterns from official sources:

### Fluid Typography with clamp()
```css
/* Source: MDN clamp() + Smashing Magazine Modern Fluid Typography */

@theme {
  /* Hero headline - viewport-filling scale */
  /* MIN: 3rem (48px) - readable even at narrow mobile */
  /* PREFERRED: 10vw - scales with viewport */
  /* MAX: 9rem (144px) - caps at reasonable max */
  --text-hero-headline: clamp(3rem, 10vw, 9rem);

  /* Hero tagline - proportionally smaller (50% of headline) */
  --text-hero-tagline: clamp(1.5rem, 5vw, 4.5rem);

  /* Hero CTA - subtle scaling */
  --text-hero-cta: clamp(1rem, 1.5vw + 0.5rem, 1.25rem);
}
```

### Mobile Viewport Units
```css
/* Source: web.dev viewport units blog + MDN length documentation */

/* Use svh for mobile-safe full-height sections */
.hero {
  min-height: 100svh; /* Assumes browser UI fully expanded */
  display: flex;
  align-items: center; /* or flex-start for upper third */
  justify-content: flex-start; /* left-align per user constraint */
}

/* Avoid unless you specifically need dynamic behavior */
.hero-dynamic {
  min-height: 100dvh; /* Will cause layout shift - use sparingly */
}
```

### Container Width for Large Headlines
```css
/* Source: Project patterns + 2026 hero design trends */

/* Expand container to allow headline breathing room */
.hero-content {
  /* Fluid container width */
  max-width: clamp(900px, 80vw, 1400px);
  padding-inline: 2rem; /* Maintain margins */
}

/* Or fixed expanded width */
.hero-content {
  max-width: 1200px;
  padding-inline: clamp(1.5rem, 5vw, 3rem); /* Fluid padding */
}
```

### Accessibility-Compliant Overflow Handling
```css
/* Source: MDN overflow-wrap + W3C WCAG documentation */

.hero-title {
  /* Force break long words without hyphens */
  overflow-wrap: break-word; /* Better Safari support than 'anywhere' */
  word-break: normal; /* Don't break at every character */
  hyphens: none; /* No hyphens per user preference */
}
```

### Complete Hero Typography System
```css
/* Source: Synthesized from multiple official sources */

/* In tailwind.css @theme block */
@theme {
  /* Typography scale with proportional relationships */
  --text-hero-headline: clamp(3rem, 10vw, 9rem);
  --text-hero-tagline: clamp(1.5rem, 5vw, 4.5rem);
  --text-hero-cta: clamp(1rem, 1.5vw + 0.5rem, 1.25rem);

  /* Spacing scale for tight grouping */
  --spacing-hero-group: clamp(1.5rem, 3vh, 3rem);
  --spacing-hero-cta: clamp(2rem, 4vh, 4rem);
}

/* In index.astro or component styles */
.hero {
  min-height: 100svh;
  display: flex;
  align-items: flex-start; /* or center - Claude's discretion */
  justify-content: flex-start; /* left-align per user constraint */
  padding-top: clamp(8rem, 15vh, 12rem); /* if using flex-start */
}

.hero-content {
  max-width: clamp(900px, 80vw, 1400px);
  padding-inline: clamp(1.5rem, 5vw, 3rem);
}

.hero-title {
  font-size: var(--text-hero-headline);
  font-weight: 900; /* Black per user constraint */
  line-height: 1.05;
  letter-spacing: -0.03em;
  overflow-wrap: break-word;
  word-break: normal;
  hyphens: none;
}

.hero-tagline {
  font-size: var(--text-hero-tagline);
  margin-top: var(--spacing-hero-group);
}

.hero-cta {
  font-size: var(--text-hero-cta);
  margin-top: var(--spacing-hero-cta);
}
```

### Tailwind v4 Theme Integration
```css
/* Source: Tailwind CSS v4.0 documentation */

/* In src/styles/tailwind.css */
@import "tailwindcss";

@theme {
  /* Fluid typography tokens */
  --text-hero-headline: clamp(3rem, 10vw, 9rem);
  --text-hero-tagline: clamp(1.5rem, 5vw, 4.5rem);

  /* Generates utilities: */
  /* .text-hero-headline { font-size: clamp(3rem, 10vw, 9rem); } */
  /* .text-hero-tagline { font-size: clamp(1.5rem, 5vw, 4.5rem); } */
}

/* Usage in Astro component */
<h1 class="text-hero-headline font-black leading-tight tracking-tighter">
  Your headline here
</h1>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Media queries for every breakpoint | `clamp()` with vw + rem | ~2020 (baseline widely available) | 3-5 media queries eliminated per font size, automatic scaling, better accessibility |
| `vh` units for mobile height | `svh`/`dvh`/`lvh` units | ~2023 (baseline widely available 2015, widespread adoption 2023) | No more JS for mobile viewport height detection, address bar issues solved |
| JavaScript zoom detection | rem-based clamp() bounds | ~2020 (with clamp() adoption) | Native browser zoom support, no JS needed, follows user preferences |
| Fixed container widths with breakpoints | Fluid containers with clamp() | ~2022-2024 (growing adoption) | Smoother responsive behavior, fewer discrete jumps |
| `overflow-wrap: break-word` | `overflow-wrap: anywhere` | ~2018 (both available) | `anywhere` theoretically better but Safari issues mean `break-word` still recommended |

**Deprecated/outdated:**
- **Using bare viewport units for font sizes:** Still works but fails accessibility, replaced by `clamp()` with rem bounds
- **Mobile viewport height with JavaScript:** Replaced by `svh`/`dvh` native CSS units
- **Using `vh` on mobile:** Not deprecated but considered outdated practice, `svh` is new standard
- **Multiple media queries for typography:** Not deprecated but considered verbose, `clamp()` is more maintainable

**Current as of 2026:**
- `clamp()` is production-ready and widely used
- `svh`/`dvh`/`lvh` are standard practice for mobile-first design
- Fluid typography is mainstream, no longer experimental
- Tailwind v4 `@theme` directive is current config approach

## Open Questions

1. **Optimal headline max-width for 10vw typography**
   - What we know: Current container is 900px, 10vw on 1440px viewport = 144px, headlines need breathing room
   - What's unclear: Exact max-width that balances "breathing room" with "not edge-to-edge" from user constraints
   - Recommendation: Test range of 1200-1400px or use fluid `clamp(900px, 80vw, 1400px)` for automatic adaptation

2. **Vertical positioning preference**
   - What we know: User specified Claude's discretion for "vertical positioning of hero content within viewport (centered vs upper third)"
   - What's unclear: Project's specific brand aesthetic and which positioning creates desired "editorial feel"
   - Recommendation: Implement upper-third positioning (asymmetric, editorial per 2026 trends) but provide easy toggle for centered if user prefers

3. **Minimum font size at extreme zoom/narrow viewports**
   - What we know: User specified Claude's discretion for "minimum headline font size at extreme zoom/narrow viewports"
   - What's unclear: What constitutes "extreme" and where usability trumps design
   - Recommendation: Use 3rem (48px) minimum based on WCAG readability guidelines, ensures legibility at 200% zoom on 320px viewport

4. **Exact spacing values within tight grouping**
   - What we know: User wants "tight grouping between headline, tagline, and CTA" where "headline dominates by size contrast"
   - What's unclear: Numeric values for "tight" that create unity without crowding
   - Recommendation: Use `clamp()` for spacing: headline-to-tagline `clamp(1.5rem, 3vh, 3rem)`, tagline-to-CTA `clamp(2rem, 4vh, 4rem)` for proportional breathing room

## Sources

### Primary (HIGH confidence)
- [clamp() - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp) - Official specification, syntax, browser support
- [<length> - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length) - Viewport units (svh/dvh/lvh) specification
- [overflow-wrap - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow-wrap) - Word breaking specification
- [Understanding Success Criterion 1.4.4: Resize Text | W3C](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html) - WCAG accessibility requirements
- [Tailwind CSS v4.0 - Official Documentation](https://tailwindcss.com/blog/tailwindcss-v4) - @theme directive and v4 features

### Secondary (MEDIUM confidence)
- [Modern Fluid Typography Using CSS Clamp - Smashing Magazine](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/) - Verified with official docs, expert guidance
- [The large, small, and dynamic viewport units - web.dev](https://web.dev/blog/viewport-units) - Google Web Fundamentals, trusted source
- [Understanding Mobile Viewport Units - Medium](https://medium.com/@tharunbalaji110/understanding-mobile-viewport-units-a-complete-guide-to-svh-lvh-and-dvh-0c905d96e21a) - Community guide verified with MDN
- [Utopia Fluid Type Scale Calculator](https://utopia.fyi/type/calculator/) - Industry-standard tool for fluid typography

### Tertiary (LOW confidence / reference only)
- [Stunning hero sections for 2026 - Lexington Themes](https://lexingtonthemes.com/blog/stunning-hero-sections-2026) - Design trends, opinion-based
- [Visual Hierarchy in Web Design - Clay](https://clay.global/blog/web-design-guide/visual-hierarchy-web-design) - General design principles, not code-specific

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All native CSS features with official MDN documentation and confirmed browser support since 2018-2020
- Architecture: HIGH - Patterns verified with official sources (MDN, W3C, Tailwind docs) and current project structure
- Pitfalls: HIGH - Sourced from WCAG official documentation, MDN specs, and multiple corroborating community sources

**Research date:** 2026-02-11
**Valid until:** ~2026-03-15 (30 days) - CSS standards are stable, Tailwind v4 is current version, fluid typography is mature practice
