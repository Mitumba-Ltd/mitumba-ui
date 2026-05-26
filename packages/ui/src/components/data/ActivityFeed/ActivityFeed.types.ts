import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

export type ActivityType = 'order' | 'sti_change' | 'payout' | 'review' | 'system'
export type ActivityFeedVariant = 'standard' | 'glass' | 'elevated'

/**
 * Represents a single activity event in the feed.
 */
export interface ActivityEvent {
  /** Unique identifier for the event. */
  id: string
  /** Type of activity event for auto-styling. */
  type: ActivityType
  /** Primary title of the event. */
  title: string
  /** Optional descriptive text. */
  subtitle?: string
  /** Relative or absolute timestamp. */
  timestamp: string
  /** Optional icon override. */
  icon?: ReactNode
  /** Optional color theme. */
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
  /** Message to display when there are no events. Uses EmptyState internally. */
  emptyMessage?: string
  /** Visual treatment for individual items. Defaults to 'standard'. */
  variant?: ActivityFeedVariant
  /** Whether to show connecting timeline lines. Defaults to true. */
  showTimeline?: boolean
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
