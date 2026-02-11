# Architecture Research

**Domain:** Bold Agency Homepage Typography Redesign
**Researched:** 2026-02-11
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                        │
│  src/pages/index.astro — Page orchestration                 │
├─────────────────────────────────────────────────────────────┤
│                    Component Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Hero.astro   │  │ Section      │  │ Footer.astro │      │
│  │ (extracted)  │  │ Components   │  │              │      │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘      │
│         │                 │                                 │
├─────────┴─────────────────┴─────────────────────────────────┤
│                    Content Layer                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  src/content/homepage/*.md (Content Collections)    │    │
│  │  Zod schemas enforce structure via content.config  │    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│                    Style Layer                               │
│  ┌────────────────────┐  ┌────────────────────────────┐     │
│  │ tailwind.css       │  │ custom.css                 │     │
│  │ (@theme tokens,    │  │ (theme color definitions, │     │
│  │  @layer utilities) │  │  data-theme scoping)      │     │
│  └────────────────────┘  └────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| `index.astro` | Page orchestration, section rendering | Queries content collections, maps sections to components |
| `Hero.astro` (new) | Bold hero typography, viewport-based layout | Accepts CollectionEntry, renders text with Tailwind tokens |
| `src/content/homepage/` | Content storage via Content Collections | Markdown frontmatter validated by Zod schemas |
| `tailwind.css` | Design tokens (@theme) and utility generation | Custom font sizes, viewport-responsive clamp values |
| `custom.css` | Theme-specific overrides | Dark/light mode color definitions via data-theme |

## Recommended Project Structure

```
src/
├── components/
│   ├── Hero.astro           # NEW: Extracted bold hero section
│   ├── Nav.astro            # Existing navigation
│   ├── Footer.astro         # Existing footer
│   └── Logo.astro           # Existing logo
├── content/
│   └── homepage/
│       └── 01-hero.md       # Existing: heading, subheading, cta
├── layouts/
│   └── Base.astro           # Existing: HTML wrapper, global styles
├── pages/
│   └── index.astro          # MODIFIED: Extract hero inline styles
├── styles/
│   ├── tailwind.css         # MODIFIED: Add bold typography tokens
│   └── custom.css           # Existing: Theme color definitions
└── content.config.ts        # Existing: Zod schemas for collections
```

### Structure Rationale

- **`components/Hero.astro`:** Separates hero presentation from page orchestration. Makes hero reusable (e.g., services, work pages) and testable in isolation. Follows Astro's recommendation to "separate data from presentation" via typed CollectionEntry props.
- **`tailwind.css` token modifications:** Centralizes viewport-responsive typography in @theme directive. Generates utilities (e.g., `text-hero-bold`) accessible project-wide. Avoids inline clamp() repetition across components.
- **`index.astro` refactoring:** Removes 300+ lines of inline `<style>` CSS. Reduces page complexity, improves maintainability. Keeps section mapping logic, delegates presentation to components.

## Architectural Patterns

### Pattern 1: Viewport-Responsive Typography with CSS clamp()

**What:** Use CSS `clamp()` function to create fluid typography that scales linearly between viewport breakpoints without media queries.

**When to use:** Hero headings, section titles, or any text that should grow proportionally with viewport size. Best for "marketing/landing page" typography (large, impactful text), not dense application UIs.

**Trade-offs:**
- **Pros:** Smooth scaling, no breakpoint jumps, single declaration
- **Cons:** Harder to pixel-perfect align, awkward sizes at "in-between" widths, doesn't respect user zoom (viewport units don't scale with zoom)

**Example:**
```css
/* In tailwind.css */
@theme {
  /* Current hero (44px → 72px) */
  --text-hero: clamp(2.75rem, 5vw + 1rem, 4.5rem);

  /* Bold hero variant (80px → 180px for viewport-filling impact) */
  --text-hero-bold: clamp(5rem, 12vw + 2rem, 11.25rem);
  --text-hero-bold--line-height: 0.9;
  --text-hero-bold--letter-spacing: -0.04em;
  --text-hero-bold--font-weight: 900;
}
```

Usage in component:
```html
<h1 class="text-hero-bold font-heading">We help you see what your business actually needs</h1>
```

**Source confidence:** HIGH ([Smashing Magazine - Modern Fluid Typography](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/), [CSS-Tricks - Linearly Scale font-size with CSS clamp()](https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/))

### Pattern 2: Component Extraction with Typed Props (Astro Content Collections)

**What:** Extract reusable components that accept typed `CollectionEntry` props instead of embedding markup in page files.

**When to use:** When a section has clear boundaries (hero, CTA), is repeated across pages, or exceeds 50-80 lines of template + styles.

**Trade-offs:**
- **Pros:** Type safety via Zod schemas, reusability, easier testing, clearer separation of concerns
- **Cons:** Additional file indirection, requires understanding Content Collections API

**Example:**
```astro
---
// components/Hero.astro
import type { CollectionEntry } from 'astro:content';

