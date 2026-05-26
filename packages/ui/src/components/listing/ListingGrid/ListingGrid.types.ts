import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

export interface ListingGridProps {
  /** Grid cells containing listing cards or any children. */
  children: ReactNode
  /** Number of columns per breakpoint. Defaults to 2 mobile, 2 tablet, 3 small desktop, 4 desktop. */
  columns?: { xs: number; sm: number; md: number; lg: number }
  /** Gap between grid cells. Defaults to 16. */
  gap?: number | string | object
  /** Whether the grid is in a loading state. */
  isLoading?: boolean
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
