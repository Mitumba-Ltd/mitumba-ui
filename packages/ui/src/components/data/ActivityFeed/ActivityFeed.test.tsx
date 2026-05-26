// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { ActivityFeed } from './ActivityFeed'
import type { ActivityEvent } from './ActivityFeed.types'

const sampleEvents: ActivityEvent[] = [
  { id: '1', type: 'order', title: 'New Order', timestamp: 'Just now' },
  { id: '2', type: 'review', title: 'New Review', timestamp: '1h ago' },
]

function renderActivityFeed(events: ActivityEvent[] = sampleEvents, loading = false) {
  return render(
    <MitumbaThemeProvider>
      <ActivityFeed events={events} loading={loading} />
    </MitumbaThemeProvider>,
  )
}

afterEach(cleanup)

describe('ActivityFeed', () => {
  it('renders a list of activity events', () => {
    renderActivityFeed()

    expect(screen.getByText('New Order')).toBeInTheDocument()
    expect(screen.getByText('New Review')).toBeInTheDocument()
  })

  it('renders loading skeletons when loading is true', () => {
    renderActivityFeed([], true)

    // Skeletons from MitumbaSkeleton have aria-label
    const skeletons = screen.getAllByLabelText('Loading content...')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('renders EmptyState message when no events are provided', () => {
    renderActivityFeed([], false)

    expect(screen.getByText(/No recent activity/i)).toBeInTheDocument()
  })

  it('supports custom empty messages', () => {
    render(
      <MitumbaThemeProvider>
        <ActivityFeed events={[]} emptyMessage="Custom Empty" />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Custom Empty')).toBeInTheDocument()
  })
})
