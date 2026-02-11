# Tailwind Config Starter

This is a starting point for `tailwind.config.mjs` based on the CSS audit.

---

## Full Configuration

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

  darkMode: ['class', '[data-theme="dark"]'],

  theme: {
    extend: {
      // ═══════════════════════════════════════════════════
      // COLORS
      // ═══════════════════════════════════════════════════
      colors: {
        // Background colors
        bg: 'var(--color-bg)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          raised: 'var(--color-surface-raised)',
        },

        // Border colors
        border: {
          DEFAULT: 'var(--color-border)',
          subtle: 'var(--color-border-subtle)',
        },

        // Text colors
        text: {
          DEFAULT: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
          dim: 'var(--color-text-dim)',
        },

        // Accent colors
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          subtle: 'var(--color-accent-subtle)',
          glow: 'var(--color-accent-glow)',
          'glow-strong': 'var(--color-accent-glow-strong)',
        },

        // Pop colors (secondary accent)
        pop: {
          DEFAULT: 'var(--color-pop)',
          hover: 'var(--color-pop-hover)',
          glow: 'var(--color-pop-glow)',
        },

        // Utility colors
        nav: 'var(--color-nav-bg)',
        shadow: 'var(--color-shadow)',
        'shadow-strong': 'var(--color-shadow-strong)',
        'btn-text': 'var(--color-btn-text)',

        // Hero-specific
        hero: {
          'glow-1': 'var(--color-hero-glow-1)',
          'glow-2': 'var(--color-hero-glow-2)',
        },
      },

      // ═══════════════════════════════════════════════════
      // TYPOGRAPHY
      // ═══════════════════════════════════════════════════
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Darker Grotesque', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'Fira Code', 'monospace'],
      },

      fontSize: {
        // Standard sizes
        'xs': '0.75rem',        // 12px - tags, small labels
        'sm': '0.875rem',       // 14px - footer text
        'base': '1rem',         // 16px - base text
        'lg': '1.125rem',       // 18px - larger body text
        'xl': '1.25rem',        // 20px - card titles
        '2xl': '1.5rem',        // 24px - section headings
        '3xl': '1.75rem',       // 28px - page titles (min)
        '4xl': '2.25rem',       // 36px - hero titles (min)
        '5xl': '3rem',          // 48px - large titles
        '6xl': '4rem',          // 64px - hero titles (max)

        // Custom sizes from audit
        '13': '0.8125rem',      // 13px - section labels
        '15': '0.9375rem',      // 15px - card descriptions
        '17': '1.0625rem',      // 17px - emphasized body
        '21': '1.3125rem',      // 21px - large prose
        '22': '1.375rem',       // 22px - work card titles
        '26': '1.625rem',       // 26px - problem kicker
        '36': '2.25rem',        // 36px - case study titles
        '48': '3rem',           // 48px - detail numbers
        '72': '4.5rem',         // 72px - hero max

        // Responsive sizes (using clamp)
        'hero': 'clamp(2.75rem, 5vw + 1rem, 4.5rem)',
        'hero-tagline': 'clamp(1.125rem, 1.5vw + 0.5rem, 1.375rem)',
        'section-title': 'clamp(1.75rem, 3vw, 2.5rem)',
        'section-prose': 'clamp(1.125rem, 1.5vw + 0.5rem, 1.3125rem)',
        'section-kicker': 'clamp(1.125rem, 1.5vw + 0.5rem, 1.625rem)',
        'cta-title': 'clamp(2rem, 4vw, 3rem)',
        'page-hero': 'clamp(2.25rem, 6vw, 4rem)',
        'service-title': 'clamp(1.5rem, 3vw, 2rem)',
        'case-study-title': 'clamp(1.75rem, 3vw, 2.25rem)',
        'service-tagline': 'clamp(0.9rem, 1.3vw, 1.05rem)',
      },

      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },

      letterSpacing: {
        tighter: '-0.03em',
        tight: '-0.02em',
        snug: '-0.01em',
        normal: '0',
        wide: '0.01em',
        wider: '0.05em',
        widest: '0.1em',
      },

      lineHeight: {
        tight: '1.05',
        snug: '1.1',
        relaxed: '1.6',
        loose: '1.7',
        'extra-loose': '1.85',
      },

      // ═══════════════════════════════════════════════════
      // SPACING
      // ═══════════════════════════════════════════════════
      spacing: {
        // Standard Tailwind spacing is good, but add custom values
        '4.5': '1.125rem',    // 18px
        '13': '3.25rem',      // 52px
        '15': '3.75rem',      // 60px
        '17': '4.25rem',      // 68px
        '18': '4.5rem',       // 72px
        '22': '5.5rem',       // 88px
        '26': '6.5rem',       // 104px
        '30': '7.5rem',       // 120px
        '34': '8.5rem',       // 136px

        // Section spacing (using clamp)
        'section': 'clamp(5rem, 8vw, 8rem)',
      },

      // ═══════════════════════════════════════════════════
      // LAYOUT
      // ═══════════════════════════════════════════════════
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1200px', // Max width from audit
        },
      },

      maxWidth: {
        'prose-narrow': '640px',
        'prose': '680px',
        'prose-wide': '720px',
        'content': '900px',
        'container': '1200px',
      },

      // ═══════════════════════════════════════════════════
      // BORDERS
      // ═══════════════════════════════════════════════════
      borderRadius: {
        'sm': '0.25rem',      // 4px
        'DEFAULT': '0.5rem',  // 8px
        'md': '0.5rem',       // 8px
        'lg': '0.625rem',     // 10px - CTA buttons
        'xl': '0.75rem',      // 12px - cards, images
        '2xl': '1rem',        // 16px - large cards
        'full': '9999px',     // pill shapes
      },

      // ═══════════════════════════════════════════════════
      // SHADOWS
      // ═══════════════════════════════════════════════════
      boxShadow: {
        // Standard shadows
        'sm': '0 1px 2px var(--color-shadow)',
        'DEFAULT': '0 4px 8px var(--color-shadow)',
        'md': '0 8px 16px var(--color-shadow)',
        'lg': '0 16px 32px var(--color-shadow)',

        // Custom shadows from audit
        'card-hover': '0 8px 32px -8px var(--color-shadow)',

        // Glow effects (for buttons)
        'glow': '0 0 20px var(--color-accent-glow), 0 0 60px var(--color-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glow-hover': '0 0 30px var(--color-accent-glow-strong), 0 0 80px var(--color-accent-glow), 0 4px 16px var(--color-shadow), inset 0 1px 0 rgba(255, 255, 255, 0.15)',

        // Focus ring
        'focus': '0 0 0 3px var(--color-accent-subtle)',
      },

      // ═══════════════════════════════════════════════════
      // TRANSITIONS
      // ═══════════════════════════════════════════════════
      transitionDuration: {
        fast: '200ms',
        medium: '400ms',
        slow: '700ms',
      },

      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },

      // ═══════════════════════════════════════════════════
      // ANIMATIONS
      // ═══════════════════════════════════════════════════
      keyframes: {
        'fade-in-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(24px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'subtle-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },

      animation: {
        'fade-in-up': 'fade-in-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'subtle-float': 'subtle-float 12s ease-in-out infinite',
      },

      // ═══════════════════════════════════════════════════
      // BACKDROP
      // ═══════════════════════════════════════════════════
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '12px',
        md: '12px',
        lg: '16px',
      },

      // ═══════════════════════════════════════════════════
      // ASPECT RATIOS
      // ═══════════════════════════════════════════════════
      aspectRatio: {
        'hero': '16 / 10',
      },
    },
  },

  plugins: [],
}
```

---

## CSS Variables Setup

You'll still need CSS variables for theme switching. Add this to `src/styles/custom.css`:

```css
:root {
  /* Typography */
  --font-sans: 'Manrope', system-ui, -apple-system, sans-serif;
  --font-heading: 'Darker Grotesque', system-ui, -apple-system, sans-serif;
  --font-mono: ui-monospace, 'Fira Code', monospace;

  /* Transitions */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --duration-fast: 0.2s;
  --duration-medium: 0.4s;
  --duration-slow: 0.7s;
}

