import { getCollection, type CollectionEntry } from 'astro:content'

export type Post = CollectionEntry<'blog'>

export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection('blog')
	return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}

// Frontmatter dates are parsed as UTC midnight, so format in UTC to avoid an off-by-one day
export function formatPostDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC',
	})
}

export function getPostSnippet(post: Post): string {
	if (post.data.description) return post.data.description

	const paragraph = (post.body ?? '')
		.split(/\n\s*\n/)
		.map((block) => block.trim())
		.find((block) => block && !block.startsWith('#') && !block.startsWith('import '))

	// Strip links and emphasis so the snippet reads as plain text
	return (paragraph ?? '')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/[*_`]/g, '')
		.replace(/\s+/g, ' ')
}
