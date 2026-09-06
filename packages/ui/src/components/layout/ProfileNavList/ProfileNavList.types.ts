import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'
import type { SemanticDestinationProps } from '../../../types/semantic'

export interface ProfileNavItem extends SemanticDestinationProps {
  /** Display label */
  label: string
  /** Leading icon */
  icon: ReactNode
  /** Called when tapped */
  onClick?: () => void
  /** Badge count (e.g. unread, pending) */
  badge?: number
  /** Whether this item represents the current page (sets aria-current="page"). */
  active?: boolean
}

export interface ProfileNavListProps {
  /** Navigation items */
  items: ProfileNavItem[]
  /**
   * Accessible label for the surrounding <nav> landmark.
   * @default 'Account'
   */
  ariaLabel?: string
  /** Optional sx override */
  sx?: SxProps<Theme>
}
