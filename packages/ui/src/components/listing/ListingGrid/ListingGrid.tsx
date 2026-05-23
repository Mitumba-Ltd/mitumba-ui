import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import type { ListingGridProps } from './ListingGrid.types'

export function ListingGrid({
  children,
  columns = { xs: 2, sm: 2, md: 3, lg: 4 },
  gap = tokens.spacing.base,
}: ListingGridProps) {
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

export default ListingGrid
