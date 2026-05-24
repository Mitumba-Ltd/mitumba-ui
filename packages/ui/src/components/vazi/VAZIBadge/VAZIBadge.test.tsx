// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { VAZIBadge } from './VAZIBadge'

describe('VAZIBadge', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders VAZI Featured text', () => {
    render(
      <MitumbaThemeProvider>
        <VAZIBadge size="medium" />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('VAZI Featured')).toBeInTheDocument()
  })

  it('renders with small size', () => {
    render(
      <MitumbaThemeProvider>
        <VAZIBadge size="small" />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('VAZI Featured')).toBeInTheDocument()
  })

  it('has the correct aria label', () => {
    render(
      <MitumbaThemeProvider>
        <VAZIBadge size="medium" />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByLabelText('VAZI Featured')).toBeInTheDocument()
  })
})
