/**
 * Takes the body of the license section and injects a link to the license file.
 *
 * @param {string} licenseBody
 * @param {string} linkTarget
 * @returns {string}
 * @see {@link https://spec.commonmark.org/0.30/#inline-link}
 */
export default function linkifyLicense(licenseBody, linkTarget) {
    return licenseBody.replace(/license file/, `[license file](${linkTarget})`);
}
