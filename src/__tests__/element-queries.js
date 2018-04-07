import preact from 'preact'
import {render} from '../'
import 'dom-testing-library/extend-expect'

// lets order jest that we are using Preact here.
/** @jsx preact.h */
class HelloPreact extends preact.Component {
  render() {
    return <div>Hello world</div>
  }
}

test('simple preact component', () => {
  const {getByText, queryByText, unmount} = render(<HelloPreact />)

  expect(getByText('Hello world')).toBeInTheDOM()
  expect(queryByText('No Hello world')).not.toBeInTheDOM()

  unmount() // unmount the component
  expect(queryByText('Hello world')).not.toBeInTheDOM() // should not be present in the dom
})

test('query can return null', () => {
  const {
    queryByLabelText,
    queryByPlaceholderText,
    queryByText,
    queryByTestId,
  } = render(<div />)
  expect(queryByTestId('LucyRicardo')).toBeNull()
  expect(queryByLabelText('LucyRicardo')).toBeNull()
  expect(queryByPlaceholderText('LucyRicardo')).toBeNull()
  expect(queryByText('LucyRicardo')).toBeNull()
})

test('get throws a useful error message', () => {
  const {getByLabelText, getByPlaceholderText, getByText, getByTestId} = render(
    <div />,
  )
  expect(() => getByLabelText('LucyRicardo')).toThrowErrorMatchingSnapshot()
  expect(() =>
    getByPlaceholderText('LucyRicardo'),
  ).toThrowErrorMatchingSnapshot()
  expect(() => getByText('LucyRicardo')).toThrowErrorMatchingSnapshot()
  expect(() => getByTestId('LucyRicardo')).toThrowErrorMatchingSnapshot()
})

test('get can get form controls by label text', () => {
  const {getByLabelText} = render(
    <div>
      <label>
        1st<input id="first-id" />
      </label>
      <div>
        <label htmlFor="second-id">2nd</label>
        <input id="second-id" />
      </div>
      <div>
        <label id="third-label">3rd</label>
        <input aria-labelledby="third-label" id="third-id" />
      </div>
    </div>,
  )
  expect(getByLabelText('1st').id).toBe('first-id')
  expect(getByLabelText('2nd').id).toBe('second-id')
  expect(getByLabelText('3rd').id).toBe('third-id')
})

test('get can get form controls by placeholder', () => {
  const {getByPlaceholderText} = render(
    <input id="username-id" placeholder="username" />,
  )
  expect(getByPlaceholderText('username').id).toBe('username-id')
})

test('label with no form control', () => {
  const {getByLabelText, queryByLabelText} = render(<label>All alone</label>)
  expect(queryByLabelText('alone')).toBeNull()
  expect(() => getByLabelText('alone')).toThrowErrorMatchingSnapshot()
})

test('totally empty label', () => {
  const {getByLabelText, queryByLabelText} = render(<label />)
  expect(queryByLabelText('')).toBeNull()
  expect(() => getByLabelText('')).toThrowErrorMatchingSnapshot()
})

/* eslint jsx-a11y/label-has-for:0 */
