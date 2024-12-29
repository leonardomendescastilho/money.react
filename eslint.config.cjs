// eslint.config.cjs
const eslintConfig = require('@rocketseat/eslint-config');

module.exports = [
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parserOptions: {
				project: './tsconfig.json',
			},
		},
		...eslintConfig,
	},
];
