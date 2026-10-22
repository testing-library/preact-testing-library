import { h } from 'preact' // required by render
import { fireEvent, render } from '..'
import 'preact/compat'

test('calling `fireEvent` with `preact/compat` and onChange works too', () => {
  const handler = jest.fn()

  // Preact only matches React's aliasing of `onChange` when `preact/compat` is used
  // This test ensures this is supported properly with `fireEvent.change()`
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

test('should not alias `change` event to `input` for file, checkbox, or radio inputs', () => {
  for (const type of ['file', 'checkbox', 'radio']) {
    const inputHandler = jest.fn()
    const changeHandler = jest.fn()

    const {
      container: { firstChild: input }
    } = render(<input type={type} onChange={changeHandler} onInput={inputHandler} />)

    fireEvent.change(input, {
      target: input.type === 'file'
        ? { files: [new File(['Hello World!'], 'foo.txt')] }
        : { checked: true }
    })

    expect(inputHandler).toHaveBeenCalledTimes(0)
    expect(changeHandler).toHaveBeenCalledTimes(1)
  }
})

test('fires events whose handler names `preact/compat` lowercases', () => {
  const events = ['animationEnd', 'transitionEnd', 'touchStart', 'compositionEnd']

  for (const event of events) {
    const handler = jest.fn()
    const prop = `on${event[0].toUpperCase()}${event.slice(1)}`

    const {
      container: { firstChild: input }
    } = render(<input {...{ [prop]: handler }} />)

    fireEvent[event](input)

    expect(handler).toHaveBeenCalledTimes(1)
  }
})
