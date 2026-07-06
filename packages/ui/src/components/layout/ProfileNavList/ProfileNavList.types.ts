import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

export interface ProfileNavItem {
  /** Display label */
  label: string
  /** Leading icon */
  icon: ReactNode
  /** Called when tapped */
  onClick?: () => void
  /** Badge count (e.g. unread, pending) */
  badge?: number
}

export interface ProfileNavListProps {
  /** Navigation items */
  items: ProfileNavItem[]
  /** Optional sx override */
  sx?: SxProps<Theme>
}
