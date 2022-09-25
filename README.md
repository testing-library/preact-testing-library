<div align="center">
<h1>Preact Testing Library</h1>

<a href="https://www.emojione.com/emoji/1F429">
  <img
    height="80"
    width="80"
    alt="poodle"
    src="https://raw.githubusercontent.com/testing-library/preact-testing-library/main/other/poodle.png"
  />
</a>

<p>Simple and complete Preact DOM testing utilities that encourage good testing
practices.</p>

> Inspired completely by [react-testing-library][react-testing-library]

[![Build Status][build-badge]][build] [![Code Coverage][coverage-badge]][coverage]
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
[![PRs Welcome][prs-badge]][prs] [![Code of Conduct][coc-badge]][coc]
[![version][version-badge]][package] [![downloads][downloads-badge]][package]
[![MIT License][license-badge]][license]
[![Preact Slack Community][preact-slack-badge]][preact-slack]
[![Commitzen][commitzen-badge]][commitzen] [![Discord][discord-badge]][discord]

</div>

<hr />

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Installation](#installation)
- [Docs](#docs)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
  - [💡 Feature Requests](#-feature-requests)
  - [❓ Questions](#-questions)
- [Contributors](#contributors)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## The Problem

You want to write tests for your Preact components so that they avoid including implementation
details, and are maintainable in the long run.

## The Solution

The Preact Testing Library is a very lightweight solution for testing Preact components. It provides
light utility functions on top of preact/test-utils, in a way that encourages better testing
practices. Its primary guiding principle is:

> [The more your tests resemble the way your software is used, the more confidence they can give you.](https://twitter.com/kentcdodds/status/977018512689455106)

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and should be installed
as one of your project's `devDependencies`:

```
npm install --save-dev @testing-library/preact
```

This library has `peerDependencies` listings for `preact >= 10`.

💡 You may also be interested in installing `@testing-library/jest-dom` so you can use
[the custom jest matchers](https://github.com/testing-library/jest-dom).

📝 This library supports Preact X (10.x). It takes advantage of the `act` test utility in
`preact/test-utils` to enable both Preact Hook and Class components to be easily tested.

📝 If you're looking for a solution for Preact 8.x then install `preact-testing-library`.

## Docs

See the [docs](https://testing-library.com/docs/preact-testing-library/intro) over at the Testing
Library website.

## Issues

_Looking to contribute? Look for the [Good First Issue][good-first-issue] label._

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**][bugs]

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding a 👍. This helps
maintainers prioritize what to work on.

[**See Feature Requests**][requests]

### ❓ Questions

For questions related to using the library, please visit a support community instead of filing an
issue on GitHub.

- [Preact Slack][slack]
- [Stack Overflow][stackoverflow]

## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://kentcdodds.com"><img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;" alt="Kent C. Dodds"/><br /><sub><b>Kent C. Dodds</b></sub></a><br /><a href="https://github.com/testing-library/preact-testing-library/commits?author=kentcdodds" title="Code">💻</a> <a href="https://github.com/testing-library/preact-testing-library/commits?author=kentcdodds" title="Documentation">📖</a> <a href="https://github.com/testing-library/preact-testing-library/commits?author=kentcdodds" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/antsmartian"><img src="https://avatars0.githubusercontent.com/u/1241511?s=400&v=4" width="100px;" alt="Ants Martian"/><br /><sub><b>Ants Martian</b></sub></a><br /><a href="https://github.com/testing-library/preact-testing-library/commits?author=antsmartian" title="Code">💻</a> <a href="https://github.com/testing-library/preact-testing-library/commits?author=antsmartian" title="Documentation">📖</a> <a href="https://github.com/testing-library/preact-testing-library/commits?author=antsmartian" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/mihar-22"><img src="https://avatars3.githubusercontent.com/u/14304599?s=460&v=4" width="100px;" alt="Rahim Alwer"/><br /><sub><b>Rahim Alwer</b></sub></a><br /><a href="https://github.com/testing-library/preact-testing-library/commits?author=mihar-22" title="Code">💻</a> <a href="https://github.com/testing-library/preact-testing-library/commits?author=mihar-22" title="Documentation">📖</a> <a href="https://github.com/testing-library/preact-testing-library/commits?author=mihar-22" title="Tests">⚠️</a> <a href="#infra-mihar-22" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification. Contributions of any
kind welcome!

## LICENSE

[MIT](LICENSE)

<!-- prettier-ignore-start -->
[npm]: https://www.npmjs.com
[node]: https://nodejs.org
[build]: https://github.com/testing-library/preact-testing-library/actions?query=workflow%3Avalidate
[build-badge]: https://img.shields.io/github/workflow/status/testing-library/preact-testing-library/validate?logo=github&style=flat-square
[coverage-badge]: https://img.shields.io/codecov/c/github/testing-library/preact-testing-library.svg?style=flat-square
[coverage]: https://codecov.io/github/testing-library/preact-testing-library
[package]: https://www.npmjs.com/package/@testing-library/preact
[version-badge]: https://img.shields.io/npm/v/@testing-library/preact
[downloads-badge]: https://img.shields.io/npm/dw/@testing-library/preact
[slack]: https://preact-slack.now.sh
[license]: https://github.com/testing-library/preact-testing-library/blob/main/LICENSE
[license-badge]: https://img.shields.io/github/license/testing-library/preact-testing-library?color=b
[emojis]: https://github.com/all-contributors/all-contributors#emoji-key
[all-contributors]: https://github.com/all-contributors/all-contributors
[guiding-principle]: https://twitter.com/kentcdodds/status/977018512689455106
[bugs]: https://github.com/testing-library/preact-testing-library/issues?q=is%3Aissue+is%3Aopen+label%3Abug+sort%3Acreated-desc
[requests]: https://github.com/testing-library/preact-testing-library/issues?q=is%3Aissue+sort%3Areactions-%2B1-desc+label%3Aenhancement+is%3Aopen
[good-first-issue]: https://github.com/testing-library/preact-testing-library/issues?utf8=✓&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3A"good+first+issue"+
[stackoverflow]: https://stackoverflow.com/questions/tagged/preact-testing-library
[react-testing-library]: https://github.com/testing-library/react-testing-library
[react-testing-library-docs]: https://testing-library.com/docs/react-testing-library/intro
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/testing-library/preact-testing-library/blob/main/CODE_OF_CONDUCT.md
[preact-slack]: https://preact-slack.now.sh/
[preact-slack-badge]: https://preact-slack.now.sh/badge.svg
[commitzen]: http://commitizen.github.io/cz-cli/
[commitzen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[discord-badge]: https://img.shields.io/discord/723559267868737556.svg?color=7389D8&labelColor=6A7EC2&logo=discord&logoColor=ffffff
[discord]: https://discord.gg/testing-library
<!-- prettier-ignore-end -->
