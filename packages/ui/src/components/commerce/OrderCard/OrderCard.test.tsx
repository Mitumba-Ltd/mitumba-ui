// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { MitumbaFormatProvider } from '../../../format'
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

  it('accepts the neutral total and deliveryFee props', () => {
    render(
      <MitumbaThemeProvider>
        <OrderCard orderShortId="a9331769" title="Levi's 501" total={2500} deliveryFee={200} status="shipped" createdAt="Jun 15, 2024" />
      </MitumbaThemeProvider>,
    )
    expect(screen.getByText('KES 2,500')).toBeInTheDocument()
    expect(screen.getByText('+KES 200 delivery')).toBeInTheDocument()
  })

  it('prefers the neutral names when both are set', () => {
    render(
      <MitumbaThemeProvider>
        <OrderCard orderShortId="a9331769" title="Levi's 501" total={3000} totalKes={2500} deliveryFee={300} deliveryFeeKes={200} status="shipped" createdAt="Jun 15, 2024" />
      </MitumbaThemeProvider>,
    )
    expect(screen.getByText('KES 3,000')).toBeInTheDocument()
    expect(screen.getByText('+KES 300 delivery')).toBeInTheDocument()
  })

  it('formats the total and delivery fee in the provider currency', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaFormatProvider money={{ currencyCode: 'UGX', locale: 'en-UG' }}>
          <OrderCard orderShortId="a9331769" title="Levi's 501" total={5000} deliveryFee={1000} status="shipped" createdAt="Jun 15, 2024" />
        </MitumbaFormatProvider>
      </MitumbaThemeProvider>,
    )
    expect(screen.getByText('UGX 5,000')).toBeInTheDocument()
    expect(screen.getByText('+UGX 1,000 delivery')).toBeInTheDocument()
    expect(screen.queryByText(/KES/)).not.toBeInTheDocument()
  })

  it('omits the delivery line when no fee is given', () => {
    render(
      <MitumbaThemeProvider>
        <OrderCard orderShortId="a9331769" title="Levi's 501" total={2500} status="shipped" createdAt="Jun 15, 2024" />
      </MitumbaThemeProvider>,
    )
    expect(screen.queryByText(/delivery$/)).not.toBeInTheDocument()
  })

  it.each(['pending', 'paid', 'confirmed', 'delivered', 'completed', 'cancelled', 'disputed'] as const)(
    'offers no Track action on a %s order, even with onTrack',
    (status) => {
      render(
        <MitumbaThemeProvider>
          <OrderCard orderShortId="a9331769" title="Levi's 501" total={2500} status={status} createdAt="Jun 15, 2024" href="/orders/a9331769" onTrack={vi.fn()} />
        </MitumbaThemeProvider>,
      )
      expect(screen.queryByRole('button', { name: /Track/ })).not.toBeInTheDocument()
    },
  )

  it('offers no Track action without onTrack', () => {
    renderCard()
    expect(screen.queryByRole('button', { name: /Track/ })).not.toBeInTheDocument()
  })

  it('stacks up to four item photos, the first on top and the only one described', () => {
    const images = ['/p1.jpg', '/p2.jpg', '/p3.jpg', '/p4.jpg', '/p5.jpg']
    render(
      <MitumbaThemeProvider>
        <OrderCard orderShortId="a9331769" title="Denim jacket" images={images} imageUrl="/ignored.jpg" itemCount={6} total={2500} status="paid" createdAt="Jun 15, 2024" />
      </MitumbaThemeProvider>,
    )
    const layers = screen.getAllByTestId('order-card-photo')
    expect(layers).toHaveLength(4)
    expect(screen.getByRole('img', { name: 'Denim jacket' })).toHaveAttribute('src', '/p1.jpg')
    expect(screen.getAllByRole('presentation')).toHaveLength(3)
    expect(document.querySelector('img[src="/ignored.jpg"]')).toBeNull()
    expect(screen.getByText('6 items')).toBeInTheDocument()
  })

  it('falls back to imageUrl when images is empty, and names no count for one item', () => {
    render(
      <MitumbaThemeProvider>
        <OrderCard orderShortId="a9331769" title="Denim jacket" images={[]} imageUrl="/one.jpg" itemCount={1} total={2500} status="paid" createdAt="Jun 15, 2024" />
      </MitumbaThemeProvider>,
    )
    expect(screen.getAllByTestId('order-card-photo')).toHaveLength(1)
    expect(screen.getByRole('img', { name: 'Denim jacket' })).toHaveAttribute('src', '/one.jpg')
    expect(screen.queryByText(/items$/)).not.toBeInTheDocument()
  })

  it('draws no photo area without images, and shows a photo once it loads or hides one that fails', () => {
    const { unmount } = render(
      <MitumbaThemeProvider>
        <OrderCard orderShortId="a9331769" title="Denim jacket" total={2500} status="paid" createdAt="Jun 15, 2024" />
      </MitumbaThemeProvider>,
    )
    expect(screen.queryByTestId('order-card-photo')).not.toBeInTheDocument()
    unmount()

    render(
      <MitumbaThemeProvider>
        <OrderCard orderShortId="a9331769" title="Denim jacket" images={['/ok.jpg', '/broken.jpg']} total={2500} status="paid" createdAt="Jun 15, 2024" />
      </MitumbaThemeProvider>,
    )
    const top = screen.getByRole('img', { name: 'Denim jacket' })
    fireEvent.load(top)
    expect(top).toHaveStyle({ opacity: '1' })
    const broken = document.querySelector('img[src="/broken.jpg"]')!
    fireEvent.error(broken)
    expect(document.querySelector('img[src="/broken.jpg"]')).toBeNull()
  })

  it('has no axe violations with a stack of photos', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <OrderCard orderShortId="a9331769" title="Denim jacket" images={['/p1.jpg', '/p2.jpg', '/p3.jpg']} itemCount={3} total={2500} status="paid" createdAt="Jun 15, 2024" href="/orders/a9331769" titleLevel={2} />
      </MitumbaThemeProvider>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
