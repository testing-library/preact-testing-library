import preact from 'preact'
import cases from 'jest-in-case'
import {cleanup, render} from '../'

afterEach(cleanup)

/** @jsx preact.h */
cases(
  'text matchers',
  opts => {
    const {getByText} = render(
      <a href="/about" id="anchor">
        About
      </a>,
    )
    expect(getByText(opts.textMatch, opts.options).id).toBe('anchor')
  },
  [
    {name: 'string match', textMatch: 'About'},
    {name: 'case insensitive', textMatch: 'about', options: {exact: false}},
    {name: 'regex', textMatch: /^about$/i},
    {
      name: 'function',
      textMatch: (text, element) =>
        element.tagName === 'A' && text.includes('out'),
    },
  ],
)
