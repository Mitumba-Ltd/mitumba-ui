// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { ActivityFeed } from './ActivityFeed'
import type { ActivityEvent } from './ActivityFeed.types'

afterEach(() => {
  cleanup()
})

describe('ActivityFeed', () => {
  const mockEvents: ActivityEvent[] = [
    {
      id: '1',
      type: 'order',
      title: 'New order received',
      subtitle: 'Order #12345',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      type: 'review',
      title: 'New review',
      subtitle: '5 stars from Jane',
      timestamp: '5 hours ago',
    },
  ]

  it('renders events', () => {
    render(
      <MitumbaThemeProvider>
        <ActivityFeed events={mockEvents} />
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('New order received')).toBeInTheDocument()
    expect(screen.getByText('New review')).toBeInTheDocument()
  })

  it('renders empty message when no events', () => {
    render(
      <MitumbaThemeProvider>
        <ActivityFeed events={[]} />
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('No recent activity')).toBeInTheDocument()
  })

  it('renders custom empty message', () => {
    render(
      <MitumbaThemeProvider>
        <ActivityFeed events={[]} emptyMessage="Nothing to show here" />
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('Nothing to show here')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    render(
      <MitumbaThemeProvider>
        <ActivityFeed events={[]} loading />
      </MitumbaThemeProvider>
    )
    expect(screen.queryByText('No recent activity')).not.toBeInTheDocument()
  })

  it('renders timestamps', () => {
    render(
      <MitumbaThemeProvider>
        <ActivityFeed events={mockEvents} />
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('2 hours ago')).toBeInTheDocument()
    expect(screen.getByText('5 hours ago')).toBeInTheDocument()
  })

  it('renders subtitles', () => {
    render(
      <MitumbaThemeProvider>
        <ActivityFeed events={mockEvents} />
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('Order #12345')).toBeInTheDocument()
    expect(screen.getByText('5 stars from Jane')).toBeInTheDocument()
  })
})