interface Props {
  content: CollectionEntry<'homepage'>;
  variant?: 'default' | 'bold';
}

const { content, variant = 'default' } = Astro.props;
const { heading, subheading, cta_text, cta_link } = content.data;
const heroClass = variant === 'bold' ? 'text-hero-bold' : 'text-hero';
---

<section class="hero relative min-h-[100dvh] flex items-center">
  <div class="container">
    <h1 class={`${heroClass} font-heading`}>{heading}</h1>
    <p class="text-hero-tagline">{subheading}</p>
    {cta_text && <a href={cta_link} class="btn-primary">{cta_text}</a>}
  </div>
</section>
```

Usage in index.astro:
```astro
---
const heroContent = sections.find(s => s.data.section === 'hero');
---
<Hero content={heroContent} variant="bold" />
```

**Source confidence:** HIGH ([Astro Docs - Content Collections](https://docs.astro.build/en/guides/content-collections/))

### Pattern 3: Modern Viewport Units (dvh/svh/lvh)

**What:** Use dynamic viewport height (`dvh`) instead of `vh` to account for mobile browser UI (address bars, toolbars) that shrink/expand during scroll.

**When to use:** Full-screen sections (hero, CTA), especially on mobile. Use `min-height` (not `height`) to allow content to grow beyond viewport if needed.

**Trade-offs:**
- **Pros:** Prevents content cut-off on mobile, adapts to browser UI changes, smoother mobile UX
- **Cons:** Requires fallback for older browsers (Safari < 15.4, Chrome < 108)

**Example:**
```css
/* Anti-pattern (old): */
.hero {
  height: 100vh; /* Doesn't account for mobile browser UI */
}

/* Better pattern (2026): */
.hero {
  min-height: 100dvh; /* Fallback for older browsers */
  min-height: 100svh; /* Safe minimum (never hidden by browser UI) */
}
```

Tailwind integration:
```html
<!-- Utility class approach -->
<section class="min-h-[100dvh] supports-[min-height:100svh]:min-h-[100svh]">
```

**Source confidence:** HIGH ([TheLinuxCode - Viewport Units 2026](https://thelinuxcode.com/viewport-units-in-css-mastering-vh-vw-and-the-modern-dvhsvhlvh-family-2026/), [Medium - A Better Way to Handle Viewport Units in 2025](https://aravishack.medium.com/a-better-way-to-handle-viewport-units-in-2025-2bf125224642))

### Pattern 4: Tailwind v4 @layer Organization

**What:** Use `@layer` directive to control CSS cascade order: theme → base → components → utilities. Keeps custom styles overrideable by utility classes.

**When to use:** Always. Unlayered CSS defeats Tailwind utilities regardless of specificity. Use `@layer base` for resets, `@layer components` for reusable component styles.

**Trade-offs:**
- **Pros:** Predictable cascade, utilities always win, no specificity wars
- **Cons:** Must understand layer order (easy to forget and break utility overrides)

**Example:**
```css
/* In tailwind.css */
@import "tailwindcss";

