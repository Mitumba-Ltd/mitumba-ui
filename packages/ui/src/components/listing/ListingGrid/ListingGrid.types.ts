import type { ReactNode } from 'react'

export interface ListingGridProps {
  /** Grid cells containing listing cards or any children. */
  children: ReactNode
  /** Number of columns per breakpoint. Defaults to 2 mobile, 3 tablet, 4 desktop. */
  columns?: { xs: number; sm: number; md: number; lg: number }
  /** Gap between grid cells in pixels. Defaults to 16. */
  gap?: number
}
