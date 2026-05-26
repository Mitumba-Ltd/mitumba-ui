// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { DeliveryBadge } from './DeliveryBadge'
import type { DeliveryBadgeProps } from './DeliveryBadge.types'

function renderBadge(customProps: Partial<DeliveryBadgeProps> = {}) {
  const merged: DeliveryBadgeProps = {
    type: 'same-city',
    estimatedDays: 'Delivery today',
    ...customProps,
  }
  return render(
    <MitumbaThemeProvider>
      <DeliveryBadge 
        type={merged.type}
        estimatedDays={merged.estimatedDays}
        feeKes={merged.feeKes}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(cleanup)

describe('DeliveryBadge', () => {
  it('renders same-city label', () => {
    renderBadge({ type: 'same-city', estimatedDays: 'Delivery today' })
    expect(screen.getByText(/Delivery today/i)).toBeInTheDocument()
  })

  it('renders intercity label with estimated days', () => {
    renderBadge({ type: 'intercity', estimatedDays: '3–5 business days' })
    expect(screen.getByText(/3–5 business days/i)).toBeInTheDocument()
  })

  it('renders fee when provided', () => {
    renderBadge({ type: 'intercity', feeKes: 299, estimatedDays: 'KES 299' })
    expect(screen.getByText(/KES 299/i)).toBeInTheDocument()
  })
})
