import { getQueriesForElement } from 'dom-testing-library'

export * from 'dom-testing-library'

type GetsAndQueries = ReturnType<typeof getQueriesForElement>

export type RenderResult = GetsAndQueries & {
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
