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

export {render, wait, FireEvent}
