// Simple util, that simulate events that can be
// dispatched to the HTMLElement
const FireEvent = {
  fireEvent: (element, type) => {
    const e = document.createEvent('Event')
    e.initEvent(type)
    element.dispatchEvent(e)
  },
}

export default FireEvent
