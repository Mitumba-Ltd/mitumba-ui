// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { VAZIFeedSection } from './VAZIFeedSection'
import type { VAZIFeedSectionProps } from './VAZIFeedSection.types'

const sampleOutfits: VAZIFeedSectionProps['outfits'] = [
  {
    outfitName: 'Weekend Chill',
    items: [
      { listingId: '1', imageUrl: '/a.jpg', garmentType: 'top', priceKes: 1000, sellerName: 'Ama' },
      { listingId: '2', imageUrl: '/b.jpg', garmentType: 'bottom', priceKes: 1500, sellerName: 'Threads' },
    ],
    totalPriceKes: 2500,
    sellersCount: 2,
  },
  {
    outfitName: 'City Slicker',
    items: [
      { listingId: '3', imageUrl: '/c.jpg', garmentType: 'top', priceKes: 2000, sellerName: 'Kampala' },
      { listingId: '4', imageUrl: '/d.jpg', garmentType: 'bottom', priceKes: 2500, sellerName: 'Ama' },
    ],
    totalPriceKes: 4500,
    sellersCount: 2,
  },
]

function renderSection(props: Partial<VAZIFeedSectionProps> = {}) {
  return render(
    <MitumbaThemeProvider>
      <VAZIFeedSection 
        outfits={props.outfits || sampleOutfits} 
        loading={props.loading}
        onSeeAll={props.onSeeAll}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(cleanup)

describe('VAZIFeedSection', () => {
  it('renders section title', () => {
    renderSection()
    expect(screen.getByText(/VAZI Picks for You/i)).toBeInTheDocument()
  })

  it('renders all outfit cards', () => {
    renderSection()
    expect(screen.getByText('Weekend Chill')).toBeInTheDocument()
    expect(screen.getByText('City Slicker')).toBeInTheDocument()
  })

  it('shows loading skeletons when loading is true', () => {
    renderSection({ loading: true })
    const skeletons = screen.getAllByLabelText('Loading content...')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('calls onSeeAll when see all is clicked', () => {
    const onSeeAll = vi.fn()
    renderSection({ onSeeAll })

    fireEvent.click(screen.getByText(/Explore All/i))

    expect(onSeeAll).toHaveBeenCalledTimes(1)
  })
})
