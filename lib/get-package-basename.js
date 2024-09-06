/**
 * Get the basename of a package. If a package is scoped then it will be unscoped. Otherwise the whole name will be
 * returned.
 *
 * @param {string} [pkgName='']
 * @returns {string}
 */
export default function getPackageBasename(pkgName = '') {
    const isScoped = /^@.+\/.+/.test(pkgName);

    return isScoped ? pkgName.split('/')[1] : pkgName;
}
