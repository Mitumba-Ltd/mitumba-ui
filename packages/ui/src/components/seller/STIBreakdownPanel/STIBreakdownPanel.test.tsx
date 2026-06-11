// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import type { STIEvent } from './STIBreakdownPanel.types'
import { STIBreakdownPanel } from './STIBreakdownPanel'

function renderPanel(overrides: {
  score?: number
  fulfillmentRate?: number
  accuracyRate?: number
  avgResponseHours?: number
  daysActive?: number
  recentEvents?: STIEvent[]
} = {}) {
  return render(
    <MitumbaThemeProvider>
      <STIBreakdownPanel
        score={overrides.score ?? 85}
        fulfillmentRate={overrides.fulfillmentRate ?? 0.95}
        accuracyRate={overrides.accuracyRate ?? 0.88}
        avgResponseHours={overrides.avgResponseHours ?? 2}
        daysActive={overrides.daysActive ?? 180}
        recentEvents={overrides.recentEvents ?? []}
      />
    </MitumbaThemeProvider>
  )
}

afterEach(() => { cleanup() })

describe('STIBreakdownPanel', () => {
  it('renders score and status label', () => {
    renderPanel()
    expect(screen.getByText('85')).toBeInTheDocument()
    expect(screen.getByText('Trusted')).toBeInTheDocument()
  })

  it('renders factor labels', () => {
    renderPanel()
    expect(screen.getByText('Order fulfillment')).toBeInTheDocument()
    expect(screen.getByText('Listing accuracy')).toBeInTheDocument()
    expect(screen.getByText('Avg. response time')).toBeInTheDocument()
    expect(screen.getByText('Days active')).toBeInTheDocument()
  })

  it('renders factor values', () => {
    renderPanel()
    expect(screen.getByText('95%')).toBeInTheDocument()
    expect(screen.getByText('88%')).toBeInTheDocument()
    expect(screen.getByText('2h')).toBeInTheDocument()
    expect(screen.getByText('180')).toBeInTheDocument()
  })

  it('renders recent events', () => {
    renderPanel({
      recentEvents: [
        { type: 'positive', reason: 'Fast shipping', pointsChange: 5, timestamp: '2 hours ago' },
        { type: 'penalty', reason: 'Late delivery', pointsChange: -3, timestamp: '1 day ago' },
      ],
    })
    expect(screen.getByText('Fast shipping')).toBeInTheDocument()
    expect(screen.getByText('+5')).toBeInTheDocument()
    expect(screen.getByText('Late delivery')).toBeInTheDocument()
    expect(screen.getByText('-3')).toBeInTheDocument()
  })

  it('does not show events section when empty', () => {
    renderPanel({ recentEvents: [] })
    expect(screen.queryByText('Recent activity')).not.toBeInTheDocument()
  })
})
