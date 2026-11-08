// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaFormatProvider } from '../../../format'
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
        amount={merged.amount ?? merged.amountKes ?? 0}
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

  it('keeps the exact default wording for funded and refunded', () => {
    const { unmount } = renderBanner({ status: 'FUNDED', amountKes: 12000 })
    expect(screen.getByText("KES 12,000 is securely held. We'll release it once you confirm delivery.")).toBeInTheDocument()
    unmount()
    renderBanner({ status: 'REFUNDED', amountKes: 4500 })
    expect(screen.getByText('The escrow has been cancelled and KES 4,500 has been returned to your wallet.')).toBeInTheDocument()
  })

  it('accepts the neutral amount prop and formats in the provider currency', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaFormatProvider money={{ currencyCode: 'UGX', locale: 'en-UG' }}>
          <EscrowStatusBanner status="FUNDED" amount={5000} />
        </MitumbaFormatProvider>
      </MitumbaThemeProvider>,
    )
    expect(screen.getByText(/UGX 5,000 is securely held/)).toBeInTheDocument()
    expect(screen.queryByText(/KES/)).not.toBeInTheDocument()
  })

  it('prefers amount over amountKes', () => {
    render(
      <MitumbaThemeProvider>
        <EscrowStatusBanner status="FUNDED" amount={7000} amountKes={5000} />
      </MitumbaThemeProvider>,
    )
    expect(screen.getByText(/KES 7,000 is securely held/)).toBeInTheDocument()
  })
})
