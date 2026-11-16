import { mdiCellphone, mdiPlayCircleOutline, mdiTuneVertical } from '@mdi/js'
import { GITHUB_LINK } from '.'

export type OpenSourceProject = {
	id: string
	name: string
	icon: string
	license: string
	repo: string
	website?: string
	// Omitted for projects that aren't published as a package
	npm?: string
	paragraphs: string[]
}

export const openSourceProjects: OpenSourceProject[] = [
	{
		id: 'app',
		name: 'Jellify',
		icon: mdiCellphone,
		license: 'MIT',
		repo: GITHUB_LINK,
		paragraphs: [
			'The Jellify app itself: a cross-platform music player for Jellyfin built with React Native, running on iOS, Android, CarPlay, and Android Auto.',
			'Bug reports, feature ideas, and pull requests are all welcome.',
		],
	},
	{
		id: 'nitro-player',
		name: 'React Native Nitro Player',
		icon: mdiPlayCircleOutline,
		license: 'MIT',
		repo: 'https://github.com/riteshshukla04/react-native-nitro-player',
		website: 'https://nitroplayer.riteshshukla.in',
		npm: 'react-native-nitro-player',
		paragraphs: [
			'The audio engine behind Jellify’s playback. Built on Nitro Modules, it handles queue and playlist management, playback controls, an equalizer, and Android Auto and CarPlay support.',
			'Created and maintained by Ritesh Shukla.',
		],
	},
	{
		id: 'reanimated-slider',
		name: 'React Native Reanimated Slider',
		icon: mdiTuneVertical,
		license: 'MIT',
		repo: 'https://github.com/Jellify-Music/react-native-reanimated-slider',
		npm: '@jellify-music/react-native-reanimated-slider',
		paragraphs: [
			'The slider used for seeking and settings in Jellify. Powered by Reanimated and Gesture Handler, it supports tap and pan gestures, horizontal and vertical orientations, and step intervals that snap to fixed values.',
		],
	},
]

const starFormat = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 })

// Fetched once at build time. A token is optional but avoids the 60 requests/hour unauthenticated limit
export async function getStarCount(repo: string): Promise<string | undefined> {
	const slug = new URL(repo).pathname.slice(1)
	const token = import.meta.env.GITHUB_TOKEN

	try {
		const response = await fetch(`https://api.github.com/repos/${slug}`, {
			headers: {
				Accept: 'application/vnd.github+json',
				...(token && { Authorization: `Bearer ${token}` }),
			},
		})
		if (!response.ok) return undefined

		const { stargazers_count } = (await response.json()) as { stargazers_count: number }
		return starFormat.format(stargazers_count)
	} catch {
		// Leave the count off rather than failing the build
		return undefined
	}
}
