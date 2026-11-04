import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{ ignores: ['dist', '.wrangler', 'src/routeTree.gen.ts', 'worker-configuration.d.ts'] },
	{
		files: ['**/*.{ts,tsx}'],
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
		},
		plugins: { 'react-hooks': reactHooks },
		rules: {
			...reactHooks.configs.recommended.rules,
			// Needed for Tamagui's TamaguiCustomConfig module augmentation
			'@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends' }],
		},
	},
)
