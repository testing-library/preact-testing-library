import { h } from 'preact' // required by render
import { fireEvent, render } from '..'
import { forwardRef } from 'preact/compat' // required for this test to make sense

test('calling `fireEvent` with `preact/compat` and onChange works too', () => {
  const handler = jest.fn()

  // forwardRef needs to be imported from preact/compat for this test to make sense.
  // Preact behavior when using onChange is described here:
  // https://preactjs.com/guide/v10/differences-to-react#use-oninput-instead-of-onchange
  // We want to test if onChange event gets caught with fireEvent.change()
  const {
    container: { firstChild: input }
  } = render(<input type="text" onChange={handler} />)

  const targetProperties = { value: 'a' }
  const otherProperties = { isComposing: true }
  const init = {
    target: targetProperties,
    ...otherProperties
  }

  expect(fireEvent.change(input, init)).toBe(true)

  expect(handler).toHaveBeenCalledTimes(1)
  expect(handler).toHaveBeenCalledWith(expect.objectContaining(otherProperties))
})
