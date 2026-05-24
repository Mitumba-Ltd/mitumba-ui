import type { ReactNode } from 'react'

/**
 * Represents a single activity event in the feed.
 */
export interface ActivityEvent {
  /** Unique identifier for the event. */
  id: string
  /** Type of activity event. */
  type: 'order' | 'sti_change' | 'payout' | 'review'
  /** Title of the event. */
  title: string
  /** Optional subtitle or description. */
  subtitle?: string
  /** Timestamp of the event. */
  timestamp: string
  /** Optional icon to display. */
  icon?: ReactNode
  /** Optional color override. */
  color?: string
}

/**
 * Props for the ActivityFeed component.
 */
export interface ActivityFeedProps {
  /** List of activity events to display. */
  events: ActivityEvent[]
  /** Whether the feed is in a loading state. */
  loading?: boolean
  /** Message to display when there are no events. */
  emptyMessage?: string
}
