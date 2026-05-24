// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { VAZIOutfitCard } from './VAZIOutfitCard'
import type { VAZIOutfitCardProps } from './VAZIOutfitCard.types'

const defaultProps: VAZIOutfitCardProps = {
  outfitName: 'Summer Vibes',
  items: [
    {
      listingId: '1',
      imageUrl: '/top.jpg',
      garmentType: 'top',
      sellerName: 'Ama Fashion',
      priceKes: 2500,
    },
    {
      listingId: '2',
      imageUrl: '/bottom.jpg',
      garmentType: 'bottom',
      sellerName: 'Kampala Threads',
      priceKes: 3000,
    },
    {
      listingId: '3',
      imageUrl: '/shoes.jpg',
      garmentType: 'shoes',
      sellerName: 'Sneaker Hub',
      priceKes: 1500,
    },
  ],
  totalPriceKes: 7000,
  sellersCount: 3,
  isMultiCity: true,
  onTap: undefined,
  onBuyAll: undefined,
}

function renderOutfitCard(overrides: Partial<VAZIOutfitCardProps> = {}) {
  const props = { ...defaultProps, ...overrides }
  return render(
    <MitumbaThemeProvider>
      <VAZIOutfitCard
        outfitName={props.outfitName}
        items={props.items}
        totalPriceKes={props.totalPriceKes}
        sellersCount={props.sellersCount}
        isMultiCity={props.isMultiCity}
        onTap={props.onTap}
        onBuyAll={props.onBuyAll}
      />
    </MitumbaThemeProvider>
  )
}

afterEach(() => {
  cleanup()
})

describe('VAZIOutfitCard', () => {
  it('renders the outfit name and VAZI label', () => {
    renderOutfitCard()

    expect(screen.getByText('Summer Vibes')).toBeInTheDocument()
    expect(screen.getByRole('status', { name: /VAZI Featured/i })).toBeInTheDocument()
  })

  it('displays all item images', () => {
    renderOutfitCard()

    expect(screen.getAllByRole('img')).toHaveLength(3)
    expect(screen.getByAltText(/top — Ama Fashion/i)).toBeInTheDocument()
  })

  it('formats the total price in KES', () => {
    renderOutfitCard({ totalPriceKes: 12500 })

    expect(screen.getByText('KES 12,500')).toBeInTheDocument()
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

    fireEvent.click(screen.getByText(/Buy all/i))
    expect(onBuyAll).toHaveBeenCalledTimes(1)
  })

  it('shows seller count when multiple sellers', () => {
    renderOutfitCard({ sellersCount: 2 })

    expect(screen.getByText(/Ships from 2 sellers/i)).toBeInTheDocument()
  })

  it('does not show seller info when only one seller', () => {
    const { container } = renderOutfitCard({ sellersCount: 1 })

    expect(container.textContent).not.toContain('Ships from')
  })

  it('shows multi-city indicator when applicable', () => {
    renderOutfitCard({ sellersCount: 2, isMultiCity: true })

    expect(screen.getByText(/Multi-city/i)).toBeInTheDocument()
  })

  it('renders without onTap as non-interactive', () => {
    renderOutfitCard({ onTap: undefined })
    const card = screen.getByRole('button')
    expect(card).toHaveAttribute('tabindex', '-1')
  })
})
