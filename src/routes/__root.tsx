import '@fontsource-variable/figtree'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { TamaguiProvider } from 'tamagui'
import { useColorScheme } from '../hooks/useColorScheme'
import config from '../tamagui.config'

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ title: 'Jellify' },
			{ name: 'description', content: 'Jellify app website' },
		],
		links: [{ rel: 'icon', href: '/favicon.ico' }],
	}),
	shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
	const colorScheme = useColorScheme()

	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<HeadContent />
				{/* Theme and token CSS, rendered on the server so there's no unstyled flash */}
				<style dangerouslySetInnerHTML={{ __html: config.getCSS() }} />
			</head>
			<body style={{ margin: 0 }}>
				<TamaguiProvider config={config} defaultTheme={colorScheme} disableInjectCSS>
					{children}
				</TamaguiProvider>
				<Scripts />
			</body>
		</html>
	)
}
