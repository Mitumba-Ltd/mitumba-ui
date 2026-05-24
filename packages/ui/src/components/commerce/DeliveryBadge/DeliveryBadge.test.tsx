// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import type { DeliveryBadgeProps } from './DeliveryBadge.types'
import { DeliveryBadge } from './DeliveryBadge'

function renderBadge(overrides: DeliveryBadgeProps = { type: 'same-city' }) {
  return render(
    <MitumbaThemeProvider>
      <DeliveryBadge type={overrides.type} estimatedDays={overrides.estimatedDays} feeKes={overrides.feeKes} />
    </MitumbaThemeProvider>
  )
}

afterEach(() => {
  cleanup()
})

describe('DeliveryBadge', () => {
  it('renders same-city label', () => {
    renderBadge()
    expect(screen.getByText('Delivery today')).toBeInTheDocument()
  })

  it('renders intercity label with estimated days', () => {
    renderBadge({ type: 'intercity', estimatedDays: '3-5 days' })
    expect(screen.getByText('3-5 days')).toBeInTheDocument()
  })

  it('renders fee when provided', () => {
    renderBadge({ type: 'intercity', feeKes: 299 })
    expect(screen.getByText('· KES 299')).toBeInTheDocument()
  })
})
