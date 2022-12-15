/**
 * @see https://spdx.org/licenses/
 */
export default function licenseBody(spdxIdentifier) {
    if (spdxIdentifier.toUpperCase() === 'UNLICENSED') {
        return 'This is unlicensed proprietary software.';
    }

    const licenses = { mit: 'MIT License (Expat)' };
    const license = licenses?.[spdxIdentifier.toLowerCase()] ?? `${spdxIdentifier} License`;

    return `The ${license}. See the license file for details.`;
}
