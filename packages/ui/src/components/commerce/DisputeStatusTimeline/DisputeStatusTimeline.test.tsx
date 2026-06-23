// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { DisputeStatusTimeline } from './DisputeStatusTimeline'
import type { DisputeEvent, DisputeStatusTimelineProps } from './DisputeStatusTimeline.types'

const baseEvents: DisputeEvent[] = [
  { actor_role: 'buyer', action: 'Opened dispute', new_status: 'open', note: 'Wrong size received', created_at: 'Jun 20 at 3:15 PM' },
  { actor_role: 'seller', action: 'Responded', new_status: 'seller_responded', note: null, created_at: 'Jun 21 at 10:00 AM' },
]

function renderTimeline(props: Partial<DisputeStatusTimelineProps> = {}) {
  return render(
    <MitumbaThemeProvider>
      <DisputeStatusTimeline status={props.status ?? 'open'} events={props.events ?? baseEvents} />
    </MitumbaThemeProvider>,
  )
}

afterEach(cleanup)

describe('DisputeStatusTimeline', () => {
  it('renders status chip', () => {
    renderTimeline()
    expect(screen.getByTestId('dispute-status-chip')).toHaveTextContent('Open')
  })

  it('renders event actions', () => {
    renderTimeline()
    expect(screen.getByText('Opened dispute')).toBeInTheDocument()
    expect(screen.getByText('Responded')).toBeInTheDocument()
  })

  it('renders actor badges', () => {
    renderTimeline()
    const badges = screen.getAllByTestId('actor-badge')
    expect(badges[0]).toHaveTextContent('buyer')
    expect(badges[1]).toHaveTextContent('seller')
  })

  it('renders notes', () => {
    renderTimeline()
    expect(screen.getByText('Wrong size received')).toBeInTheDocument()
  })

  it('renders timestamps', () => {
    renderTimeline()
    expect(screen.getByText('Jun 20 at 3:15 PM')).toBeInTheDocument()
    expect(screen.getByText('Jun 21 at 10:00 AM')).toBeInTheDocument()
  })
})
