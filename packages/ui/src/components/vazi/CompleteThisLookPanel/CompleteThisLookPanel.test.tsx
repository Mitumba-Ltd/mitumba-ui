// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { CompleteThisLookPanel } from './CompleteThisLookPanel'
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

function renderPanel(props: { outfits?: VAZIOutfitCardProps[]; loading?: boolean } = {}) {
  return render(
    <MitumbaThemeProvider>
      <CompleteThisLookPanel outfits={props.outfits ?? mockOutfits} loading={props.loading} />
    </MitumbaThemeProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('CompleteThisLookPanel', () => {
  it('renders the section title', () => {
    renderPanel()

    expect(screen.getByText('Complete this look')).toBeInTheDocument()
  })

  it('renders outfit cards', () => {
    renderPanel()

    expect(screen.getByText('Weekend Chill')).toBeInTheDocument()
    expect(screen.getByText('City Slicker')).toBeInTheDocument()
  })

  it('renders skeleton cards when loading', () => {
    renderPanel({ loading: true, outfits: [] })

    expect(screen.getAllByLabelText(/Loading/i).length).toBeGreaterThan(0)
  })

  it('returns null when not loading and no outfits', () => {
    const { container } = renderPanel({ outfits: [] })

    expect(container.firstChild).toBeNull()
  })
})
