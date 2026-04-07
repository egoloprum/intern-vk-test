import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import boundariesPlugin from 'eslint-plugin-boundaries'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'

export default [
	{
		ignores: ['dist', 'node_modules', '*.config.js', '*.config.ts']
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			boundaries: boundariesPlugin,
			import: importPlugin,
			'unused-imports': unusedImportsPlugin,
			prettier: prettierPlugin
		},
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parser: tseslint.parser
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': 'warn',
			'no-console': 'warn',
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_'
				}
			],
			// Temporarily disable strict import rules to avoid resolver errors
			'import/no-internal-modules': 'off',
			'import/order': 'off',
			// Keep the FSD boundaries rule
			'boundaries/element-types': [
				2,
				{
					default: 'disallow',
					message: 'FSD: {{ fromType }} не может импортировать {{ toType }}',
					rules: [
						{
							from: ['app'],
							allow: ['entities', 'features', 'widgets', 'shared']
						},
						{ from: ['widgets'], allow: ['entities', 'features', 'shared'] },
						{ from: ['features'], allow: ['entities', 'shared'] },
						{ from: ['entities'], allow: ['entities', 'shared'] },
						{ from: ['shared'], allow: ['shared'] }
					]
				}
			],
			'prettier/prettier': 'error'
		},
		settings: {
			'boundaries/elements': [
				{ type: 'app', pattern: 'src/app/**/*.{js,jsx,ts,tsx}' },
				{ type: 'entities', pattern: 'src/entities/**/*.{js,jsx,ts,tsx}' },
				{ type: 'features', pattern: 'src/features/**/*.{js,jsx,ts,tsx}' },
				{ type: 'widgets', pattern: 'src/widgets/**/*.{js,jsx,ts,tsx}' },
				{ type: 'shared', pattern: 'src/shared/**/*.{js,jsx,ts,tsx}' }
			]
			// Remove the import resolver – it caused the error
		}
	}
]
