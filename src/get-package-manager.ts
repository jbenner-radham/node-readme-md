import type { PackageJson } from 'type-fest';
import type { PackageManager } from './types.ts';

/**
 * Get the name of the preferred package manager from the `package.json` engines
 * property. Defaults to "npm".
 */
export default function getPackageManager(pkg: PackageJson = {}): PackageManager {
    if (pkg.packageManager) {
        const atIndex = pkg.packageManager.indexOf('@');
        const packageManager = atIndex !== -1 ? pkg.packageManager.slice(0, atIndex) : pkg.packageManager;

        return ['npm', 'pnpm', 'yarn'].includes(packageManager) ? (packageManager as PackageManager) : 'npm';
    }

    if (pkg.engines?.npm) return 'npm';

    if (pkg.engines?.pnpm) return 'pnpm';

    if (pkg.engines?.yarn) return 'yarn';

    return 'npm';
}
