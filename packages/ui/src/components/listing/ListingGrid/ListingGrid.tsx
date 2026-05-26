import React from 'react'
import { MitumbaGrid } from '../../layout/MitumbaGrid/MitumbaGrid'
import type { ListingGridProps } from './ListingGrid.types'

/**
 * Specialized Listing Grid for Product Items.
 * Inherits from MitumbaGrid but defaults to e-commerce standard column counts.
 */
export function ListingGrid({
  children,
  columns = { xs: 2, sm: 2, md: 3, lg: 4 },
  gap,
  sx,
}: ListingGridProps) {
  return (
    <MitumbaGrid
      columns={columns}
      gap={gap}
      sx={sx}
    >
      {children}
    </MitumbaGrid>
  )
}

export default ListingGrid
