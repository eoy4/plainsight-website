# Tailwind Migration Roadmap

**Project:** Plain Sight Website
**Target:** Migrate from custom CSS to Tailwind CSS
**Based on:** [css-audit.md](./css-audit.md)

---

## Phase 0: Preparation (Before Any Code Changes)

### ✅ Checklist
- [x] Complete CSS audit
- [ ] Review audit findings with team
- [ ] Create git branch: `feat/tailwind-migration`
- [ ] Install Tailwind CSS + dependencies
- [ ] Set up Tailwind config skeleton
- [ ] Configure Astro integration

### Installation

```bash
npm install -D tailwindcss @astrojs/tailwind autoprefixer
npx astro add tailwind
```

### Initial Config Files

Create `tailwind.config.mjs` (see [tailwind-config-starter.md](./tailwind-config-starter.md))

---

## Phase 1: Foundation Setup (Day 1)

**Goal:** Configure Tailwind theme to match existing design system

### 1.1 Configure Colors
- [ ] Add all 23 semantic color tokens to theme
- [ ] Set up dark mode strategy: `darkMode: ['class', '[data-theme="dark"]']`
- [ ] Test theme switching still works
- [ ] Create custom CSS for remaining theme-specific variables

**Files to edit:**
- `tailwind.config.mjs`

**Test:** Theme toggle should work, colors should be available

### 1.2 Configure Typography
- [ ] Add font families (Manrope, Darker Grotesque, Fira Code)
- [ ] Add font sizes (including custom clamp values)
- [ ] Add font weights (400, 500, 600, 700, 800)
- [ ] Add letter spacing values
- [ ] Add line height values

**Files to edit:**
- `tailwind.config.mjs`

### 1.3 Configure Spacing & Layout
- [ ] Add custom spacing values (0.625rem, 1.25rem, etc.)
- [ ] Configure container settings (max-width: 1200px, padding)
- [ ] Add custom gap values
- [ ] Add section-gap equivalent

**Files to edit:**
- `tailwind.config.mjs`

### 1.4 Configure Effects
- [ ] Add custom border radius values
- [ ] Add custom box shadows (including glow effects)
- [ ] Add custom transition durations
- [ ] Add custom easing functions
- [ ] Configure backdrop blur

**Files to edit:**
- `tailwind.config.mjs`

**Deliverable:** Complete Tailwind config matching existing design tokens

---

## Phase 2: Clean Up Dead Code (Day 1-2)

**Goal:** Remove unused CSS before migration

### 2.1 Delete Unused Component
- [ ] Delete `src/components/CaseStudyCard.astro` (unused)
- [ ] Verify no imports reference this file

### 2.2 Remove Dead Global Classes
- [ ] Remove `.about-*` classes (global.css:779-809)
- [ ] Remove `.section-prose` (global.css:812-820)
- [ ] Remove `.hero-logo` (global.css:458-464)
- [ ] Remove unused keyframe `fadeIn` (global.css:153-156)
- [ ] Remove unused keyframe `glowPulse` (global.css:163-170)

**Files to edit:**
- `src/styles/global.css`

**Test:** Run build, verify no errors

---

## Phase 3: Create Custom CSS Layer (Day 2)

**Goal:** Identify CSS that should NOT be converted to Tailwind

### 3.1 Create Custom CSS File
Create `src/styles/custom.css` for non-Tailwind CSS

**Move to custom.css:**
- [ ] Logo SVG animations (from Nav.astro)
- [ ] Process panel data-attribute selectors (from index.astro)
- [ ] Noise texture overlay (body::after)
- [ ] Hero grid pattern with mask
- [ ] Complex radial gradient glows
- [ ] Global theme transition rule (`*` selector)
- [ ] Theme-specific overrides for `.hero-grid-pattern`

### 3.2 Create Component Classes with @apply
Create `src/styles/components.css` for reusable patterns

**Create component classes:**
```css
@layer components {
  /* Hero card pattern (used 3x) */
  .hero-card {
    @apply bg-surface border border-border rounded-2xl p-14 mb-10;
  }

  /* Tech tag (duplicated 2x) */
  .tech-tag {
    @apply text-xs px-3 py-1 bg-bg rounded-full text-muted font-mono;
  }

  /* Section label (used 5x) */
  .section-label {
    @apply text-[0.8125rem] font-semibold tracking-wider uppercase text-accent-hover mb-4;
  }
}
```

**Files to create:**
- `src/styles/custom.css`
- `src/styles/components.css`

**Files to edit:**
- `src/layouts/Base.astro` (update imports)

---

## Phase 4: Migrate Global Utilities (Day 3-4)

**Goal:** Convert global.css utility patterns to Tailwind

