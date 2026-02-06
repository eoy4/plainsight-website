---
title: Astro Components Deep Dive
description: Understanding Astro's component model and how it differs from traditional frameworks.
date: 2026-02-05
author: Plain Sight Team
---

Astro components are the building blocks of every Astro site. They combine the best of static HTML with the expressiveness of modern component frameworks.

## Anatomy of an Astro Component

Every `.astro` file has two parts:

```astro
---
// Component Script (frontmatter)
// Runs at build time on the server
import Button from './Button.astro';

const { title, items } = Astro.props;
const processedItems = items.filter(i => i.active);
---

<!-- Component Template -->
<!-- Outputs static HTML -->
<section>
  <h2>{title}</h2>
  {processedItems.map(item => (
    <Button text={item.name} />
  ))}
</section>
```

The frontmatter runs during the build, not in the browser. This means you can:

- Import other components
- Fetch data from APIs
- Process and transform data
- Access environment variables

## Props and the Astro Global

Components receive data through props:

```astro
---
interface Props {
  title: string;
  count?: number;
}

const { title, count = 0 } = Astro.props;
---

<h1>{title} ({count})</h1>
```

The `Astro` global provides useful context:

- `Astro.props` — Component props
- `Astro.url` — Current page URL
- `Astro.site` — Site configuration
- `Astro.slots` — Named slot content

## Slots for Composition

Slots let you pass content into components:

```astro
---
// Card.astro
---
<div class="card">
  <slot name="header" />
  <div class="body">
    <slot />
  </div>
  <slot name="footer" />
</div>
```

Use it like this:

```astro
<Card>
  <h2 slot="header">Title</h2>
  <p>Main content goes in the default slot</p>
  <button slot="footer">Action</button>
</Card>
```

## Styling Components

Styles in Astro are scoped by default:

```astro
<style>
  /* Only affects this component */
  h1 {
    color: purple;
  }
</style>
```

For global styles, use the `is:global` directive:

```astro
<style is:global>
  /* Affects the entire page */
  body {
    font-family: sans-serif;
  }
</style>
```

## Client-Side JavaScript

When you need interactivity, Astro provides directives:

```astro
---
import Counter from './Counter.jsx';
---

<!-- Load and hydrate immediately -->
<Counter client:load />

<!-- Hydrate when visible -->
<Counter client:visible />

<!-- Hydrate when browser is idle -->
<Counter client:idle />

<!-- Never hydrate (static only) -->
<Counter />
```

This is the "island architecture"—most of your page is static HTML, with interactive islands where needed.

## Framework Components

Astro supports components from multiple frameworks:

```astro
---
import ReactButton from './Button.jsx';
import VueCard from './Card.vue';
import SvelteForm from './Form.svelte';
---

<ReactButton client:load />
<VueCard client:visible />
<SvelteForm client:idle />
```

Mix and match based on your team's expertise or component requirements.

## Best Practices

1. **Keep frontmatter pure** — Avoid side effects; it runs at build time
2. **Use TypeScript** — Define Props interfaces for better tooling
3. **Minimize client directives** — Only hydrate what needs interactivity
4. **Leverage scoped styles** — Avoid global CSS when possible
5. **Compose with slots** — Build flexible, reusable layouts

Astro components give you the power of modern frameworks with the performance of static HTML. Use them wisely.
