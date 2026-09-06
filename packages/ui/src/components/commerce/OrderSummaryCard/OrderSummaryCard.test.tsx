// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { OrderSummaryCard } from './OrderSummaryCard'
import type { HeadingLevel } from '../../../types/semantic'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

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
          titleLevel={merged.titleLevel}
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

  it('exposes the summary as a labelled region', () => {
    renderCard()
    expect(screen.getByRole('region', { name: 'Order Summary' })).toBeInTheDocument()
  })

  it('uses monetary term/value pairs (dt/dd)', () => {
    renderCard()
    expect(screen.getByText('Subtotal').tagName).toBe('DT')
    expect(screen.getByText('KES 4,500').tagName).toBe('DD')
    expect(screen.getByText('Total').tagName).toBe('DT')
    expect(screen.getByText('KES 4,850').tagName).toBe('DD')
  })

  it('omits titleLevel by default, rendering a non-heading title element', () => {
    renderCard()
    expect(screen.getByText('Order Summary').tagName).toBe('P')
  })

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])('emits an h%s element when titleLevel is set', (level) => {
    renderCard({ titleLevel: level })
    expect(screen.getByText('Order Summary').tagName).toBe(`H${level}`)
  })

  it('inherits the host theme typography.fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <OrderSummaryCard items={[{ label: 'Subtotal', amountKes: 4500 }]} totalKes={4500} titleLevel={2} />
      </ThemeProvider>,
    )
    expect(screen.getByText('Order Summary').style.fontFamily).toBe('')
    screen.getAllByText('KES 4,500').forEach((node) => {
      expect(node.style.fontFamily).toBe('')
    })
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <OrderSummaryCard
          items={[{ label: 'Subtotal', amountKes: 4500 }, { label: 'Promo', amountKes: 500, isDiscount: true }]}
          totalKes={4000}
          titleLevel={2}
          onAction={vi.fn()}
          trustLine="Secure Checkout"
        />
      </MitumbaThemeProvider>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
