# Front Page Bold Redesign

## What This Is

A visual redesign of the Plain Sight agency homepage featuring viewport-dominating hero typography at 8rem (128px) scale, scroll-driven animations, and proportionally scaled section typography — all built on Astro 5 + Tailwind v4 with full accessibility compliance.

## Core Value

The hero headline must feel massive, confident, and impossible to ignore — dominating the viewport with sheer typographic scale.

## Requirements

### Validated

- ✓ Giant, viewport-dominating hero typography at 8rem scale with fluid clamp() — v1.0
- ✓ Hero headline fills width, feels commanding and confident — v1.0
- ✓ Tagline and CTA clearly secondary to massive headline — v1.0
- ✓ All front page sections polished to match bolder hero aesthetic — v1.0
- ✓ Current content maintained (headline text from CMS) — v1.0
- ✓ Dark theme and color system preserved — v1.0
- ✓ WCAG-compliant zoom via rem bounds in clamp() — v1.0
- ✓ Mobile stability with svh viewport units — v1.0
- ✓ Gradient text treatment preserved with @supports fallback — v1.0
- ✓ Scroll-driven animations on below-fold sections — v1.0
- ✓ Hero font preloaded to prevent CLS — v1.0
- ✓ Variable font (Darker Grotesque 300-900) — v1.0

### Active

(None — v1.0 complete. Define new requirements with `/gsd:new-milestone`)

### Out of Scope

- Other pages redesign — front page only; services, work, contact, blog unchanged
- New sections or content restructuring — layout stays the same
- Content changes — same headline, tagline, CTA text
- Self-hosting fonts — kept Google Fonts CDN for exploration flexibility
- Component extraction (Hero.astro) — architecture improvement deferred

## Context

Shipped v1.0 with 3 phases (4 plans) over 7 days. 16 files modified (+2,279 / -73 lines).
Tech stack: Astro 5, Tailwind v4, CSS scroll-timeline + Intersection Observer fallback.
Hero scales from 3rem (mobile) to 8rem (desktop) via `clamp(3rem, 10vw, 8rem)`.
Font: Darker Grotesque variable (Google Fonts CDN with preload hint).

## Constraints

- **Tech stack**: Astro 5 + Tailwind v4 — no new dependencies
- **Content system**: Hero text comes from `src/content/homepage/01-hero.md` frontmatter
- **Compatibility**: Modern browsers, graceful on mobile
- **Performance**: Typography-only impact, no heavy assets

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keep tagline + CTA in hero | User wants bold headline but full hero content preserved | ✓ Good |
| Hero-focused with page polish | Not a full redesign, but sections feel cohesive with bolder hero | ✓ Good |
| Dominating scale approach | User chose sheer size over split-line or mixed-weight treatments | ✓ Good |
| Max headline 8rem (not 9rem) | Prevents orphaned words at large scale | ✓ Good |
| Line-height 0.85 | Tighter headline feel at large scale per user preference | ✓ Good |
| Vertically centered (not bottom-aligned) | User preferred centered over editorial bottom alignment | ✓ Good |
| Preload only hero font | Body font (Manrope) not CLS-critical; hero font is LCP-critical | ✓ Good |
| Keep Google Fonts CDN | Easy font swapping during exploration phase; self-host later | ⚠️ Revisit |
| CSS scroll-timeline + IO fallback | Native performance on Chrome/Safari, graceful fallback for Firefox | ✓ Good |
| Section titles font-extrabold (800) | Bolder presence to match scaled hero per user preference | ✓ Good |
| Expanded content scaling scope | User feedback required scaling all content text, not just headings | ✓ Good |

---
*Last updated: 2026-02-12 after v1.0 milestone*
