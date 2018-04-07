import preact from 'preact'
import {render} from '../'

let idCounter = 1

/** @jsx preact.h */
class NumberDisplay extends preact.Component {
  id = idCounter++ // to ensure we don't remount a different instance
  render() {
    return (
      <div>
        <span data-testid="number-display">{this.props.number}</span>
        <span data-testid="instance-id">{this.id}</span>
      </div>
    )
  }
}

test('passing props is displayed as expected', () => {
  const {getByTestId} = render(<NumberDisplay number={1} id={3} />)
  expect(getByTestId('number-display').textContent).toBe('1')

  // re-render the same component with different props
  // but pass the same container in the options argument.
  // render(<NumberDisplay number={2} />,container)
  // expect(getByTestId('number-display').textContent).toBe('2')
  //
  // expect(getByTestId('instance-id').textContent).toBe('1')
})
