# Plan: Content Collections for Homepage & Services Page

## Context

The homepage currently has hardcoded placeholder content. New copy exists in `docs/homepage.md` and `docs/services.md`. The goal is to move page content into Astro Content Collections so each section is a separate `.md` file — easy to maintain and edit — while the templates handle layout and styling.

## Approach

Use Astro's Content Collections (same system as the existing `blog` collection) to define `homepage` and `services` collections. Each major page section becomes one `.md` file with frontmatter for structured data and markdown body for prose. Page templates query collections, sort by `order`, and render each section conditionally.

---

## Step 1: Update content config

**Modify:** `src/content.config.ts`

Add `homepage` and `services` collections alongside existing `blog`:

- **homepage schema** — `section` (string), `order` (number), `heading` (string), optional: `subheading`, `intro`, `cta_text`, `cta_link`, `items` (array of `{title, description}`)
- **services schema** — `section` (string), `order` (number), `heading` (string), optional: `subheading`, `intro`, `cta_text`, `cta_link`

## Step 2: Create homepage content files

**Create:** `src/content/homepage/` with 6 files:

| File | Section | Content approach |
|------|---------|-----------------|
| `01-hero.md` | hero | Frontmatter only (heading, subheading, cta) |
| `02-problem.md` | problem | Heading in frontmatter, paragraph as markdown body |
| `03-differentiators.md` | differentiators | Heading + `items` array in frontmatter (4 title/description pairs) |
| `04-process.md` | process | Heading + `items` array in frontmatter (4 numbered steps) |
| `05-work.md` | work | Heading + `intro` in frontmatter (case study cards rendered separately) |
| `06-cta.md` | cta | Heading + cta in frontmatter, body copy as markdown body |

All content sourced directly from `docs/homepage.md`. Hero CTA links to `#contact` (anchors to the CTA section at page bottom). The bottom CTA section gets `id="contact"` and a `mailto:` link.

## Step 3: Create services content files

**Create:** `src/content/services/` with 5 files:

| File | Section | Content approach |
|------|---------|-----------------|
| `01-intro.md` | intro | Heading in frontmatter, body text as markdown |
| `02-quick-sites.md` | quick-sites | Heading in frontmatter, full prose (subsections, payment options) as markdown body |
| `03-custom-builds.md` | custom-builds | Heading in frontmatter, full prose as markdown body |
| `04-everything-else.md` | everything-else | Heading in frontmatter, intro as markdown body |
| `05-cta.md` | cta | Heading + cta in frontmatter, one-liner as markdown body |

Services sections are prose-heavy, so markdown body is the natural fit. The rendered HTML gets styled via scoped `:global()` selectors (same pattern as blog posts in `src/pages/blog/[slug].astro`).

## Step 4: Rewrite homepage template

**Modify:** `src/pages/index.astro`

- Query `homepage` collection with `getCollection('homepage')`, sort by `order`
- Pre-render all entries with `render()` to get `<Content />` components
- Loop through sections, rendering each conditionally based on `section` field:
  - `hero` → full-viewport hero with heading, subheading, CTA button
  - `problem` → section with heading + `<Content />` prose
  - `differentiators` → section with heading + 4 item cards in a grid
  - `process` → section with heading + 4 numbered step cards
  - `work` → section with heading, intro text, + existing case study cards
  - `cta` → section with heading + `<Content />` prose + CTA button
- Keep existing case studies array hardcoded for now (not in scope to migrate)
- Keep footer with dynamic year

## Step 5: Create services page

**Create:** `src/pages/services.astro`

- Query `services` collection, sort by `order`
- Render each section:
  - `intro` → page header with heading + `<Content />` body
  - `quick-sites` / `custom-builds` → service blocks with heading + rendered markdown body (subsections styled via `:global()`)
  - `everything-else` → heading + `<Content />` intro prose
  - `cta` → heading + `<Content />` one-liner + CTA button
- Use scoped `<style>` with `:global()` for markdown content styling (matches blog post pattern)

## Step 6: Add CSS for new sections

**Modify:** `src/styles/global.css`

New styles needed:
- `.section-prose` — max-width constrained prose block for problem/CTA text
- `.items-grid` + `.item-card` — 2×2 responsive grid for differentiator cards
- `.process-grid` + `.process-card` — numbered step cards with CSS counter (`01`, `02`, etc.)
- `.service-block` + `.service-content` — service section layout with border separators
- Responsive rules for new grids at 768px breakpoint

Reuses existing: `.hero`, `.hero-title`, `.hero-tagline`, `.section`, `.section-title`, `.container`, `.btn`, `.case-studies-grid`, `.footer`

## Step 7: Update navigation

**Modify:** `src/components/Nav.astro`

Replace "About" with "Services": `<a href="/services">Services</a>` — placed between "Work" and "Blog".

Updated nav: **Work** (`/#work`) · **Services** (`/services`) · **Blog** (`/blog`)

---

## Files summary

**Create (12 files):**
- `src/content/homepage/01-hero.md` through `06-cta.md` (6 files)
- `src/content/services/01-intro.md` through `05-cta.md` (5 files)
- `src/pages/services.astro` (1 file)

**Modify (4 files):**
- `src/content.config.ts` — add homepage + services collection schemas
- `src/pages/index.astro` — rewrite to use content collections
- `src/styles/global.css` — add new section styles
- `src/components/Nav.astro` — add Services link, remove About anchor

**Unchanged:** `Base.astro`, `CaseStudyCard.astro`, `BlogPostCard.astro`, blog pages, config files

## Verification

1. `npm run dev` — confirm no schema validation errors on startup
2. Homepage renders all 6 sections with correct content from .md files
3. Services page renders at `/services` with all 5 sections
4. Nav links work: Work → `/#work`, Services → `/services`, Blog → `/blog`
5. Responsive layout works at mobile breakpoint (768px)
6. `npm run build` — clean static build with no errors
