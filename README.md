<div align="center">
<h1>Preact Testing Library</h1>

<a href="https://www.emojione.com/emoji/1F429">
  <img
    height="80"
    width="80"
    alt="poodle"
    src="https://raw.githubusercontent.com/mihar-22/preact-testing-library/master/other/poodle.png"
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
[![Commitzen][commitzen-badge]][commitzen]

</div>

<hr />

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Installation](#installation)
- [Usage](#usage)
  - [`render`](#render)
  - [`cleanup`](#cleanup)
  - [`act`](#act)
  - [`fireEvent`](#fireevent)
  - [`@testing-library/dom`](#testing-librarydom)
- [Example](#example)
  - [Component](#component)
  - [Test](#test)
- [Hooks](#hooks)
- [Guiding Principles](#guiding-principles)
- [Docs](#docs)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
  - [💡 Feature Requests](#-feature-requests)
  - [❓ Questions](#-questions)
- [Contributors](#contributors)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## The Problem

You want to write maintainable tests for your Preact components. As a part of this goal, you want
your tests to avoid including implementation details of your components and rather focus on making
your tests give you the confidence for which they are intended. As part of this, you want your
testbase to be maintainable in the long run so refactors of your components (changes to
implementation but not functionality) don't break your tests and slow you and your team down.

## The Solution

The Peact Testing Library is a very lightweight solution for testing Preact components. It provides
light utility functions on top of preact/test-utils, in a way that encourages better testing
practices. Its primary guiding principle is:

> [The more your tests resemble the way your software is used, the more confidence they can give you.](https://twitter.com/kentcdodds/status/977018512689455106)

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and should be installed
as one of your project's `devDependencies`:

```
npm install --save-dev preact-testing-library-next
```

This library has `peerDependencies` listings for `preact`.

💡 You may also be interested in installing `@testing-library/jest-dom` so you can use
[the custom jest matchers](https://github.com/testing-library/jest-dom).

📝 This library supports Preact X (10.x). It takes advantage of the `act` test utility in
`preact/test-utils` to enable both Preact Hook and Class components to be easily tested.

## Usage

### `render`

```jsx
import { render } from 'preact-testing-library-next'

const { returns } = render(<YourComponent />, { arguments })
```

| Arguments     | Description                                                                                                                                                            | Default       |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `container`   | The HTML element the component is mounted to.                                                                                                                          | baseElement   |
| `baseElement` | The root HTML element to which the container is appended to.                                                                                                           | document.body |
| `queries`     | Queries to bind to the baseElement. See [getQueriesForElement](https://testing-library.com/docs/dom-testing-library/api-helpers#within-and-getqueriesforelement-apis). | null          |
| `hydrate`     | Used when the component has already been mounted and requires a rerender. Not needed for most people. The rerender function passed back to you does this already.      | false         |
| `wrapper`     | A parent component to wrap YourComponent.                                                                                                                              | null          |

| Returns       | Description                                                                                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `container`   | The HTML element the component is mounted to.                                                                                                                                                           |
| `baseElement` | The root HTML element to which the container is appended to.                                                                                                                                            |
| `debug`       | Logs the baseElement using [prettyDom](https://testing-library.com/docs/dom-testing-library/api-helpers#prettydom).                                                                                     |
| `unmount`     | Unmounts the component from the container.                                                                                                                                                              |
| `rerender`    | Calls render again passing in the original arguments and sets hydrate to true.                                                                                                                          |
| `asFragment`  | Returns the innerHTML of the container.                                                                                                                                                                 |
| `...queries`  | Returns all [query functions](https://testing-library.com/docs/dom-testing-library/api-queries) to be used on the baseElement. If you pass in `query` arguments than this will be those, otherwise all. |

### `cleanup`

Unmounts the component from the container and destroys the container.

📝 When you import anything from the library, this automatically runs after each test. If you'd like
to disable this then set `process.env.PTL_SKIP_AUTO_CLEANUP` to true when running your tests.

```jsx
import { render, cleanup } from 'preact-testing-library-next'

afterEach(() => {
  cleanup
}) // Default on import: runs it after each test.

render(<YourComponent />)

cleanup() // Or like this for more control.
```

### `act`

Just a convenience export that points to preact/test-utils/act. All renders and events being fired
are wrapped in `act`, so you don't really need this. It's responsible for flushing all effects and
rerenders after invoking it.

📝 If you'd love to learn more, checkout
[this explanation](https://github.com/threepointone/react-act-examples/blob/master/sync.md). Even
thought it's for React, it gives you an idea of why it's needed.

### `fireEvent`

Passes it to the @testing-library/dom
[fireEvent](https://testing-library.com/docs/dom-testing-library/api-events). It's also wrapped in
`act` so you don't need to worry about doing it.

📝 Keep in mind mainly when using `h / Preact.createElement` that React uses a Synthetic event
system, and Preact uses the browser's native `addEventListener` for event handling. This means
events like `onChange` and `onDoubleClick` in React, are `onInput` and `onDblClick` in Preact. The
double click example will give you an idea of how to test using those functions.

```jsx
const cb = jest.fn();

function Counter() {
    useEffect(cb);

    const [count, setCount] = useState(0);

    return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

const { container: { firstChild: buttonNode }, } = render(<Counter />);

// Clear the first call to useEffect that the initial render triggers.
cb.mockClear();

// Fire event Option 1.
fireEvent.click(buttonNode);

// Fire event Option 2.
fireEvent(
button,
new Event('MouseEvent', {
  bubbles: true,
  cancelable: true,
  button: 0,
});

expect(buttonNode).toHaveTextContent('1');
expect(cb).toHaveBeenCalledTimes(1);
```

```jsx
const handler = jest.fn()

const {
  container: { firstChild: input },
} = render(<input type="text" onInput={handler} />)

fireEvent.input(input, { target: { value: 'a' } })

expect(handler).toHaveBeenCalledTimes(1)
```

```jsx
const ref = createRef()
const spy = jest.fn()

render(
  h(elementType, {
    onDblClick: spy,
    ref,
  }),
)

fireEvent['onDblClick'](ref.current)

expect(spy).toHaveBeenCalledTimes(1)
```

### `@testing-library/dom`

This library re-exports everything from `@testing-library/dom`. See the
[documentation](https://testing-library.com/docs/dom-testing-library/intro) to see what goodies you
can use. The helper functions like `wait` can be particularly useful.

## Example

#### Component

_Note: Preact Testing Library works with both Preact Hooks and Classes. Your tests will be the same
however you write your components._

```jsx
function HiddenMessage({ children }) {
  const [showMessage, setShowMessage] = useState(false)

  return (
    <div>
      <label htmlFor="toggle">Show Message</label>
      <input
        id="toggle"
        type="checkbox"
        onChange={e => setShowMessage(e.target.checked)}
        checked={showMessage}
      />
      {showMessage ? children : null}
    </div>
  )
}
```

#### Test

```jsx
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom/extend-expect'

import { h } from 'preact'
import { render, fireEvent } from 'preact-testing-library-next'
import HiddenMessage from '../hidden-message'

test('shows the children when the checkbox is checked', () => {
  const testMessage = 'Test Message'

  const { queryByText, getByLabelText, getByText } = render(
    <HiddenMessage>{testMessage}</HiddenMessage>,
  )

  // query* functions will return the element or null if it cannot be found.
  // get* functions will return the element or throw an error if it cannot be found.
  expect(queryByText(testMessage)).toBeNull()

  // The queries can accept a regex to make your selectors more resilient to content tweaks and changes.
  fireEvent.click(getByLabelText(/show/i))

  // .toBeInTheDocument() is an assertion that comes from jest-dom.
  // Otherwise you could use .toBeDefined().
  expect(getByText(testMessage)).toBeInTheDocument()
})
```

## Hooks

If you are interested in testing a custom hook, the preact-hooks-testing-library will be coming
soon.

> It is not recommended to test single-use custom hooks in isolation from the components where it's
> being used. It's better to test the component that's using the hook rather than the hook itself.
> The preact-hooks-testing-library will be intended to be used for reusable hooks/libraries.

## Guiding Principles

We try to only expose methods and utilities that encourage you to write tests that closely resemble
how your Preact components are used.

Utilities are included in this project based on the following
[guiding principles](https://twitter.com/kentcdodds/status/977018512689455106).

## Docs

For more information checkout:

- The react-testing-library [documentation][react-testing-library-docs].
- The react-testing-library
  [sandbox](https://codesandbox.io/s/github/kentcdodds/react-testing-library-examples).
- Extend Jest with [custom matchers](https://github.com/testing-library/jest-dom) to test the state
  of the DOM.
- The testing library [documentation](https://testing-library.com/docs/intro).
  - [Queries](https://testing-library.com/docs/dom-testing-library/api-queries).
  - [Events](https://testing-library.com/docs/dom-testing-library/api-events).

Even though they are all React based examples, it should be close to identical in Preact. Take note
of the [differences between React and Preact](https://preactjs.com/guide/v10/differences-to-react).

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
    <td align="center"><a href="https://kentcdodds.com"><img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;" alt="Kent C. Dodds"/><br /><sub><b>Kent C. Dodds</b></sub></a><br /><a href="https://github.com/mihar-22/preact-testing-library/commits?author=kentcdodds" title="Code">💻</a> <a href="https://github.com/mihar-22/preact-testing-library/commits?author=kentcdodds" title="Documentation">📖</a> <a href="#infra-kentcdodds" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/mihar-22/preact-testing-library/commits?author=kentcdodds" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/antsmartian"><img src="https://avatars0.githubusercontent.com/u/1241511?s=400&v=4" width="100px;" alt="Ants Martian"/><br /><sub><b>Ants Martian</b></sub></a><br /><a href="https://github.com/mihar-22/preact-testing-library/commits?author=antsmartian" title="Code">💻</a> <a href="https://github.com/mihar-22/preact-testing-library/commits?author=antsmartian" title="Documentation">📖</a> <a href="https://github.com/mihar-22/preact-testing-library/commits?author=antsmartian" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/mihar-22"><img src="https://avatars3.githubusercontent.com/u/14304599?s=460&v=4" width="100px;" alt="Rahim Alwer"/><br /><sub><b>Rahim Alwer</b></sub></a><br /><a href="https://github.com/mihar-22/preact-testing-library/commits?author=mihar-22" title="Code">💻</a> <a href="https://github.com/mihar-22/preact-testing-library/commits?author=mihar-22" title="Documentation">📖</a> <a href="https://github.com/mihar-22/preact-testing-library/commits?author=mihar-22" title="Tests">⚠️</a> <a href="#infra-mihar-22" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
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
[build]: https://travis-ci.org/mihar-22/preact-testing-library
[build-badge]: https://travis-ci.org/mihar-22/preact-testing-library.svg?branch=master
[coverage-badge]: https://img.shields.io/codecov/c/github/mihar-22/preact-testing-library.svg?style=flat-square
[coverage]: https://codecov.io/github/mihar-22/preact-testing-library
[package]: https://www.npmjs.com/package/preact-testing-library-next
[version-badge]: https://img.shields.io/npm/v/preact-testing-library-next
[downloads-badge]: https://img.shields.io/npm/dw/preact-testing-library-next
[slack]: https://preact-slack.now.sh
[license]: https://github.com/mihar-22/preact-testing-library/blob/master/LICENSE
[license-badge]: https://img.shields.io/github/license/mihar-22/preact-testing-library?color=b
[emojis]: https://github.com/all-contributors/all-contributors#emoji-key
[all-contributors]: https://github.com/all-contributors/all-contributors
[guiding-principle]: https://twitter.com/kentcdodds/status/977018512689455106
[bugs]: https://github.com/mihar-22/preact-testing-library/issues?q=is%3Aissue+is%3Aopen+label%3Abug+sort%3Acreated-desc
[requests]: https://github.com/mihar-22/preact-testing-library/issues?q=is%3Aissue+sort%3Areactions-%2B1-desc+label%3Aenhancement+is%3Aopen
[good-first-issue]: https://github.com/mihar-22/preact-testing-library/issues?utf8=✓&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3A"good+first+issue"+
[stackoverflow]: https://stackoverflow.com/questions/tagged/preact-testing-library
[react-testing-library]: https://github.com/testing-library/react-testing-library
[react-testing-library-docs]: https://testing-library.com/docs/react-testing-library/intro
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/mihar-22/preact-testing-library/blob/master/CODE_OF_CONDUCT.md
[preact-slack]: https://preact-slack.now.sh/
[preact-slack-badge]: https://preact-slack.now.sh/badge.svg
[commitzen]: http://commitizen.github.io/cz-cli/
[commitzen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
<!-- prettier-ignore-end -->
