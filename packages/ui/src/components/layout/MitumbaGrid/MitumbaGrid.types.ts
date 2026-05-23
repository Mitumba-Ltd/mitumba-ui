import type { ReactNode } from 'react'

export interface MitumbaGridProps {
  /** Grid cells. */
  children: ReactNode
  /** Column counts per breakpoint. Defaults to { xs: 2, sm: 2, md: 3, lg: 4 }. */
  columns?: { xs: number; sm: number; md: number; lg: number }
  /** Gap between cells in pixels. Defaults to 16. */
  gap?: number
}
