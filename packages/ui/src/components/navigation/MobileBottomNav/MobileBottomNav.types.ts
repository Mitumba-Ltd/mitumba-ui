import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

export type BottomNavVariant = 'm3' | 'expansive' | 'indicator' | 'pill' | 'standalone'

export interface MobileBottomNavItem {
  id: string
  label: string
  icon: ReactNode
  activeIcon?: ReactNode
}

export interface MobileBottomNavProps {
  /** Currently active tab ID. */
  activeTab: string
  /** Called when a tab is selected. */
  onTabChange: (id: string) => void
  /** Visual archetype from benchmark. Defaults to 'm3'. */
  variant?: BottomNavVariant
  /** Array of navigation items. */
  items?: MobileBottomNavItem[]
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
