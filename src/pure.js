import * as dtl from '@testing-library/dom';
import { h, hydrate as preactHydrate, render as preactRender } from 'preact';
import { act as preactAct } from 'preact/test-utils';

const mountedContainers = new Set();

function render(
  ui,
  {
    container,
    baseElement = container,
    queries,
    hydrate = false,
    wrapper: WrapperComponent,
  } = {},
) {
  if (!baseElement) {
    // Default to document.body instead of documentElement to avoid output of potentially-large
    // head elements (such as JSS style blocks) in debug output.
    baseElement = document.body;
  }

  if (!container) {
    container = baseElement.appendChild(document.createElement('div'));
  }

  // We'll add it to the mounted containers regardless of whether it's actually
  // added to document.body so the cleanup method works regardless of whether
  // they're passing us a custom container or not.
  mountedContainers.add(container);

  const wrapUiIfNeeded = (innerElement) => (WrapperComponent
    ? h(WrapperComponent, null, innerElement)
    : innerElement);

  preactAct(() => {
    if (hydrate) {
      preactHydrate(wrapUiIfNeeded(ui), container);
    } else {
      preactRender(wrapUiIfNeeded(ui), container);
    }
  });

  return {
    container,
    baseElement,
    debug: (el = baseElement) => console.log(dtl.prettyDOM(el)),
    unmount: () => preactRender(null, container),
    rerender: (rerenderUi) => {
      render(wrapUiIfNeeded(rerenderUi), { container, baseElement });
      // Intentionally do not return anything to avoid unnecessarily complicating the API.
      // folks can use all the same utilities we return in the first place that are bound to
      // the container
    },
    asFragment: () => {
      if (typeof document.createRange === 'function') {
        return document
          .createRange()
          .createContextualFragment(container.innerHTML);
      }

      const template = document.createElement('template');
      template.innerHTML = container.innerHTML;
      return template.content;
    },
    ...dtl.getQueriesForElement(baseElement, queries),
  };
}

// Maybe one day we'll expose this (perhaps even as a utility returned by render).
// but let's wait until someone asks for it.
function cleanupAtContainer(container) {
  preactRender(null, container);

  if (container.parentNode === document.body) {
    document.body.removeChild(container);
  }

  mountedContainers.delete(container);
}

function cleanup() {
  mountedContainers.forEach(cleanupAtContainer);
}

// preact-testing-library's version of fireEvent will call
// dom-testing-library's version of fireEvent wrapped inside
// an "act" call so that after all event callbacks have been
// been called, the resulting useEffect callbacks will also
// be called.
function fireEvent(...args) {
  let returnValue;

  preactAct(() => {
    returnValue = dtl.fireEvent(...args);
  });

  return returnValue;
}

Object.keys(dtl.fireEvent).forEach((key) => {
  fireEvent[key] = (...args) => {
    let returnValue;

    preactAct(() => {
      returnValue = dtl.fireEvent[key](...args);
    });

    return returnValue;
  };
});

export * from '@testing-library/dom';

export {
  render, cleanup, fireEvent, preactAct as act
};