### 4.1 Migrate Layout Classes
- [ ] `.container` → Use Tailwind's container + config
- [ ] `.section` → Convert to utility classes
- [ ] Grid layouts (`.work-grid`, `.diff-grid`, etc.)
- [ ] Flex layouts

### 4.2 Migrate Typography
- [ ] Heading styles (h1-h6 global styles)
- [ ] `.section-title` → utilities
- [ ] All `*-title` classes → utilities

### 4.3 Migrate Buttons
- [ ] `.btn` → `@apply` in components.css or inline utilities
- [ ] `.btn-primary` → utilities
- [ ] `.btn-cta` → utilities

### 4.4 Migrate Navigation
- [ ] `.main-nav` → utilities
- [ ] `.nav-container` → utilities
- [ ] `.nav-logo` → utilities
- [ ] `.nav-links` → utilities
- [ ] `.theme-toggle` → utilities
- [ ] Theme icon display logic → keep as custom CSS

### 4.5 Migrate Footer
- [ ] All `.footer-*` classes → utilities

**Strategy for each class:**
1. Find all usages in markup
2. Replace class name with Tailwind utilities
3. Delete CSS rule from global.css
4. Test visual appearance

**Files to edit:**
- `src/styles/global.css` (delete converted rules)
- `src/components/Nav.astro` (update classes)
- `src/components/Footer.astro` (update classes)
- All page files using these classes

---

## Phase 5: Migrate Homepage (index.astro) (Day 5-6)

**Goal:** Convert all homepage section styles

### 5.1 Hero Section
- [ ] Convert `.hero` and related classes
- [ ] Keep `.hero-bg-glow`, `.hero-grid-pattern`, `.hero-fog` as custom CSS
- [ ] Convert `.hero-content`, `.hero-title`, `.hero-tagline`, `.hero-actions`
- [ ] Convert `.btn-primary` button styles

**Custom CSS to keep:**
- Hero decorative backgrounds (glow, grid, fog)
- Animations (fadeInUp, subtleFloat)

### 5.2 Problem Section
- [ ] Convert `.section-problem` and children
- [ ] Convert `.section-problem-prose` and `.highlight`
- [ ] Convert `.section-problem-kicker`

### 5.3 Differentiators Section
- [ ] Convert `.section-diff` and header
- [ ] Convert `.diff-grid` and `.diff-card`
- [ ] Keep `.diff-card-icon` SVG styles or convert

### 5.4 Process Section
- [ ] Convert `.section-process` and header
- [ ] Convert `.process-panel` layout
- [ ] **Keep as custom CSS:** All `[data-active]` selectors
- [ ] Convert basic styling for `.process-nav-item`, etc.

### 5.5 Basics Section
- [ ] Convert `.section-basics` and children
- [ ] Convert `.basics-list` and `.basics-item`

### 5.6 Work Section
- [ ] Convert `.section-work` and children
- [ ] Convert `.work-grid` and `.work-card`
- [ ] Convert card hover effects

### 5.7 CTA Section
- [ ] Convert `.section-cta` and children
- [ ] Keep `.cta-glow` as custom CSS
- [ ] Convert `.btn-cta`

**Files to edit:**
- `src/pages/index.astro` (update all class names)
- `src/styles/global.css` (delete converted rules)
- `src/styles/custom.css` (add kept rules)

---

## Phase 6: Migrate Services Page (Day 7)

### 6.1 Services-Specific Styles
- [ ] Convert `.services-page`
- [ ] Convert `.services-hero` (can use shared `.hero-card` from components.css)
- [ ] Convert `.service-card` and all children
- [ ] Keep `.services-hero::before` glow as custom CSS

**Files to edit:**
- `src/pages/services.astro` (remove `<style>` block, add utilities)

---

## Phase 7: Migrate Work Page (Day 8)

### 7.1 Work-Specific Styles
- [ ] Convert `.work-page`
- [ ] Convert `.work-hero` (can use shared `.hero-card`)
- [ ] Convert `.case-study-card` and all children
- [ ] Convert `.case-study-gallery` grid

**Files to edit:**
- `src/pages/work.astro` (remove `<style>` block, add utilities)

---

## Phase 8: Migrate Contact Page (Day 9)

### 8.1 Contact-Specific Styles
- [ ] Convert `.contact-page`
- [ ] Convert `.contact-hero` (can use shared `.hero-card`)
- [ ] Convert `.contact-body` grid layout
- [ ] Convert `.contact-form-card` and form styles
- [ ] Convert `.contact-sidebar` and children
- [ ] Convert `.form-success` dialog

