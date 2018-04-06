// Simple util, that simulate events that can be
// dispatched to the HTMLElement
const Simulate = {
  submit: element => {
    element.dispatchEvent(new Event('submit'))
  },
}

export default Simulate
