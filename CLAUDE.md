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
- **Styling:** Single global CSS file (`src/styles/global.css`) with CSS custom properties, no CSS framework
- **TypeScript:** Strict mode (`astro/tsconfigs/strict`)
- **Deployment:** Vercel

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

## Conventions

- Components are `.astro` files — no framework integrations (React, etc.)
- Blog posts are Markdown in `src/content/blog/` using Astro Content Collections with Zod schemas
- CSS uses custom properties defined in `:root` (e.g., `--color-bg`, `--color-accent`)
- Dark theme by default (background: `#0a0a0a`)
- Global styles imported via `<style is:global>` in Base.astro
