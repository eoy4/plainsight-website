# CSS Audit Report: Plain Sight Website

**Date:** 2026-02-10
**Purpose:** Pre-Tailwind migration analysis

---

## 1. Executive Summary

| Metric | Count | Notes |
|--------|-------|-------|
| **Total CSS files** | 1 global + 4 scoped | global.css + 4 Astro component `<style>` blocks |
| **Total classes defined** | 157 | 117 global, 40 scoped across components |
| **Total lines of CSS** | ~1,435 | Including media queries and animations |
| **Estimated dead CSS** | ~5% | CaseStudyCard component unused |
| **Estimated duplicates** | ~8% | Repeated card patterns, hero patterns, tech tags |

---

## 2. CSS Inventory

### 2.1 Global CSS (`src/styles/global.css`)
**Type:** Global
**Lines:** 1,435
**Classes:** 117

<details>
<summary>Full class list (117 classes)</summary>

- `.main-nav`, `.nav-container`, `.nav-logo`, `.nav-links`
- `.theme-toggle`, `.theme-icon-sun`, `.theme-icon-moon`
- `.container`, `.section`, `.section-title`
- `.btn`, `.btn-primary`, `.btn-cta`
- `.hero`, `.hero-bg-glow`, `.hero-grid-pattern`, `.hero-fog`, `.hero-content`, `.hero-title`, `.hero-tagline`, `.hero-actions`, `.hero-logo`
- `.section-problem`, `.section-problem-title`, `.section-problem-prose`, `.highlight`, `.section-problem-kicker`
- `.section-basics`, `.section-basics-header`, `.section-basics-label`, `.section-basics-title`, `.basics-list`, `.basics-item`, `.basics-item-icon`, `.basics-item-text`
- `.section-work`, `.section-work-header`, `.section-work-label`, `.section-work-title`, `.section-work-intro`, `.work-grid`, `.work-card`, `.work-card-image`, `.work-card-content`, `.work-card-title`, `.work-card-desc`, `.work-card-tech`, `.work-tech-tag`, `.work-card-btn`
- `.about-content`, `.about-text`, `.about-values`
- `.section-prose`, `.section-intro`
- `.section-diff`, `.section-diff-header`, `.section-diff-label`, `.section-diff-title`, `.diff-grid`, `.diff-card`, `.diff-card-icon`, `.diff-card-number`
- `.section-process`, `.section-process-header`, `.section-process-label`, `.section-process-title`, `.process-panel`, `.process-nav`, `.process-nav-item`, `.process-nav-number`, `.process-nav-line`, `.process-nav-title`, `.process-details`, `.process-detail`, `.process-detail-number`, `.process-detail-title`, `.process-detail-desc`
- `.section-cta`, `.cta-glow`, `.cta-content`, `.cta-title`, `.cta-prose`
- `.footer`, `.footer-top`, `.footer-brand`, `.footer-logo`, `.footer-tagline`, `.footer-heading`, `.footer-links`, `.footer-bottom`
</details>

### 2.2 Nav.astro (Scoped)
**Lines:** ~32
**Classes:** 3
**Scope:** Component-level animation styles

- `.logo-square-teal`
- `.logo-square-mask`
- `.logo-square`

### 2.3 CaseStudyCard.astro (Scoped) ⚠️ UNUSED
**Lines:** ~55
**Classes:** 8
**Status:** 🚨 **DEAD CODE** - Component defined but never imported/used

- `.card`, `.card-image`, `.card-content`, `.card-title`, `.card-description`, `.card-tech`, `.tech-tag`, `.card-btn`

### 2.4 services.astro (Scoped)
**Lines:** ~152
**Classes:** 14

- `.services-page`, `.services-hero`, `.services-hero-title`, `.services-hero-prose`
- `.service-card`, `.service-card-sidebar`, `.service-icon`, `.service-card-title`, `.service-card-tagline`, `.service-card-intro`, `.service-card-details`

