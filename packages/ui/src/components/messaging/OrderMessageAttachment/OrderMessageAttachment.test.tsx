// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { OrderMessageAttachment } from './OrderMessageAttachment'

afterEach(cleanup)

const props = {
  orderId: 'ord_abc123',
  orderShortId: 'a9331769',
  listingTitle: "Levi's 501 Straight",
  listingImageUrl: 'https://placehold.co/96x96',
  amount: 1500,
  status: 'Shipped',
  createdAt: '2024-01-15',
}

function renderAttachment(overrides: Partial<typeof props> = {}) {
  const merged = { ...props, ...overrides }
  return render(
    <MitumbaThemeProvider>
      <OrderMessageAttachment
        orderId={merged.orderId}
        orderShortId={merged.orderShortId}
        listingTitle={merged.listingTitle}
        listingImageUrl={merged.listingImageUrl}
        amount={merged.amount}
        status={merged.status}
        createdAt={merged.createdAt}
      />
    </MitumbaThemeProvider>,
  )
}

describe('OrderMessageAttachment', () => {
  it('renders order short ID', () => {
    renderAttachment()
    expect(screen.getByText('Order #a9331769')).toBeInTheDocument()
  })

  it('renders listing title', () => {
    renderAttachment()
    expect(screen.getByText("Levi's 501 Straight")).toBeInTheDocument()
  })

  it('renders amount and status', () => {
    renderAttachment()
    expect(screen.getByText('KES 1,500 · Shipped')).toBeInTheDocument()
  })

  it('renders image when provided', () => {
    renderAttachment()
    expect(screen.getByAltText("Levi's 501 Straight")).toBeInTheDocument()
  })

  it('renders without image when null', () => {
    renderAttachment({ listingImageUrl: null })
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
