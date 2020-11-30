import { queries, Queries, BoundFunction } from '@testing-library/dom'
import { act as preactAct } from 'preact/test-utils'
import { ComponentChild } from 'preact'

export * from '@testing-library/dom'

export type RenderResult<Q extends Queries = typeof queries> = {
  container: Element
  baseElement: Element
  debug: (baseElement?: Element | DocumentFragment) => void
  rerender: (ui: ComponentChild) => void
  unmount: () => boolean
  asFragment: () => DocumentFragment
} & { [P in keyof Q]: BoundFunction<Q[P]> }

export interface RenderOptions<Q extends Queries = typeof queries> {
  container?: Element
  baseElement?: Element
  queries?: Q
  wrapper?: ComponentChild
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * Render into a container which is appended to document.body. It should be used with cleanup.
 */
export function render(ui: ComponentChild, options?: Omit<RenderOptions, 'queries'>): RenderResult

export function render<Q extends Queries>(
  ui: ComponentChild,
  options: RenderOptions<Q>,
): RenderResult<Q>

/**
 * Unmounts Preact trees that were mounted with render.
 */
export function cleanup(): void

/**
 * Simply calls preact/test-utils.act(cb)
 *
 * If that's not available (older version of preact) then it
 * simply calls the given callback immediately
 */
export const act: typeof preactAct extends undefined
  ? (callback: () => void) => void
  : typeof preactAct
