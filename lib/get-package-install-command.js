import getPackageManager from './get-package-manager.js';

/**
 * Get the appropriate package install command.
 *
 * @param {import('./index.d.ts').ReadmeConfig} [config = {}]
 * @returns {string}
 */
export default function getPackageInstallCommand(config = {}) {
    const { pkg = {}, preferDev = false, preferNpm = false } = config;
    const packageManager = getPackageManager(pkg.engines);
    const npmInstallCmd = `npm install ${pkg.name}`;
    const npmInstallDevCmd = `npm install --save-dev ${pkg.name}`;
    const npmInstallGlobalCmd = `npm install --global ${pkg.name}`;
    const pnpmInstallCmd = `pnpm add ${pkg.name} # Or alternatively: \`${npmInstallCmd}\``;
    const pnpmInstallDevCmd = `pnpm add --save-dev ${pkg.name} # Or alternatively \`${npmInstallDevCmd}\``;
    const pnpmInstallGlobalCmd = `pnpm add --global ${pkg.name} # Or alternatively: \`${npmInstallGlobalCmd}\``;
    const yarnInstallCmd = `yarn add ${pkg.name} # Or alternatively: \`${npmInstallCmd}\``;
    const yarnInstallDevCmd = `yarn add --dev ${pkg.name} # Or alternatively \`${npmInstallDevCmd}\``;
    const yarnInstallGlobalCmd = `yarn global add ${pkg.name} # Or alternatively: \`${npmInstallGlobalCmd}\``;

    if (preferNpm) {
        if (preferDev) return npmInstallDevCmd;

        if (pkg.preferGlobal) return npmInstallGlobalCmd;

        return npmInstallCmd;
    }

    if (packageManager === 'pnpm') {
        if (preferDev) return pnpmInstallDevCmd;

        if (pkg.preferGlobal) return pnpmInstallGlobalCmd;

        return pnpmInstallCmd;
    }

    if (packageManager === 'yarn') {
        if (preferDev) return yarnInstallDevCmd;

        if (pkg.preferGlobal) return yarnInstallGlobalCmd;

        return yarnInstallCmd;
    }

    if (preferDev) return npmInstallDevCmd;

    if (pkg.preferGlobal) return npmInstallGlobalCmd;

    return npmInstallCmd;
}
