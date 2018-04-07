import {render as renderPReact} from 'preact'
import {queries, wait} from 'dom-testing-library'
import FireEvent from './event-util'

function render(ui, {container = document.createElement('div')} = {}) {
  renderPReact(ui, container)
  const containerHelpers = Object.entries(queries).reduce(
    (helpers, [key, fn]) => {
      helpers[key] = fn.bind(null, container)
      return helpers
    },
    {},
  )

  return {
    container,
    unmount: () => renderPReact(null, document.body, container),
    ...containerHelpers,
  }
}

// this returns a new promise and is just a simple way to
// wait until the next tick so resolved promises chains will continue
function flushPromises() {
  return new Promise(resolve => setImmediate(resolve))
}

export {render, wait, flushPromises, FireEvent}
