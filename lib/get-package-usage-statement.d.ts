import { ReadmeConfig } from './index.d.ts';

/**
 * Get either a `require` or `import` statement for the "Usage" section of the README.
 */
export default function getPackageUsageStatement(config: ReadmeConfig): string;
