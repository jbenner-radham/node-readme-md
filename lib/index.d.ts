import type { PackageJson } from 'type-fest';

/**
 * The badge style types.
 *
 * @see {@link https://shields.io/#styles}
 */
export type BadgeStyle = 'plastic' | 'flat' | 'flat-square' | 'for-the-badge' | 'social';

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

    /**
     * The style of the badge.
     */
    style: BadgeStyle;
}

export interface License {
    /**
     * The link target to the license file.
     */
    linkTarget: string;
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
     * will be appended onto the end of the readme.
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
     * While the license is derived from the `pkg.license` option this specifies
     * a link target to the license itself.
     */
    license?: License;

    /**
     * The contents of a `package.json` to parse to generate the readme.
     */
    pkg?: PackageJson;

    /**
     * Whether the package should be shown as being installed as a dev
     * dependency in the "Install" section of the readme. If both this and
     * `preferYarn` are set as `true` then this will take precedence.
     */
    preferDev?: boolean;

    /**
     * Whether the package should be shown as being globally installed in the
     * "Install" section of the readme. If both this and the `preferDev` option
     * are set as `true` then `preferDev` will take precedence.
     */
    preferYarn?: boolean;
}

export default function readme(config?: ReadmeConfig): string;
