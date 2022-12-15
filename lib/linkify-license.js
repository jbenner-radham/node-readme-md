/**
 * @param {String} licenseBody
 * @param {String} linkTarget
 * @returns {String}
 * @see http://spec.commonmark.org/0.28/#inline-link
 */
export default function linkifyLicense(licenseBody, linkTarget) {
    return licenseBody.replace(/license file/, `[license file](${linkTarget})`);
}
