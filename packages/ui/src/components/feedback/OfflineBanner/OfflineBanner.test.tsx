// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { OfflineBanner } from './OfflineBanner'

afterEach(() => {
  cleanup()
})

describe('OfflineBanner', () => {
  beforeEach(() => {
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: true,
      configurable: true,
    })
  })

  it('does not render when online', () => {
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: true,
      configurable: true,
    })
    render(
      <MitumbaThemeProvider>
        <OfflineBanner />
      </MitumbaThemeProvider>
    )
    expect(screen.queryByText('No connection — showing cached content')).not.toBeInTheDocument()
  })

  it('renders when offline', () => {
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: false,
      configurable: true,
    })
    render(
      <MitumbaThemeProvider>
        <OfflineBanner />
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('No connection — showing cached content')).toBeInTheDocument()
  })

  it('updates when going offline', async () => {
    render(
      <MitumbaThemeProvider>
        <OfflineBanner />
      </MitumbaThemeProvider>
    )
    expect(screen.queryByText('No connection — showing cached content')).not.toBeInTheDocument()

    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: false,
      configurable: true,
    })
    window.dispatchEvent(new Event('offline'))
    expect(await screen.findByText('No connection — showing cached content')).toBeInTheDocument()
  })
})