### 8.2 Form Styling
- [ ] Convert `.form-group`, `.form-row`
- [ ] Convert input, select, textarea styles
- [ ] Convert focus states
- [ ] Test form validation styles

**Files to edit:**
- `src/pages/contact.astro` (remove `<style>` block, add utilities)

---

## Phase 9: Migrate Nav Component (Day 10)

### 9.1 Nav Styles
- [ ] Most nav styles already migrated in Phase 4
- [ ] **Keep SVG logo animations** in `<style>` block
- [ ] Verify logo animation still works

**Files to edit:**
- `src/components/Nav.astro` (keep animation styles only)

---

## Phase 10: Final Cleanup & Testing (Day 11-12)

### 10.1 Remove Old CSS Files
- [ ] Delete or archive `src/styles/global.css` (should be empty now)
- [ ] Verify only these CSS files remain:
  - `src/styles/custom.css`
  - `src/styles/components.css`
  - Minimal `<style>` blocks in Nav.astro and index.astro

### 10.2 Comprehensive Testing

**Visual regression:**
- [ ] Homepage - all sections
- [ ] Services page - all cards
- [ ] Work page - all case studies
- [ ] Contact page - form and dialog
- [ ] Nav - logo animation, theme toggle
- [ ] Footer - all links

**Responsive testing:**
- [ ] Test at 768px breakpoint
- [ ] Test mobile navigation
- [ ] Test mobile grids
- [ ] Test mobile forms

**Theme switching:**
- [ ] Light theme - all pages
- [ ] Dark theme - all pages
- [ ] Verify all colors switch correctly
- [ ] Verify shadows/glows switch correctly

**Interactions:**
- [ ] Process panel hover states (index.astro)
- [ ] Work card hover effects
- [ ] Button hover/active states
- [ ] Form focus states
- [ ] Nav logo animation
- [ ] Theme toggle

**Performance:**
- [ ] Run Lighthouse audit
- [ ] Check bundle size vs. before migration
- [ ] Verify PurgeCSS is removing unused Tailwind

### 10.3 Documentation
- [ ] Update README with Tailwind info
- [ ] Document custom CSS patterns in comments
- [ ] Create style guide (optional)

---

## Phase 11: Deploy & Monitor (Day 13)

### 11.1 Pre-Deployment
- [ ] Run production build: `npm run build`
- [ ] Test production preview: `npm run preview`
- [ ] Check build warnings/errors
- [ ] Verify no console errors

### 11.2 Deployment
- [ ] Merge migration branch to main
- [ ] Deploy to production
- [ ] Monitor for visual bugs
- [ ] Check real-world performance

### 11.3 Post-Deployment
- [ ] Get user feedback
- [ ] Fix any discovered issues
- [ ] Document lessons learned

---

## Rollback Plan

If critical issues occur:

1. **Immediate:** Revert deployment to previous version
2. **Investigation:** Identify issue on staging/local
3. **Fix or Rollback:** Either fix quickly or delay migration
4. **Re-test:** Thorough testing before re-deploy

---

## Success Criteria

- ✅ All pages visually match original design
- ✅ Theme switching works perfectly
- ✅ All interactions work (hover, focus, animations)
- ✅ Responsive design intact at all breakpoints
- ✅ Build completes without errors
- ✅ No console errors on any page
- ✅ Lighthouse scores maintained or improved
- ✅ CSS bundle size reduced or similar

---

## Daily Progress Tracker

| Day | Phase | Status | Notes |
|-----|-------|--------|-------|
| 1 | Phase 0-1 | ⬜ | Setup & config |
| 2 | Phase 2-3 | ⬜ | Cleanup & custom CSS |
| 3 | Phase 4.1-4.3 | ⬜ | Global utilities 1/2 |
| 4 | Phase 4.4-4.5 | ⬜ | Global utilities 2/2 |
| 5 | Phase 5.1-5.4 | ⬜ | Homepage 1/2 |
| 6 | Phase 5.5-5.7 | ⬜ | Homepage 2/2 |
| 7 | Phase 6 | ⬜ | Services page |
| 8 | Phase 7 | ⬜ | Work page |
| 9 | Phase 8 | ⬜ | Contact page |
| 10 | Phase 9 | ⬜ | Nav component |
| 11 | Phase 10.1-10.2 | ⬜ | Cleanup & testing 1/2 |
| 12 | Phase 10.3 | ⬜ | Testing 2/2 & docs |
| 13 | Phase 11 | ⬜ | Deploy & monitor |

---

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Astro Tailwind Integration](https://docs.astro.build/en/guides/integrations-guide/tailwind/)
- [CSS Audit Report](./css-audit.md)
- [Tailwind Config Starter](./tailwind-config-starter.md)

---

**Last Updated:** 2026-02-10
