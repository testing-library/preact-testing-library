import '@testing-library/jest-dom/extend-expect'
import { createRef, h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { fireEvent, render } from '..'

test('render calls useEffect immediately', () => {
  const cb = jest.fn()

  function Comp () {
    useEffect(cb)
    return null
  }

  render(<Comp />)

  expect(cb).toHaveBeenCalledTimes(1)
})

test('findByTestId returns the element', async () => {
  const ref = createRef()

  const { findByTestId } = render(<div ref={ref} data-testid="foo" />)

  expect(await findByTestId('foo')).toBe(ref.current)
})

test('fireEvent triggers useEffect calls', () => {
  const cb = jest.fn()

  function Counter () {
    useEffect(cb)

    const [count, setCount] = useState(0)

    return <button onClick={() => setCount(count + 1)}>{count}</button>
  }

  const { container: { firstChild: buttonNode } } = render(<Counter />)

  cb.mockClear()
  fireEvent.click(buttonNode)
  expect(buttonNode).toHaveTextContent('1')
  expect(cb).toHaveBeenCalledTimes(1)
})

test('calls to hydrate will run useEffects', () => {
  const cb = jest.fn()

  function Comp () {
    useEffect(cb)
    return null
  }

  render(<Comp />, { hydrate: true })

  expect(cb).toHaveBeenCalledTimes(1)
})
