import camelCase from 'camelcase';
import getPackageBasename from './get-package-basename.js';

/**
 * Get either a `require` or `import` statement for the "Usage" section of the README.
 *
 * @param {import('./index.d.ts').ReadmeConfig} [config = {}]
 * @returns {string}
 */
export default function getPackageUsageStatement(config = {}) {
    const getQuoteChar = (quoteType) => {
        switch (quoteType) {
            case 'backtick':
                return '`';
            case 'double':
                return '"';
            default:
                return "'";
        }
    };

    const { pkg = {}, preferSemicolons = true, quoteType = 'single' } = config;
    const quote = getQuoteChar(quoteType);
    const terminator = preferSemicolons ? ';' : '';

    if (!pkg.name) return '';

    const pkgBasename = getPackageBasename(pkg.name);

    return pkg.type === 'module'
        ? `import ${camelCase(pkgBasename)} from ${quote}${pkg.name}${quote}${terminator}`
        : `const ${camelCase(pkgBasename)} = require(${quote}${pkg.name}${quote})${terminator}`;
}
