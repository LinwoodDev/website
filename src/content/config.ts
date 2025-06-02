import { file } from "astro/loaders";
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
    unlisted: z.boolean().default(false),
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
    unlisted: z.boolean().default(false),
    logo: z.string().optional(),
    order: z.number().optional(),
  }),
});
const authors = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    avatar: z.string().url(),
    url: z.string().url(),
  }),
});

const libraries = defineCollection({
  loader: file("src/content/libraries.json", {
  }),
  schema: z.object({
    id: z.string(),
    description: z.string(),
    url: z.string().url(),
  }),
});

export const collections = { blog, projects, authors, libraries };
