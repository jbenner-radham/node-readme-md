import type { ReadmeConfig } from './types.js';
import getPackageManager from './get-package-manager.js';

/**
 * Get the appropriate package test command.
 */
export default function getPackageTestCommand(config: ReadmeConfig = {}): string {
    const { pkg = {}, preferNpm = false } = config;
    const packageManager = getPackageManager(pkg);
    const npmTestCmd = 'npm test';
    const pnpmTestCmd = `pnpm test # Or alternatively: \`${npmTestCmd}\``;
    const yarnTestCmd = `yarn test # Or alternatively: \`${npmTestCmd}\``;

    if (!preferNpm && packageManager === 'pnpm') return pnpmTestCmd;

    if (!preferNpm && packageManager === 'yarn') return yarnTestCmd;

    return npmTestCmd;
}
