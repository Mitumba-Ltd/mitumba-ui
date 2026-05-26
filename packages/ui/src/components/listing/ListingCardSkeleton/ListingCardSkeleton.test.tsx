// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { ListingCardSkeleton } from './ListingCardSkeleton'

describe('ListingCardSkeleton', () => {
  afterEach(cleanup)

  it('renders skeleton elements', () => {
    render(
      <MitumbaThemeProvider>
        <ListingCardSkeleton />
      </MitumbaThemeProvider>,
    )

    // We now use multiple MitumbaSkeleton components, all with the same aria-label
    const skeletons = screen.getAllByLabelText('Loading content...')
    expect(skeletons.length).toBeGreaterThan(0)
  })
})
