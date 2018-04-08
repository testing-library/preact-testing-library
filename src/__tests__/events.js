import preact from 'preact' // eslint-disable-line
import {render, FireEvent, flushPromises} from '../'
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

test('testing different types of events', async () => {
  const {getByTestId, getByText, queryByText} = render(<MyForm />)

  const checkBox = getByTestId('checkbox')

  // Act
  FireEvent.fireEvent(checkBox, 'click')
  const textbox = getByTestId('textbox')
  textbox.value = 'test value'
  FireEvent.fireEvent(textbox, 'change')

  await flushPromises()
  // Assert
  expect(queryByText('No')).not.toBeInTheDOM()
  expect(getByText('Yes')).toBeInTheDOM()
  expect(getByText('test value')).toBeInTheDOM()
})

/* eslint jsx-a11y/label-has-for:0 */
