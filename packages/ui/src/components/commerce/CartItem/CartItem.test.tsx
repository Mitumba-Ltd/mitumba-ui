// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { CartItem } from './CartItem'

function renderCartItem(overrides: Record<string, unknown> = {}) {
  return render(
    <MitumbaThemeProvider>
      <CartItem
        imageUrl="https://example.com/shirt.jpg"
        title="Vintage Shirt"
        priceKes={2500}
        conditionGrade="A"
        sellerName="Jane's Closet"
        onRemove={overrides.onRemove as (() => void) | undefined}
      />
    </MitumbaThemeProvider>
  )
}

afterEach(() => {
  cleanup()
})

describe('CartItem', () => {
  it('renders title', () => {
    renderCartItem()
    expect(screen.getByText('Vintage Shirt')).toBeInTheDocument()
  })

  it('renders price', () => {
    renderCartItem()
    expect(screen.getByText('KES 2,500')).toBeInTheDocument()
  })

  it('renders condition label', () => {
    renderCartItem()
    expect(screen.getByText('Like new')).toBeInTheDocument()
  })

  it('renders seller name', () => {
    renderCartItem()
    expect(screen.getByText('Sold by Jane\'s Closet')).toBeInTheDocument()
  })

  it('calls onRemove when clicked', () => {
    const onRemove = vi.fn()
    renderCartItem({ onRemove })
    fireEvent.click(screen.getByRole('button', { name: /Remove/i }))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('does not show remove button when onRemove is not provided', () => {
    renderCartItem()
    expect(screen.queryByRole('button', { name: /Remove/i })).not.toBeInTheDocument()
  })
})
