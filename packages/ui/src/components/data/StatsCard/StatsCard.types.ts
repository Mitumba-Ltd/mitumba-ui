import type { ReactNode } from 'react'

/**
 * Trend information for the StatsCard.
 */
export interface StatsTrend {
  /** Direction of the trend. */
  direction: 'up' | 'down'
  /** Percentage change value. */
  percent: number
}

/**
 * Props for the StatsCard component.
 */
export interface StatsCardProps {
  /** Label describing what the stat represents. */
  label: string
  /** The stat value. */
  value: string | number
  /** Optional unit suffix (e.g., 'KES', 'orders'). */
  unit?: string
  /** Optional trend information. */
  trend?: StatsTrend
  /** Optional icon to display. */
  icon?: ReactNode
}