### 2.5 work.astro (Scoped)
**Lines:** ~162
**Classes:** 15

- `.work-page`, `.work-hero`, `.work-hero-title`, `.work-hero-subtitle`, `.work-hero-intro`
- `.case-study-card`, `.case-study-card-title`, `.case-study-hero-image`, `.case-study-img`, `.case-study-img-placeholder`, `.case-study-body`, `.case-study-section`, `.case-study-gallery`, `.case-study-tech`, `.tech-label`, `.tech-value`

### 2.6 contact.astro (Scoped)
**Lines:** ~328
**Classes:** 22

- `.contact-page`, `.contact-hero`, `.contact-hero-title`, `.contact-hero-intro`, `.contact-body`
- `.contact-form-card`, `.contact-form`, `.form-row`, `.form-group`, `.optional`
- `.contact-sidebar`, `.contact-next-card`, `.contact-next-title`, `.contact-steps`, `.step-num`
- `.contact-links-card`, `.contact-links-label`, `.contact-links`, `.contact-link`
- `.form-success`, `.form-success-title`, `.form-success-close`

---

## 3. Dead CSS

### 3.1 Unused Components
| Component | Reason | Impact |
|-----------|--------|--------|
| **CaseStudyCard.astro** | Component defined but never imported in any page | 8 classes, ~55 lines |

### 3.2 Unused Global Classes
| Class | Location | Notes |
|-------|----------|-------|
| `.about-content` | global.css:779-783 | No "about" section in any current page |
| `.about-text` | global.css:786-788 | No "about" section in any current page |
| `.about-values` | global.css:794-809 | No "about" section in any current page |
| `.section-prose` | global.css:812-820 | Not referenced in markup |
| `.section-intro` | global.css:822-826 | Used in index.astro but styled inline with `.section-work-intro` |
| `.hero-logo` | global.css:458-464 | Not used in any hero section |

**Dead CSS Estimate:** ~70 lines across 14 classes (~5% of total CSS)

---

## 4. Duplicate & Near-Duplicate Patterns

### 4.1 Tech Tag Duplication
**Issue:** Two nearly identical implementations for tech tags

```css
/* global.css:763-770 */
.work-tech-tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: var(--color-bg);
  border-radius: 9999px;
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}

/* CaseStudyCard.astro:66-73 */
.tech-tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: var(--color-bg);
  border-radius: 9999px;
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}
```
**Difference:** Name only (100% identical styles)

### 4.2 Hero Pattern Duplication
**Issue:** Three pages use near-identical hero card patterns

```css
/* services.astro:78-86 */
.services-hero {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: 3.5rem 3rem;
  margin-bottom: 2.5rem;
  /* + glow effect */
}

/* work.astro:101-107 */
.work-hero {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: 3.5rem 3rem;
  margin-bottom: 2.5rem;
}

/* contact.astro:103-109 */
.contact-hero {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: 3.5rem 3rem;
  margin-bottom: 2.5rem;
}
```
**Difference:** Minimal (same structure, slight variations)

### 4.3 Card Pattern Duplication
**Issue:** Multiple card implementations with similar structure

- `.work-card` (global.css:703-722) vs `.card` (CaseStudyCard.astro:27-37)
- `.service-card` (services.astro:124-133) vs `.case-study-card` (work.astro:130-141)
- All use: `border: 1px solid var(--color-border)`, `border-radius`, `background: var(--color-surface)`

### 4.4 CTA Duplication
**Issue:** CTA sections styled globally but repeated across pages

- `.section-cta` used in: services.astro (line 39), work.astro (line 82), index.astro (line 252)
- Same `.cta-glow`, `.cta-title`, `.btn-cta` pattern

**Duplicate CSS Estimate:** ~120 lines (~8% of total CSS)

---

## 5. Design Tokens Extraction

### 5.1 Color Palette

