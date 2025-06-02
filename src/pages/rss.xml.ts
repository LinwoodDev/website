import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { getEntryUrl, getPosts } from "src/blog";

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site?.toString() ?? "",
    items: posts.map((post) => ({
      link: getEntryUrl(post),
      pubDate: post.data.date,
      title: post.data.title,
      description: post.data.description,
    })),
  });
}
