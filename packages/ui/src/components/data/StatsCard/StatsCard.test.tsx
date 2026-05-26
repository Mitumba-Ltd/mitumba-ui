// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { StatsCard } from './StatsCard'
import type { StatsCardProps } from './StatsCard.types'

function renderStatsCard(props: StatsCardProps) {
  return render(
    <MitumbaThemeProvider>
      <StatsCard 
        label={props.label}
        value={props.value}
        unit={props.unit}
        unitPosition={props.unitPosition}
        trend={props.trend}
        icon={props.icon}
        variant={props.variant}
        color={props.color}
        sx={props.sx}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(cleanup)

describe('StatsCard', () => {
  it('renders label and value', () => {
    renderStatsCard({
      label: 'TOTAL SALES',
      value: '142,500',
    })

    expect(screen.getByText('TOTAL SALES')).toBeInTheDocument()
    expect(screen.getByText('142,500')).toBeInTheDocument()
  })

  it('renders unit correctly', () => {
    renderStatsCard({
      label: 'Price',
      value: '100',
      unit: 'KES',
      unitPosition: 'prefix',
    })

    expect(screen.getByText('KES')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('renders trend information', () => {
    renderStatsCard({
      label: 'Growth',
      value: '20',
      trend: { direction: 'up', percent: 5, label: 'vs last week' },
    })

    expect(screen.getByText('5%')).toBeInTheDocument()
    expect(screen.getByText('vs last week')).toBeInTheDocument()
  })

  it('supports glass variant', () => {
    renderStatsCard({
      label: 'Glass',
      value: '99',
      variant: 'glass',
    })

    expect(screen.getByText('Glass')).toBeInTheDocument()
  })
})
