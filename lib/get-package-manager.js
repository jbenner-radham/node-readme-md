/**
 * Get the name of the preferred package manager from the `package.json` engines
 * property. Defaults to "npm".
 *
 * @param {import('type-fest').PackageJson.engines} [engines = {}]
 * @returns {import('./get-package-manager.d.ts').PackageManager}
 */
export default function getPackageManager(engines = {}) {
    if (engines.npm) return 'npm';

    if (engines.pnpm) return 'pnpm';

    if (engines.yarn) return 'yarn';

    return 'npm';
}
