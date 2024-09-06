import { PLACEHOLDER } from './constants.js';

/**
 * Generates the body of the license section of the readme.
 *
 * @param {string} [spdxIdentifier='']
 * @returns {import('./constants.d.ts').PLACEHOLDER | string}
 * @see {@link https://spdx.org/licenses/}
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
