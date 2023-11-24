import { defineCollection, reference, z } from "astro:content";

const blog = defineCollection({
  type: "content",
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
    author: reference("authors"),
  }),
});
const projects = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    source: z.string().url(),
    website: z.string().url().optional(),
    translation: z.string().optional(),
  }),
});
const authors = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    avatar: z.string().url(),
	url: z.string().url()
  }),
});

export const collections = { blog: blog, projects: projects, authors: authors };
