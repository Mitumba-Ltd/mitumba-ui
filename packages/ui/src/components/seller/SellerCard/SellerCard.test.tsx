// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import type { SellerCardProps } from './SellerCard.types'
import { SellerCard } from './SellerCard'

const defaultProps: SellerCardProps = {
  sellerId: 'seller-1',
  name: "Jane's Closet",
  city: 'Nairobi',
  stiScore: 92,
  totalListings: 34,
  isVaziFeatured: false,
  onTap: undefined,
}

function renderSellerCard(overrides: Partial<SellerCardProps> = {}) {
  const props = { ...defaultProps, ...overrides }
  return render(
    <MitumbaThemeProvider>
      <SellerCard
        {...props}
      />
    </MitumbaThemeProvider>
  )
}

afterEach(() => {
  cleanup()
})

describe('SellerCard', () => {
  it('renders seller name', () => {
    renderSellerCard()
    expect(screen.getByText("Jane's Closet")).toBeInTheDocument()
  })

  it('renders city', () => {
    renderSellerCard()
    expect(screen.getByText('Nairobi')).toBeInTheDocument()
  })

  it('renders STI chip', () => {
    renderSellerCard()
    expect(screen.getByText('92')).toBeInTheDocument()
  })

  it('renders total listings', () => {
    renderSellerCard()
    expect(screen.getByText('34 listings')).toBeInTheDocument()
  })

  it('calls onTap when clicked', () => {
    const onTap = vi.fn()
    renderSellerCard({ onTap })
    fireEvent.click(screen.getByRole('button'))
    expect(onTap).toHaveBeenCalledTimes(1)
  })

  it('shows VAZI badge when featured', () => {
    renderSellerCard({ isVaziFeatured: true })
    expect(screen.getByText('VAZI')).toBeInTheDocument()
  })

  it('does not show VAZI badge when not featured', () => {
    renderSellerCard({ isVaziFeatured: false })
    expect(screen.queryByText('VAZI')).not.toBeInTheDocument()
  })
})
