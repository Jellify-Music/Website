// @ts-check
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

export default defineConfig({
	site: 'https://jellify.app',
	server: { port: 3000 },
	// Emit /blog.html instead of /blog/index.html so Cloudflare serves /blog without redirecting to /blog/
	build: { format: 'file' },
	trailingSlash: 'never',
	integrations: [mdx(), sitemap()],
})
