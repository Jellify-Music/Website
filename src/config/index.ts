import type { Link } from '../types'
import { mdiApple, mdiGithub, mdiGooglePlay, mdiShieldAccount, mdiChat, mdiPost, mdiAirplane } from '@mdi/js'

export const GPLAY_LINK = 'https://play.google.com/store/apps/details?id=com.cosmonautical.jellify'

export const TESTFLIGHT_LINK = 'https://testflight.apple.com/join/etVSc7ZQ'
export const APP_STORE_LINK = 'https://apps.apple.com/us/app/jellify/id6736884612'

export const GITHUB_LINK = 'https://github.com/Jellify-Music/App'

export const DISCORD_LINK = 'https://discord.gg/yf8fBatktn'

const links: Link[] = [
	{
		label: 'Play Store',
		icon: mdiGooglePlay,
		href: GPLAY_LINK,
	},
	{
		label: 'App Store',
		icon: mdiApple,
		href: APP_STORE_LINK,
	},
	{
		label: 'TestFlight',
		icon: mdiAirplane,
		href: TESTFLIGHT_LINK,
	},
	{
		label: 'Blog',
		icon: mdiPost,
		href: '/blog',
	},
	{
		label: 'Privacy Policy',
		icon: mdiShieldAccount,
		href: '/privacy',
	},
	{
		label: 'GitHub',
		icon: mdiGithub,
		href: GITHUB_LINK,
	},
	{
		label: 'Discord',
		icon: mdiChat,
		href: DISCORD_LINK,
	},
]

export default links

