import type { PackageJson } from 'type-fest';

export type PackageManager = 'npm' | 'pnpm' | 'yarn';

/**
 * Get the name of the preferred package manager from the `package.json` engines
 * property. Defaults to "npm".
 */
export default function getPackageManager(pkg?: PackageJson): PackageManager;
