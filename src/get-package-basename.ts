/**
 * Get the basename of a package. If a package is scoped, then it will be unscoped. Otherwise, the
 * whole name will be returned.
 */
export default function getPackageBasename(pkgName = ''): string {
  const isScoped = /^@.+\/.+/.test(pkgName);

  return isScoped ? pkgName.split('/').at(1)! : pkgName;
}
