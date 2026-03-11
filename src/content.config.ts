import { file, glob } from "astro/loaders";
import { defineCollection, reference } from "astro:content";
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Transform string to Date object
    date: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    heroImage: z.string().optional(),
    unlisted: z.boolean().default(false),
    author: reference("authors"),
  }),
});
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.json' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    source: z.url(),
    website: z.url().optional(),
    translation: z.string().optional(),
    unlisted: z.boolean().default(false),
    logo: z.string().optional(),
    order: z.number().optional(),
  }),
});
const authors = defineCollection({
  loader: glob({ base: './src/content/authors', pattern: '**/*.json' }),
  schema: z.object({
    name: z.string(),
    avatar: z.url(),
    url: z.url(),
  }),
});

const libraries = defineCollection({
  loader: file("src/content/libraries.json", {
  }),
  schema: z.object({
    id: z.string(),
    description: z.string(),
    url: z.url(),
  }),
});

export const collections = { blog, projects, authors, libraries };
