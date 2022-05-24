import { fireEvent as domFireEvent, createEvent } from '@testing-library/dom'

// Similar to RTL we make are own fireEvent helper that just calls DTL's fireEvent with that
// we can that any specific behaviors to the helpers we need
export const fireEvent = (...args) => domFireEvent(...args)

Object.keys(domFireEvent).forEach((key) => {
  fireEvent[key] = (elem) => {
    // when preact sets up an event listener it uses this check
    // `'on' + eventName.toLowerCase() in dom`,
    // to determine eventName from prop and this works in browser, but in jsdom if an event
    // isn't supported, preact's check will
    // fail and lead it to dispatch an event like `PointerStart` instead of `pointerStart`

    // Here we can duplicate the check in preact and case the way preact will
    const eventName = `on${key.toLowerCase()}`
    const isInElem = eventName in elem
    return isInElem
      ? domFireEvent[key](elem)
      : domFireEvent(elem, createEvent(key[0].toUpperCase() + key.slice(1), elem))
  }
})
