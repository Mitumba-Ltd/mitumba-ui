// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { EscrowStatusBanner } from './EscrowStatusBanner'
import type { EscrowStatusBannerProps } from './EscrowStatusBanner.types'

const defaultProps: EscrowStatusBannerProps = {
  status: 'SHIPPED',
}

function renderBanner(overrides: Partial<EscrowStatusBannerProps> = {}) {
  const props = { ...defaultProps, ...overrides }
  return render(
    <MitumbaThemeProvider>
      <EscrowStatusBanner
        status={props.status}
        hoursRemaining={props.hoursRemaining}
        onConfirmDelivery={props.onConfirmDelivery}
        onRaiseDispute={props.onRaiseDispute}
      />
    </MitumbaThemeProvider>
  )
}

afterEach(() => {
  cleanup()
})

describe('EscrowStatusBanner', () => {
  it('renders status label', () => {
    renderBanner({ status: 'FUNDED' })
    expect(screen.getByText('Payment in Escrow')).toBeInTheDocument()
  })

  it('renders status message', () => {
    renderBanner({ status: 'SHIPPED' })
    expect(screen.getByText('Your item is on the way. Confirm delivery once received.')).toBeInTheDocument()
  })

  it('shows confirm delivery button when provided', () => {
    const onConfirm = vi.fn()
    renderBanner({ status: 'SHIPPED', onConfirmDelivery: onConfirm })
    const button = screen.getByRole('button', { name: /Confirm Delivery/i })
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('shows raise dispute button when provided', () => {
    const onDispute = vi.fn()
    renderBanner({ status: 'SHIPPED', onRaiseDispute: onDispute })
    const button = screen.getByRole('button', { name: /Raise Dispute/i })
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(onDispute).toHaveBeenCalledTimes(1)
  })

  it('shows hours remaining for TIMEOUT_WARNING', () => {
    renderBanner({ status: 'TIMEOUT_WARNING', hoursRemaining: 12 })
    expect(screen.getByText('12 hours remaining')).toBeInTheDocument()
  })

  it('shows singular hour when 1 remaining', () => {
    renderBanner({ status: 'TIMEOUT_WARNING', hoursRemaining: 1 })
    expect(screen.getByText('1 hour remaining')).toBeInTheDocument()
  })

  it('does not show action buttons when neither action is provided', () => {
    renderBanner({ status: 'RELEASED' })
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
