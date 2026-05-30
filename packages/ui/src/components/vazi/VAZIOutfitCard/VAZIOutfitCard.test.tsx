// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { VAZIOutfitCard } from './VAZIOutfitCard'

const sampleProps = {
  outfitName: 'Summer Vibes',
  items: [
    { listingId: 't1', sellerName: 'Ama Fashion', imageUrl: '/top.jpg', garmentType: 'top' as const, priceKes: 2000 },
    { listingId: 'b1', sellerName: 'Kampala Threads', imageUrl: '/bottom.jpg', garmentType: 'bottom' as const, priceKes: 3000 },
    { listingId: 's1', sellerName: 'Sneaker Hub', imageUrl: '/shoes.jpg', garmentType: 'shoes' as const, priceKes: 2000 },
  ],
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
    // VAZI label is in the VAZIBadge primitive
    expect(screen.getByText(/VAZI/i)).toBeInTheDocument()
  })

  it('renders total price correctly', () => {
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

    expect(screen.getByText(/7,000/i)).toBeInTheDocument()
  })
})
