import preact from 'preact' // eslint-disable-line
import {render, fireEvent, flushPromises, debounceRenderingOff} from '../'
import 'dom-testing-library/extend-expect'

/** @jsx preact.h */

class MyForm extends preact.Component {
  state = {checked: false, textbox: ''}
  toggle = () => {
    const checked = !this.state.checked
    this.setState({checked})
  }
  type = e => {
    const textbox = e.target.value
    this.setState({textbox})
  }
  render({}, {checked, textbox}) {
    return (
      <div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={checked}
              onClick={this.toggle}
              data-testid="checkbox"
            />
            Checkbox
          </label>
          <p>{checked ? 'Yes' : 'No'}</p>
        </div>

        <div>
          <label>
            <input
              type="textbox"
              checked={textbox}
              onChange={this.type}
              data-testid="textbox"
            />
            Textbox
          </label>
          <p>{textbox}</p>
        </div>
      </div>
    )
  }
}

//debounceRenderingOff is not set, so render will be debounced!
test('testing different types of events', async () => {
  const {getByTestId, getByText, queryByText} = render(<MyForm />)

  const checkBox = getByTestId('checkbox')

  // Act
  fireEvent.click(checkBox)
  const textbox = getByTestId('textbox')
  textbox.value = 'test value'
  fireEvent.change(textbox)

  await flushPromises()
  // Assert
  expect(queryByText('No')).not.toBeInTheDOM()
  expect(getByText('Yes')).toBeInTheDOM()
  expect(getByText('test value')).toBeInTheDOM()
})

//debounceRenderingOff is set. No need of waiting or calling flushPromises
test('testing different types of events with debounce off', () => {
  debounceRenderingOff()
  const {getByTestId, getByText, queryByText} = render(<MyForm />)
  const checkBox = getByTestId('checkbox')

  // Act
  fireEvent.click(checkBox)
  const textbox = getByTestId('textbox')
  textbox.value = 'test value'
  fireEvent.change(textbox)

  // Assert
  expect(queryByText('No')).not.toBeInTheDOM()
  expect(getByText('Yes')).toBeInTheDOM()
  expect(getByText('test value')).toBeInTheDOM()
})

/* eslint jsx-a11y/label-has-for:0 */
