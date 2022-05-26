import { createContext, h } from 'preact'
import { useState, useContext, useEffect } from 'preact/hooks'
import { renderHook } from '../pure'

test('gives comitted result', () => {
  const { result } = renderHook(() => {
    const [state, setState] = useState(1)

    useEffect(() => {
      setState(2)
    }, [])

    return [state, setState]
  })

  expect(result.current).toEqual([2, expect.any(Function)])
})

test('allows rerendering', () => {
  const { result, rerender } = renderHook(
    ({ branch }) => {
      const [left, setLeft] = useState('left')
      const [right, setRight] = useState('right')

      switch (branch) {
        case 'left':
          return [left, setLeft]
        case 'right':
          return [right, setRight]

        default:
          throw new Error(
            'No Props passed. This is a bug in the implementation'
          )
      }
    },
    { initialProps: { branch: 'left' } }
  )

  expect(result.current).toEqual(['left', expect.any(Function)])

  rerender({ branch: 'right' })

  expect(result.current).toEqual(['right', expect.any(Function)])
})

test('allows wrapper components', async () => {
  const Context = createContext('default')
  function Wrapper ({ children }) {
    return <Context.Provider value="provided">{children}</Context.Provider>
  }
  const { result } = renderHook(
    () => {
      return useContext(Context)
    },
    {
      wrapper: Wrapper
    }
  )

  expect(result.current).toEqual('provided')
})