/* Light Theme (Default) */
[data-theme="light"] {
  --color-bg: #FFFFFF;
  --color-surface: #FFFFFF;
  --color-surface-raised: #FCFAF7;

  --color-border: #E8E0D8;
  --color-border-subtle: #F0EBE6;

  --color-text: #2D3142;
  --color-text-muted: rgba(45, 49, 66, 0.65);
  --color-text-dim: rgba(45, 49, 66, 0.40);

  --color-accent: #D97642;
  --color-accent-hover: #E07A5F;
  --color-accent-subtle: #FADEC9;
  --color-accent-glow: rgba(217, 118, 66, 0.12);
  --color-accent-glow-strong: rgba(217, 118, 66, 0.20);

  --color-pop: #E07A5F;
  --color-pop-hover: #D97642;
  --color-pop-glow: rgba(224, 122, 95, 0.15);

  --color-nav-bg: rgba(255, 255, 255, 0.85);
  --color-shadow: rgba(45, 49, 66, 0.08);
  --color-shadow-strong: rgba(45, 49, 66, 0.15);
  --color-btn-text: #FFFFFF;

  --color-hero-glow-1: rgba(244, 162, 97, 0.08);
  --color-hero-glow-2: rgba(244, 162, 97, 0.04);
  --hero-fog-blend: multiply;
  --hero-fog-opacity: 0.05;
  --hero-title-gradient-start: #2D3142;
  --hero-title-gradient-end: rgba(45, 49, 66, 0.70);
}

