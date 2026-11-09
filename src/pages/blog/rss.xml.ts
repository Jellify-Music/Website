import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getPosts, getPostSnippet } from '@/config/blog'

export async function GET(context: APIContext) {
	const posts = await getPosts()

	return rss({
		title: 'Jellify Blog',
		description: 'Updates and news from the Jellify team',
		site: context.site!,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.date,
			description: getPostSnippet(post),
			link: `/blog/${post.id}`,
		})),
	})
}
