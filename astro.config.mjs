// @ts-check
import mdx from '@astrojs/mdx'
import { defineConfig } from 'astro/config'

export default defineConfig({
	site: 'https://jellify.app',
	server: { port: 3000 },
	integrations: [mdx()],
})
