import readme from '../lib/index.js';
import { stripIndents } from 'common-tags';

const any = jasmine.any;

describe('readme-md', function () {
    beforeEach(function () {
        this.parameters = {
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
        const parameters = { pkg: { name: 'awesome-package' } };

        const fixture = stripIndents`
            awesome-package
            ===============
            _To be documented._

            Install
            -------
            \`\`\`sh
            npm install awesome-package
            \`\`\`

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
        `;

        expect(readme(parameters)).toEqual(fixture);
    });

    it(`generates a titled README with placeholders and a global install example
        if passed an object with \`pkg.name\` and \`pkg.preferGlobal\`
        properties`,
    function () {
        const parameters = { pkg: { name: 'awesome-package', preferGlobal: true } };

        const fixture = stripIndents`
            awesome-package
            ===============
            _To be documented._

            Install
            -------
            \`\`\`sh
            npm install --global awesome-package
            \`\`\`

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
        `;

        expect(readme(parameters)).toEqual(fixture);
    });

    it(`generates a titled README with placeholders and a save dev install
        example if passed an object with \`pkg.name\` and \`preferDev\`
        properties`,
    function () {
        const parameters = {
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

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
        `;

        expect(readme(parameters)).toEqual(expected);
    });

    it(`generates a titled README with placeholders and a save dev install
        example if passed an object with \`pkg.name\`, \`pkg.preferGlobal\`, and
       \`preferDev\` properties`,
    function () {
        const parameters = {
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

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
    `;

        expect(readme(parameters)).toEqual(expected);
    });

    it(`generates a titled README with variant placeholders if passed an object
        with \`pkg.name\` and \`preferYarn\` properties`,
    function () {
        const parameters = {
            pkg: { name: 'awesome-package' },
            preferYarn: true
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

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
        `;

        expect(readme(parameters)).toEqual(fixture);
    });

    it(`generates a titled README with variant placeholders and a global install
        if passed an object with \`pkg.name\`, \`pkg.preferGlobal\`, and
        \`preferYarn\` properties`,
    function () {
        const parameters = {
            pkg: { name: 'awesome-package', preferGlobal: true },
            preferYarn: true
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

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
        `;

        expect(readme(parameters)).toEqual(fixture);
    });

    it(`generates a titled README with placeholders and a testing command if
        passed an object with \`pkg.name\` and \`pkg.scripts.test\` properties`,
    function () {
        const parameters = {
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

            Testing
            -------
            \`\`\`sh
            npm test
            \`\`\`

            License
            -------
            _To be documented._
        `;

        expect(readme(parameters)).toEqual(fixture);
    });

    it(`generates a titled README with variant placeholders and testing command
        if passed an object with \`pkg.name\`, \`pkg.scripts.test\`, and
        \`preferYarn\` properties`,
    function () {
        const parameters = {
            pkg: {
                name: 'awesome-package',
                scripts: { test: 'jasmine' }
            },
            preferYarn: true
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

            Testing
            -------
            \`\`\`sh
            yarn test # Or alternatively: \`npm test\`
            \`\`\`

            License
            -------
            _To be documented._
        `;

        expect(readme(parameters)).toEqual(fixture);
    });

    it(`generates a titled README with a "Usage" section if passed \`pkg.name\`
        and an appropriate \`additionalSections\` argument`,
    function () {
        const parameters = {
            additionalSections: [
                {
                    body: stripIndents`
                        \`\`\`js
                        require('awesome-package')('Go go go!');
                        \`\`\`
                    `,
                    position: 'after:Install',
                    title: 'Usage'
                }
            ],
            pkg: { name: 'awesome-package' }
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
            require('awesome-package')('Go go go!');
            \`\`\`

            Testing
            -------
            _To be documented._

            License
            -------
            _To be documented._
        `;

        expect(readme(parameters)).toEqual(fixture);
    });

    it(`adds an "See Also" section when passed an appropriate
        \`additionalSections\` argument using a numeric position`,
    function () {
        const parameters = {
            additionalSections: [
                {
                    body: '- [Example](http://www.example.com/)',
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

            Testing
            -------
            _To be documented._

            See Also
            --------
            - [Example](http://www.example.com/)

            License
            -------
            _To be documented._
        `;

        expect(readme(parameters)).toEqual(fixture);
    });

    it(`adds an "See Also" section when passed an appropriate
        \`additionalSections\` argument using an "after" position directive`,
    function () {
        const parameters = {
            additionalSections: [
                {
                    body: '- [Example](http://www.example.com/)',
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

            Testing
            -------
            _To be documented._

            See Also
            --------
            - [Example](http://www.example.com/)

            License
            -------
            _To be documented._
        `;

        expect(readme(parameters)).toEqual(fixture);
    });

    it(`adds an "See Also" section when passed an appropriate
        \`additionalSections\` argument using a "before" position directive`,
    function () {
        const parameters = {
            additionalSections: [
                {
                    body: '- [Example](http://www.example.com/)',
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

            Testing
            -------
            _To be documented._

            See Also
            --------
            - [Example](http://www.example.com/)

            License
            -------
            _To be documented._
        `;

        expect(readme(parameters)).toEqual(fixture);
    });

    it('documents an "MIT" software license', function () {
        const parameters = { pkg: { license: 'MIT' } };

        const fixture = stripIndents`
            &lt;package-name&gt;
            ====================
            _To be documented._

            Install
            -------
            _To be documented._

            Testing
            -------
            _To be documented._

            License
            -------
            The MIT License. See the license file for details.
        `;

        expect(readme(parameters)).toEqual(fixture);
    });

    it('documents and linkifies an "MIT" software license', function () {
        const parameters = {
            license: {
                linkTarget: 'LICENSE'
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

            Testing
            -------
            _To be documented._

            License
            -------
            The MIT License. See the [license file](LICENSE) for details.
        `;

        expect(readme(parameters)).toEqual(fixture);
    });

    it('documents an "UNLICENSED" software license differently than a SPDX license', function () {
        const parameters = { pkg: { license: 'UNLICENSED' } };

        const fixture = stripIndents`
            &lt;package-name&gt;
            ====================
            _To be documented._

            Install
            -------
            _To be documented._

            Testing
            -------
            _To be documented._

            License
            -------
            This is unlicensed proprietary software.
        `;

        expect(readme(parameters)).toEqual(fixture);
    });

    it('returns a string', function () {
        expect(readme(this.parameters)).toEqual(any(String));
    });
});
