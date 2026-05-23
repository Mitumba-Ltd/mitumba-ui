// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaGrid } from './MitumbaGrid'

describe('MitumbaGrid', () => {
  afterEach(cleanup)

  it('renders children', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaGrid>
          <div data-testid="child-1">A</div>
          <div data-testid="child-2">B</div>
        </MitumbaGrid>
      </MitumbaThemeProvider>,
    )

    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
  })
})
