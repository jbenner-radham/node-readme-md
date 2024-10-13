/**
 * Get the name of the preferred package manager from the `package.json` engines
 * property. Defaults to "npm".
 *
 * @param {import('type-fest').PackageJson} [pkg = {}]
 * @returns {import('./get-package-manager.d.ts').PackageManager}
 */
export default function getPackageManager(pkg = {}) {
    if (pkg.packageManager) {
        const packageManager = pkg.packageManager.replace(/(@.+)$/, '');

        return ['npm', 'pnpm', 'yarn'].includes(packageManager) ? packageManager : 'npm';
    }

    if (pkg.engines?.npm) return 'npm';

    if (pkg.engines?.pnpm) return 'pnpm';

    if (pkg.engines?.yarn) return 'yarn';

    return 'npm';
}
