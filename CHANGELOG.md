Changelog
=========
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[1.3.1] - 2024-11-22
--------------------
### Fixed
- Now properly exports the type of the `getPackageUsageStatement` function.

[1.3.0] - 2024-11-07
--------------------
### Changed
- This library now exports both [CJS](https://nodejs.org/api/modules.html) and [ESM](https://nodejs.org/api/esm.html) formats.

[1.2.1] - 2024-10-15
--------------------
### Security
- Addressed potential RegEx DoS attack vulnerability.

[1.2.0] - 2024-10-13
--------------------
### Changed
- Now takes `config.pkg.packageManager` into account in addition to `config.pkg.engines` when determining the package manager. See [here](https://nodejs.org/docs/v20.18.0/api/packages.html#packagemanager) for reference.

[1.1.0] - 2024-10-11
--------------------
### Added
- Hero image support. Set the new `config.heroImage` parameter to embed a hero image into your readme.

[1.0.0] - 2024-10-03
--------------------
### Added
- More usage examples to the readme.

### Changed
- The `config.license.link` parameter has been changed to `config.licenseLink`.
- The required Node.js version is now 18.18.0 or higher.
- Upgraded `camelcase` dependency to version 8.
- Genericized the `Badge` object used in `config.badges` to decouple it from [shields.io](https://shields.io/). As a result the `Badge.style` property has been removed. If you are using [shields.io](https://shields.io/) badges just append the corresponding `style` query parameter onto your image URL (_e.g._, `?style=flat`).
- The `config.licenseLink` parameter now also supports Boolean values. If set to `true` it will set the license link target to the default value of "LICENSE".

### Fixed
- Corrected a typo in this changelog.

[0.15.0] - 2024-10-02
---------------------
### Added
- Added `config.preferSemicolons` which can have a Boolean value to determine whether the example code in the "Usage" section should be terminated by semicolons.
- Added `config.quoteType` which can have a value of "single" or "double" to determine the type of quotes used in the "Usage" section.
- Added an "API" section to the readme.
- Added `config.sectionOverrides.{install,usage,testing,license}` which can have a string value to override the corresponding section's body text.

### Changed
- The "Usage" section output is now determined by `config.pkg.type`. If it is defined as "module" an `import` statement is output, otherwise a `require` statement is output.
- The `config.preferYarn` parameter has been replaced by specifying it in `config.pkg.engines`. See [here](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#engines) for reference. Also, support for pnpm has been added as an option. This behavior can be overridden by setting `config.preferNpm` to `true`.
- The `config.license.linkTarget` parameter has been changed to `config.license.link`.
- The required Node.js version is now 18.12.0 or higher.

### Fixed
- Corrected typos in the `README.md` and `lib/index.d.ts` files.

### Security
- Upgraded the `lint-staged` dependency due to a ReDoS vulnerability in its `micromatch` dependency.

[0.14.0] - 2024-09-06
---------------------
### Added
- The `readme` function now generates a "Usage" section.
- Warnings are now logged to `stderr`.

### Changed
- Updated the "Keep a Changelog" link in this changelog.
- Updated the "Usage" section of the `README.md` file to note that this is a pure ESM package.

### Fixed
- Fixed some types in both TypeScript and JSDoc.
- All type definitions are now properly exported for this package.
- Fixed compare link for version [0.13.1](#0131---2022-12-28) in this changelog.

[0.13.1] - 2022-12-28
---------------------
### Fixed
- Fixed type definition for the main function export. It's argument was previously defined as non-optional erroneously.

[0.13.0] - 2022-12-23
---------------------
### Added
- Add [TypeScript](https://www.typescriptlang.org/) types.

### Changed
- The `parameters.config['prefer-dev']` option is now `parameters.preferDev`.
- The `parameters.config['prefer-yarn']` option is now `parameters.preferYarn`.
- The function signature of the `readme()` function has been changed from `readme(parameters)` to `readme(config)` (_e.g._, `parameters.preferDev` would now be `config.preferDev` in docs.)

[0.12.0] - 2022-12-21
---------------------
### Added
- Added `parameters.config['prefer-dev']` argument that will indicate in the install section to install the package as a dev dependency. This option takes precedence over the `parameters.pkg.preferGlobal` setting if both are set to true.

[0.11.0] - 2022-12-18
---------------------
### Changed
- The way URLs are generated in `lib/Badges.js` was changed to account for multiple query parameters.

[0.10.0] - 2022-12-17
---------------------
### Added
- Added additional examples to the Usage section of the readme.

### Changed
- Generated fenced code blocks for shell script (_e.g._, the Install and Testing sections) no longer have a dollar sign prefix.
- For packages which are MIT licensed the value "(Expat)" is no longer suffixed in the generated License section.
- Passing an empty license (_e.g._, `readme({ pkg: { license: '' } });`) will now output "_To be documented._" in the body of the License section.

[0.9.0] - 2022-12-17
--------------------
### Changed
- The minimum required [Node.js](https://nodejs.org/) is now v16.
- Change over to [ES Modules](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) from CommonJS.

[0.8.0] - 2018-01-21
--------------------
### Changed
- Updated the generated `npm install` command syntax.

[0.7.0] - 2018-01-02
--------------------
### Changed
- The `badge.name` property has been changed to `badge.alt`.

[0.6.0] - 2017-12-26
--------------------
### Added
- Added initial badge generation support.

[0.5.0] - 2017-12-23
--------------------
### Added
- Added `parameters.pkg.preferGlobal` parsing and implementation.

[0.4.0] - 2017-12-10
--------------------
### Added
- Added `parameters.config['prefer-yarn']` argument that produces install and test section variants.

[0.3.0] - 2017-10-01
--------------------
### Added
- The `parameters.license.linkTarget` argument has been added to allow linkifying the license text.

### Changed
- Switched the lockfile format from `npm` to `yarn`.

### Removed
- No longer exports a `Markdown` module.

[0.2.0] - 2017-09-03
--------------------
### Changed
- Added "UNLICENSED" specific license text.

[0.1.0] - 2017-07-25
--------------------
### Added
- Initial release.

[Unreleased]: https://github.com/jbenner-radham/node-readme-md/compare/v1.3.1...HEAD
[1.3.1]: https://github.com/jbenner-radham/node-readme-md/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/jbenner-radham/node-readme-md/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/jbenner-radham/node-readme-md/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/jbenner-radham/node-readme-md/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/jbenner-radham/node-readme-md/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/jbenner-radham/node-readme-md/compare/v0.15.0...v1.0.0
[0.15.0]: https://github.com/jbenner-radham/node-readme-md/compare/v0.14.0...v0.15.0
[0.14.0]: https://github.com/jbenner-radham/node-readme-md/compare/v0.13.1...v0.14.0
[0.13.1]: https://github.com/jbenner-radham/node-readme-md/compare/v0.13.0...v0.13.1
[0.13.0]: https://github.com/jbenner-radham/node-readme-md/compare/v0.12.0...v0.13.0
[0.12.0]: https://github.com/jbenner-radham/node-readme-md/compare/v0.11.0...v0.12.0
[0.11.0]: https://github.com/jbenner-radham/node-readme-md/compare/v0.10.0...v0.11.0
[0.10.0]: https://github.com/jbenner-radham/node-readme-md/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/jbenner-radham/node-readme-md/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/jbenner-radham/node-readme-md/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/jbenner-radham/node-readme-md/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/jbenner-radham/node-readme-md/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/jbenner-radham/node-readme-md/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/jbenner-radham/node-readme-md/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/jbenner-radham/node-readme-md/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/jbenner-radham/node-readme-md/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/jbenner-radham/node-readme-md/releases/tag/v0.1.0
