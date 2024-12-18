import Badges from './Badges.js';
import { fencedJsCodeBlock, fencedShCodeBlock, h1, h2, LF } from 'md-writer';
import getPackageInstallCommand from './get-package-install-command.js';
import getPackageTestCommand from './get-package-test-command.js';
import getPackageUsageStatement from './get-package-usage-statement.js';
import licenseBody from './license-body.js';
import linkifyLicense from './linkify-license.js';
import { PLACEHOLDER } from './constants.js';
import ReadmeSections from './ReadmeSections.js';

/**
 * Generates a readme document based upon the provided config.
 *
 * @param {import('./index.d.ts').ReadmeConfig} [config={}]
 * @returns {string}
 */
export default function readme(config = {}) {
    const additionalSections = config?.additionalSections ?? [];
    const badges = new Badges(...(config.badges || [])).toString();
    const pkgDefaults = { description: PLACEHOLDER, name: '&lt;package-name&gt;' };
    const pkg = Object.assign({}, pkgDefaults, config.pkg);
    const preferDev = config?.preferDev ?? false;
    const preferGlobal = pkg?.preferGlobal && preferDev === false;
    const pkgTestCmd = getPackageTestCommand({ ...config, pkg });
    const pkgInstallCmd = getPackageInstallCommand({ ...config, pkg });
    const sectionOverrides = config.sectionOverrides ?? {};

    const isDefault = (property) => pkg[property] === pkgDefaults[property];

    const pkgUsageStatement = !isDefault('name') ? getPackageUsageStatement(config) : '';

    const install = !isDefault('name') ? fencedShCodeBlock(pkgInstallCmd) : PLACEHOLDER;

    const usage =
        !isDefault('name') && (preferDev || !preferGlobal) ? fencedJsCodeBlock(pkgUsageStatement) : PLACEHOLDER;

    const testing = pkg?.scripts?.test ? fencedShCodeBlock(pkgTestCmd) : PLACEHOLDER;

    const license = pkg?.license ? licenseBody(pkg.license) : PLACEHOLDER;

    const linkifiedLicense = config?.licenseLink ? linkifyLicense(license, config.licenseLink) : '';

    const heroImage = config.heroImage ? `![${config.heroImage.alt}](${config.heroImage.src})` : '';

    const identity = (value) => value;

    const readmeSections = new ReadmeSections(
        [h1(pkg.name), [badges, pkg.description, heroImage].filter(identity).join(`${LF}${LF}`)],
        [h2('Install'), sectionOverrides.install ?? install],
        [h2('Usage'), sectionOverrides.usage ?? usage],
        [h2('Testing'), sectionOverrides.testing ?? testing],
        [h2('License'), sectionOverrides.license ?? (linkifiedLicense || license)]
    );

    additionalSections.forEach((section) => {
        const positionIndex = readmeSections.getPositionIndex(section.position);
        const position = Number.isNaN(positionIndex) ? readmeSections.length : positionIndex;
        const deleteCount = 0;
        const body = section.body || PLACEHOLDER;

        readmeSections.splice(position, deleteCount, [h2(section.title), body]);
    });

    return readmeSections.toString();
}
