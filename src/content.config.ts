import { defineCollection, z } from 'astro:content';

const homepage = defineCollection({
  type: 'content',
  schema: z.object({
    section: z.string(),
    order: z.number(),
    heading: z.string(),
    subheading: z.string().optional(),
    intro: z.string().optional(),
    cta_text: z.string().optional(),
    cta_link: z.string().optional(),
    items: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).optional(),
  }),
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    section: z.string(),
    order: z.number(),
    title: z.string().optional(),
    heading: z.string(),
    subheading: z.string().optional(),
    intro: z.string().optional(),
    cta_text: z.string().optional(),
    cta_link: z.string().optional(),
  }),
});

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number(),
    challenge: z.string(),
    approach: z.string(),
    solution: z.string(),
    results: z.string(),
    tech: z.string(),
  }),
});

export const collections = { homepage, services, work };
