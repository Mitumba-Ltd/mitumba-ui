// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { OrderMessageAttachment } from './OrderMessageAttachment'
import type { OrderMessageAttachmentProps } from './OrderMessageAttachment.types'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

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

function renderAttachment(overrides: Partial<OrderMessageAttachmentProps> = {}) {
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

  it('inherits the host theme typography.fontFamily (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <OrderMessageAttachment
          orderId="ord_abc123"
          orderShortId="a9331769"
          listingTitle="Levi's 501 Straight"
          listingImageUrl={null}
          amount={1500}
          status="Shipped"
          createdAt="2024-01-15"
        />
      </ThemeProvider>,
    )
    expect(screen.getByText('Order #a9331769').style.fontFamily).toBe('')
    expect(screen.getByText("Levi's 501 Straight").style.fontFamily).toBe('')
  })

  it('has no axe violations', async () => {
    const { container } = renderAttachment()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
