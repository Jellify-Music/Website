import { defaultSizing, fonts, media, shorthands, tokens } from '@tamagui/config/v5'
import { animations } from '@tamagui/config/v5-css'
import { createFont, createTamagui } from 'tamagui'

/**
 * Mirrors the "purple" preset from the Jellify app's Tamagui config
 * (App/src/configs/tamagui.config.ts) so the site and app stay visually consistent
 */
const palettes = {
	light: {
		background: '#ffffff',
		background75: 'rgba(235, 221, 255, 0.75)',
		background50: 'rgba(235, 221, 255, 0.5)',
		background25: 'rgba(235, 221, 255, 0.25)',
		borderColor: '#77748E',
		color: '#0C0622',
		success: 'rgba(16, 175, 141, 1)',
		secondary: 'rgba(0, 58, 159, 1)',
		primary: '#4b0fd6ff',
		danger: '#B30077',
		warning: '#a93300ff',
		neutral: '#77748E',
		translucent: 'rgba(255, 255, 255, 0.75)',
	},
	dark: {
		background: 'rgba(25, 24, 28, 1)',
		background75: 'rgba(25, 24, 28, 0.75)',
		background50: 'rgba(25, 24, 28, 0.5)',
		background25: 'rgba(25, 24, 28, 0.25)',
		borderColor: '#77748E',
		color: '#ffffff',
		success: 'rgba(87, 233, 201, 1)',
		secondary: 'rgba(75, 125, 215, 1)',
		primary: '#887BFF',
		danger: '#FF066F',
		warning: '#FF6625',
		neutral: '#77748E',
		translucent: 'rgba(0, 0, 0, 0.5)',
	},
}

type Palette = (typeof palettes)['light']

/** Interaction-state keys that Tamagui components read from the theme */
const withInteractionStates = (palette: Palette) => ({
	...palette,
	'border-color': palette.borderColor,
	'border-color-hover': palette.primary,
	'border-color-press': palette.primary,
	'border-color-focus': palette.primary,
	'background-hover': palette.background75,
	'background-press': palette.background,
	'background-focus': palette.background75,
	'color-hover': palette.color,
	'color-press': palette.color,
	'color-focus': palette.color,
	'outline-color': palette.primary,
	'placeholder-color': palette.neutral,
	'shadow-color': palette.translucent,
})

const figtree = createFont({
	family: '"Figtree Variable", system-ui, sans-serif',
	size: fonts.body.size,
	lineHeight: fonts.body.lineHeight,
	weight: {
		4: '300',
		6: '600',
		8: '900',
	},
	letterSpacing: fonts.body.letterSpacing,
})

const config = createTamagui({
	sizing: defaultSizing,
	animations,
	fonts: {
		heading: figtree,
		body: figtree,
	},
	media,
	shorthands,
	tokens,
	themes: {
		light: withInteractionStates(palettes.light),
		dark: withInteractionStates(palettes.dark),
	},
	settings: {
		defaultFont: 'body',
		shouldAddPrefersColorThemes: true,
		addThemeClassName: 'html',
	},
})

export type JellifyConfig = typeof config

declare module 'tamagui' {
	interface TamaguiCustomConfig extends JellifyConfig {}
}

export default config
