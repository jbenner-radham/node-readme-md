import type { PackageJson } from 'type-fest';

export type { default as Badges } from './Badges.d.ts';
export type { DEFAULT_LICENSE_FILENAME, PLACEHOLDER } from './constants.d.ts';
export type { default as getPackageBasename } from './get-package-basename.d.ts';
export type { default as getPackageInstallCommand } from './get-package-install-command.d.ts';
export type { default as getPackageManager, PackageManager } from './get-package-manager.d.ts';
export type { default as getPackageTestCommand } from './get-package-test-command.d.ts';
export type { default as getPackageUsageStatement } from './get-package-usage-statement.d.ts';
export type { default as licenseBody } from './license-body.d.ts';
export type { default as linkifyLicense } from './linkify-license.d.ts';
export type { default as ReadmeSections, ReadmeSection } from './ReadmeSections.d.ts';

export interface Badge {
    /**
     * The image alt tag.
     */
    alt: string;

    /**
     * The image URL.
     */
    image: string;

    /**
     * The link target of the image.
     */
    link: string;
}

export interface HeroImage {
    /**
     * The image alt tag.
     */
    alt: string;

    /**
     * The image URL or path.
     */
    src: string;
}

/**
 * A `PositionDirective` is a string which begins with either "before:" or
 * "after:" and the section title to search for.
 *
 * @example
 * { position: 'after:Install' }
 * @example
 * { position: 'before:License' }
 */
export type PositionDirective = string;

export interface Section {
    /**
     * The position of the section in the readme. If not specified the section
     * will be appended onto the end of the readme. If a number is specified it
     * can be either positive or negative.
     */
    position?: number | PositionDirective;

    /**
     * The title of the section.
     */
    title: string;

    /**
     * The section body. If not specified it will default to the placeholder
     * text.
     */
    body?: string;
}

export interface SectionOverrides {
    /**
     * Override for the "Install" section body text.
     */
    install?: string;

    /**
     * Override for the "Usage" section body text.
     */
    usage?: string;

    /**
     * Override for the "Testing" section body text.
     */
    testing?: string;

    /**
     * Override for the "License" section body text.
     */
    license?: string;
}

export interface ReadmeConfig {
    /**
     * Additional sections to add to the readme.
     */
    additionalSections?: Section[];

    /**
     * Badges to add to the readme.
     */
    badges?: Badge[];

    /**
     * Add a hero image to the readme, below the description.
     */
    heroImage?: HeroImage;

    /**
     * While the license is derived from the `pkg.license` option this specifies
     * a link target to the license itself. If defined as `true` it will default
     * to setting the link target to "LICENSE". Please note that if
     * `pkg.license` is not defined this setting will have no effect.
     */
    licenseLink?: boolean | string;

    /**
     * The contents of a `package.json` to parse to generate the readme.
     */
    pkg?: PackageJson;

    /**
     * Whether the package should be shown as being installed as a dev
     * dependency in the "Install" section of the readme. Defaults to `false`.
     */
    preferDev?: boolean;

    /**
     * The package manager used in the "Install" and "Testing" sections defaults
     * to npm. However, this can be changed by specifying a package manager
     * (pnpm, Yarn) in `pkg.engines`. If desired set this to `true` to override
     * any package manager specified and utilize npm. Defaults to `false`.
     */
    preferNpm?: boolean;

    /**
     * Whether the example code in the "Usage" section should be terminated by
     * semicolons. Defaults to `true`.
     */
    preferSemicolons?: boolean;

    /**
     * The type of quotes used in the "Usage" section. Defaults to single
     * quotes.
     */
    quoteType?: 'double' | 'single';

    /**
     * Override any of the default generated sections.
     */
    sectionOverrides?: SectionOverrides;
}

/**
 * Generates a readme document based upon the provided config.
 */
export default function readme(config?: ReadmeConfig): string;