#### Base Colors (Light Theme)
```css
--color-bg: #FFFFFF
--color-surface: #FFFFFF
--color-surface-raised: #FCFAF7

--color-border: #E8E0D8
--color-border-subtle: #F0EBE6

--color-text: #2D3142
--color-text-muted: rgba(45, 49, 66, 0.65)
--color-text-dim: rgba(45, 49, 66, 0.40)

--color-accent: #D97642
--color-accent-hover: #E07A5F
--color-accent-subtle: #FADEC9
--color-accent-glow: rgba(217, 118, 66, 0.12)
--color-accent-glow-strong: rgba(217, 118, 66, 0.20)

--color-pop: #E07A5F
--color-pop-hover: #D97642
--color-pop-glow: rgba(224, 122, 95, 0.15)

--color-nav-bg: rgba(255, 255, 255, 0.85)
--color-shadow: rgba(45, 49, 66, 0.08)
--color-shadow-strong: rgba(45, 49, 66, 0.15)
--color-btn-text: #FFFFFF

--color-hero-glow-1: rgba(244, 162, 97, 0.08)
--color-hero-glow-2: rgba(244, 162, 97, 0.04)
```

#### Base Colors (Dark Theme)
```css
--color-bg: #040F12
--color-surface: #0A2428
--color-surface-raised: #0D2428

--color-border: #1A4A52
--color-border-subtle: #0F2E33

--color-text: #FAFAFA
--color-text-muted: rgba(255, 255, 255, 0.65)
--color-text-dim: rgba(255, 255, 255, 0.40)

--color-accent: #0D7377
--color-accent-hover: #078C94
--color-accent-subtle: #0A3A3D
--color-accent-glow: rgba(13, 115, 119, 0.18)
--color-accent-glow-strong: rgba(7, 140, 148, 0.28)

--color-pop: #B8F545
--color-pop-hover: #A8E535
--color-pop-glow: rgba(184, 245, 69, 0.18)

--color-nav-bg: rgba(4, 15, 18, 0.85)
--color-shadow: rgba(0, 0, 0, 0.35)
--color-shadow-strong: rgba(0, 0, 0, 0.55)
--color-btn-text: #FFFFFF

--color-hero-glow-1: rgba(13, 115, 119, 0.25)
--color-hero-glow-2: rgba(13, 115, 119, 0.10)
```

**Total unique color values:** 23 semantic tokens × 2 themes = 46 color values

#### Hard-coded Colors (inconsistencies)
| Value | Location | Usage |
|-------|----------|-------|
| `rgba(255, 255, 255, 0.1)` | global.css:437, 449, 1200, 1211 | Button inset highlights |
| `rgba(255, 255, 255, 0.08)` | global.css:438, 1201 | Button borders |
| `rgba(0,0,0,0.45)` | global.css:358 | Grid mask gradient |
| `rgba(126, 219, 87, 0.03)` | global.css:501 | Problem section glow |

### 5.2 Typography

#### Font Families
```css
--font-sans: 'Manrope', system-ui, -apple-system, sans-serif
--font-heading: 'Darker Grotesque', system-ui, -apple-system, sans-serif
--font-mono: ui-monospace, 'Fira Code', monospace
```

#### Font Sizes (sorted by usage frequency)
| Size | Usage Count | Context |
|------|-------------|---------|
| `1rem` | 15+ | Base text, labels, descriptions |
| `0.9375rem` | 3 | Card descriptions |
| `1.125rem` | 8 | Hero taglines, larger body text |
| `0.75rem` | 5 | Tags, small labels |
| `0.8125rem` | 3 | Section labels (uppercase) |
| `0.85rem` | 3 | Buttons, smaller links |
| `0.875rem` | 4 | Footer text, detail numbers |
| `1.25rem` | 3 | Card titles, section headings |
| `1.375rem` | 3 | Work card titles, diff card titles |
| `1.5rem` | 2 | Process detail titles, form success |
| `2rem` | 2 | Section titles |
| `2.25rem` | 2 | Hero titles (small screens) |
| `3rem` | 2 | Large detail numbers, CTA titles |
| `4rem` | 2 | Hero titles (large screens) |
| `4.5rem` | 1 | Hero title max |

