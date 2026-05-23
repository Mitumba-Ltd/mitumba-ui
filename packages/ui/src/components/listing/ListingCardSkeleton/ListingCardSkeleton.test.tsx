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

    expect(screen.getByLabelText('Loading listing image')).toBeInTheDocument()
    expect(screen.getByLabelText('Loading price')).toBeInTheDocument()
    expect(screen.getByLabelText('Loading title')).toBeInTheDocument()
    expect(screen.getByLabelText('Loading STI score')).toBeInTheDocument()
    expect(screen.getByLabelText('Loading city')).toBeInTheDocument()
    expect(screen.getByLabelText('Loading seller name')).toBeInTheDocument()
  })
})
