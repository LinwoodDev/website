import { type CollectionEntry, getCollection } from "astro:content";

export const getEntryProject = (entry: CollectionEntry<"blog">) => {
  return getProject(getEntryProjectName(entry));
};
export const getEntryProjectName = (entry: CollectionEntry<"blog">) => {
  const projectName = entry.id.substring(0, entry.id.indexOf("/"));
  return projectName;
};

export const getEntryUrl = (entry: CollectionEntry<"blog">) => {
  return entry.slug;
};

export const getProjects = async (
  force?: boolean
): Promise<CollectionEntry<"projects">[]> => {
  const projects = await getCollection("projects");
  return projects.filter((project) => !project.data.unlisted || force).sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
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
