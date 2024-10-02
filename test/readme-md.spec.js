import readme from '../lib/index.js';
import { stripIndents } from 'common-tags';

const any = jasmine.any;

describe('readme-md', function () {
    beforeEach(function () {
        this.config = {
            pkg: {
                name: 'readme-md'
            }
        };
    });

    it('is a function', function () {
        expect(readme).toEqual(any(Function));
    });

    it('generates a README with placeholders if not passed any arguments', function () {
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

    it('generates a titled README with placeholders if passed an object with only a `pkg.name` property', function () {
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

    it('generates a titled README with placeholders and an `import` statement in the "Usage" section', function () {
        const config = {
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

    it(`generates a titled README with placeholders and a global install example
        if passed an object with \`pkg.name\` and \`pkg.preferGlobal\`
        properties`, function () {
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

    it(`generates a titled README with placeholders and a save dev install
        example if passed an object with \`pkg.name\` and \`preferDev\`
        properties`, function () {
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

    it(`generates a titled README with placeholders and a save dev install
        example if passed an object with \`pkg.name\`, \`pkg.preferGlobal\`, and
       \`preferDev\` properties`, function () {
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

    it(`generates a titled README with variant placeholders if passed an object
        with \`pkg.name\` and \`pkg.engines.yarn\` properties`, function () {
        /** @var {import('../lib/index.d.ts').ReadmeConfig} */
        const config = {
            pkg: {
                name: 'awesome-package',
                // eslint-disable-next-line sort-keys
                engines: {
                    yarn: '1.x'
                }
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

    it(`generates a titled README with variant placeholders if passed an object with \`pkg.name\`,
        \`pkg.type\`, \`pkg.scripts.test\`, and \`pkg.engines.pnpm\` properties`, function () {
        /** @var {import('../lib/index.d.ts').ReadmeConfig} */
        const config = {
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

    it(`generates a titled README with variant placeholders and a global install
        if passed an object with \`pkg.name\`, \`pkg.preferGlobal\`, and
        \`pkg.engines.yarn\` properties`, function () {
        /** @var {import('../lib/index.d.ts').ReadmeConfig} */
        const config = {
            pkg: {
                name: 'awesome-package',
                // eslint-disable-next-line sort-keys
                engines: {
                    yarn: '1.x'
                },
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

    it(`generates a titled README with placeholders and a testing command if
        passed an object with \`pkg.name\` and \`pkg.scripts.test\` properties`, function () {
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

    it(`generates a titled README with variant placeholders and testing command
        if passed an object with \`pkg.name\`, \`pkg.scripts.test\`, and
        \`pkg.engines.yarn\` properties`, function () {
        /** @var {import('../lib/index.d.ts').ReadmeConfig} */
        const config = {
            pkg: {
                name: 'awesome-package',
                scripts: { test: 'jasmine' },
                // eslint-disable-next-line sort-keys
                engines: { yarn: '1.x' }
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

    it(`adds an "See Also" section when passed an appropriate
        \`additionalSections\` argument using a numeric position`, function () {
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

    it(`adds an "See Also" section when passed an appropriate
        \`additionalSections\` argument using an "after" position directive`, function () {
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

    it(`adds an "See Also" section when passed an appropriate
        \`additionalSections\` argument using a "before" position directive`, function () {
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

    it('documents an "MIT" software license', function () {
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

    it('documents and linkifies an "MIT" software license', function () {
        const config = {
            license: {
                link: 'LICENSE'
            },
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

    it('documents an "UNLICENSED" software license differently than a SPDX license', function () {
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

    it('returns a string', function () {
        expect(readme(this.config)).toEqual(any(String));
    });
});
