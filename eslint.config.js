import { fileURLToPath } from 'node:url';
import globals from 'globals';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginJs from '@eslint/js';
import tsEslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default [
    includeIgnoreFile(gitignorePath),
    pluginJs.configs.recommended,
    ...tsEslint.configs.recommended,
    pluginPrettierRecommended,
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        languageOptions: { globals: globals.browser },
        rules: {
            'sort-keys': ['error', 'asc', { caseSensitive: true, natural: true }]
        }
    },
    {
        files: ['**/*.spec.js'],
        languageOptions: {
            globals: { ...globals.browser, ...globals.jasmine }
        }
    }
];
