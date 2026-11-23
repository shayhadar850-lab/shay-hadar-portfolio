import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    category: z.string(),
    status: z.string(),
    order: z.number(),
    overview: z.string(),
    problem: z.string(),
    role: z.string(),
    techStack: z.array(z.string()),
    accent: z.enum(['mint', 'blue', 'violet', 'gold', 'rose']),
    glyph: z.enum(['terminal', 'store', 'message', 'browser', 'book']),
    diagram: z.array(z.object({ title: z.string(), detail: z.string() })).min(3).max(5),
    media: z.object({
      src: z.string(), alt: z.string(), caption: z.string(), width: z.number(), height: z.number(),
    }).optional(),
    repository: z.string().url().optional(),
  }),
});

export const collections = { projects: projectsCollection };
