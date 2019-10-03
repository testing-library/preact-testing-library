import { h } from 'preact'

let render

beforeAll(() => {
  process.env.PTL_SKIP_AUTO_CLEANUP = 'true'
  const rtl = require('../') // eslint-disable-line global-require
  render = rtl.render
})

// This one verifies that if PTL_SKIP_AUTO_CLEANUP is set
// then we DON'T auto-wire up the afterEach for folks
test('first', () => {
  render(<div>hi</div>)
})

test('second', () => {
  expect(document.body.innerHTML).toEqual('<div><div>hi</div></div>')
})
