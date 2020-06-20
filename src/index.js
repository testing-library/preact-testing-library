import { cleanup } from './pure'

// If we're running in a test runner that supports afterEach
// or teardown then we'll automatically run cleanup afterEach test
// this ensures that tests run in isolation from each other.
// If you don't like this then either import the `pure` module
// or set the PTL_SKIP_AUTO_CLEANUP env variable to 'true'.
if (!process.env.PTL_SKIP_AUTO_CLEANUP) {
  if (typeof afterEach === 'function') {
    afterEach(async () => {
      await cleanup()
    })
  } else if (typeof teardown === 'function') {
    // eslint-disable-next-line no-undef
    teardown(async () => {
      await cleanup()
    })
  }
}

export * from './pure'
