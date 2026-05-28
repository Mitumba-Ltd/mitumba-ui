// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { OfflineBanner } from './OfflineBanner'

describe('OfflineBanner', () => {
  afterEach(cleanup)

  it('does not render when online', () => {
    Object.defineProperty(window.navigator, 'onLine', {
      value: true,
      configurable: true,
    })

    const { container } = render(
      <MitumbaThemeProvider>
        <OfflineBanner />
      </MitumbaThemeProvider>,
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders when offline', () => {
    Object.defineProperty(window.navigator, 'onLine', {
      value: false,
      configurable: true,
    })

    render(
      <MitumbaThemeProvider>
        <OfflineBanner />
      </MitumbaThemeProvider>,
    )
    expect(screen.getByText(/You are currently offline/i)).toBeInTheDocument()
  })

  it('updates when going offline', async () => {
    Object.defineProperty(window.navigator, 'onLine', {
      value: true,
      configurable: true,
    })

    render(
      <MitumbaThemeProvider>
        <OfflineBanner />
      </MitumbaThemeProvider>,
    )

    Object.defineProperty(window.navigator, 'onLine', {
      value: false,
      configurable: true,
    })
    window.dispatchEvent(new Event('offline'))
    expect(await screen.findByText(/You are currently offline/i)).toBeInTheDocument()
  })
})
