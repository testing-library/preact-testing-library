import { getQueriesForElement } from 'dom-testing-library'
import { JSX } from 'preact'

export * from 'dom-testing-library'

type GetsAndQueries = ReturnType<typeof getQueriesForElement>

export interface RenderResult extends GetsAndQueries {
  container: HTMLElement
  debug: (el?: HTMLElement) => void
  rerender: (rerenderUi: JSX.Element) => void
  unmount: VoidFunction
}

export function render(
  ui: JSX.Element,
  options?: {
    baseElement?: HTMLElement
    container?: HTMLElement
  }
): RenderResult

export function cleanup(): void

export function debounceRenderingOff(): void

export function flushPromises(): Promise<void>
