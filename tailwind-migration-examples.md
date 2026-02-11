# Tailwind Migration: Before & After Examples

Practical examples showing how to convert existing CSS to Tailwind utilities.

---

## 1. Navigation

### Before (global.css + Nav.astro)

```css
/* global.css */
.main-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-nav-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 100;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border-subtle);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.nav-links a:hover {
  color: var(--color-accent-hover);
  text-decoration: none;
}
```

```html
<!-- Nav.astro -->
<nav class="main-nav">
  <div class="container nav-container">
    <a href="/" class="nav-logo">Logo</a>
    <div class="nav-links">
      <a href="/services">Services</a>
      <a href="/work">Work</a>
      <a href="/contact">Contact</a>
    </div>
  </div>
</nav>
```

### After (Tailwind utilities)

```html
<!-- Nav.astro -->
<nav class="fixed top-0 left-0 right-0 bg-nav backdrop-blur-md z-[100] py-3 border-b border-border-subtle">
  <div class="container flex justify-between items-center py-6">
    <a href="/" class="nav-logo">Logo</a>
    <div class="flex gap-8 items-center">
      <a href="/services" class="text-muted text-[0.9rem] hover:text-accent-hover hover:no-underline transition-colors">Services</a>
      <a href="/work" class="text-muted text-[0.9rem] hover:text-accent-hover hover:no-underline transition-colors">Work</a>
      <a href="/contact" class="text-muted text-[0.9rem] hover:text-accent-hover hover:no-underline transition-colors">Contact</a>
    </div>
  </div>
</nav>
```

**Notes:**
- `backdrop-filter: blur(12px)` → `backdrop-blur-md` (configured in tailwind.config)
- `z-index: 100` → `z-[100]` (arbitrary value)
- `gap: 2rem` → `gap-8`

---

## 2. Hero Section

### Before (global.css + index.astro)

```css
/* global.css */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 8rem 0 6rem;
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 900px;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: clamp(2.75rem, 5vw + 1rem, 4.5rem);
  font-weight: 800;
  line-height: 1.05;
  margin-bottom: 2rem;
  letter-spacing: -0.03em;
  background: linear-gradient(
    to bottom right,
    var(--hero-title-gradient-start) 30%,
    var(--hero-title-gradient-end) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeInUp 0.9s var(--ease-out-expo) both;
}

.hero-tagline {
  font-size: clamp(1.125rem, 1.5vw + 0.5rem, 1.375rem);
  color: var(--color-text-muted);
  margin-bottom: 3rem;
  max-width: 640px;
  line-height: 1.7;
  font-weight: 400;
  animation: fadeInUp 0.9s var(--ease-out-expo) 0.1s both;
}

.hero-actions {
  animation: fadeInUp 0.9s var(--ease-out-expo) 0.25s both;
}
```

```html
<!-- index.astro -->
<section class="hero">
  <div class="container">
    <div class="hero-content">
      <h1 class="hero-title">Your headline here</h1>
      <p class="hero-tagline">Your tagline here</p>
      <div class="hero-actions">
        <a href="/contact" class="btn btn-primary">Get started</a>
      </div>
    </div>
  </div>
</section>
```

### After (Tailwind utilities + custom CSS)

```html
<!-- index.astro -->
<section class="min-h-screen flex items-center py-32 pb-24 relative overflow-hidden">
  <!-- Background decorations kept as custom CSS -->
  <div class="hero-bg-glow" aria-hidden="true"></div>
  <div class="hero-grid-pattern" aria-hidden="true"></div>

  <div class="container">
    <div class="max-w-content relative z-10">
      <h1 class="hero-title">
        Your headline here
      </h1>
      <p class="text-hero-tagline text-muted mb-12 max-w-prose-narrow leading-loose font-normal animate-fade-in-up [animation-delay:0.1s]">
        Your tagline here
      </p>
      <div class="animate-fade-in-up [animation-delay:0.25s]">
        <a href="/contact" class="btn-primary">Get started</a>
      </div>
    </div>
  </div>
</section>
```

```css
/* custom.css - Keep gradient text as custom CSS */
.hero-title {
  font-size: clamp(2.75rem, 5vw + 1rem, 4.5rem);
  font-weight: 800;
  line-height: 1.05;
  margin-bottom: 2rem;
  letter-spacing: -0.03em;
  background: linear-gradient(
    to bottom right,
    var(--hero-title-gradient-start) 30%,
    var(--hero-title-gradient-end) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeInUp 0.9s var(--ease-out-expo) both;
}

/* Keep complex backgrounds as custom CSS */
.hero-bg-glow { /* ... */ }
.hero-grid-pattern { /* ... */ }
```

**Notes:**
- Gradient text kept as custom CSS (hard to express in Tailwind)
- Animations configured in tailwind.config and used with `animate-*`
- Animation delays use arbitrary values: `[animation-delay:0.1s]`

---

## 3. Button Styles

### Before (global.css)

