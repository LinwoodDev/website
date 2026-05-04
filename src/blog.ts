import { type CollectionEntry, getCollection } from "astro:content";

const stripMarkdown = (value: string) =>
  value
    .replace(/^import\s.+$/gm, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\{#[^}]+\}/g, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_>#-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export const getEntryProject = (entry: CollectionEntry<"blog">) => {
  return getProject(getEntryProjectName(entry));
};
export const getEntryProjectName = (entry: CollectionEntry<"blog">) => {
  const projectName = getEntryUrl(entry).split("/")[0];
  return projectName;
};

export const getEntryUrl = (entry: CollectionEntry<"blog">) => {
  return entry.data.slug || entry.id;
};

export const getEntryDescription = (entry: CollectionEntry<"blog">) => {
  if (entry.data.description) return entry.data.description;

  const body = (entry as CollectionEntry<"blog"> & { body?: string }).body;
  const firstParagraph =
    body
      ?.split(/\n{2,}/)
      .map(stripMarkdown)
      .find((paragraph) => paragraph.length > 0) ?? entry.data.title;

  return firstParagraph.length > 160
    ? `${firstParagraph.slice(0, 157).trim()}...`
    : firstParagraph;
};

export const getProjects = async (
  force?: boolean
): Promise<CollectionEntry<"projects">[]> => {
  const projects = await getCollection("projects");
  return projects
    .filter((project) => !project.data.unlisted || force)
    .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
};

export const getProject = async (
  name: string
): Promise<CollectionEntry<"projects"> | undefined> => {
  const projects = await getProjects();
  const project = projects.find((project) => project.id === name);
  return project;
};

export const PAGE_SIZE = 20;

export const getPosts = async () =>
  (await getCollection("blog")).filter((e) => !e.data.unlisted).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
