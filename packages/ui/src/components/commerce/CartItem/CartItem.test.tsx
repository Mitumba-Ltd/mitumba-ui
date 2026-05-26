// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { CartItem } from './CartItem'
import type { CartItemProps } from './CartItem.types'

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

  it('calls onRemove when remove button is clicked', () => {
    const onRemove = vi.fn()
    renderCartItem({ onRemove })

    fireEvent.click(screen.getByRole('button'))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('renders custom metadata correctly', () => {
    renderCartItem({ size: 'S', quantity: 3 })
    
    // Selects render values, so they should be in the document
    expect(screen.getByText('S')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})
