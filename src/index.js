import {render as renderPReact, options} from 'preact'
import {queries, wait, fireEvent} from 'dom-testing-library'

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

const mountedContainers = new Set()

function renderIntoDocument(ui) {
  const container = document.body.appendChild(document.createElement('div'))
  mountedContainers.add(container)
  return render(ui, {container})
}

function cleanup() {
  mountedContainers.forEach(container => {
    document.body.removeChild(container)
    renderPReact(null, document.body, container)
    mountedContainers.delete(container)
  })
}

function debounceRenderingOff() {
  options.debounceRendering = f => f()
}

// this returns a new promise and is just a simple way to
// wait until the next tick so resolved promises chains will continue
function flushPromises() {
  return new Promise(resolve => setImmediate(resolve))
}

export {
  render,
  wait,
  flushPromises,
  fireEvent,
  debounceRenderingOff,
  renderIntoDocument,
  cleanup,
}