#### Font Sizes Using `clamp()`
| Class | Clamp Value | Min → Preferred → Max |
|-------|-------------|---------------------|
| `.hero-title` | `clamp(2.75rem, 5vw + 1rem, 4.5rem)` | 2.75rem → 5vw+1rem → 4.5rem |
| `.hero-tagline` | `clamp(1.125rem, 1.5vw + 0.5rem, 1.375rem)` | 1.125rem → 1.5vw+0.5rem → 1.375rem |
| `.section-problem-title` | `clamp(1.75rem, 3vw, 2.5rem)` | 1.75rem → 3vw → 2.5rem |
| `.section-problem-prose` | `clamp(1.125rem, 1.5vw + 0.5rem, 1.3125rem)` | 1.125rem → 1.5vw+0.5rem → 1.3125rem |
| `.section-problem-kicker` | `clamp(1.125rem, 1.5vw + 0.5rem, 1.625rem)` | 1.125rem → 1.5vw+0.5rem → 1.625rem |
| `.section-basics-title` | `clamp(1.75rem, 3vw, 2.5rem)` | 1.75rem → 3vw → 2.5rem |
| `.section-work-title` | `clamp(1.75rem, 3vw, 2.5rem)` | 1.75rem → 3vw → 2.5rem |
| `.section-diff-title` | `clamp(1.75rem, 3vw, 2.5rem)` | 1.75rem → 3vw → 2.5rem |
| `.section-process-title` | `clamp(1.75rem, 3vw, 2.5rem)` | 1.75rem → 3vw → 2.5rem |
| `.cta-title` | `clamp(2rem, 4vw, 3rem)` | 2rem → 4vw → 3rem |
| `.services-hero-title` | `clamp(2.25rem, 6vw, 4rem)` | 2.25rem → 6vw → 4rem |
| `.work-hero-title` | `clamp(2.25rem, 6vw, 4rem)` | 2.25rem → 6vw → 4rem |
| `.contact-hero-title` | `clamp(2.25rem, 6vw, 4rem)` | 2.25rem → 6vw → 4rem |
| `.service-card-title` | `clamp(1.5rem, 3vw, 2rem)` | 1.5rem → 3vw → 2rem |
| `.case-study-card-title` | `clamp(1.75rem, 3vw, 2.25rem)` | 1.75rem → 3vw → 2.25rem |
| `.service-card-tagline` | `clamp(0.9rem, 1.3vw, 1.05rem)` | 0.9rem → 1.3vw → 1.05rem |

#### Font Weights
| Weight | Usage | Context |
|--------|-------|---------|
| `400` | Default | Body text |
| `500` | 2 | Buttons |
| `600` | 20+ | Headings, labels, emphasized text |
| `700` | 25+ | Major headings, card titles |
| `800` | 4 | Hero titles |

#### Letter Spacing
| Value | Usage | Context |
|-------|-------|---------|
| `-0.03em` | 2 | Large hero titles |
| `-0.02em` | 8 | Section titles, card titles |
| `-0.01em` | 10 | Smaller headings, buttons |
| `0.01em` | 2 | Form labels |
| `0.05em` | 2 | Detail numbers (mono) |
| `0.06em` | 1 | Contact links label |
| `0.08em` | 1 | Footer headings |
| `0.1em` | 3 | Section labels (uppercase) |

### 5.3 Spacing

#### Section Spacing
```css
--section-gap: clamp(5rem, 8vw, 8rem)
```

#### Common Padding Values (sorted by frequency)
| Value | Usage Count | Context |
|-------|-------------|---------|
| `1.5rem` | 20+ | Card content, form groups, lists |
| `2rem` | 15+ | Card padding, section spacing |
| `2.5rem` | 10+ | Large card padding, hero padding |
| `0.75rem` | 8+ | Small gaps, tech tags |
| `1rem` | 15+ | Base spacing, margins |
| `0.5rem` | 12+ | Tight spacing, icon gaps |
| `3rem` | 6+ | Large section headers |
| `0.25rem` | 5+ | Minimal spacing, tag padding |

