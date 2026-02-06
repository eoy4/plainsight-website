---
title: Static Site Generation in Astro
description: How Astro builds fast websites through static generation and when to use it.
date: 2026-02-10
author: Plain Sight Team
---

Static Site Generation (SSG) is Astro's default rendering mode. Understanding how it works helps you build faster, more reliable websites.

## What is Static Generation?

Static generation means your pages are built once, at build time, then served as plain HTML files.

```
Build Time:
  Content + Templates → HTML Files

Request Time:
  Browser → CDN → HTML File (instant!)
```

No server processing, no database queries, no rendering delays. Just files served from the edge.

## When to Use Static Generation

SSG excels for:

- Marketing and landing pages
- Documentation sites
- Blogs and news sites
- E-commerce product pages
- Portfolio websites

The key question: Does this content change per-request? If not, generate it statically.

## Dynamic Routes with getStaticPaths

For pages like `/blog/[slug]`, Astro needs to know all possible values at build time:

```astro
---
// src/pages/blog/[slug].astro
export async function getStaticPaths() {
  const posts = await getCollection('blog');

  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
---

<h1>{post.data.title}</h1>
```

This generates a static HTML file for every blog post. No server needed at runtime.

## Data Fetching at Build Time

Astro's frontmatter runs during the build, so you can fetch external data:

```astro
---
// This runs at build time, not on every request
const response = await fetch('https://api.example.com/products');
const products = await response.json();
---

{products.map(product => (
  <div>{product.name}</div>
))}
```

The API is called once during build. Users get instant static HTML.

## Incremental Builds

For large sites, rebuilding everything on each change is slow. Strategies to help:

1. **Content-only changes** — Only rebuild affected pages
2. **Caching** — Cache API responses between builds
3. **Pagination** — Split large collections across pages

```astro
---
export async function getStaticPaths({ paginate }) {
  const posts = await getCollection('blog');
  return paginate(posts, { pageSize: 10 });
}
---
```

## Hybrid Rendering

Sometimes you need both static and dynamic. Astro supports hybrid mode:

```javascript
// astro.config.mjs
export default defineConfig({
  output: 'hybrid',
});
```

Then mark specific pages for server rendering:

```astro
---
export const prerender = false;
// This page renders on each request
---
```

Use this sparingly—static is almost always faster.

## Performance Benefits

Static sites are inherently fast:

| Metric | Static | Dynamic |
|--------|--------|---------|
| TTFB | ~50ms | ~200ms+ |
| No DB | ✓ | ✗ |
| CDN Cache | 100% | Varies |
| Scaling | Infinite | Limited |

A static page from a CDN is as fast as it gets on the web.

## Build Optimization

Keep builds fast:

```javascript
// astro.config.mjs
export default defineConfig({
  build: {
    // Skip type checking (do it separately)
    skip: ['typescript'],
  },
  vite: {
    build: {
      // Increase chunk size warning
      chunkSizeWarningLimit: 1000,
    },
  },
});
```

## The Static-First Mindset

Think static first, add dynamic only when needed:

1. Can this be pre-rendered? → SSG
2. Does it change per-user? → Client-side fetch
3. Must it be fresh? → Server rendering (hybrid)

Most content fits category 1. That's the web Astro is built for.
