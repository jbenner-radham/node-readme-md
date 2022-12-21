import Badges from './Badges.js';
import escape from 'lodash.escape';
import { fencedShCodeBlock, h1, h2, LF } from 'md-writer';
import licenseBody from './license-body.js';
import linkifyLicense from './linkify-license.js';
import { PLACEHOLDER } from './constants.js';
import ReadmeSections from './ReadmeSections.js';

/**
 * Generates a readme document based upon the provided config.
 *
 * @param {import('./index.js').ReadmeConfig} config
 * @returns {string}
 */
export default function readme(config = {}) {
    const additionalSections = config?.additionalSections ?? [];
    const badges = new Badges(...(config.badges || [])).toString();
    const pkgDefaults = { description: PLACEHOLDER, name: escape('<package-name>') };
    const pkg = Object.assign({}, pkgDefaults, config.pkg);
    const preferYarn = config?.preferYarn ?? false;
    const preferDev = config?.preferDev ?? false;
    const preferGlobal = pkg?.preferGlobal && preferDev === false;
    const npmTestCmd = 'npm test';
    const yarnTestCmd = `yarn test # Or alternatively: \`${npmTestCmd}\``;
    const pkgTestCmd = preferYarn ? yarnTestCmd : npmTestCmd;
    const npmInstallCmd = `npm install ${pkg.name}`;
    const npmInstallDevCmd = `npm install --save-dev ${pkg.name}`;
    const npmGlobalInstallCmd = `npm install --global ${pkg.name}`;
    const yarnInstallCmd = `yarn add ${pkg.name} # Or alternatively: \`${npmInstallCmd}\``;
    const yarnInstallDev = `yarn add --dev ${pkg.name} # Or alternatively \`${npmInstallDevCmd}\``;
    const yarnGlobalInstallCmd = `yarn global add ${pkg.name} # Or alternatively: \`${npmGlobalInstallCmd}\``;

    const getPkgInstallCmd = () => {
        if (preferYarn && preferDev) {
            return yarnInstallDev;
        }

        if (preferYarn && preferGlobal) {
            return yarnGlobalInstallCmd;
        }

        if (preferYarn) {
            return yarnInstallCmd;
        }

        if (preferDev) {
            return npmInstallDevCmd;
        }

        if (preferGlobal) {
            return npmGlobalInstallCmd;
        }

        return npmInstallCmd;
    };

    const pkgInstallCmd = getPkgInstallCmd();

    const isDefault = (property) => pkg[property] === pkgDefaults[property];

    const badgeBlock = badges ? `${badges}${LF}${LF}` : '';

    const install = !isDefault('name') ? fencedShCodeBlock(pkgInstallCmd) : PLACEHOLDER;

    const testing = pkg?.scripts?.test ? fencedShCodeBlock(pkgTestCmd) : PLACEHOLDER;

    const license = pkg?.license ? licenseBody(pkg.license) : PLACEHOLDER;

    const linkifiedLicense = config?.license?.linkTarget ? linkifyLicense(license, config.license.linkTarget) : '';

    const readmeSections = new ReadmeSections(
        [h1(pkg.name), `${badgeBlock}${pkg.description}`],
        [h2('Install'), install],
        [h2('Testing'), testing],
        [h2('License'), linkifiedLicense || license]
    );

    additionalSections.forEach((section) => {
        const positionIndex = readmeSections.getPositionIndex(section.position);
        const position = isNaN(positionIndex) ? readmeSections.length : positionIndex;
        const deleteCount = 0;
        const body = section.body || PLACEHOLDER;

        /**
         * @type {import('./ReadmeSections.js').ReadmeSection}
         */
        const sectionPair = [h2(section.title), body];

        readmeSections.splice(position, deleteCount, sectionPair);
    });

    return readmeSections.toString();
}
