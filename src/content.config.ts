import { defineCollection, z } from 'astro:content';

// Define the blog collection schema with Zod for type safety
// This demonstrates Astro's Content Collections API
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.string().default('Plain Sight Team'),
  }),
});

export const collections = { blog };
