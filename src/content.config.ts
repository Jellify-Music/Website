import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

/**
 * The blog collection defines the structure and metadata for blog posts.
 * 
 * Each blog post must have a title and a date, and can optionally have a description.
 * 
 * A post's file name is its URL: `2026-11-09.mdx` is served at /blog/2026-11-09.
 * 
 * A second post on the same date can be named `<date>-<slug>.mdx`.
 */
const blog = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		// Shown on /blog and in the RSS feed; falls back to the post's first paragraph
		description: z.string().optional(),
	}),
})

export const collections = { blog }
