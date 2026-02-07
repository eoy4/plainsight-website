import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.string().default('Plain Sight Team'),
  }),
});

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
    heading: z.string(),
    subheading: z.string().optional(),
    intro: z.string().optional(),
    cta_text: z.string().optional(),
    cta_link: z.string().optional(),
  }),
});

export const collections = { blog, homepage, services };
