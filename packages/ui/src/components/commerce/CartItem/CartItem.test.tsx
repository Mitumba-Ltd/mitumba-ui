// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { CartItem } from './CartItem'
import type { CartItemProps } from './CartItem.types'
import type { HeadingLevel } from '../../../types/semantic'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

const sampleProps: CartItemProps = {
  id: '1',
  imageUrl: 'https://test.com/image.jpg',
  title: 'ARTICLE 42453',
  subtitle: 'COLOR GREEN',
  status: 'IN STOCK',
  priceKes: 45000,
  size: 'XL',
  quantity: 1,
}

function renderCartItem(props: Partial<CartItemProps> = {}) {
  const merged = { ...sampleProps, ...props }
  return render(
    <MitumbaThemeProvider>
      <CartItem 
        id={merged.id}
        imageUrl={merged.imageUrl}
        title={merged.title}
        subtitle={merged.subtitle}
        status={merged.status}
        priceKes={merged.priceKes}
        size={merged.size}
        quantity={merged.quantity}
        onRemove={merged.onRemove}
        onQuantityChange={merged.onQuantityChange}
        onSizeChange={merged.onSizeChange}
        sx={merged.sx}
        titleLevel={merged.titleLevel}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(cleanup)

describe('CartItem', () => {
  it('renders product information', () => {
    renderCartItem()

    expect(screen.getByText('ARTICLE 42453')).toBeInTheDocument()
    expect(screen.getByText('COLOR GREEN')).toBeInTheDocument()
    expect(screen.getByText('IN STOCK')).toBeInTheDocument()
    expect(screen.getByText(/45,000/)).toBeInTheDocument()
  })

  it('calls onRemove when the named remove button is clicked', () => {
    const onRemove = vi.fn()
    renderCartItem({ onRemove })

    fireEvent.click(screen.getByRole('button', { name: 'Remove ARTICLE 42453 from cart' }))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('renders custom metadata correctly', () => {
    renderCartItem({ size: 'S', quantity: 3 })

    // Selects render values, so they should be in the document
    expect(screen.getByText('S')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('labels the size and quantity controls per item', () => {
    renderCartItem()
    expect(screen.getByRole('group', { name: 'Size for ARTICLE 42453' })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Quantity for ARTICLE 42453' })).toBeInTheDocument()
  })

  it('exposes the availability status via role=status', () => {
    renderCartItem()
    expect(screen.getByRole('status')).toHaveTextContent('IN STOCK')
  })

  it('omits titleLevel by default, rendering a non-heading title element', () => {
    renderCartItem()
    expect(screen.getByText('ARTICLE 42453').tagName).toBe('P')
  })

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])('emits an h%s element when titleLevel is set', (level) => {
    renderCartItem({ titleLevel: level })
    expect(screen.getByText('ARTICLE 42453').tagName).toBe(`H${level}`)
  })

  it('inherits the host theme typography.fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <CartItem id="1" imageUrl="/i.jpg" title="ARTICLE 42453" priceKes={45000} titleLevel={2} />
      </ThemeProvider>,
    )
    expect(screen.getByText('ARTICLE 42453').style.fontFamily).toBe('')
    expect(screen.getByText(/45,000/).style.fontFamily).toBe('')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <CartItem id="1" imageUrl="/i.jpg" title="ARTICLE 42453" subtitle="COLOR GREEN" priceKes={45000} titleLevel={2} onRemove={vi.fn()} onQuantityChange={vi.fn()} onSizeChange={vi.fn()} availableSizes={['S', 'M', 'XL']} />
      </MitumbaThemeProvider>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
