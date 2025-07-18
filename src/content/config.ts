import { defineCollection, z } from 'astro:content';

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  featured: z.boolean().default(false),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  images: z.array(z.string()).optional(),
  publishDate: z.date()
});

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishDate: z.date(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false)
});

export const collections = {
  'projects': defineCollection({
    type: 'content',
    schema: projectSchema,
  }),
  'blog': defineCollection({
    type: 'content',
    schema: blogSchema,
  }),
};