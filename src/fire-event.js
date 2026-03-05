import { fireEvent as domFireEvent, createEvent } from '@testing-library/dom'
import { options } from 'preact'

let isCompat = false

//  Detects if preact/compat is used
const oldHook = options.vnode
options.vnode = (vnode) => {
  if (vnode.$$typeof) isCompat = true
  if (oldHook) oldHook(vnode)
}

// Matches the behavior of `preact/compat`:
// https://github.com/preactjs/preact/blob/2459326755dea9ad6184b42bda1128c5004b8544/compat/src/render.js#L173-L175
// https://github.com/preactjs/preact/blob/2459326755dea9ad6184b42bda1128c5004b8544/compat/src/render.js#L36-L37
const maybeAliasKey = (key, elem) => {
  if (
    key === 'change' &&
    (elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA') &&
    !/fil|che|rad/.test(elem.type)
  ) {
    return 'input'
  }

  return key;
}

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

    // Preact aliases some change events when using `preact/compat` to mirror React's behavior
    const maybeAliasedKey = !isCompat ? key : maybeAliasKey(key, elem)

    return isInElem
      ? domFireEvent[maybeAliasedKey](elem, init)
      : domFireEvent(
        elem,
        createEvent(maybeAliasedKey[0].toUpperCase() + maybeAliasedKey.slice(1), elem, init)
      )
  }
})
