import { useSyncExternalStore } from 'react'

const query = '(prefers-color-scheme: dark)'

function subscribe(onChange: () => void) {
	const media = window.matchMedia(query)
	media.addEventListener('change', onChange)
	return () => media.removeEventListener('change', onChange)
}

const getSnapshot = () => (window.matchMedia(query).matches ? 'dark' : 'light')

/**
 * The system color scheme, or `null` during SSR and hydration.
 *
 * Leaving the theme unset on the server lets Tamagui's prefers-color-scheme CSS
 * pick light or dark before any JS runs, so there's no flash of the wrong theme
 */
export function useColorScheme() {
	return useSyncExternalStore(subscribe, getSnapshot, () => null)
}
