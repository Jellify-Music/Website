import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// A post's file name is its URL: `2026-11-09.md` is served at /blog/2026-11-09.
// Name a second post on the same date `<date>-<slug>.md`
const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		// Shown on /blog and in the RSS feed; falls back to the post's first paragraph
		description: z.string().optional(),
	}),
})

export const collections = { blog }
