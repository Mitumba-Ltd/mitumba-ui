import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

/**
 * Trend information for the StatsCard.
 */
export interface StatsTrend {
  /** Direction of the trend. */
  direction: 'up' | 'down' | 'neutral'
  /** Percentage change value. */
  percent: number
  /** Label for the comparison (e.g., 'vs last month'). */
  label?: string
}

export type StatsCardVariant = 'standard' | 'glass' | 'elevated'

/**
 * Props for the StatsCard component.
 */
export interface StatsCardProps {
  /** Label describing what the stat represents (e.g., 'Total Sales'). */
  label: string
  /** The main stat value (e.g., '45,000'). */
  value: string | number
  /** Optional unit prefix/suffix (e.g., 'KES', 'Orders'). */
  unit?: string
  /** Position of the unit. Defaults to 'suffix'. */
  unitPosition?: 'prefix' | 'suffix'
  /** Optional trend information for comparison. */
  trend?: StatsTrend
  /** Optional icon to display. */
  icon?: ReactNode
  /** Visual treatment. Defaults to 'standard'. */
  variant?: StatsCardVariant
  /** Color theme for the icon/accent. Defaults to 'primary'. */
  color?: 'primary' | 'earth' | 'info' | 'success' | 'error' | 'warning'
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
