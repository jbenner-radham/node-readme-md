import getPackageBasename from './get-package-basename.js';
import type { ReadmeConfig } from './types.js';
import camelCase from 'camelcase';

/**
 * Get either a `require` or `import` statement for the "Usage" section of the README.
 */
export default function getPackageUsageStatement(config: ReadmeConfig = {}): string {
  type QuoteChar = '`' | '"' | "'";

  const getQuoteChar = (quoteType: 'backtick' | 'double' | 'single'): QuoteChar => {
    switch (quoteType) {
      case 'backtick':
        return '`';
      case 'double':
        return '"';
      default:
        return '\'';
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
