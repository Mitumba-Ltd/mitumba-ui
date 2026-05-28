// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { VAZIBadge } from './VAZIBadge'

describe('VAZIBadge', () => {
  afterEach(cleanup)

  it('renders correctly', () => {
    render(
      <MitumbaThemeProvider>
        <VAZIBadge />
      </MitumbaThemeProvider>,
    )

    // The badge text was refined to "VAZI" for the extraordinary overhaul
    expect(screen.getByText(/VAZI/i)).toBeInTheDocument()
  })

  it('renders with small size', () => {
    render(
      <MitumbaThemeProvider>
        <VAZIBadge size="small" />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText(/VAZI/i)).toBeInTheDocument()
  })

  it('has the correct role', () => {
    render(
      <MitumbaThemeProvider>
        <VAZIBadge />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
