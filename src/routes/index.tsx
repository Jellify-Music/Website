import { createFileRoute } from '@tanstack/react-router'
import { Anchor, Paragraph, View, XStack, YStack } from 'tamagui'

export const Route = createFileRoute('/')({
	component: Home,
})

const links = [
	{
		label: 'Play Store',
		href: 'https://play.google.com/store/apps/details?id=com.cosmonautical.jellify',
	},
	{
		label: 'App Store',
		href: 'https://apps.apple.com/us/app/jellify/id6736884612',
	},
	{
		label: 'GitHub',
		href: 'https://github.com/Jellify-Music/App',
	},
]

function Home() {
	return (
		<YStack
			minHeight='100vh'
			alignItems='center'
			justifyContent='center'
			gap='$3'
			padding='$4'
			backgroundColor='$background'
		>
			{/* The logo is single-color, so mask it and fill with the theme's text color */}
			<View
				role='img'
				aria-label='Jellify'
				width={180}
				height={180}
				backgroundColor='$color'
				maskImage='url(/jellifyBlack.svg)'
				maskSize='contain'
				maskRepeat='no-repeat'
				maskPosition='center'
			/>

			<Paragraph fontSize='$3' color='$color' textAlign='center'>
				Website Under Construction...
			</Paragraph>

			<XStack gap='$2' flexWrap='wrap' justifyContent='center'>
				{links.map(({ label, href }) => (
					<Anchor
						key={label}
						href={href}
						fontSize='$3'
						color='$color'
						textDecorationLine='none'
						borderWidth={2}
						borderColor='$borderColor hover:$primary'
						borderRadius={7}
						paddingHorizontal='$2'
						paddingVertical='$1'
					>
						{label}
					</Anchor>
				))}
			</XStack>
		</YStack>
	)
}
