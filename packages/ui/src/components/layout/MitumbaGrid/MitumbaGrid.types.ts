import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

export interface MitumbaGridProps {
  /** Grid cells. */
  children: ReactNode
  /** Column counts per breakpoint. Defaults to { xs: 4, sm: 8, md: 8, lg: 12 }. */
  columns?: { xs: number; sm: number; md: number; lg: number }
  /** Responsive gap between cells. Defaults to benchmark standard (16/20/20). */
  gap?: number | string | object
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
