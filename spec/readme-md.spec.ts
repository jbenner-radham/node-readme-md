import readme from '../src/index.js';
import { stripIndents } from 'common-tags';
import { describe, expect, it } from 'vitest';
import type { ReadmeConfig } from '../src/types.js';

describe('readme-md', () => {
    it('is a function', () => {
        expect(readme).toBeTypeOf('function');
    });

    it('returns a string', () => {
        const config = { pkg: { name: 'awesome-package' } };

        expect(readme(config)).toBeTypeOf('string');
    });

    it('generates a README with placeholders if not passed any arguments', () => {
        const fixture = stripIndents`
            &lt;package-name&gt;
            ====================
            _To be documented._

            Install
            -------
            _To be documented._

            Usage
            -----
            _To be documented._

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
        `;

        expect(readme()).toEqual(fixture);
    });

    it('generates a titled README with placeholders if passed an object with only a `pkg.name` property', () => {
        const config = { pkg: { name: 'awesome-package' } };

        const fixture = stripIndents`
            awesome-package
            ===============
            _To be documented._

            Install
            -------
            \`\`\`sh
            npm install awesome-package
            \`\`\`

            Usage
            -----
            \`\`\`js
            const awesomePackage = require('awesome-package');
            \`\`\`

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
        `;

        expect(readme(config)).toEqual(fixture);
    });

    it('generates a titled README with placeholders and an `import` statement in the "Usage" section', () => {
        const config: ReadmeConfig = {
            pkg: {
                name: 'awesome-package',
                type: 'module'
            }
        };

        const fixture = stripIndents`
            awesome-package
            ===============
            _To be documented._

            Install
            -------
            \`\`\`sh
            npm install awesome-package
            \`\`\`

            Usage
            -----
            \`\`\`js
            import awesomePackage from 'awesome-package';
            \`\`\`

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
        `;

        expect(readme(config)).toEqual(fixture);
    });

    it(`generates a titled README with placeholders and a global install example if passed an object with \`pkg.name\`
        and \`pkg.preferGlobal\` properties`, () => {
        const config = { pkg: { name: 'awesome-package', preferGlobal: true } };

        const fixture = stripIndents`
            awesome-package
            ===============
            _To be documented._

            Install
            -------
            \`\`\`sh
            npm install --global awesome-package
            \`\`\`

            Usage
            -----
            _To be documented._

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
        `;

        expect(readme(config)).toEqual(fixture);
    });

    it(`generates a titled README with placeholders and a save dev install example if passed an object with \`pkg.name\`
        and \`preferDev\` properties`, () => {
        const config = {
            pkg: {
                name: 'awesome-package'
            },
            preferDev: true
        };
        const expected = stripIndents`
            awesome-package
            ===============
            _To be documented._

            Install
            -------
            \`\`\`sh
            npm install --save-dev awesome-package
            \`\`\`

            Usage
            -----
            \`\`\`js
            const awesomePackage = require('awesome-package');
            \`\`\`

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
        `;

        expect(readme(config)).toEqual(expected);
    });

    it(`generates a titled README with placeholders and a save dev install example if passed an object with
        \`pkg.name\`, \`pkg.preferGlobal\`, and \`preferDev\` properties`, () => {
        const config = {
            pkg: {
                name: 'awesome-package',
                preferGlobal: true
            },
            preferDev: true
        };
        const expected = stripIndents`
            awesome-package
            ===============
            _To be documented._

            Install
            -------
            \`\`\`sh
            npm install --save-dev awesome-package
            \`\`\`

            Usage
            -----
            \`\`\`js
            const awesomePackage = require('awesome-package');
            \`\`\`

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
    `;

        expect(readme(config)).toEqual(expected);
    });

    it(`generates a titled README with variant placeholders if passed an object with \`pkg.name\` and
        \`pkg.engines.yarn\` properties`, () => {
        const config = {
            pkg: {
                engines: {
                    yarn: '1.x'
                },
                name: 'awesome-package'
            }
        };

        const fixture = stripIndents`
            awesome-package
            ===============
            _To be documented._

            Install
            -------
            \`\`\`sh
            yarn add awesome-package # Or alternatively: \`npm install awesome-package\`
            \`\`\`

            Usage
            -----
            \`\`\`js
            const awesomePackage = require('awesome-package');
            \`\`\`

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
        `;

        expect(readme(config)).toEqual(fixture);
    });

    it(`generates a titled README with variant placeholders if passed an object with \`pkg.name\`, \`pkg.type\`,
        \`pkg.scripts.test\`, and \`pkg.engines.pnpm\` properties`, () => {
        const config: ReadmeConfig = {
            pkg: {
                engines: {
                    pnpm: '*'
                },
                name: 'awesome-package',
                scripts: {
                    test: 'mocha'
                },
                type: 'module'
            }
        };

        const fixture = stripIndents`
            awesome-package
            ===============
            _To be documented._

            Install
            -------
            \`\`\`sh
            pnpm add awesome-package # Or alternatively: \`npm install awesome-package\`
            \`\`\`

            Usage
            -----
            \`\`\`js
            import awesomePackage from 'awesome-package';
            \`\`\`

            Testing
            -------
            \`\`\`sh
            pnpm test # Or alternatively: \`npm test\`
            \`\`\`

            License
            -------
            _To be documented._
        `;

        expect(readme(config)).toEqual(fixture);
    });

    it(`generates a titled README with variant placeholders and a global install if passed an object with \`pkg.name\`,
        \`pkg.preferGlobal\`, and \`pkg.engines.yarn\` properties`, () => {
        const config = {
            pkg: {
                engines: {
                    yarn: '1.x'
                },
                name: 'awesome-package',
                preferGlobal: true
            }
        };

        const fixture = stripIndents`
            awesome-package
            ===============
            _To be documented._

            Install
            -------
            \`\`\`sh
            yarn global add awesome-package # Or alternatively: \`npm install --global awesome-package\`
            \`\`\`

            Usage
            -----
            _To be documented._

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
        `;

        expect(readme(config)).toEqual(fixture);
    });

    it(`generates a titled README with placeholders and a testing command if passed an object with \`pkg.name\` and
        \`pkg.scripts.test\` properties`, () => {
        const config = {
            pkg: {
                name: 'awesome-package',
                scripts: { test: 'jasmine' }
            }
        };

        const fixture = stripIndents`
            awesome-package
            ===============
            _To be documented._

            Install
            -------
            \`\`\`sh
            npm install awesome-package
            \`\`\`

            Usage
            -----
            \`\`\`js
            const awesomePackage = require('awesome-package');
            \`\`\`

            Testing
            -------
            \`\`\`sh
            npm test
            \`\`\`

            License
            -------
            _To be documented._
        `;

        expect(readme(config)).toEqual(fixture);
    });

    it(`generates a titled README with variant placeholders and testing command if passed an object with \`pkg.name\`,
        \`pkg.scripts.test\`, and \`pkg.engines.yarn\` properties`, () => {
        const config = {
            pkg: {
                engines: { yarn: '1.x' },
                name: 'awesome-package',
                scripts: { test: 'jasmine' }
            }
        };

        const fixture = stripIndents`
            awesome-package
            ===============
            _To be documented._

            Install
            -------
            \`\`\`sh
            yarn add awesome-package # Or alternatively: \`npm install awesome-package\`
            \`\`\`

            Usage
            -----
            \`\`\`js
            const awesomePackage = require('awesome-package');
            \`\`\`

            Testing
            -------
            \`\`\`sh
            yarn test # Or alternatively: \`npm test\`
            \`\`\`

            License
            -------
            _To be documented._
        `;

        expect(readme(config)).toEqual(fixture);
    });

    it(`generates a titled README with variant placeholders and testing command if passed an object with \`pkg.name\`,
        \`pkg.scripts.test\`, and \`pkg.packageManager\` properties`, () => {
        const config = {
            pkg: {
                name: 'awesome-package',
                packageManager: 'pnpm@^9.12.1',
                scripts: { test: 'vitest' }
            }
        };

        const fixture = stripIndents`
            awesome-package
            ===============
            _To be documented._

            Install
            -------
            \`\`\`sh
            pnpm add awesome-package # Or alternatively: \`npm install awesome-package\`
            \`\`\`

            Usage
            -----
            \`\`\`js
            const awesomePackage = require('awesome-package');
            \`\`\`

            Testing
            -------
            \`\`\`sh
            pnpm test # Or alternatively: \`npm test\`
            \`\`\`

            License
            -------
            _To be documented._
        `;

        expect(readme(config)).toEqual(fixture);
    });

    it(`adds an "See Also" section when passed an appropriate \`additionalSections\` argument using a numeric position`, () => {
        const config = {
            additionalSections: [
                {
                    body: '- [Example](https://www.example.com/)',
                    position: -1,
                    title: 'See Also'
                }
            ]
        };

        const fixture = stripIndents`
            &lt;package-name&gt;
            ====================
            _To be documented._

            Install
            -------
            _To be documented._

            Usage
            -----
            _To be documented._

            Testing
            -------
            _To be documented._

            See Also
            --------
            - [Example](https://www.example.com/)

            License
            -------
            _To be documented._
        `;

        expect(readme(config)).toEqual(fixture);
    });

    it(`adds an "See Also" section when passed an appropriate \`additionalSections\` argument using an "after" position
        directive`, () => {
        const config = {
            additionalSections: [
                {
                    body: '- [Example](https://www.example.com/)',
                    position: 'after:Testing',
                    title: 'See Also'
                }
            ]
        };

        const fixture = stripIndents`
            &lt;package-name&gt;
            ====================
            _To be documented._

            Install
            -------
            _To be documented._

            Usage
            -----
            _To be documented._

            Testing
            -------
            _To be documented._

            See Also
            --------
            - [Example](https://www.example.com/)

            License
            -------
            _To be documented._
        `;

        expect(readme(config)).toEqual(fixture);
    });

    it(`adds an "See Also" section when passed an appropriate \`additionalSections\` argument using a "before" position
        directive`, () => {
        const config = {
            additionalSections: [
                {
                    body: '- [Example](https://www.example.com/)',
                    position: 'before:License',
                    title: 'See Also'
                }
            ]
        };

        const fixture = stripIndents`
            &lt;package-name&gt;
            ====================
            _To be documented._

            Install
            -------
            _To be documented._

            Usage
            -----
            _To be documented._

            Testing
            -------
            _To be documented._

            See Also
            --------
            - [Example](https://www.example.com/)

            License
            -------
            _To be documented._
        `;

        expect(readme(config)).toEqual(fixture);
    });

    it('documents an "MIT" software license', () => {
        const config = { pkg: { license: 'MIT' } };

        const fixture = stripIndents`
            &lt;package-name&gt;
            ====================
            _To be documented._

            Install
            -------
            _To be documented._

            Usage
            -----
            _To be documented._

            Testing
            -------
            _To be documented._

            License
            -------
            The MIT License. See the license file for details.
        `;

        expect(readme(config)).toEqual(fixture);
    });

    it('documents and linkifies an "MIT" software license', () => {
        const config = {
            licenseLink: 'LICENSE',
            pkg: {
                license: 'MIT'
            }
        };

        const fixture = stripIndents`
            &lt;package-name&gt;
            ====================
            _To be documented._

            Install
            -------
            _To be documented._

            Usage
            -----
            _To be documented._

            Testing
            -------
            _To be documented._

            License
            -------
            The MIT License. See the [license file](LICENSE) for details.
        `;

        expect(readme(config)).toEqual(fixture);
    });

    it('documents and linkifies an "MIT" software license automatically when `config.licenseLink` is defined as `true`', () => {
        const config = {
            licenseLink: true,
            pkg: {
                license: 'MIT'
            }
        };

        const fixture = stripIndents`
            &lt;package-name&gt;
            ====================
            _To be documented._

            Install
            -------
            _To be documented._

            Usage
            -----
            _To be documented._

            Testing
            -------
            _To be documented._

            License
            -------
            The MIT License. See the [license file](LICENSE) for details.
        `;

        expect(readme(config)).toEqual(fixture);
    });

    it('overrides the "License" section when provided the appropriate config', () => {
        const config = {
            licenseLink: 'LICENSE',
            pkg: {
                license: 'MIT'
            },
            sectionOverrides: {
                license: 'Licensed under the NOT A REAL LICENSE license.'
            }
        };

        const fixture = stripIndents`
            &lt;package-name&gt;
            ====================
            _To be documented._

            Install
            -------
            _To be documented._

            Usage
            -----
            _To be documented._

            Testing
            -------
            _To be documented._

            License
            -------
            Licensed under the NOT A REAL LICENSE license.
        `;

        expect(readme(config)).toEqual(fixture);
    });

    it('documents an "UNLICENSED" software license differently than a SPDX license', () => {
        const config = { pkg: { license: 'UNLICENSED' } };

        const fixture = stripIndents`
            &lt;package-name&gt;
            ====================
            _To be documented._

            Install
            -------
            _To be documented._

            Usage
            -----
            _To be documented._

            Testing
            -------
            _To be documented._

            License
            -------
            This is unlicensed proprietary software.
        `;

        expect(readme(config)).toEqual(fixture);
    });

    it('displays a hero image when one is specified', () => {
        const config = {
            heroImage: { alt: 'Example', src: 'path/to/image.gif' }
        };

        const fixture = stripIndents`
            &lt;package-name&gt;
            ====================
            _To be documented._

            ![Example](path/to/image.gif)

            Install
            -------
            _To be documented._

            Usage
            -----
            _To be documented._

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
        `;

        expect(readme(config)).toEqual(fixture);
    });
});
