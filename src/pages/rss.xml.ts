import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context : APIContext) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site?.toString() ?? '',
		items: posts.map((post) => ({
			link: `/blog/${post.slug}/`,
			pubDate: post.data.date,
			title: post.data.title,
			description: post.data.description,
		})),
	});
}
