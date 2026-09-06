// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { VAZIOutfitCard } from './VAZIOutfitCard'
import type { HeadingLevel } from '../../../types/semantic'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

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

  function renderCard(extra = {}) {
    return render(
      <MitumbaThemeProvider>
        <VAZIOutfitCard
          outfitName={sampleProps.outfitName}
          items={sampleProps.items}
          totalPriceKes={sampleProps.totalPriceKes}
          sellersCount={sampleProps.sellersCount}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...extra}
        />
      </MitumbaThemeProvider>,
    )
  }

  it('renders a named article', () => {
    renderCard()
    expect(screen.getByRole('article', { name: /Summer Vibes, KES 7,000/ })).toBeInTheDocument()
  })

  it('renders a link surface when href is provided', () => {
    renderCard({ href: '/vazi/summer-vibes' })
    expect(screen.getByRole('link', { name: /Summer Vibes/ })).toHaveAttribute('href', '/vazi/summer-vibes')
  })

  it('renders a button surface when only onTap is provided', () => {
    const onTap = vi.fn()
    renderCard({ onTap })
    fireEvent.click(screen.getByRole('button', { name: /Summer Vibes, KES 7,000/ }))
    expect(onTap).toHaveBeenCalledTimes(1)
  })

  it('renders no interactive surface when neither href nor onTap is provided', () => {
    renderCard()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('exposes the surface as a native, keyboard-operable button', () => {
    const onTap = vi.fn()
    renderCard({ onTap })
    const button = screen.getByRole('button', { name: /Summer Vibes, KES 7,000/ })
    expect(button.tagName).toBe('BUTTON')
    button.focus()
    expect(button).toHaveFocus()
    fireEvent.click(button)
    expect(onTap).toHaveBeenCalledTimes(1)
  })

  it('isolates the buy-all action from the card surface', () => {
    const onTap = vi.fn()
    const onBuyAll = vi.fn()
    renderCard({ onTap, onBuyAll })
    fireEvent.click(screen.getByRole('button', { name: /Buy entire look/ }))
    expect(onBuyAll).toHaveBeenCalledTimes(1)
    expect(onTap).not.toHaveBeenCalled()
  })

  it('associates the total-look price label with its value', () => {
    renderCard()
    expect(screen.getByText(/KES 7,000/)).toHaveAttribute('aria-labelledby')
  })

  it('omits titleLevel by default, rendering a non-heading name element', () => {
    renderCard()
    expect(screen.getByText('Summer Vibes').tagName).toBe('P')
  })

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])('emits an h%s element when titleLevel is set', (level) => {
    renderCard({ titleLevel: level })
    expect(screen.getByText('Summer Vibes').tagName).toBe(`H${level}`)
  })

  it('inherits the host theme typography.fontFamily on the name (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <VAZIOutfitCard outfitName="Summer Vibes" items={sampleProps.items} totalPriceKes={7000} sellersCount={3} titleLevel={2} />
      </ThemeProvider>,
    )
    expect(screen.getByText('Summer Vibes').style.fontFamily).toBe('')
    expect(screen.getByText(/KES 7,000/).style.fontFamily).toBe('')
  })

  it('has no axe violations as a link with buy action', async () => {
    const { container } = renderCard({ href: '/vazi/summer-vibes', titleLevel: 2, onBuyAll: vi.fn(), isMultiCity: true })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
