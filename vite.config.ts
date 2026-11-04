import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { cloudflare } from '@cloudflare/vite-plugin'
import { tamaguiPlugin } from '@tamagui/vite-plugin'

export default defineConfig({
	server: { port: 3000 },
	resolve: { tsconfigPaths: true },
	plugins: [
		cloudflare({ viteEnvironment: { name: 'ssr' } }),
		tamaguiPlugin({
			config: './src/tamagui.config.ts',
			components: ['tamagui'],
		}),
		tanstackStart(),
		viteReact(),
	],
})