```css
.btn {
  display: inline-block;
  padding: 0.875rem 2rem;
  background: var(--color-accent);
  color: var(--color-btn-text);
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background var(--duration-fast);
  border: none;
  cursor: pointer;
}

.btn:hover {
  background: var(--color-accent-hover);
  text-decoration: none;
}

.hero .btn-primary {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: var(--color-accent);
  color: var(--color-btn-text);
  border-radius: 0.625rem;
  font-weight: 600;
  font-size: 1.0625rem;
  letter-spacing: -0.01em;
  transition: all 0.3s var(--ease-out-expo);
  box-shadow:
    0 0 20px var(--color-accent-glow),
    0 0 60px var(--color-accent-glow),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-decoration: none;
}

.hero .btn-primary:hover {
  background: var(--color-accent-hover);
  box-shadow:
    0 0 30px var(--color-accent-glow-strong),
    0 0 80px var(--color-accent-glow),
    0 4px 16px var(--color-shadow),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  text-decoration: none;
}

.hero .btn-primary:active {
  transform: translateY(0);
  transition-duration: 0.1s;
}
```

### After (components.css with @apply)

```css
/* components.css */
@layer components {
  .btn {
    @apply inline-block px-8 py-3.5 bg-accent text-btn-text rounded-md font-medium transition-colors duration-fast border-0 cursor-pointer hover:bg-accent-hover hover:no-underline;
  }

  .btn-primary {
    @apply inline-block px-10 py-4 bg-accent text-btn-text rounded-lg font-semibold text-[1.0625rem] tracking-snug no-underline;
    @apply transition-all duration-[300ms] ease-out-expo;
    @apply shadow-glow hover:shadow-glow-hover hover:-translate-y-0.5 active:translate-y-0 active:duration-[100ms];
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
}
```

**Notes:**
- Common button pattern extracted to component class
- Complex shadows configured in tailwind.config
- Border with rgba can't use theme, so kept as direct CSS

---

## 4. Card Components

### Before (global.css)

```css
.work-card {
  display: block;
  text-decoration: none;
  color: inherit;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  overflow: hidden;
  transition:
    border-color 0.4s ease,
    transform 0.4s var(--ease-out-expo),
    box-shadow 0.4s ease;
}

.work-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px -8px var(--color-shadow);
  text-decoration: none;
}

.work-card-image {
  overflow: hidden;
  aspect-ratio: 16 / 10;
}

.work-card-content {
  padding: 2rem;
  border-top: 1px solid var(--color-border);
}

.work-card-title {
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 0.75rem;
  color: var(--color-text);
}

.work-card-desc {
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: 1.25rem;
}
```

### After (Tailwind utilities)

```html
<a href={study.link} class="block no-underline text-inherit bg-surface border border-border rounded-xl overflow-hidden transition-all duration-medium ease-out-expo hover:border-accent hover:-translate-y-0.5 hover:shadow-card-hover hover:no-underline">
  <div class="overflow-hidden aspect-hero">
    <img src={study.image} alt={study.title} class="w-full h-full object-cover" />
  </div>
  <div class="p-8 border-t border-border">
    <h3 class="text-22 font-bold tracking-snug mb-3 text-text">
      {study.title}
    </h3>
    <p class="text-muted leading-loose mb-5">
      {study.description}
    </p>
  </div>
</a>
```

**Notes:**
- `aspect-ratio: 16/10` → `aspect-hero` (configured as custom aspect ratio)
- Multiple transition properties → `transition-all`
- Custom shadow configured in tailwind.config as `shadow-card-hover`

---

## 5. Grid Layouts

### Before (global.css)

```css
.work-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .work-grid {
    grid-template-columns: 1fr;
  }
}

.diff-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

@media (max-width: 768px) {
  .diff-grid {
    grid-template-columns: 1fr;
  }
}
```

### After (Tailwind utilities)

```html
<!-- Work grid -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
  <!-- Cards -->
</div>

<!-- Diff grid -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
  <!-- Cards -->
</div>
```

**Notes:**
- Responsive grids use Tailwind's responsive modifiers
- `md:` prefix for breakpoint at 768px (Tailwind default)
- Much more concise than separate media queries

---

## 6. Form Inputs

### Before (contact.astro scoped styles)

```css
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.01em;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.8rem 1rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  color: var(--color-text);
  font-family: inherit;
  font-size: 1rem;
  transition: border-color var(--duration-fast) ease,
              box-shadow var(--duration-fast) ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-subtle);
}
```

### After (Tailwind utilities)

```html
<div class="flex flex-col gap-2">
  <label for="name" class="font-semibold text-[0.9rem] tracking-wide">Name</label>
  <input
    type="text"
    id="name"
    name="name"
    class="px-4 py-3 bg-bg border border-border rounded-md text-text font-inherit text-base transition-all duration-fast focus:outline-none focus:border-accent focus:shadow-focus"
  />
</div>
```

**Notes:**
- `shadow-focus` configured in tailwind.config
- `focus:` modifier for focus states
- No need for separate `:focus` CSS rule

---

## 7. Section Patterns

### Before (services.astro)

