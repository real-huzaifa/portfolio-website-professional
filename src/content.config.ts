import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    outcome: z.string(),          // the one-line result
    role: z.string(),
    stack: z.array(z.string()),
    period: z.string(),
    repo: z.string().optional(),
    demo: z.string().optional(),
    docs: z.string().optional(),
    metrics: z.array(z.object({ value: z.string(), label: z.string(), hl: z.boolean().optional() })),
    figure: z.enum(['pr', 'recall', 'signif', 'none']).default('none'),
  }),
});
export const collections = { projects };
