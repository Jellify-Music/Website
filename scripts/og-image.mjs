/**
 * Generates public/og.png, the 1200x630 card shown when a page is shared on social media,
 * and public/apple-touch-icon.png, the icon iOS uses when the site is added to the home screen.
 *
 * Run with `bun run og-image` after changing the logo or the player screenshot.
 */
import sharp from 'sharp'

const WIDTH = 1200
const HEIGHT = 630

const background = Buffer.from(`
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<radialGradient id="glow" cx="80%" cy="20%" r="80%">
			<stop offset="0%" stop-color="#4b0fd6" stop-opacity="0.55" />
			<stop offset="100%" stop-color="#19181c" stop-opacity="0" />
		</radialGradient>
	</defs>
	<rect width="100%" height="100%" fill="#19181c" />
	<rect width="100%" height="100%" fill="url(#glow)" />
	<g font-family="Figtree, Helvetica Neue, Helvetica, Arial, sans-serif" fill="#ffffff">
		<text x="80" y="200" font-size="64" font-weight="800">Jellify</text>
		<text x="80" y="300" font-size="52" font-weight="700">A music player</text>
		<text x="80" y="365" font-size="52" font-weight="700">for <tspan fill="#887bff">Jellyfin</tspan></text>
		<text x="80" y="450" font-size="28" fill="#c9c6d6">Free and open source for iOS and Android</text>
		<text x="80" y="495" font-size="28" fill="#c9c6d6">CarPlay · Android Auto · Google Cast · Offline</text>
	</g>
</svg>`)

const logo = await sharp('public/jellifyGradient.svg', { density: 300 }).resize(96, 96).png().toBuffer()

// Round the screenshot's corners so it reads as a phone
const phoneWidth = 300
const phoneHeight = Math.round((phoneWidth * 2868) / 1320)
const mask = Buffer.from(
	`<svg width="${phoneWidth}" height="${phoneHeight}"><rect width="100%" height="100%" rx="36" /></svg>`,
)
const phone = await sharp('src/assets/screenshots/player.png')
	.resize(phoneWidth, phoneHeight)
	.composite([{ input: mask, blend: 'dest-in' }])
	.png()
	.toBuffer()

// Crop the bottom so the phone runs off the edge of the card
const phoneTop = 60
const croppedPhone = await sharp(phone)
	.extract({ left: 0, top: 0, width: phoneWidth, height: HEIGHT - phoneTop })
	.toBuffer()

await sharp(background)
	.composite([
		{ input: logo, left: 80, top: 60 },
		{ input: croppedPhone, left: WIDTH - phoneWidth - 110, top: phoneTop },
	])
	.png({ compressionLevel: 9 })
	.toFile('public/og.png')

// iOS ignores transparency on touch icons, so give the logo a solid background with some padding
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#19181c' } })
	.composite([{ input: await sharp('public/jellifyGradient.svg', { density: 300 }).resize(140, 140).png().toBuffer() }])
	.png({ compressionLevel: 9 })
	.toFile('public/apple-touch-icon.png')
