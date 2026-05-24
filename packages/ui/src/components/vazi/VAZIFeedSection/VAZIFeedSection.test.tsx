// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { VAZIFeedSection } from './VAZIFeedSection'
import type { VAZIOutfitCardProps } from '../VAZIOutfitCard/VAZIOutfitCard.types'

const mockOutfits: VAZIOutfitCardProps[] = [
  {
    outfitName: 'Weekend Chill',
    items: [
      { listingId: '1', imageUrl: '/a.jpg', garmentType: 'top', priceKes: 1000, sellerName: 'A' },
      { listingId: '2', imageUrl: '/b.jpg', garmentType: 'bottom', priceKes: 1500, sellerName: 'B' },
    ],
    totalPriceKes: 2500,
    sellersCount: 2,
  },
  {
    outfitName: 'City Slicker',
    items: [
      { listingId: '3', imageUrl: '/c.jpg', garmentType: 'top', priceKes: 2000, sellerName: 'C' },
      { listingId: '4', imageUrl: '/d.jpg', garmentType: 'bottom', priceKes: 2500, sellerName: 'D' },
    ],
    totalPriceKes: 4500,
    sellersCount: 2,
  },
]

function renderSection(props: { outfits?: VAZIOutfitCardProps[]; loading?: boolean; onSeeAll?: () => void } = {}) {
  return render(
    <MitumbaThemeProvider>
      <VAZIFeedSection outfits={props.outfits ?? mockOutfits} loading={props.loading} onSeeAll={props.onSeeAll} />
    </MitumbaThemeProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('VAZIFeedSection', () => {
  it('renders the section title', () => {
    renderSection()

    expect(screen.getByText('VAZI Picks')).toBeInTheDocument()
  })

  it('renders outfit cards', () => {
    renderSection()

    expect(screen.getByText('Weekend Chill')).toBeInTheDocument()
    expect(screen.getByText('City Slicker')).toBeInTheDocument()
  })

  it('renders See all button when onSeeAll is provided', () => {
    const onSeeAll = vi.fn()
    renderSection({ onSeeAll })

    expect(screen.getByText('See all')).toBeInTheDocument()
  })

  it('calls onSeeAll when See all is clicked', () => {
    const onSeeAll = vi.fn()
    renderSection({ onSeeAll })

    fireEvent.click(screen.getByText('See all'))

    expect(onSeeAll).toHaveBeenCalledTimes(1)
  })

  it('does not render See all button when onSeeAll is not provided', () => {
    const { container } = renderSection({ onSeeAll: undefined })

    expect(container.textContent).not.toContain('See all')
  })

  it('renders skeleton cards when loading', () => {
    renderSection({ loading: true, outfits: [] })

    // Should have skeleton elements
    expect(screen.getAllByLabelText(/Loading/i).length).toBeGreaterThan(0)
  })

  it('renders no outfits when empty', () => {
    const { container } = renderSection({ outfits: [] })

    expect(container.textContent).toContain('VAZI Picks')
  })
})
