readme-md
=========
[![npm Version][NPM VERSION BADGE]][NPM PAGE]
[![Node.js][NODE VERSION BADGE]][NODE PAGE]
[![GitHub License][LICENSE BADGE]][LICENSE PAGE]
[![CI Status][CI BADGE]][CI PAGE]

A `README.md` generator library.

Install
-------
```sh
yarn add readme-md # Or alternatively: `npm install --save readme-md`
```

Usage
-----
```js
import readme from 'readme-md';

const pkg = {
    name: 'my-awesome-package',
    description: 'An awesome package.',
    license: 'MIT',
    scripts: {
        test: 'jest'
    }
};
const additionalSections = [
    {
        position: 'after:Install',
        title: 'Usage',
        body: "```js\nimport myAwesomePackage from 'my-awesome-package';\n\nmyAwesomePackage({ awesome: 'parameters' });\n```"
    }
];

readme({ pkg, additionalSections });
// > my-awesome-package
// > ==================
// > An awesome package.
// >
// > Install
// > -------
// > ```sh
// > npm install my-awesome-package
// > ```
// >
// > Usage
// > -----
// > ```js
// > import myAwesomePackage from 'my-awesome-package';
// >
// > myAwesomePackage({ awesome: 'parameters' });
// > ```
// >
// > Testing
// > -------
// > ```sh
// > npm test
// > ```
// >
// > License
// > -------
// > The MIT License. See the license file for details.
```

Testing
-------
```sh
yarn test # Or alternatively: `npm test`
```

See Also
--------
- [readme-md-cli @ npm](https://www.npmjs.com/package/readme-md-cli)

License
-------
The MIT License (Expat). See the [license file](LICENSE) for details.

[CI BADGE]: https://github.com/jbenner-radham/node-readme-md/actions/workflows/ci.yaml/badge.svg
[CI PAGE]: https://github.com/jbenner-radham/node-readme-md/actions/workflows/ci.yaml
[LICENSE BADGE]: https://img.shields.io/badge/license-MIT%20License-blue.svg
[LICENSE PAGE]: https://github.com/jbenner-radham/node-readme-md/blob/master/LICENSE
[NODE PAGE]: https://nodejs.org/
[NODE VERSION BADGE]: https://img.shields.io/node/v/readme-md.svg
[NPM PAGE]: https://www.npmjs.com/package/readme-md
[NPM VERSION BADGE]: https://img.shields.io/npm/v/readme-md.svg
