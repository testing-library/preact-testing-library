import { h } from 'preact';

import { render } from '..';

// This just verifies that by importing PTL in an
// environment which supports afterEach (like jest)
// we'll get automatic cleanup between tests.
test('first', () => {
  render(<div>hi</div>);
});

test('second', () => {
  expect(document.body.innerHTML).toEqual('');
});
