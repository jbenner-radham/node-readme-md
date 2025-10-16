import Badges from './Badges.js';
import { PLACEHOLDER } from './constants.js';
import getPackageInstallCommand from './get-package-install-command.js';
import getPackageTestCommand from './get-package-test-command.js';
import getPackageUsageStatement from './get-package-usage-statement.js';
import licenseBody from './license-body.js';
import linkifyLicense from './linkify-license.js';
import ReadmeSections from './ReadmeSections.js';
import type { ReadmeConfig } from './types.js';
import { fencedJsCodeBlock, fencedShCodeBlock, h1, h2, LF } from 'md-writer';

/**
 * Generates a readme document based upon the provided config.
 */
export default function readme(config: ReadmeConfig = {}): string {
  const additionalSections = config?.additionalSections ?? [];
  const badges = new Badges(...(config.badges || [])).toString();
  const pkgDefaults: Record<string, string> = {
    description: PLACEHOLDER, name: '&lt;package-name&gt;'
  };
  const pkg = Object.assign({}, pkgDefaults, config.pkg);
  const preferDev = config?.preferDev ?? false;
  const preferGlobal = pkg?.preferGlobal && preferDev === false;
  const pkgTestCmd = getPackageTestCommand({ ...config, pkg });
  const pkgInstallCmd = getPackageInstallCommand({ ...config, pkg });
  const sectionOverrides = config.sectionOverrides ?? {};

  const isDefault = (property: string) => pkg[property] === pkgDefaults[property];

  const pkgUsageStatement = !isDefault('name') ? getPackageUsageStatement(config) : '';

  const install = !isDefault('name') ? fencedShCodeBlock(pkgInstallCmd) : PLACEHOLDER;

  const usage = !isDefault('name') && (preferDev || !preferGlobal)
    ? fencedJsCodeBlock(pkgUsageStatement)
    : PLACEHOLDER;

  const testing = pkg?.scripts?.test ? fencedShCodeBlock(pkgTestCmd) : PLACEHOLDER;

  const license = pkg?.license ? licenseBody(pkg.license) : PLACEHOLDER;

  const linkifiedLicense = config?.licenseLink ? linkifyLicense(license, config.licenseLink) : '';

  const heroImage = config.heroImage ? `![${config.heroImage.alt}](${config.heroImage.src})` : '';

  const identity = <T>(value: T): T => value;

  const readmeSections = new ReadmeSections(
    [h1(pkg.name), [badges, pkg.description, heroImage].filter(identity).join(`${LF}${LF}`)],
    [h2('Install'), sectionOverrides.install ?? install],
    [h2('Usage'), sectionOverrides.usage ?? usage],
    [h2('Testing'), sectionOverrides.testing ?? testing],
    [h2('License'), sectionOverrides.license ?? (linkifiedLicense || license)]
  );

  additionalSections.forEach(section => {
    if (typeof section.position === 'undefined') return;

    const positionIndex = readmeSections.getPositionIndex(section.position);
    const position = Number.isNaN(positionIndex) ? readmeSections.length : positionIndex;
    const deleteCount = 0;
    const body = section.body || PLACEHOLDER;

    readmeSections.splice(position, deleteCount, [h2(section.title), body]);
  });

  return readmeSections.toString();
}

export { default as Badges } from './Badges.js';
export { DEFAULT_LICENSE_FILENAME, PLACEHOLDER } from './constants.js';
export { default as getPackageBasename } from './get-package-basename.js';
export { default as getPackageInstallCommand } from './get-package-install-command.js';
export { default as getPackageManager } from './get-package-manager.js';
export { default as getPackageTestCommand } from './get-package-test-command.js';
export { default as getPackageUsageStatement } from './get-package-usage-statement.js';
export { default as licenseBody } from './license-body.js';
export { default as linkifyLicense } from './linkify-license.js';
export { default as ReadmeSections } from './ReadmeSections.js';
export * from './types.js';
