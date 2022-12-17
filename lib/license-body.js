import { PLACEHOLDER } from './constants.js';

/**
 * @param {string} [spdxIdentifier='']
 * @returns {string}
 * @see https://spdx.org/licenses/
 */
export default function licenseBody(spdxIdentifier = '') {
    if (spdxIdentifier.toUpperCase() === 'UNLICENSED') {
        return 'This is unlicensed proprietary software.';
    }

    if (!spdxIdentifier.length) {
        return PLACEHOLDER;
    }

    return `The ${spdxIdentifier} License. See the license file for details.`;
}
