readme-md
=========
[![npm Version][NPM VERSION BADGE]][NPM PAGE]
[![Node.js][NODE VERSION BADGE]][NODE PAGE]
[![GitHub License][LICENSE BADGE]][LICENSE PAGE]
[![CI Status][CI BADGE]][CI PAGE]

A `README.md` generator library.

Install
-------
```shell
yarn add readme-md # Or alternatively: `npm install readme-md`
```

Usage
-----
```javascript
import readme from 'readme-md';

const pkg = {
    name: 'my-awesome-package',
    description: 'An awesome package.',
    type: 'module',
    license: 'MIT',
    scripts: {
        test: 'jest'
    }
};
const additionalSections = [
    {
        position: 'before:Install',
        title: 'Greetings',
        body: 'Hello world!'
    }
];

readme({ pkg, additionalSections });
// > my-awesome-package
// > ==================
// > An awesome package.
// >
// > Greetings
// > ---------
// > Hello world!
// >
// > Install
// > -------
// > ```shell
// > npm install my-awesome-package
// > ```
// >
// > Usage
// > -----
// > ```javascript
// > import myAwesomePackage from 'my-awesome-package';
// > ```
// >
// > Testing
// > -------
// > ```shell
// > npm test
// > ```
// >
// > License
// > -------
// > The MIT License. See the license file for details.
```

**NOTE**: This is a pure ESM package. See [here](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) for details.

API
---
```typescript
import type { PackageJson } from 'type-fest';

/**
 * Generates a readme document based upon the provided config.
 */
export default function readme(config?: ReadmeConfig): string;

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
     * dependency in the "Install" section of the readme. Defaults to `false`.
     */
    preferDev?: boolean;

    /**
     * The package manager used in the "Install" and "Test" sections defaults to
     * npm. However, this can be changed by specifying a package manager
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
}

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

/**
 * The badge style types.
 *
 * @see {@link https://shields.io/badges}
 */
export type BadgeStyle = 'plastic' | 'flat' | 'flat-square' | 'for-the-badge' | 'social';

export interface License {
    /**
     * The link target to the license file.
     */
    link: string;
}
```


Testing
-------
```shell
yarn test # Or alternatively: `npm test`
```

See Also
--------
- [readme-md-cli @ npm](https://www.npmjs.com/package/readme-md-cli)

License
-------
The MIT License. See the [license file](LICENSE) for details.

[CI BADGE]: https://github.com/jbenner-radham/node-readme-md/actions/workflows/ci.yaml/badge.svg
[CI PAGE]: https://github.com/jbenner-radham/node-readme-md/actions/workflows/ci.yaml
[LICENSE BADGE]: https://img.shields.io/badge/license-MIT%20License-blue.svg
[LICENSE PAGE]: https://github.com/jbenner-radham/node-readme-md/blob/master/LICENSE
[NODE PAGE]: https://nodejs.org/
[NODE VERSION BADGE]: https://img.shields.io/node/v/readme-md.svg
[NPM PAGE]: https://www.npmjs.com/package/readme-md
[NPM VERSION BADGE]: https://img.shields.io/npm/v/readme-md.svg
