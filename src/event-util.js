// Simple util, that simulate events that can be
// dispatched to the HTMLElement
const FireEvent = {
  submit: element => {
    element.dispatchEvent(new Event('submit'))
  },
}

export default FireEvent