```css
.services-hero {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: 3.5rem 3rem;
  margin-bottom: 2.5rem;
  position: relative;
  overflow: hidden;
}

.services-hero-title {
  font-size: clamp(2.25rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.25rem;
  position: relative;
}

.services-hero-prose {
  max-width: 640px;
  position: relative;
}
```

### After (components.css + Tailwind)

```css
/* components.css */
@layer components {
  .hero-card {
    @apply bg-surface border border-border rounded-2xl p-14 mb-10 relative overflow-hidden;
  }
}
```

```html
<section class="hero-card">
  <h1 class="font-heading text-page-hero font-extrabold leading-snug mb-5 relative">
    Services
  </h1>
  <div class="max-w-prose-narrow relative">
    <p class="text-lg text-muted leading-loose">
      Your intro text here
    </p>
  </div>
</section>
```

**Notes:**
- Repeated hero pattern extracted to `.hero-card` component
- Responsive font size uses custom `text-page-hero` (clamp value)
- Reused across services, work, and contact pages

---

## 8. Responsive Typography

### Before (global.css)

```css
.section-problem-title {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
}

.section-problem-prose {
  max-width: 680px;
  font-size: clamp(1.125rem, 1.5vw + 0.5rem, 1.3125rem);
  color: var(--color-text-muted);
  line-height: 1.85;
  margin-bottom: 3rem;
}
```

### After (Tailwind utilities)

```html
<h2 class="font-heading text-section-title font-bold tracking-tight text-text">
  Problem Title
</h2>

<div class="max-w-prose text-section-prose text-muted leading-extra-loose mb-12">
  <p>Problem description...</p>
</div>
```

**Notes:**
- Custom responsive font sizes configured as `text-section-title`, `text-section-prose`
- Custom line-height `leading-extra-loose` for 1.85
- Max-widths use prose scale from config

---

## 9. Data Attribute Selectors (Keep as Custom CSS)

### Before (global.css + index.astro)

```css
.process-panel[data-active="0"] .process-nav-item[data-index="0"],
.process-panel[data-active="1"] .process-nav-item[data-index="1"],
.process-panel[data-active="2"] .process-nav-item[data-index="2"],
.process-panel[data-active="3"] .process-nav-item[data-index="3"] {
  padding-left: 0.5rem;
}

.process-panel[data-active="0"] .process-nav-item[data-index="0"] .process-nav-number,
.process-panel[data-active="1"] .process-nav-item[data-index="1"] .process-nav-number,
.process-panel[data-active="2"] .process-nav-item[data-index="2"] .process-nav-number,
.process-panel[data-active="3"] .process-nav-item[data-index="3"] .process-nav-number {
  color: var(--color-pop);
}
```

### After (Keep as custom CSS)

**DON'T migrate these.** Keep in `custom.css` or component `<style>` block:

```css
/* custom.css or index.astro <style> */
.process-panel[data-active="0"] .process-nav-item[data-index="0"],
.process-panel[data-active="1"] .process-nav-item[data-index="1"],
.process-panel[data-active="2"] .process-nav-item[data-index="2"],
.process-panel[data-active="3"] .process-nav-item[data-index="3"] {
  padding-left: 0.5rem;
}

/* etc. */
```

**Reasoning:**
- Complex data-attribute selectors are hard to express in Tailwind
- Would require writing arbitrary variants: `data-[active=0]:pl-2`
- More maintainable as traditional CSS
- Can still use Tailwind for base styles, custom CSS for interactive states

---

## 10. Tech Tags (Before: Duplicate, After: Unified)

### Before (2 separate implementations)

```css
/* global.css */
.work-tech-tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: var(--color-bg);
  border-radius: 9999px;
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}

/* CaseStudyCard.astro */
.tech-tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: var(--color-bg);
  border-radius: 9999px;
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}
```

### After (Unified component class)

```css
/* components.css */
@layer components {
  .tech-tag {
    @apply text-xs px-3 py-1 bg-bg rounded-full text-muted font-mono;
  }
}
```

```html
<!-- Usage anywhere -->
<span class="tech-tag">React</span>
<span class="tech-tag">Astro</span>
```

**Notes:**
- Eliminates duplication
- Single source of truth
- Can be used across all pages

---

## Summary: Migration Strategy

### ✅ Convert to Tailwind Utilities
- Layout (flex, grid, spacing)
- Typography (sizes, weights, colors)
- Borders, backgrounds, simple shadows
- Simple transitions and hovers
- Responsive design

### 🟡 Extract to Component Classes (@apply)
- Repeated button patterns
- Card patterns used multiple times
- Form input styling

### 🔴 Keep as Custom CSS
- Complex gradients (especially with CSS variables)
- SVG animations with keyframes
- Data-attribute selectors with complex logic
- Noise textures and decorative backgrounds
- Global theme transitions (`*` selector)

---

## Testing Checklist

After each conversion:
- [ ] Visual appearance matches original
- [ ] Hover/focus states work
- [ ] Responsive behavior intact
- [ ] Theme switching still works
- [ ] No console errors
- [ ] Animations play correctly

---

**Happy migrating! 🎨**
