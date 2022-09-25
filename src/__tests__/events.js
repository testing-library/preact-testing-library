import { createRef, h } from 'preact'
import { fireEvent, render } from '..'

const eventTypes = [
  {
    type: 'Clipboard',
    events: ['copy', 'paste'],
    elementType: 'input'
  },
  {
    type: 'Composition',
    events: ['compositionEnd', 'compositionStart', 'compositionUpdate'],
    elementType: 'input'
  },
  {
    type: 'Keyboard',
    events: ['keyDown', 'keyPress', 'keyUp'],
    elementType: 'input',
    init: { keyCode: 13 }
  },
  {
    type: 'Focus',
    events: ['focus', 'blur'],
    elementType: 'input'
  },
  {
    type: 'Form',
    events: ['focus', 'blur'],
    elementType: 'input'
  },
  {
    type: 'Focus',
    events: ['input', 'invalid'],
    elementType: 'input'
  },
  {
    type: 'Focus',
    events: ['submit'],
    elementType: 'form'
  },
  {
    type: 'Mouse',
    events: [
      'click',
      'contextMenu',
      'dblClick',
      'drag',
      'dragEnd',
      'dragEnter',
      'dragExit',
      'dragLeave',
      'dragOver',
      'dragStart',
      'drop',
      'mouseDown',
      'mouseEnter',
      'mouseLeave',
      'mouseMove',
      'mouseOut',
      'mouseOver',
      'mouseUp'
    ],
    elementType: 'button'
  },
  {
    type: 'Selection',
    events: ['select'],
    elementType: 'input'
  },
  {
    type: 'Touch',
    events: ['touchCancel', 'touchEnd', 'touchMove', 'touchStart'],
    elementType: 'button'
  },
  {
    type: 'UI',
    events: ['scroll'],
    elementType: 'div'
  },
  {
    type: 'Wheel',
    events: ['wheel'],
    elementType: 'div'
  },
  {
    type: 'Media',
    events: [
      'abort',
      'canPlay',
      'canPlayThrough',
      'durationChange',
      'emptied',
      'encrypted',
      'ended',
      'error',
      'loadedData',
      'loadedMetadata',
      'loadStart',
      'pause',
      'play',
      'playing',
      'progress',
      'rateChange',
      'seeked',
      'seeking',
      'stalled',
      'suspend',
      'timeUpdate',
      'volumeChange',
      'waiting'
    ],
    elementType: 'video'
  },
  {
    type: 'Image',
    events: ['load', 'error'],
    elementType: 'img'
  },
  {
    type: 'Animation',
    events: ['animationStart', 'animationEnd', 'animationIteration'],
    elementType: 'div'
  },
  {
    type: 'Transition',
    events: ['transitionEnd'],
    elementType: 'div'
  },
  {
    type: 'Pointer',
    events: ['pointerEnter', 'pointerLeave'],
    elementType: 'div'
  }
]

eventTypes.forEach(({ type, events, elementType, init }) => {
  describe(`${type} Events`, () => {
    events.forEach((eventName) => {
      const eventProp = `on${eventName[0].toUpperCase() + eventName.slice(1)}`

      it(`triggers ${eventProp}`, () => {
        const ref = createRef()
        const spy = jest.fn()

        render(
          h(elementType, {
            [eventProp]: spy,
            ref
          })
        )

        expect(fireEvent[eventName](ref.current, init)).toBe(true)

        expect(spy).toHaveBeenCalledTimes(1)
        if (init) {
          expect(spy).toHaveBeenCalledWith(expect.objectContaining(init))
        }
      })
    })
  })
})

test('onInput works', () => {
  const handler = jest.fn()

  const {
    container: { firstChild: input }
  } = render(<input type="text" onInput={handler} />)

  const targetProperties = { value: 'a' }
  const otherProperties = { isComposing: true }
  const init = {
    target: targetProperties,
    ...otherProperties
  }

  expect(fireEvent.input(input, init)).toBe(true)

  expect(handler).toHaveBeenCalledTimes(1)
  expect(handler).toHaveBeenCalledWith(expect.objectContaining(otherProperties))
})

test('calling `fireEvent` directly works too', () => {
  const handler = jest.fn()

  const {
    container: { firstChild: button }
  } = render(<button onClick={handler} />)

  const event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0
  })

  expect(fireEvent(button, event)).toBe(true)

  expect(handler).toHaveBeenCalledTimes(1)
  expect(handler).toHaveBeenCalledWith(event)
})

test('`fireEvent` returns false when prevented', () => {
  const { container: { firstChild: button } } = render(
    (<button onClick={(e) => { e.preventDefault() }} />)
  )

  expect(fireEvent.click(button)).toBe(false)
})
