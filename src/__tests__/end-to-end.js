import '@testing-library/jest-dom/extend-expect'
import { Component, h } from 'preact'
import { screen, render, waitForElementToBeRemoved } from '..'

const fetchAMessage = () => new Promise((resolve) => {
  // we are using random timeout here to simulate a real-time example
  // of an async operation calling a callback at a non-deterministic time
  const randomTimeout = Math.floor(Math.random() * 100)

  setTimeout(() => {
    resolve({ returnedMessage: 'Hello World' })
  }, randomTimeout)
})

class ComponentWithLoader extends Component {
  state = { loading: true }

  componentDidMount () {
    fetchAMessage().then(data => {
      this.setState({ data, loading: false })
    })
  }

  render () {
    if (this.state.loading) {
      return (<div>Loading...</div>)
    }

    return (
      <div data-testid="message">
        Loaded this message: {this.state.data.returnedMessage}!
      </div>
    )
  }
}

test('it waits for the data to be loaded', async () => {
  render(<ComponentWithLoader />)
  const loading = () => screen.getByText('Loading...')
  await waitForElementToBeRemoved(loading)
  expect(screen.getByTestId('message')).toHaveTextContent(/Hello World/)
})
