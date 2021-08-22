import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { Feed } from 'feed'
import Post from '../types/post';

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  return slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}

export const generateRssFeed = () => {
  const posts = (getAllPosts([
    'title',
    'date',
    'slug',
    'excerpt',]) as any) as Post[];
  const siteURL = process.env.SITE_URL;
  const date = new Date();
  const author = {
    name: "Linwood",
    email: "proficodergames@gmail.com",
    link: "https://twitter.com/LinwoodCloud",
  };

  const feed = new Feed({
    title: "Linwood Blog",
    description: "",
    id: siteURL ?? "https://linwood.dev",
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
    console.log({
      title: post.title,
      id: post.slug,
      link: url,
      description: post.excerpt ?? "",
      content: post.content ?? "",
      author: [author],
      contributor: [author],
      date: post.date ? new Date(post.date) : new Date(),
    });
    feed.addItem({
      title: post.title,
      id: post.slug,
      link: url,
      description: post.excerpt ?? "",
      content: post.content ?? "",
      author: [author],
      contributor: [author],
      date: post.date ? new Date(post.date) : new Date(),
    });
  });

  fs.mkdirSync("./public/blog", { recursive: true });
  fs.writeFileSync("./public/blog/feed.xml", feed.rss2());
  fs.writeFileSync("./public/blog/atom.xml", feed.atom1());
  fs.writeFileSync("./public/blog/feed.json", feed.json1());
};
