// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { VAZIOutfitCard } from './VAZIOutfitCard'
import type { VAZIOutfitItem } from './VAZIOutfitCard.types'

const sampleItems: VAZIOutfitItem[] = [
  { listingId: 'l1', sellerName: 'Ama Fashion', imageUrl: '/top.jpg', garmentType: 'top' as const, priceKes: 2000 },
  { listingId: 'l2', sellerName: 'Kampala Threads', imageUrl: '/bottom.jpg', garmentType: 'bottom' as const, priceKes: 3000 },
  { listingId: 'l3', sellerName: 'Sneaker Hub', imageUrl: '/shoes.jpg', garmentType: 'shoes' as const, priceKes: 2000 },
]

const sampleProps = {
  outfitName: 'Summer Vibes',
  items: sampleItems,
  totalPriceKes: 7000,
  sellersCount: 3,
}

describe('VAZIOutfitCard', () => {
  afterEach(cleanup)

  it('renders the outfit name and VAZI label', () => {
    render(
      <MitumbaThemeProvider>
        <VAZIOutfitCard 
          outfitName={sampleProps.outfitName}
          items={sampleProps.items}
          totalPriceKes={sampleProps.totalPriceKes}
          sellersCount={sampleProps.sellersCount}
        />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Summer Vibes')).toBeInTheDocument()
    expect(screen.getByText(/VAZI Curation/i)).toBeInTheDocument()
  })

  it('renders all items with their sellers', () => {
    render(
      <MitumbaThemeProvider>
        <VAZIOutfitCard 
          outfitName={sampleProps.outfitName}
          items={sampleProps.items}
          totalPriceKes={sampleProps.totalPriceKes}
          sellersCount={sampleProps.sellersCount}
        />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Ama Fashion')).toBeInTheDocument()
    expect(screen.getByText('Kampala Threads')).toBeInTheDocument()
    expect(screen.getByText('Sneaker Hub')).toBeInTheDocument()
  })
})