/* Dark Theme */
[data-theme="dark"] {
  --color-bg: #040F12;
  --color-surface: #0A2428;
  --color-surface-raised: #0D2428;

  --color-border: #1A4A52;
  --color-border-subtle: #0F2E33;

  --color-text: #FAFAFA;
  --color-text-muted: rgba(255, 255, 255, 0.65);
  --color-text-dim: rgba(255, 255, 255, 0.40);

  --color-accent: #0D7377;
  --color-accent-hover: #078C94;
  --color-accent-subtle: #0A3A3D;
  --color-accent-glow: rgba(13, 115, 119, 0.18);
  --color-accent-glow-strong: rgba(7, 140, 148, 0.28);

  --color-pop: #B8F545;
  --color-pop-hover: #A8E535;
  --color-pop-glow: rgba(184, 245, 69, 0.18);

  --color-nav-bg: rgba(4, 15, 18, 0.85);
  --color-shadow: rgba(0, 0, 0, 0.35);
  --color-shadow-strong: rgba(0, 0, 0, 0.55);
  --color-btn-text: #FFFFFF;

  --color-hero-glow-1: rgba(13, 115, 119, 0.25);
  --color-hero-glow-2: rgba(13, 115, 119, 0.10);
  --hero-fog-blend: screen;
  --hero-fog-opacity: 0.14;
  --hero-title-gradient-start: #FFFFFF;
  --hero-title-gradient-end: rgba(255, 255, 255, 0.75);
}

/* Global theme transition */
*,
*::before,
*::after {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
```

---

## Import Order in Base.astro

```astro
<style is:global>
  @import "../styles/custom.css";      /* CSS variables, theme colors, global transitions */
  @import "tailwindcss/base";          /* Tailwind base reset */
  @import "tailwindcss/components";    /* Tailwind components layer */
  @import "../styles/components.css";  /* Your custom components with @apply */
  @import "tailwindcss/utilities";     /* Tailwind utilities */
</style>
```

---

## Usage Examples

### Colors
```html
<!-- Background -->
<div class="bg-surface border border-border">
<div class="bg-surface-raised">

<!-- Text -->
<p class="text-text">Normal text</p>
<p class="text-muted">Muted text</p>
<p class="text-dim">Dimmed text</p>

<!-- Accent -->
<button class="bg-accent hover:bg-accent-hover text-btn-text">
```

### Typography
```html
<!-- Responsive hero title -->
<h1 class="font-heading text-hero font-extrabold leading-tight tracking-tighter">

<!-- Section title -->
<h2 class="font-heading text-section-title font-bold tracking-tight">

<!-- Body text -->
<p class="text-lg text-muted leading-loose">
```

### Layout
```html
<!-- Container -->
<div class="container">

<!-- Section spacing -->
<section class="py-section">

<!-- Grid -->
<div class="grid grid-cols-2 gap-8">
```

### Components
```html
<!-- Button with glow -->
<button class="px-10 py-4 bg-accent text-btn-text rounded-lg font-semibold shadow-glow hover:shadow-glow-hover hover:-translate-y-0.5 transition-all duration-medium ease-out-expo">

<!-- Card -->
<div class="bg-surface border border-border rounded-xl p-10 hover:border-accent hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-medium">
```

---

## Notes

1. **CSS Variables Strategy:** Colors use CSS variables to enable theme switching
2. **Custom Values:** All values from the audit are included
3. **Responsive Typography:** Clamp-based sizes are preserved
4. **Animations:** Only used animations are included
5. **Extensible:** Easy to add more utilities as needed

---

**Ready to use in Phase 1 of the migration roadmap.**
