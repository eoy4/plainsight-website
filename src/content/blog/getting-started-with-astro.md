---
title: Getting Started with Astro
description: Discover Astro, the modern web framework for building fast, content-focused websites.
date: 2026-02-01
author: Plain Sight Team
---

Astro is a modern web framework designed for building fast, content-focused websites. It takes a different approach than traditional JavaScript frameworks by shipping zero JavaScript by default.

## Why Astro?

Astro stands out with its unique approach:

- **Zero JS by default** — Pages ship as static HTML unless you need interactivity
- **Island architecture** — Hydrate only the components that need JavaScript
- **Framework agnostic** — Use React, Vue, Svelte, or just HTML
- **Content Collections** — Type-safe content management built-in

## Creating Your First Astro Project

Getting started is simple:

```bash
npm create astro@latest
```

The CLI will guide you through setup, letting you choose a template and configure TypeScript.

## Project Structure

Astro projects follow a clear convention:

```
src/
├── pages/          # File-based routing
├── components/     # Reusable components
├── layouts/        # Page layouts
├── content/        # Content collections
└── styles/         # Global styles
public/             # Static assets
```

Pages in `src/pages/` automatically become routes. `about.astro` becomes `/about`.

## The Astro Component

Astro components use a simple structure:

```astro
---
// Frontmatter: JavaScript runs at build time
const title = "Hello World";
---

<!-- Template: HTML with JSX-like expressions -->
<h1>{title}</h1>

<style>
  /* Scoped styles by default */
  h1 { color: blue; }
</style>
```

The frontmatter section runs at build time, not in the browser. This is key to Astro's performance model.

## Content Collections

For structured content like blog posts, Astro provides Content Collections:

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});
```

This gives you type-safe content with validation—no more runtime errors from missing fields.

## Next Steps

Once you understand the basics:

- Add interactive islands with your favorite framework
- Explore dynamic routes with `[slug].astro`
- Set up RSS feeds and sitemaps
- Deploy to any static host or edge platform

Astro's philosophy is to give you what you need without the complexity you don't.
