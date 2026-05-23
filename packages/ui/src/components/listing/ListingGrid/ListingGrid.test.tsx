// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { ListingGrid } from './ListingGrid'

describe('ListingGrid', () => {
  afterEach(cleanup)

  it('renders children inside grid', () => {
    render(
      <MitumbaThemeProvider>
        <ListingGrid>
          <div data-testid="card-1">Listing 1</div>
          <div data-testid="card-2">Listing 2</div>
        </ListingGrid>
      </MitumbaThemeProvider>,
    )

    expect(screen.getByTestId('card-1')).toBeInTheDocument()
    expect(screen.getByTestId('card-2')).toBeInTheDocument()
  })
})
