import type { Link } from '../types'
import { mdiApple, mdiGithub, mdiGooglePlay, mdiShieldAccount, mdiChat, mdiPost } from '@mdi/js'

const links: Link[] = [
	{
		label: 'Play Store',
		icon: mdiGooglePlay,
		href: 'https://play.google.com/store/apps/details?id=com.cosmonautical.jellify',
	},
	{
		label: 'App Store',
		icon: mdiApple,
		href: 'https://apps.apple.com/us/app/jellify/id6736884612',
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
		href: 'https://github.com/Jellify-Music/App',
	},
	{
		label: 'Discord',
		icon: mdiChat,
		href: 'https://discord.gg/yf8fBatktn',
	},
]

export default links