#### Common Gap Values
| Value | Usage | Context |
|-------|-------|---------|
| `2rem` | 6 | Grid gaps, nav links |
| `0.5rem` | 8 | Tight flex gaps, tags |
| `1.5rem` | 6 | Form fields, list items |
| `3rem` | 4 | Large grid gaps |
| `4rem` | 2 | Very large grid gaps |

#### Common Margin Values
| Value | Usage | Context |
|-------|-------|---------|
| `1.5rem` | 15+ | Paragraph/element spacing |
| `2rem` | 10+ | Section title margins |
| `0.75rem` | 8+ | Small element spacing |
| `3rem` | 5+ | Large section spacing |

### 5.4 Border Radius

| Value | Usage | Context |
|-------|-------|---------|
| `0.5rem` (8px) | 12+ | Inputs, buttons, small elements |
| `0.75rem` (12px) | 10+ | Cards, images |
| `1rem` (16px) | 8+ | Large cards, hero sections |
| `0.625rem` (10px) | 2 | Primary CTA buttons |
| `0.25em` | 1 | Inline highlights |
| `9999px` | 4 | Pill-shaped tags |
| `50%` | 1 | Step numbers (circles) |

### 5.5 Box Shadows

#### Defined Shadows
```css
/* Global */
--color-shadow: rgba(45, 49, 66, 0.08) / rgba(0, 0, 0, 0.35)
--color-shadow-strong: rgba(45, 49, 66, 0.15) / rgba(0, 0, 0, 0.55)
```

#### Complex Shadow Patterns
```css
/* Primary button glow */
box-shadow:
  0 0 20px var(--color-accent-glow),
  0 0 60px var(--color-accent-glow),
  inset 0 1px 0 rgba(255, 255, 255, 0.1);

/* Primary button hover glow */
box-shadow:
  0 0 30px var(--color-accent-glow-strong),
  0 0 80px var(--color-accent-glow),
  0 4px 16px var(--color-shadow),
  inset 0 1px 0 rgba(255, 255, 255, 0.15);

/* Work card hover */
box-shadow: 0 8px 32px -8px var(--color-shadow);

/* Form focus */
box-shadow: 0 0 0 3px var(--color-accent-subtle);
```

### 5.6 Transitions & Animations

#### Transition Durations
```css
--duration-fast: 0.2s
--duration-medium: 0.4s
--duration-slow: 0.7s
```

#### Easing Functions
```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1)
```

#### Global Transition (All Elements)
```css
* { transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
```

#### Keyframe Animations
| Name | Duration | Usage |
|------|----------|-------|
| `fadeInUp` | 0.9s | Hero elements (staggered 0s, 0.1s, 0.25s) |
| `fadeIn` | - | Defined but unused |
| `subtleFloat` | 12s infinite | Hero background glow |
| `glowPulse` | - | Defined but unused |
| `square-fade-out` | 0.15s | Nav logo animation |
| `mask-draw-off` | 0.5s (0.15s delay) | Nav logo animation |

### 5.7 Breakpoints

**Single breakpoint used:** `@media (max-width: 768px)`

**Responsive changes at 768px:**
- Section padding: `8rem 0` → `4rem 0`
- Hero padding: `8rem 0 6rem` → `7rem 0 4rem`
- Grid layouts: 2 columns → 1 column
- Ambient effects disabled (performance)
- Process panel: absolute positioning → relative (stacked)
- Nav line indicators hidden on mobile

### 5.8 Design System Inconsistencies

