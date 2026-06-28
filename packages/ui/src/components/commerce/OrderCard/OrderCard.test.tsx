// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { OrderCard } from './OrderCard'

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

  it('calls onClick when clicked', () => {
    const { onClick } = renderCard()
    fireEvent.click(screen.getByText("Levi's 501 Straight"))
    expect(onClick).toHaveBeenCalled()
  })
})
