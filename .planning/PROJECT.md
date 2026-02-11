# Front Page Bold Redesign

## What This Is

A visual redesign of the Plain Sight agency homepage, focused on making the hero section dramatically bolder with dominating, viewport-filling typography inspired by the Frisk agency template. The rest of the page gets polished to match the elevated boldness of the new hero.

## Core Value

The hero headline must feel massive, confident, and impossible to ignore — dominating the viewport with sheer typographic scale.

## Requirements

### Validated

- The existing Astro 5 static site architecture (pages, layouts, content collections)
- Dark theme default with CSS custom properties
- Tailwind v4 utility-based styling
- Content-driven homepage via `src/content/homepage/` markdown files
- Hero section with heading, subheading/tagline, and CTA button
- Sections: hero, problem, differentiators, process, basics, work, CTA
- Responsive design with mobile overrides
- Gradient title treatment and glow effects in hero
- Interactive process section with hover navigation

### Active

- [ ] Giant, viewport-dominating hero typography (dramatically larger than current `clamp(2.75rem, 5vw + 1rem, 4.5rem)`)
- [ ] Hero headline fills the width, feels commanding and confident
- [ ] Tagline and CTA remain but are clearly secondary to the massive headline
- [ ] Other front page sections polished to match the bolder hero aesthetic
- [ ] Maintain current content (headline text from CMS stays the same)
- [ ] Keep existing dark theme and color system

### Out of Scope

- New page sections or content restructuring — layout stays the same
- Other pages (services, work, contact, blog) — front page only
- New animations or scroll-triggered effects beyond what exists
- Content changes — same headline, tagline, CTA text
- Mobile-first redesign — adjust mobile to work, but desktop impact is the priority

## Context

- Current hero font size maxes out at `4.5rem` — needs to go significantly bigger (think 8-12vw range)
- Heading font is "Darker Grotesque" (a display font designed for large sizes — perfect for this)
- The Frisk template uses oversized headlines that fill the viewport width as the signature bold element
- Current hero is constrained to `max-w-[900px]` — may need to widen or remove that constraint
- Tailwind v4 theme tokens in `src/styles/tailwind.css` define all responsive font sizes via `--text-*` custom properties

## Constraints

- **Tech stack**: Astro 5 + Tailwind v4 — no new dependencies
- **Content system**: Hero text comes from `src/content/homepage/01-hero.md` frontmatter — don't hardcode
- **Compatibility**: Must work across modern browsers, graceful on mobile
- **Performance**: No heavy assets — typography-only impact

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keep tagline + CTA in hero | User wants bold headline but full hero content preserved | -- Pending |
| Hero-focused with page polish | Not a full redesign, but sections should feel cohesive with bolder hero | -- Pending |
| Dominating scale approach | User chose sheer size over split-line or mixed-weight treatments | -- Pending |

---
*Last updated: 2026-02-10 after initialization*
