import { queries, Queries, BoundFunction } from '@testing-library/dom'
import { act as preactAct } from 'preact/test-utils'
import { ComponentChild, ComponentType } from 'preact'

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

export interface RenderHookResult<Result, Props> {
  /**
   * Triggers a re-render. The props will be passed to your renderHook callback.
   */
  rerender: (props?: Props) => void
  /**
   * This is a stable reference to the latest value returned by your renderHook
   * callback
   */
  result: {
    /**
     * The value returned by your renderHook callback
     */
    current: Result
  }
  /**
   * Unmounts the test component. This is useful for when you need to test
   * any cleanup your useEffects have.
   */
  unmount: () => void
}

export interface RenderHookOptions<Props> {
  /**
   * The argument passed to the renderHook callback. Can be useful if you plan
   * to use the rerender utility to change the values passed to your hook.
   */
  initialProps?: Props
  /**
   * Pass a React Component as the wrapper option to have it rendered around the inner element. This is most useful for creating
   *  reusable custom render functions for common data providers. See setup for examples.
   *
   *  @see https://testing-library.com/docs/react-testing-library/api/#wrapper
   */
  wrapper?: ComponentType<{ children: Element }>
}

/**
 * Allows you to render a hook within a test React component without having to
 * create that component yourself.
 */
export function renderHook<Result, Props>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props>,
): RenderHookResult<Result, Props>
