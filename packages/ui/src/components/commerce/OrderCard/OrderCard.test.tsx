// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { OrderCard } from './OrderCard'
import type { HeadingLevel } from '../../../types/semantic'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

afterEach(cleanup)

function renderCard() {
  const onClick = vi.fn()
  render(
    <MitumbaThemeProvider>
      <OrderCard
        orderShortId="a9331769"
        title="Levi's 501 Straight"
        imageUrl="https://placehold.co/160"
        totalKes={2500}
        deliveryFeeKes={200}
        status="shipped"
        createdAt="Jun 15, 2024"
        onClick={onClick}
      />
    </MitumbaThemeProvider>,
  )
  return { onClick }
}

describe('OrderCard', () => {
  it('renders order ID', () => {
    renderCard()
    expect(screen.getByText('Order #a9331769')).toBeInTheDocument()
  })

  it('renders title', () => {
    renderCard()
    expect(screen.getByText("Levi's 501 Straight")).toBeInTheDocument()
  })

  it('renders price', () => {
    renderCard()
    expect(screen.getByText('KES 2,500')).toBeInTheDocument()
  })

  it('renders delivery fee', () => {
    renderCard()
    expect(screen.getByText('+KES 200 delivery')).toBeInTheDocument()
  })

  it('renders status chip', () => {
    renderCard()
    expect(screen.getByText('Shipped')).toBeInTheDocument()
  })

  it('renders as a named article', () => {
    renderCard()
    expect(screen.getByRole('article', { name: /Order #a9331769, Levi's 501 Straight/ })).toBeInTheDocument()
  })

  it('renders a button surface and calls onClick when activated', () => {
    const { onClick } = renderCard()
    fireEvent.click(screen.getByRole('button', { name: /Order #a9331769/ }))
    expect(onClick).toHaveBeenCalled()
  })

  it('renders a link surface when href is provided', () => {
    render(
      <MitumbaThemeProvider>
        <OrderCard orderShortId="a9331769" title="Levi's 501" totalKes={2500} status="shipped" createdAt="Jun 15, 2024" href="/orders/a9331769" />
      </MitumbaThemeProvider>,
    )
    expect(screen.getByRole('link', { name: /Order #a9331769/ })).toHaveAttribute('href', '/orders/a9331769')
  })

  it('renders no interactive surface and no track action when noninteractive', () => {
    render(
      <MitumbaThemeProvider>
        <OrderCard orderShortId="a9331769" title="Levi's 501" totalKes={2500} status="shipped" createdAt="Jun 15, 2024" />
      </MitumbaThemeProvider>,
    )
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('exposes the surface as a native, keyboard-operable button', () => {
    const { onClick } = renderCard()
    const button = screen.getByRole('button', { name: /Order #a9331769/ })
    expect(button.tagName).toBe('BUTTON')
    button.focus()
    expect(button).toHaveFocus()
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalled()
  })

  it('isolates the Track action from the card surface', () => {
    const onClick = vi.fn()
    const onTrack = vi.fn()
    render(
      <MitumbaThemeProvider>
        <OrderCard orderShortId="a9331769" title="Levi's 501" totalKes={2500} status="shipped" createdAt="Jun 15, 2024" onClick={onClick} onTrack={onTrack} />
      </MitumbaThemeProvider>,
    )
    // Two responsive Track buttons render; activate all present matches
    const trackButtons = screen.getAllByRole('button', { name: /Track/ })
    fireEvent.click(trackButtons[0])
    expect(onTrack).toHaveBeenCalledTimes(1)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('omits titleLevel by default, rendering a non-heading title element', () => {
    render(
      <MitumbaThemeProvider>
        <OrderCard orderShortId="a9331769" title="Levi's 501" totalKes={2500} status="shipped" createdAt="Jun 15, 2024" />
      </MitumbaThemeProvider>,
    )
    expect(screen.getByText("Levi's 501").tagName).toBe('P')
  })

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])('emits an h%s element when titleLevel is set', (level) => {
    render(
      <MitumbaThemeProvider>
        <OrderCard orderShortId="a9331769" title="Levi's 501" totalKes={2500} status="shipped" createdAt="Jun 15, 2024" titleLevel={level} />
      </MitumbaThemeProvider>,
    )
    expect(screen.getByText("Levi's 501").tagName).toBe(`H${level}`)
  })

  it('inherits the host theme typography.fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <OrderCard orderShortId="a9331769" title="Levi's 501" totalKes={2500} status="shipped" createdAt="Jun 15, 2024" titleLevel={2} />
      </ThemeProvider>,
    )
    expect(screen.getByText("Levi's 501").style.fontFamily).toBe('')
    expect(screen.getByText('KES 2,500').style.fontFamily).toBe('')
  })

  it('has no axe violations as a link with track action', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <OrderCard orderShortId="a9331769" title="Levi's 501" totalKes={2500} deliveryFeeKes={200} status="shipped" createdAt="Jun 15, 2024" href="/orders/a9331769" titleLevel={2} onTrack={vi.fn()} />
      </MitumbaThemeProvider>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
