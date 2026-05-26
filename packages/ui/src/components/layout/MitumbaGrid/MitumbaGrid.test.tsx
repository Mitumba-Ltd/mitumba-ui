// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaGrid } from './MitumbaGrid'

afterEach(() => {
  cleanup()
})

describe('MitumbaGrid', () => {
  it('renders children correctly', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaGrid>
          <div data-testid="grid-child">Cell 1</div>
        </MitumbaGrid>
      </MitumbaThemeProvider>,
    )

    expect(screen.getByTestId('grid-child')).toBeInTheDocument()
  })

  it('supports custom columns', () => {
    const columns = { xs: 1, sm: 2, md: 3, lg: 4 }
    render(
      <MitumbaThemeProvider>
        <MitumbaGrid columns={columns}>
          <div>Cell 1</div>
        </MitumbaGrid>
      </MitumbaThemeProvider>,
    )

    // Verify presence
    expect(screen.getByText('Cell 1')).toBeInTheDocument()
  })
})