/* WRONG: Unlayered CSS beats all Tailwind utilities */
* {
  margin: 0; /* This will override Tailwind's m-* utilities! */
}

/* RIGHT: Layered CSS lets utilities override */
@layer base {
  * {
    margin: 0; /* Utilities can override this */
  }
}

@layer components {
  .hero-title-gradient {
    background: linear-gradient(to bottom right, var(--hero-title-gradient-start) 30%, var(--hero-title-gradient-end) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
```

**Source confidence:** HIGH (Project MEMORY.md, [CSS-Tricks - Using CSS Cascade Layers With Tailwind](https://css-tricks.com/using-css-cascade-layers-with-tailwind-utilities/))

## Data Flow

### Content to Presentation Flow

```
[Markdown Frontmatter]
  src/content/homepage/01-hero.md
    ↓ (Zod validation via content.config.ts)
[Type-Safe Collection Entry]
    ↓ (getCollection('homepage') in index.astro)
[Sorted Sections Array]
    ↓ (map/filter by section type)
[Component Props]
  <Hero content={heroContent} variant="bold" />
    ↓ (destructure content.data in Hero.astro)
[Rendered HTML with Tailwind classes]
```

### Style Token Flow

```
[CSS Custom Properties]
  --text-hero-bold: clamp(5rem, 12vw + 2rem, 11.25rem)
  (defined in @theme in tailwind.css)
    ↓ (Tailwind v4 processes @theme)
[Generated Utilities]
  .text-hero-bold { font-size: clamp(...); line-height: 0.9; }
    ↓ (utility classes applied in component)
[Rendered CSS]
  Applied to <h1 class="text-hero-bold">
```

### Key Data Flows

1. **Content editing flow:** Editor modifies `01-hero.md` frontmatter → Astro rebuild → Zod validates → Component re-renders with new data
2. **Theme token flow:** Developer adds `--text-hero-bold` to `@theme` → Tailwind generates `.text-hero-bold` utility → Component uses utility class → Browser renders
3. **Component reuse flow:** Extract `Hero.astro` → Import in `services.astro`, `work.astro` → Pass different CollectionEntry → Same component, different content

## Build Order and Dependencies

### Modification Sequence

**Critical path:** Changes must happen in this order to avoid build errors and ensure dependencies resolve correctly.

```
1. Tailwind token definitions (tailwind.css)
   └─> Generates utilities needed by components

2. Component extraction (Hero.astro)
   └─> Consumes Tailwind utilities
   └─> Expects CollectionEntry type (already exists)

3. Page refactoring (index.astro)
   └─> Imports Hero component
   └─> Removes inline <style> block
   └─> Passes content as props
```

### File Modification Impact

| File | Modification Type | Impact | Blockers |
|------|-------------------|--------|----------|
| `src/styles/tailwind.css` | Add @theme tokens | Generates new utility classes | None (safe to modify first) |
| `src/components/Hero.astro` | Create new file | Encapsulates hero markup + styles | Requires Tailwind tokens exist |
| `src/pages/index.astro` | Refactor (remove ~300 lines) | Cleaner page file, delegates to Hero | Requires Hero.astro to exist |
| `src/content/homepage/01-hero.md` | No changes needed | Content schema already correct | None |

### Dependency Graph

```
tailwind.css (@theme tokens)
  ↓ (provides utilities)
Hero.astro
  ↓ (consumed by)
index.astro
  ↓ (queries)
src/content/homepage/01-hero.md
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Fixed Viewport Height Without Content Overflow

**What people do:**
```css
.hero {
  height: 100vh; /* Forces exact height */
}
```

**Why it's wrong:**
- Content taller than viewport gets clipped
- Mobile browser UI (address bar) hides content below fold
- Doesn't adapt to dynamic content length

**Do this instead:**
```css
.hero {
  min-height: 100dvh; /* Content can grow beyond viewport */
}
```

**Source confidence:** HIGH ([Hero Section Design Best Practices](https://www.perfectafternoon.com/2025/hero-section-design/))

### Anti-Pattern 2: Inline Styles for Reusable Sections

**What people do:**
```astro
<!-- index.astro -->
<section class="hero">
  <h1>{d.heading}</h1>
</section>

<style>
  .hero { /* 200 lines of CSS */ }
</style>
```

**Why it's wrong:**
- Can't reuse hero on `/services` or `/work` pages without duplicating CSS
- 300+ line pages are hard to maintain
- Couples content to presentation

**Do this instead:**
```astro
<!-- components/Hero.astro -->
<section class="hero">
  <h1 class="text-hero-bold">{heading}</h1>
</section>

<!-- index.astro -->
<Hero content={heroContent} />
```

**Source confidence:** MEDIUM ([Astro Docs - Styling](https://docs.astro.build/en/guides/styling/), community best practices)

### Anti-Pattern 3: Hardcoded Font Sizes Instead of Token-Based Scale

**What people do:**
```html
<h1 class="text-[80px] md:text-[120px] lg:text-[180px]">Hero</h1>
```

**Why it's wrong:**
- Breakpoint jumps (not smooth scaling)
- Repetition across components (violates DRY)
- Harder to maintain design system consistency

**Do this instead:**
```css
/* tailwind.css */
@theme {
  --text-hero-bold: clamp(5rem, 12vw + 2rem, 11.25rem);
}
```
```html
<h1 class="text-hero-bold">Hero</h1>
```

**Source confidence:** HIGH ([Tailwind CSS - Font Size](https://tailwindcss.com/docs/font-size), [FrontendTools - Tailwind Best Practices](https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns))

### Anti-Pattern 4: Unlayered CSS Overriding Tailwind Utilities

**What people do:**
```css
/* global.css */
* {
  margin: 0; /* No @layer wrapper */
}
```

**Why it's wrong:**
- Unlayered CSS always beats layered CSS (including Tailwind utilities)
- `m-4` won't work because unlayered `margin: 0` has higher priority
- Breaks Tailwind's utility-first model

**Do this instead:**
```css
/* tailwind.css */
@layer base {
  * {
    margin: 0; /* Now utilities can override */
  }
}
```

**Source confidence:** HIGH (Project MEMORY.md critical learnings)

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 1-5 pages | Current architecture works. Extract hero to component, keep other sections inline. |
| 5-15 pages | Extract all major sections (Hero, CTA, ProcessSteps) to `components/sections/`. Create variant system (e.g., `<Hero variant="bold" \| "default">`). |
| 15+ pages | Introduce component library structure (`components/ui/`, `components/sections/`, `components/layouts/`). Consider headless CMS for content instead of markdown files. |

### Scaling Priorities

1. **First bottleneck (5+ pages):** Repeating section styles across pages. **Fix:** Extract to components with Tailwind utility classes.
2. **Second bottleneck (10+ pages):** Managing typography tokens (too many custom clamp values). **Fix:** Standardize to 3-5 responsive scales (e.g., `text-display`, `text-heading`, `text-body`).
3. **Third bottleneck (20+ pages):** Content management via markdown frontmatter becomes unwieldy. **Fix:** Migrate to headless CMS (Sanity, Contentful) with Astro Content Layer API.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Google Fonts | Preconnect link in `<head>` | Already integrated (Darker Grotesque, Manrope). For bold typography, consider variable fonts to reduce weight overhead. |
| Vercel Deployment | Static build to `./dist/` | No changes needed. Astro static output mode already configured. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Page ↔ Component | Props (CollectionEntry type) | Type-safe via Zod schemas in content.config.ts |
| Component ↔ Styles | Tailwind utility classes | Components consume utilities generated by @theme tokens |
| Content ↔ Page | getCollection() API | Queries markdown frontmatter, returns typed array |

## Files Requiring Modification

### Phase 1: Token Definitions (No blockers)

**File:** `src/styles/tailwind.css`

**Changes:**
```css
@theme {
  /* Add bold hero typography token */
  --text-hero-bold: clamp(5rem, 12vw + 2rem, 11.25rem);
  --text-hero-bold--line-height: 0.9;
  --text-hero-bold--letter-spacing: -0.04em;
  --text-hero-bold--font-weight: 900;

  /* Optional: Add intermediate scale for subheadings */
  --text-hero-tagline-bold: clamp(1.5rem, 3vw + 0.5rem, 2.25rem);
}
```

**Rationale:** Generates `text-hero-bold` utility class. Must happen first so components can use utilities.

### Phase 2: Component Extraction (Depends on Phase 1)

**File:** `src/components/Hero.astro` (NEW)

**Changes:**
- Create new file
- Accept `CollectionEntry<'homepage'>` as prop
- Extract hero markup from `index.astro` lines 48-62
- Extract hero styles from `index.astro` lines 271-346
- Replace hardcoded `text-hero` with `text-hero-bold` for variant

**Rationale:** Encapsulates hero presentation logic. Reusable across pages. Reduces index.astro complexity.

### Phase 3: Page Refactoring (Depends on Phase 2)

**File:** `src/pages/index.astro`

**Changes:**
- Import `Hero` component
- Replace hero section (lines 48-62) with `<Hero content={heroContent} variant="bold" />`
- Remove hero styles (lines 271-346)
- Keep other sections as-is (or extract incrementally)

**Rationale:** Delegates to component, removes 300+ lines of inline CSS.

### No Changes Required

- `src/content/homepage/01-hero.md` — Content schema already correct
- `src/content.config.ts` — Zod schema already validates hero frontmatter
- `src/styles/custom.css` — Theme colors already defined
- `src/layouts/Base.astro` — Global styles import already correct

## Sources

### HIGH Confidence (Official Docs + Verified Sources)

- [Astro Docs - Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Tailwind CSS - Font Size](https://tailwindcss.com/docs/font-size)
- [Tailwind CSS v4.0 Announcement](https://tailwindcss.com/blog/tailwindcss-v4)
- [Smashing Magazine - Modern Fluid Typography Using CSS Clamp](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/)
- [CSS-Tricks - Linearly Scale font-size with CSS clamp()](https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/)
- [TheLinuxCode - Viewport Units in CSS 2026](https://thelinuxcode.com/viewport-units-in-css-mastering-vh-vw-and-the-modern-dvhsvhlvh-family-2026/)
- [CSS-Tricks - Using CSS Cascade Layers With Tailwind](https://css-tricks.com/using-css-cascade-layers-with-tailwind-utilities/)

### MEDIUM Confidence (Community Best Practices)

- [FrontendTools - Tailwind CSS Best Practices 2025-2026](https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns)
- [Perfect Afternoon - Hero Section Design Best Practices](https://www.perfectafternoon.com/2025/hero-section-design/)
- [Astro Docs - Styling](https://docs.astro.build/en/guides/styling/)
- [Medium - A Better Way to Handle Viewport Units in 2025](https://aravishack.medium.com/a-better-way-to-handle-viewport-units-in-2025-2bf125224642)
- [LogRocket - Tailwind CSS Guide 2026](https://blog.logrocket.com/tailwind-css-guide/)

### Project-Specific (Internal Documentation)

- Project MEMORY.md - Tailwind v4 Critical Learnings (CSS layer ordering, theme variable namespaces)
- Project CLAUDE.md - Astro 5 architecture conventions

---
*Architecture research for: Bold Agency Homepage Typography Redesign*
*Researched: 2026-02-11*
