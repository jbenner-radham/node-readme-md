import getPackageManager from './get-package-manager.js';

/**
 * Get the appropriate package test command.
 *
 * @param {import('./index.d.ts').ReadmeConfig} [config = {}]
 * @returns {string}
 */
export default function getPackageTestCommand(config = {}) {
    const { pkg = {}, preferNpm = false } = config;
    const packageManager = getPackageManager(pkg.engines);
    const npmTestCmd = 'npm test';
    const pnpmTestCmd = `pnpm test # Or alternatively: \`${npmTestCmd}\``;
    const yarnTestCmd = `yarn test # Or alternatively: \`${npmTestCmd}\``;

    if (preferNpm) return npmTestCmd;

    if (packageManager === 'pnpm') return pnpmTestCmd;

    if (packageManager === 'yarn') return yarnTestCmd;

    return npmTestCmd;
}