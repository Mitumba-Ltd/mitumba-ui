// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { StatsCard } from './StatsCard'
import type { StatsCardProps } from './StatsCard.types'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

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

  it('uses description-list term/value semantics, not headings', () => {
    renderStatsCard({ label: 'TOTAL SALES', value: '142,500' })
    const term = screen.getByText('TOTAL SALES')
    const value = screen.getByText('142,500')
    expect(term.tagName).toBe('DT')
    // value is wrapped in a <dd>; the number text sits in a span inside it
    expect(value.closest('dd')).not.toBeNull()
    // No false headings anywhere in the card
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('uses dt/dd for the compact variant too', () => {
    renderStatsCard({ label: 'Orders', value: '42', variant: 'compact' })
    expect(screen.getByText('Orders').tagName).toBe('DT')
    expect(screen.getByText('42').tagName).toBe('DD')
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('inherits the host theme typography.fontFamily (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <StatsCard label="TOTAL SALES" value="142,500" />
      </ThemeProvider>,
    )
    expect(screen.getByText('TOTAL SALES').style.fontFamily).toBe('')
    expect(screen.getByText('142,500').style.fontFamily).toBe('')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <StatsCard label="Total Sales" value="142,500" unit="KES" unitPosition="prefix" trend={{ direction: 'up', percent: 12 }} />
      </MitumbaThemeProvider>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
