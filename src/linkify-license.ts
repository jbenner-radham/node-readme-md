import { DEFAULT_LICENSE_FILENAME } from './constants.js';

/**
 * Takes the body of the license section and injects a link to the license file.
 *
 * @see {@link https://spec.commonmark.org/0.31.2/#inline-link}
 */
export default function linkifyLicense(body: string, link: boolean | string): string {
  return body.replace(
    /license file/, `[license file](${link === true ? DEFAULT_LICENSE_FILENAME : link})`
  );
}
