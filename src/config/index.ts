import type { Link } from '../types'
import { mdiApple, mdiGooglePlay, mdiShieldAccount, mdiChat, mdiEmailOutline, mdiBugOutline, mdiPost, mdiAirplane, mdiPackageDown, mdiAutorenew, mdiCellphoneArrowDown, mdiCodeTags } from '@mdi/js'

export const GPLAY_LINK = 'https://play.google.com/store/apps/details?id=com.cosmonautical.jellify'

export const TESTFLIGHT_LINK = 'https://testflight.apple.com/join/etVSc7ZQ'
export const APP_STORE_LINK = 'https://apps.apple.com/us/app/jellify/id6736884612'

export const GITHUB_LINK = 'https://github.com/Jellify-Music/App'
export const RELEASES_LINK = `${GITHUB_LINK}/releases/latest`

export const DISCORD_LINK = 'https://discord.gg/yf8fBatktn'

export const navLinks: Link[] = [
	{
		label: 'Blog',
		icon: mdiPost,
		href: '/blog',
	},
	{
		label: 'Privacy',
		icon: mdiShieldAccount,
		href: '/privacy',
	},
	{
		label: 'Contact',
		icon: mdiEmailOutline,
		href: '/contact',
	},
	{
		label: 'Source',
		icon: mdiCodeTags,
		href: '/open-source',
	},
]

export const discordLink = {
	label: 'Discord',
	icon: mdiChat,
	href: DISCORD_LINK,
	description: 'Ask questions, get help setting up, share feedback, and hear about new releases first.',
} satisfies Link

export const issuesLink = {
	label: 'GitHub Issues',
	icon: mdiBugOutline,
	href: `${GITHUB_LINK}/issues`,
	description: 'Found a bug or have a feature idea? Open an issue so it can be tracked.',
} satisfies Link

export const storeLinks = {
	ios: {
		label: 'App Store',
		icon: mdiApple,
		href: APP_STORE_LINK,
		description: 'iPhone and CarPlay',
	},
	android: {
		label: 'Google Play',
		icon: mdiGooglePlay,
		href: GPLAY_LINK,
		description: 'Android phones and Android Auto',
	},
} satisfies Record<string, Link>

export const alternativeDownloads: Link[] = [
	{
		label: 'TestFlight',
		icon: mdiAirplane,
		href: TESTFLIGHT_LINK,
		description: 'Try new features on iOS before they hit the App Store.',
	},
	{
		label: 'GitHub Releases',
		icon: mdiPackageDown,
		href: RELEASES_LINK,
		description: 'Grab the APK or IPA for the latest release directly.',
	},
	{
		label: 'Obtainium',
		icon: mdiAutorenew,
		href: 'https://github.com/ImranR98/Obtainium',
		description: "Add Jellify's GitHub repo as a source to pick up each Android release automatically.",
	},
	{
		label: 'AltStore',
		icon: mdiCellphoneArrowDown,
		href: 'https://altstore.io',
		description: 'Sideload the IPA from GitHub Releases with AltStore or your favorite utility.',
	},
]
