import React from 'react'
import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import type { MitumbaGridProps } from './MitumbaGrid.types'

/**
 * Premium "Living" Grid primitive.
 * Fulfills high-end structural standards with conservative, professional spatial density.
 * Reigned in from the benchmark to avoid 'wild' excessive margins.
 */
export function MitumbaGrid({
  children,
  columns = { xs: 4, sm: 8, md: 8, lg: 12 },
  gap,
  sx,
}: MitumbaGridProps) {
  // Professional Gutter Logic: 12px (base) for density, 16px (lg) for desktop
  const defaultGap = {
    xs: tokens.spacing.base, // 12px
    sm: tokens.spacing.base, // 12px
    md: tokens.spacing.lg,   // 16px
    lg: tokens.spacing.lg,   // 16px
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
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  )
}

export default MitumbaGrid
