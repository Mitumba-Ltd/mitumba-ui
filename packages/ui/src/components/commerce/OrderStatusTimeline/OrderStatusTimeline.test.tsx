// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { OrderStatusTimeline } from './OrderStatusTimeline'
import type { OrderEvent } from './OrderStatusTimeline.types'

function renderTimeline(overrides: Record<string, unknown> = {}) {
  const events: OrderEvent[] = [
    { status: 'CREATED', timestamp: '2024-01-01' },
    { status: 'PAID', timestamp: '2024-01-02' },
    { status: 'SHIPPED', timestamp: '2024-01-03' },
  ]
  return render(
    <MitumbaThemeProvider>
      <OrderStatusTimeline
        currentStatus={overrides.currentStatus as 'SHIPPED'}
        events={overrides.events as OrderEvent[] ?? events}
      />
    </MitumbaThemeProvider>
  )
}

afterEach(() => {
  cleanup()
})

describe('OrderStatusTimeline', () => {
  it('renders current status label', () => {
    renderTimeline()
    expect(screen.getByText('Shipped')).toBeInTheDocument()
  })

  it('renders all status labels', () => {
    renderTimeline()
    expect(screen.getByText('Order Created')).toBeInTheDocument()
    expect(screen.getByText('Paid')).toBeInTheDocument()
    expect(screen.getByText('Shipped')).toBeInTheDocument()
    expect(screen.getByText('Delivered')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })

  it('renders last event note', () => {
    renderTimeline({
      events: [
        { status: 'SHIPPED', timestamp: '2024-01-03', note: 'Out for delivery' },
      ],
    })
    expect(screen.getByText(/"Out for delivery"/i)).toBeInTheDocument()
  })
})
