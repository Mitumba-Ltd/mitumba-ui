import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import type { ReactNode } from 'react'

export interface MitumbaGridProps {
  /** Grid cells. */
  children: ReactNode
  /** Column counts per breakpoint. Defaults to { xs: 2, sm: 2, md: 3, lg: 4 }. */
  columns?: { xs: number; sm: number; md: number; lg: number }
  /** Gap between cells in pixels. Defaults to 16. */
  gap?: number
}

export function MitumbaGrid({
  children,
  columns = { xs: 2, sm: 2, md: 3, lg: 4 },
  gap = tokens.spacing.base,
}: MitumbaGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap,
        gridTemplateColumns: {
          xs: `repeat(${columns.xs}, 1fr)`,
          sm: `repeat(${columns.sm}, 1fr)`,
          md: `repeat(${columns.md}, 1fr)`,
          lg: `repeat(${columns.lg}, 1fr)`,
        },
        width: '100%',
      }}
    >
      {children}
    </Box>
  )
}

export default MitumbaGrid
