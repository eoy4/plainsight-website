# CLAUDE.md

## Project Overview

Plain Sight agency website built with Astro 5. Static site deployed to Vercel.

## Commands

- `npm run dev` — Start dev server (localhost:4321)
- `npm run build` — Production build to `./dist/`
- `npm run preview` — Preview production build locally
- `npm run deploy:prod` — Deploy to Vercel production
- `npm run deploy:preview` — Deploy Vercel preview

## Architecture

- **Framework:** Astro 5 (static output, no SSR)
- **Styling:** Tailwind CSS v4 (`src/styles/tailwind.css` + `src/styles/custom.css` for color tokens)
- **TypeScript:** Strict mode (`astro/tsconfigs/strict`)
- **Deployment:** Vercel


## Conventions (Astro)

- Components are `.astro` files — no framework integrations (React, etc.)
- Blog posts are Markdown in `src/content/blog/` using Astro Content Collections with Zod schemas
- CSS uses custom properties defined in `:root` (e.g., `--color-bg`, `--color-accent`)
- Global styles imported via `<style is:global>` in Base.astro

## Project Structure

```
src/
├── components/     # Astro components (Nav, CaseStudyCard, BlogPostCard)
├── content/
│   └── blog/       # Markdown blog posts (Content Collections)
├── layouts/        # Base.astro — single HTML layout with <slot />
├── pages/          # File-based routing (index, blog/index, blog/[slug])
├── styles/         # global.css
└── content.config.ts  # Blog collection schema (title, description, date, author)
```

## Styling Standards

**CRITICAL:** All styling MUST use Tailwind v4 utility classes only.

- ✅ Tailwind utilities: `flex`, `px-6`, `bg-primary`, `text-2xl`
- ❌ Custom CSS classes in `<style>` blocks
- ❌ Inline styles (`style=""` attribute)
- ❌ Hex codes directly (use color tokens: `bg-primary` not `bg-[#14A8B0]`)

**Custom CSS only allowed in:**
- `src/styles/custom.css` — Color token definitions only
- `src/styles/tailwind.css` — Tailwind config (`@theme`, `@layer`) only

**Before making style changes:** Use Context7 to get current Tailwind v4 documentation and guidelines.

## Context7 Integration

**REQUIRED:** Always use Context7 MCP tools before planning or implementing code involving external libraries or frameworks (including Tailwind):

1. Use `resolve-library-id` to get the correct library identifier
2. Use `query-docs` to pull current documentation
3. Base all code on retrieved documentation, not training data

This is mandatory for Tailwind v4, Astro, and any other library usage.