import type { CollectionEntry } from "astro:content";
import projects from "./content/_projects.json";

export type Project = {
    name: string;
    title: string;
    description: string;
    source: string;
    website: string;
    translation?: string;
};
export const getEntryProject = (entry : CollectionEntry<"blog">) => {
    return entry.id.substring(0, entry.id.indexOf("/"));
}

export const getEntryUrl = (entry : CollectionEntry<"blog">) => {
    const first = getEntryProject(entry);
    const folder = entry.id.substring(entry.id.indexOf("/"), entry.id.lastIndexOf("/"));
    const last = entry.slug;
    return `${first}${folder}/${last}`;
}

export const getProjects = () : Project[] => {
    return Object.entries(projects).map(([key, value]) => {
        return {
            name: key,
            ...value
        };
    });
}

export const getProject = (name : string) : Project | undefined => {
    return getProjects().find((project) => project.name === name);
}