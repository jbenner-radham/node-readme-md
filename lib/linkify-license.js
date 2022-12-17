/**
 * @param {string} licenseBody
 * @param {string} linkTarget
 * @returns {string}
 * @see https://spec.commonmark.org/0.30/#inline-link
 */
export default function linkifyLicense(licenseBody, linkTarget) {
    return licenseBody.replace(/license file/, `[license file](${linkTarget})`);
}
