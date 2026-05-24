// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { VAZIOutfitCard } from './VAZIOutfitCard'
import type { VAZIOutfitCardProps } from './VAZIOutfitCard.types'

const defaultItems = [
  {
    listingId: '1',
    imageUrl: '/top.jpg',
    garmentType: 'top' as const,
    priceKes: 1500,
    sellerName: 'Ama Fashion',
  },
  {
    listingId: '2',
    imageUrl: '/bottom.jpg',
    garmentType: 'bottom' as const,
    priceKes: 2000,
    sellerName: 'Kampala Threads',
  },
  {
    listingId: '3',
    imageUrl: '/shoes.jpg',
    garmentType: 'shoes' as const,
    priceKes: 3500,
    sellerName: 'Sneaker Hub',
  },
]

function renderOutfitCard(props: Partial<VAZIOutfitCardProps> = {}) {
  const outfitProps: VAZIOutfitCardProps = {
    outfitName: 'Weekend Chill',
    items: defaultItems,
    totalPriceKes: 7000,
    sellersCount: 3,
    isMultiCity: false,
    onTap: undefined,
    onBuyAll: undefined,
    ...props,
  }

  return render(
    <MitumbaThemeProvider>
      <VAZIOutfitCard
        outfitName={outfitProps.outfitName}
        items={outfitProps.items}
        totalPriceKes={outfitProps.totalPriceKes}
        sellersCount={outfitProps.sellersCount}
        isMultiCity={outfitProps.isMultiCity}
        onTap={outfitProps.onTap}
        onBuyAll={outfitProps.onBuyAll}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('VAZIOutfitCard', () => {
  it('renders the outfit name and VAZI label', () => {
    renderOutfitCard({ outfitName: 'Summer Vibes' })

    expect(screen.getByText('Summer Vibes')).toBeInTheDocument()
    expect(screen.getByRole('status', { name: /VAZI outfit/i })).toHaveTextContent('VAZI')
  })

  it('displays all item images', () => {
    renderOutfitCard()

    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(3)
    expect(images[0]).toHaveAttribute('alt', 'top — Ama Fashion')
    expect(images[1]).toHaveAttribute('alt', 'bottom — Kampala Threads')
    expect(images[2]).toHaveAttribute('alt', 'shoes — Sneaker Hub')
  })

  it('formats the total price in KES', () => {
    renderOutfitCard({ totalPriceKes: 7000 })

    expect(screen.getByText('KES 7,000')).toBeInTheDocument()
  })

  it('calls onTap when clicked', () => {
    const onTap = vi.fn()
    renderOutfitCard({ onTap })

    fireEvent.click(screen.getByRole('button'))

    expect(onTap).toHaveBeenCalledTimes(1)
  })

  it('calls onBuyAll when buy button is clicked', () => {
    const onBuyAll = vi.fn()
    renderOutfitCard({ onBuyAll })

    fireEvent.click(screen.getByText('Buy this look'))

    expect(onBuyAll).toHaveBeenCalledTimes(1)
  })

  it('shows seller count when multiple sellers', () => {
    renderOutfitCard({ sellersCount: 3 })

    expect(screen.getByText(/Ships from 3 sellers/i)).toBeInTheDocument()
  })

  it('does not show seller info when only one seller', () => {
    const { container } = renderOutfitCard({ sellersCount: 1 })

    expect(container.textContent).not.toContain('Ships from')
  })

  it('shows multi-city indicator when applicable', () => {
    renderOutfitCard({ sellersCount: 3, isMultiCity: true })

    expect(screen.getByText(/Ships from 3 sellers/i)).toBeInTheDocument()
  })

  it('renders without onTap as non-interactive', () => {
    renderOutfitCard({ onTap: undefined })

    expect(screen.getByText('Weekend Chill')).toBeInTheDocument()
  })
})
