import React from 'react'
import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import type { MitumbaGridProps } from './MitumbaGrid.types'

/**
 * Premium "Living" Grid primitive.
 * Fulfills the "Grid System" design benchmark with responsive 4/8/12 column logic.
 */
export function MitumbaGrid({
  children,
  columns = { xs: 4, sm: 8, md: 8, lg: 12 },
  gap,
  sx,
}: MitumbaGridProps) {
  // Benchmark Gutter Logic: 16px (lg) on mobile, 20px (xl) on tablet/desktop
  const defaultGap = {
    xs: tokens.spacing.lg,
    sm: tokens.spacing.xl,
    md: tokens.spacing.xl,
    lg: tokens.spacing.xl,
  }

  return (
    <Box
      sx={[
        {
          display: 'grid',
          width: '100%',
          gap: gap || defaultGap,
          gridTemplateColumns: {
            xs: `repeat(${columns.xs}, 1fr)`,
            sm: `repeat(${columns.sm}, 1fr)`,
            md: `repeat(${columns.md}, 1fr)`,
            lg: `repeat(${columns.lg}, 1fr)`,
          },
          transition: 'all 0.3s ease',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  )
}

export default MitumbaGrid
