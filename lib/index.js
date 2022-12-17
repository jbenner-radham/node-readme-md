/**
 * @typedef {Object} License
 * @property {string} linkTarget
 */

/**
 * A `PositionDirective` is a string which begins with either "before:" or
 * "after:" and the section title to search for.
 *
 * @example
 * { position: 'after:Install' }
 * @example
 * { position: 'before:License' }
 * @typedef {string} PositionDirective
 */

/**
 * @typedef {Object} Section
 * @property {(number|PositionDirective)} [position] - If not specified it will default to the length of the array.
 * @property {string} title
 * @property {string} [body] - If not specified it will default to the placeholder text.
 */

import Badges from './Badges.js';
import escape from 'lodash.escape';
import { fencedShCodeBlock, h1, h2, LF } from 'md-writer';
import licenseBody from './license-body.js';
import linkifyLicense from './linkify-license.js';
import ReadmeSections from './ReadmeSections.js';

/**
 * @param {Object} parameters
 * @param {Section[]} [parameters.additionalSections]
 * @param {License} [parameters.license]
 * @param {Object} [parameters.pkg]
 */
export default function readme(parameters = {}) {
    const additionalSections = parameters?.additionalSections ?? [];
    const badges = new Badges(...parameters.badges || []).toString();
    const placeholder = '_To be documented._';
    const pkgDefaults = { description: placeholder, name: escape('<package-name>') };
    const pkg = Object.assign({}, pkgDefaults, parameters.pkg);
    const preferYarn = parameters?.config?.['prefer-yarn'] ?? false;
    const preferGlobal = pkg?.preferGlobal ?? false;
    const npmTestCmd = 'npm test';
    const yarnTestCmd = `yarn test # Or alternatively: \`${npmTestCmd}\``;
    const pkgTestCmd = preferYarn ? yarnTestCmd : npmTestCmd;
    const npmInstallCmd = `npm install ${pkg.name}`;
    const npmGlobalInstallCmd = `npm install --global ${pkg.name}`;
    const yarnInstallCmd = `yarn add ${pkg.name} # Or alternatively: \`${npmInstallCmd}\``;
    const yarnGlobalInstallCmd = `yarn global add ${pkg.name} # Or alternatively: \`${npmGlobalInstallCmd}\``;
    const pkgInstallCmd = preferYarn
        ? (preferGlobal ? yarnGlobalInstallCmd : yarnInstallCmd)
        : (preferGlobal ? npmGlobalInstallCmd : npmInstallCmd);

    const isDefault = (property) => (pkg[property] === pkgDefaults[property]);

    const badgeBlock = badges
        ? `${badges}${LF}${LF}`
        : '';

    const install = !isDefault('name')
        ? fencedShCodeBlock(pkgInstallCmd)
        : placeholder;

    const testing = pkg?.scripts?.test
        ? fencedShCodeBlock(pkgTestCmd)
        : placeholder;

    const license = pkg?.license
        ? licenseBody(pkg.license)
        : placeholder;

    const linkifiedLicense = parameters?.license?.linkTarget
        ? linkifyLicense(license, parameters.license.linkTarget)
        : '';

    const readmeSections = new ReadmeSections(
        [
            h1(pkg.name),
            `${badgeBlock}${pkg.description}`
        ],
        [
            h2('Install'),
            install
        ],
        [
            h2('Testing'),
            testing
        ],
        [
            h2('License'),
            linkifiedLicense || license
        ]
    );

    additionalSections.forEach(section => {
        const positionIndex = readmeSections.getPositionIndex(section.position);
        const position = isNaN(positionIndex) ? readmeSections.length : positionIndex;
        const deleteCount = 0;
        const body = section.body || placeholder;
        const sectionPair = [h2(section.title), body];

        readmeSections.splice(position, deleteCount, sectionPair);
    });

    return readmeSections.toString();
}
