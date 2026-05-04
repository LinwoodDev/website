import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { getEntryDescription, getEntryUrl, getPosts } from "src/blog";

export async function GET(context: APIContext) {
  const posts = await getPosts();
  const site = context.site?.toString() ?? "https://www.linwood.dev";
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site,
    items: posts.map((post) => ({
      link: new URL(getEntryUrl(post), site).toString(),
      pubDate: post.data.date,
      title: post.data.title,
      description: getEntryDescription(post),
    })),
  });
}
