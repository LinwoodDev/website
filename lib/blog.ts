import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { Feed } from "feed";
import Post from "../types/post";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostsByDate({
  year,
  month,
  day,
}: {
  year: number;
  month?: number;
  day?: number;
}): Post[] {
  return getAllPosts().filter((post) => {
    const { date } = post;
    const postYear = date.year;
    const postMonth = date.month;
    const postDay = date.day;
    return (
      postYear === year &&
      (month ? postMonth === month : true) &&
      (date ? postDay === day : true)
    );
  });
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};
  const dateString = data.date ?? realSlug.split("-").slice(0, 3).join("-");

  return {
    author: data.author,
    date: {
      year: parseInt(dateString.split("-")[0]),
      month: parseInt(dateString.split("-")[1]),
      day: parseInt(dateString.split("-")[2]),
    },
    fileName: realSlug,
    slug: realSlug.split("-").slice(3).join("-"),
    title: (data.title as string).trim(),
    coverImage: data.coverImage ?? null,
    tags: data.tags ?? [],
    content,
    excerpt: data.excerpt ?? null,
    ogImage: data.ogImage ?? null,
  };
}

export function getPostTags() : string[] {
  const tags: string[] = [];
  getAllPosts().forEach((post) => {
    post.tags.forEach((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });
  return tags;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  return (
    slugs
      .map((slug) => getPostBySlug(slug))
      // sort posts by date in descending order
      .sort((post1, post2) =>
        new Date(
          post1.date.year,
          post1.date.month - 1,
          post1.date.day
        ).getTime() >
        new Date(
          post2.date.year,
          post2.date.month - 1,
          post2.date.day
        ).getTime()
          ? -1
          : 1
      )
  );
}

export const generateRssFeed = () => {
  const posts = getAllPosts();
  const siteURL = process.env.SITE_URL ?? "https://linwood.dev";
  const date = new Date();
  const author = {
    name: "Linwood",
    email: "contact@linwood.dev",
    link: "https://twitter.com/LinwoodCloud",
  };

  const feed = new Feed({
    title: "Linwood Blog",
    description: "",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/logo.svg`,
    favicon: `${siteURL}/favicon.png`,
    copyright: `All rights reserved ${date.getFullYear()}, Linwood`,
    updated: date,
    generator: "Feed for Linwood",
    feedLinks: {
      rss2: `${siteURL}/blog/feed.xml`,
      json: `${siteURL}/blog/feed.json`,
      atom: `${siteURL}/blog/atom.xml`,
    },
    author,
  });

  posts.forEach((post) => {
    const url = `${siteURL}/blog/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: post.slug,
      link: url,
      description: post.excerpt ?? "",
      content: post.content ?? "",
      author: [author],
      contributor: [author],
      date: post.date
        ? new Date(post.date.year, post.date.month - 1, post.date.day)
        : new Date(),
    });
  });

  fs.mkdirSync("./public/blog", { recursive: true });
  fs.writeFileSync("./public/blog/feed.xml", feed.rss2());
  fs.writeFileSync("./public/blog/atom.xml", feed.atom1());
  fs.writeFileSync("./public/blog/feed.json", feed.json1());
};
