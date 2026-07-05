// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { OrderSummaryCard } from './OrderSummaryCard'

afterEach(cleanup)

function renderCard(props: Partial<Parameters<typeof OrderSummaryCard>[0]> = {}) {
  const defaults = {
    items: [
      { label: 'Subtotal', amountKes: 4500 },
      { label: 'Delivery', amountKes: 350 },
    ],
    totalKes: 4850,
    onAction: vi.fn(),
  }
  const merged = { ...defaults, ...props }
  return {
    onAction: merged.onAction,
    ...render(
      <MitumbaThemeProvider>
        <OrderSummaryCard
          items={merged.items}
          totalKes={merged.totalKes}
          actionLabel={merged.actionLabel}
          onAction={merged.onAction}
          loading={merged.loading}
          disabled={merged.disabled}
          trustLine={merged.trustLine}
        />
      </MitumbaThemeProvider>,
    ),
  }
}

describe('OrderSummaryCard', () => {
  it('renders title', () => {
    renderCard()
    expect(screen.getByText('Order Summary')).toBeInTheDocument()
  })

  it('renders line items', () => {
    renderCard()
    expect(screen.getByText('Subtotal')).toBeInTheDocument()
    expect(screen.getByText('KES 4,500')).toBeInTheDocument()
    expect(screen.getByText('Delivery')).toBeInTheDocument()
    expect(screen.getByText('KES 350')).toBeInTheDocument()
  })

  it('renders total', () => {
    renderCard()
    expect(screen.getByText('KES 4,850')).toBeInTheDocument()
  })

  it('renders checkout button', () => {
    renderCard()
    expect(screen.getByRole('button', { name: /checkout/i })).toBeInTheDocument()
  })

  it('calls onAction when button clicked', () => {
    const { onAction } = renderCard()
    fireEvent.click(screen.getByRole('button', { name: /checkout/i }))
    expect(onAction).toHaveBeenCalled()
  })

  it('renders trust line', () => {
    renderCard({ trustLine: 'Secure Checkout' })
    expect(screen.getByText('Secure Checkout')).toBeInTheDocument()
  })

  it('shows discount with minus sign', () => {
    renderCard({ items: [{ label: 'Promo', amountKes: 500, isDiscount: true }], totalKes: 500 })
    expect(screen.getByText('−KES 500')).toBeInTheDocument()
  })
})
