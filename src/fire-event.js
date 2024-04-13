import { fireEvent as domFireEvent, createEvent } from '@testing-library/dom'

// Similar to RTL we make are own fireEvent helper that just calls DTL's fireEvent with that
// we can that any specific behaviors to the helpers we need
export const fireEvent = (...args) => domFireEvent(...args)

Object.keys(domFireEvent).forEach((key) => {
  fireEvent[key] = (elem, init) => {
    // Preact registers event-listeners in lower-case, so onPointerStart becomes pointerStart
    // here we will copy this behavior, when we fire an element we will fire it in lowercase so
    // we hit the Preact listeners.
    const eventName = `on${key.toLowerCase()}`
    const isInElem = eventName in elem
    // Preact changes all change events to input events. This is normally handled directly
    // but when running 'preact/compat' this is done via custom JS which renames the event prop,
    // making the event name out of sync.
    // The problematic code is in: preact/compat/src/render.js > handleDomVNode()
    const keyFiltered = key === 'change' ? 'input' : key
    return isInElem
      ? domFireEvent[keyFiltered](elem, init)
      : domFireEvent(
        elem,
        createEvent(keyFiltered[0].toUpperCase() + keyFiltered.slice(1), elem, init)
      )
  }
})
