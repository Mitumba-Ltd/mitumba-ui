// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { SellerCard } from './SellerCard'
import type { HeadingLevel } from '../../../types/semantic'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

const sampleProps = {
  sellerId: '1',
  name: "Jane's Closet",
  avatarUrl: '',
  city: 'Nairobi',
  stiScore: 92,
  totalListings: 34,
}

function renderSellerCard(customProps = {}) {
  const merged = { ...sampleProps, ...customProps }
  return render(
    <MitumbaThemeProvider>
      <SellerCard 
        sellerId={merged.sellerId}
        name={merged.name}
        avatarUrl={merged.avatarUrl}
        city={merged.city}
        stiScore={merged.stiScore}
        totalListings={merged.totalListings}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...customProps}
      />
    </MitumbaThemeProvider>,
  )
}

describe('SellerCard', () => {
  afterEach(cleanup)

  it('renders seller name and info', () => {
    renderSellerCard()
    expect(screen.getByText("Jane's Closet")).toBeInTheDocument()
  })

  it('shows STI score correctly', () => {
    renderSellerCard()
    expect(screen.getByText('92')).toBeInTheDocument()
  })

  it('shows VAZI badge when featured', () => {
    renderSellerCard({ isVaziFeatured: true })
    // VAZI label text refined to "VAZI"
    expect(screen.getByText(/VAZI/i)).toBeInTheDocument()
  })

  it('renders a named article', () => {
    renderSellerCard()
    expect(screen.getByRole('article', { name: /Jane's Closet — Nairobi, 34 listings/ })).toBeInTheDocument()
  })

  it('renders a link surface when href is provided', () => {
    renderSellerCard({ href: '/sellers/1' })
    expect(screen.getByRole('link', { name: /Jane's Closet/ })).toHaveAttribute('href', '/sellers/1')
  })

  it('renders a button surface when only onTap is provided', () => {
    const onTap = vi.fn()
    renderSellerCard({ onTap })
    const button = screen.getByRole('button', { name: /Jane's Closet — Nairobi/ })
    fireEvent.click(button)
    expect(onTap).toHaveBeenCalledTimes(1)
  })

  it('renders no interactive surface when neither href nor onTap is provided', () => {
    renderSellerCard()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('exposes the surface as a native, keyboard-operable button', () => {
    const onTap = vi.fn()
    renderSellerCard({ onTap })
    const button = screen.getByRole('button', { name: /Jane's Closet — Nairobi/ })
    expect(button.tagName).toBe('BUTTON')
    button.focus()
    expect(button).toHaveFocus()
    fireEvent.click(button)
    expect(onTap).toHaveBeenCalledTimes(1)
  })

  it('isolates the follow/visit action from the surface tap', () => {
    const onTap = vi.fn()
    const onAction = vi.fn()
    renderSellerCard({ onTap, actionLabel: 'Visit Store', onAction })
    fireEvent.click(screen.getByRole('button', { name: 'Visit Store' }))
    expect(onAction).toHaveBeenCalledTimes(1)
    expect(onTap).not.toHaveBeenCalled()
  })

  it('omits titleLevel by default, rendering a non-heading name element', () => {
    renderSellerCard()
    expect(screen.getByText("Jane's Closet").tagName).toBe('P')
  })

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])('emits an h%s element when titleLevel is set', (level) => {
    renderSellerCard({ titleLevel: level })
    const title = screen.getByText("Jane's Closet")
    expect(title.tagName).toBe(`H${level}`)
    expect(title).toHaveStyle({ fontWeight: '700' })
  })

  it('inherits the host theme typography.fontFamily on the name (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <SellerCard sellerId="1" name="Jane's Closet" city="Nairobi" stiScore={92} totalListings={34} titleLevel={2} />
      </ThemeProvider>,
    )
    expect(screen.getByText("Jane's Closet").style.fontFamily).toBe('')
  })

  it('has no axe violations with a link surface and follow action', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <SellerCard sellerId="1" name="Jane's Closet" city="Nairobi" stiScore={92} totalListings={34} titleLevel={2} href="/sellers/1" actionLabel="Visit Store" onAction={vi.fn()} isVaziFeatured />
      </MitumbaThemeProvider>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
