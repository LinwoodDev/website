import { CollectionEntry, getCollection } from "astro:content";

export const getEntryProject = (entry: CollectionEntry<"blog">) => {
  return getProject(getEntryProjectName(entry));
};
export const getEntryProjectName = (entry: CollectionEntry<"blog">) => {
  const projectName = entry.id.substring(0, entry.id.indexOf("/"));
  return projectName;
};

export const getEntryUrl = (entry: CollectionEntry<"blog">) => {
  const first = getEntryProjectName(entry);
  const folder = entry.id.substring(
    entry.id.indexOf("/"),
    entry.id.lastIndexOf("/")
  );
  const last = entry.slug;
  return `${first}${folder}/${last}`;
};

export const getProjects = async (): Promise<CollectionEntry<"projects">[]> => {
  const projects = await getCollection("projects");
  return projects;
};

export const getProject = async (
  name: string
): Promise<CollectionEntry<"projects"> | undefined> => {
  const projects = await getProjects();
  const project = projects.find((project) => project.id === name);
  return project;
};
