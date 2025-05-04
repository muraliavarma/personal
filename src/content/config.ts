import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    urlLink: z.string().optional(),
    urlText: z.string().optional(),
    image: z.string().optional(),
    sortOrder: z.number().default(999),
  }),
});

export const collections = {
  'projects': projectsCollection,
}; 