| Issue | Details | Impact |
|-------|---------|--------|
| **Font size units** | Mix of `rem`, `px`, `em`, `clamp()`, `vw` | Harder to establish type scale |
| **Spacing units** | Mostly `rem`, some `px` | Inconsistent scaling |
| **Border-radius units** | Mix of `rem` and `em` | Minor visual inconsistency |
| **Magic numbers** | 72px (grid size), 217 (SVG stroke-dasharray) | Hard to maintain |
| **Hard-coded rgba()** | Not using CSS variables for some opacities | Theme switching incomplete |

---

## 6. Migration Complexity Assessment

### 6.1 Easy to Migrate ✅

**Standard utility patterns:**
- Layout: Flexbox, Grid (`.work-grid`, `.footer-top`, `.contact-body`)
- Spacing: Padding, margin, gap
- Typography: Font size, weight, color, letter-spacing
- Borders: Border width, color, radius
- Basic transitions: `transition-colors`, `transition-transform`

**Estimate:** ~60% of CSS can use standard Tailwind utilities

### 6.2 Moderate Complexity ⚠️

**Requires custom config or plugins:**

1. **Color palette:** 46 color values need theme configuration
2. **Clamp-based responsive typography:** 16 instances need custom classes
3. **Custom easing functions:** `ease-out-expo`, `ease-out-quart`
4. **Complex shadows:** Multi-layered glows need custom utilities
5. **CSS custom properties:** Dynamic theme switching needs `@apply` or CSS variables strategy
6. **Aspect ratios:** Used for images (`16/10`)

### 6.3 High Complexity 🔴

**Hard to express in Tailwind utilities:**

#### A. Complex State-Based Selectors
```css
.process-panel[data-active="0"] .process-nav-item[data-index="0"] { }
.process-panel[data-active="1"] .process-nav-item[data-index="1"] { }
/* etc. */
```
**Challenge:** Data attribute selectors with multiple levels
**Solution:** Keep in `<style>` block or use `@apply` with variants

#### B. SVG Logo Animations
```css
@keyframes mask-draw-off {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -217; }
}
.nav-logo:hover .logo-square-mask {
  animation: mask-draw-off 0.5s 0.15s ease forwards;
}
```
**Challenge:** SVG stroke animation with magic numbers
**Solution:** Keep in component `<style>` block

#### C. Backdrop Blur with Fallback
```css
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
```
**Challenge:** Browser prefixes
**Solution:** Tailwind has `backdrop-blur-{amount}` but may need autoprefixer

#### D. Noise Texture Overlay
```css
body::after {
  background-image: url("data:image/svg+xml,...");
  background-repeat: repeat;
  opacity: 0.025;
  /* etc. */
}
```
**Challenge:** Data URI SVG, fixed overlay
**Solution:** Keep as global CSS or move to component

#### E. Radial Gradients with Custom Stops
```css
background: radial-gradient(
  ellipse 70% 60% at 30% 45%,
  var(--color-hero-glow-1) 0%,
  var(--color-hero-glow-2) 40%,
  transparent 70%
);
```
**Challenge:** Complex gradients with custom positioning
**Solution:** Use Tailwind arbitrary values or keep as custom classes

#### F. Grid Pattern with Mask
```css
background-image: url("data:image/svg+xml,%3Csvg...");
mask-image: radial-gradient(...);
-webkit-mask-image: radial-gradient(...);
```
**Challenge:** SVG background + gradient mask
**Solution:** Keep as custom CSS

#### G. Focus States with Custom Shadow Rings
```css
.form-group input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-subtle);
}
```
**Challenge:** Custom focus ring with theme colors
**Solution:** Configure Tailwind's `ringColor` and `ringOpacity`

### 6.4 Third-Party CSS Dependencies

**None detected** — no external CSS frameworks or libraries.

---

## 7. Recommendations for Tailwind Migration

### 7.1 Priority 1: Configure Theme
1. **Colors:** Create complete color palette in `tailwind.config.js`
2. **Typography:** Configure font families, sizes (including clamp), weights, letter-spacing
3. **Spacing:** Define custom spacing scale matching current rem values
4. **Border radius:** Add custom values (0.625rem, 0.75rem, etc.)
5. **Box shadow:** Create named shadows for glow effects
6. **Transition durations & easings:** Add custom values

