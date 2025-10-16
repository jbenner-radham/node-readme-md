import { PLACEHOLDER } from './constants.js';

/**
 * Generates the body of the license section for the readme.
 *
 * @see {@link https://spdx.org/licenses/}
 */
export default function licenseBody(spdxIdentifier = ''): typeof PLACEHOLDER | string {
  if (spdxIdentifier.toUpperCase() === 'UNLICENSED') {
    return 'This is unlicensed proprietary software.';
  }

  if (!spdxIdentifier.length) {
    return PLACEHOLDER;
  }

  return `The ${spdxIdentifier} License. See the license file for details.`;
}
