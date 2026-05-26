import React from 'react'
import Box from '@mui/material/Box'
import { MitumbaGrid } from '../../layout/MitumbaGrid/MitumbaGrid'
import { MitumbaSkeleton } from '../../feedback/MitumbaSkeleton'
import type { ListingGridProps } from './ListingGrid.types'

/**
 * Specialized Listing Grid for Product Items.
 * Inherits from MitumbaGrid but defaults to e-commerce standard column counts.
 */
export function ListingGrid({
  children,
  columns = { xs: 2, sm: 2, md: 3, lg: 4 },
  gap,
  isLoading = false,
  sx,
}: ListingGridProps) {
  if (isLoading) {
    return (
      <MitumbaGrid columns={columns} gap={gap} sx={sx}>
        {[...Array(8)].map((_, i) => (
          <Box key={`listing-skeleton-${i + 1}`} sx={{ width: '100%', pt: '100%', position: 'relative' }}>
             <MitumbaSkeleton 
               variant="rounded" 
               sx={{ position: 'absolute', inset: 0, height: '100%', width: '100%', borderRadius: 4 }} 
             />
          </Box>
        ))}
      </MitumbaGrid>
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <MitumbaGrid
        columns={columns}
        gap={gap}
        sx={sx}
      >
        {children}
      </MitumbaGrid>
    </Box>
  )
}

export default ListingGrid