### 7.2 Priority 2: Identify Custom CSS to Keep
**Keep these as custom CSS (not Tailwind):**
- Logo SVG animations (Nav.astro)
- Process panel data-attribute selectors (index.astro)
- Noise texture overlay (body::after)
- Hero grid pattern with mask
- Radial gradient glows

### 7.3 Priority 3: Create Component Classes
**Use `@apply` for repeated patterns:**
- Hero card pattern (used in 3 pages)
- Tech tag style (repeated 2x)
- Section label style (uppercase, tracking, accent color)
- Card hover effects

### 7.4 Priority 4: Handle Theme Switching
**Strategy:**
- Keep `data-theme` attribute approach
- Use CSS variables for colors (Tailwind supports this)
- Configure dark mode as `class` strategy with `[data-theme="dark"]`

### 7.5 Priority 5: Migration Order
1. **Start with:** Typography utilities (easiest, most impact)
2. **Then:** Layout utilities (flex, grid, spacing)
3. **Then:** Color utilities (backgrounds, borders, text)
4. **Last:** Complex interactions, animations, gradients

---

## 8. Estimated Effort

| Task | Effort | Notes |
|------|--------|-------|
| **Tailwind config setup** | 4-6 hours | Colors, typography, spacing, shadows |
| **Delete dead CSS** | 30 min | Remove CaseStudyCard, about classes |
| **Consolidate duplicates** | 1-2 hours | Create shared component classes |
| **Migrate global.css** | 8-12 hours | Convert to utilities, identify keeps |
| **Migrate services.astro** | 2-3 hours | Convert scoped styles |
| **Migrate work.astro** | 2-3 hours | Convert scoped styles |
| **Migrate contact.astro** | 3-4 hours | Convert form styles, dialog |
| **Migrate Nav.astro** | 1 hour | Keep SVG animations, convert rest |
| **Testing & refinement** | 4-6 hours | Cross-browser, theme switching |
| **TOTAL** | **25-37 hours** | ~1 week of focused work |

---

## 9. Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Theme switching breaks** | High | Test thoroughly, keep CSS variables |
| **Animations stop working** | Medium | Keep complex animations as custom CSS |
| **Build size increases** | Low | Use PurgeCSS (built into Tailwind) |
| **Developer experience** | Low | Establish clear patterns early |
| **Mobile responsive breaks** | Medium | Test at 768px breakpoint carefully |

---

## 10. Files Requiring Changes

### Must Edit
- ✅ `src/styles/global.css` — Primary migration target
- ✅ `src/pages/services.astro` — Convert scoped styles
- ✅ `src/pages/work.astro` — Convert scoped styles
- ✅ `src/pages/contact.astro` — Convert scoped styles
- ✅ `src/components/Nav.astro` — Partial conversion
- ✅ `src/pages/index.astro` — Update class names in markup
- ✅ `tailwind.config.js` — Create configuration

### Can Delete
- ❌ `src/components/CaseStudyCard.astro` — Unused component

### Keep As-Is
- ✅ `src/components/Footer.astro` — Uses global styles only
- ✅ `src/layouts/Base.astro` — Import strategy changes only

---

## Appendix: Quick Reference

### Most Common Patterns to Migrate
1. **Cards:** `bg-surface border border-border rounded-xl p-10`
2. **Buttons:** `bg-accent text-white rounded-lg px-8 py-4 font-semibold hover:bg-accent-hover transition-colors`
3. **Hero sections:** `min-h-screen flex items-center py-32`
4. **Section spacing:** `py-20 lg:py-32` (using --section-gap equivalent)
5. **Tech tags:** `text-xs px-3 py-1 bg-bg rounded-full text-muted font-mono`

---

**End of Audit**
