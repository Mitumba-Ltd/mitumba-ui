// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { OrderStatusTimeline } from './OrderStatusTimeline'
import type { OrderEvent, OrderStatusTimelineProps } from './OrderStatusTimeline.types'

const baseEvents: OrderEvent[] = [
  { status: 'CREATED', timestamp: 'Jan 1' },
  { status: 'PAID', timestamp: 'Jan 1' },
  { status: 'SHIPPED', timestamp: 'Jan 2', note: 'Tracking: KE123' },
]

function renderTimeline(props: Partial<OrderStatusTimelineProps> = {}) {
  return render(
    <MitumbaThemeProvider>
      <OrderStatusTimeline
        currentStatus={props.currentStatus ?? 'SHIPPED'}
        events={props.events ?? baseEvents}
        orientation={props.orientation}
        compact={props.compact}
        estimatedDelivery={props.estimatedDelivery}
        title={props.title}
        bare={props.bare}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(cleanup)

describe('OrderStatusTimeline', () => {
  it('renders title and current status badge', () => {
    renderTimeline()
    expect(screen.getByText('Order Tracking')).toBeInTheDocument()
    expect(screen.getAllByText('Shipped').length).toBeGreaterThanOrEqual(1)
  })

  it('renders all happy path status labels', () => {
    renderTimeline()
    expect(screen.getByText('Order Placed')).toBeInTheDocument()
    expect(screen.getByText('Payment Confirmed')).toBeInTheDocument()
    expect(screen.getByText('Delivered')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })

  it('displays event notes', () => {
    renderTimeline()
    expect(screen.getByText('Tracking: KE123')).toBeInTheDocument()
  })

  it('displays timestamps', () => {
    renderTimeline()
    expect(screen.getByText('Jan 2')).toBeInTheDocument()
  })

  it('renders cancelled terminal state', () => {
    renderTimeline({
      currentStatus: 'CANCELLED',
      events: [
        { status: 'CREATED', timestamp: 'Jan 1' },
        { status: 'CANCELLED', timestamp: 'Jan 2', note: 'Out of stock' },
      ],
    })
    expect(screen.getAllByText('Cancelled').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Out of stock')).toBeInTheDocument()
  })

  it('renders disputed terminal state', () => {
    renderTimeline({
      currentStatus: 'DISPUTED',
      events: [
        { status: 'CREATED', timestamp: 'Jan 1' },
        { status: 'DISPUTED', timestamp: 'Jan 3', note: 'Not as described' },
      ],
    })
    expect(screen.getAllByText('Disputed').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Not as described')).toBeInTheDocument()
  })

  it('hides timestamps and notes in compact mode', () => {
    renderTimeline({ compact: true })
    expect(screen.queryByText('Jan 2')).not.toBeInTheDocument()
    expect(screen.queryByText('Tracking: KE123')).not.toBeInTheDocument()
  })

  it('renders custom title', () => {
    renderTimeline({ title: 'Delivery Progress' })
    expect(screen.getByText('Delivery Progress')).toBeInTheDocument()
  })

  it('shows estimated delivery for pending delivered step', () => {
    renderTimeline({ currentStatus: 'SHIPPED', estimatedDelivery: 'Jan 5' })
    expect(screen.getByText('Est. Jan 5')).toBeInTheDocument()
  })

  it('renders horizontal orientation', () => {
    const { container } = renderTimeline({ orientation: 'horizontal' })
    const list = container.querySelector('ol')
    expect(list).toHaveStyle({ flexDirection: 'row' })
  })

  it('has accessible list role', () => {
    renderTimeline()
    expect(screen.getByRole('list', { name: /order status timeline/i })).toBeInTheDocument()
  })
})
