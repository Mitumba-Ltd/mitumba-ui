// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { EscrowStatusBanner } from './EscrowStatusBanner'
import type { EscrowStatusBannerProps } from './EscrowStatusBanner.types'

const defaultProps: EscrowStatusBannerProps = {
  status: 'FUNDED',
  amountKes: 5000,
}

function renderBanner(props: Partial<EscrowStatusBannerProps> = {}) {
  const merged = { ...defaultProps, ...props }
  return render(
    <MitumbaThemeProvider>
      <EscrowStatusBanner 
        status={merged.status}
        amountKes={merged.amountKes}
        hoursRemaining={merged.hoursRemaining}
        onConfirmDelivery={merged.onConfirmDelivery}
        onRaiseDispute={merged.onRaiseDispute}
        sx={merged.sx}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(cleanup)

describe('EscrowStatusBanner', () => {
  it('renders funded status correctly', () => {
    renderBanner({ status: 'FUNDED', amountKes: 12000 })
    expect(screen.getByText(/Payment in Escrow/i)).toBeInTheDocument()
    expect(screen.getByText(/12,000/i)).toBeInTheDocument()
  })

  it('renders shipped status correctly', () => {
    renderBanner({ status: 'SHIPPED' })
    expect(screen.getByText(/Item Shipped/i)).toBeInTheDocument()
  })

  it('renders timeout warning correctly', () => {
    renderBanner({ status: 'TIMEOUT_WARNING', hoursRemaining: 12 })
    expect(screen.getByText(/Action Required/i)).toBeInTheDocument()
    expect(screen.getByText(/12 hours/i)).toBeInTheDocument()
  })

  it('renders released status correctly', () => {
    renderBanner({ status: 'RELEASED' })
    expect(screen.getByText(/Payment Released/i)).toBeInTheDocument()
  })

  it('renders refunded status correctly', () => {
    renderBanner({ status: 'REFUNDED', amountKes: 4500 })
    expect(screen.getByText(/Payment Refunded/i)).toBeInTheDocument()
    expect(screen.getByText(/4,500/i)).toBeInTheDocument()
  })
})
