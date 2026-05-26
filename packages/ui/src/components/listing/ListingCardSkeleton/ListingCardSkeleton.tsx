import React from 'react'
import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import { MitumbaSkeleton } from '../../feedback/MitumbaSkeleton'

/**
 * Premium Listing Card Skeleton.
 * Perfectly mirrors the ListingCard geometry and spatial density.
 */
export function ListingCardSkeleton() {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: tokens.colors.surface,
        borderRadius: `${tokens.radius.lg}px`, // 16px (Serious Standard)
        overflow: 'hidden',
        boxShadow: `
          0 2px 4px 0 rgba(0, 0, 0, 0.05),
          0 8px 16px -4px rgba(0, 0, 0, 0.1)
        `,
      }}
    >
      {/* Image skeleton */}
      <Box sx={{ position: 'relative', width: '100%', pt: '100%' }}>
        <MitumbaSkeleton 
          variant="rectangular" 
          sx={{ position: 'absolute', inset: 0, height: '100%', width: '100%' }} 
        />
      </Box>

      {/* Content skeleton */}
      <Box sx={{ p: 2.5 }}>
        <MitumbaSkeleton 
          variant="rectangular" 
          width="80%" 
          height={20} 
          sx={{ mb: 1, borderRadius: 1 }} 
        />
        <MitumbaSkeleton 
          variant="rectangular" 
          width="40%" 
          height={12} 
          sx={{ mb: 3, borderRadius: 1 }} 
        />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <MitumbaSkeleton 
            variant="rounded" 
            width={100} 
            height={32} 
            sx={{ borderRadius: 100 }} 
          />
          <MitumbaSkeleton 
            variant="rounded" 
            width={80} 
            height={32} 
            sx={{ borderRadius: 100 }} 
          />
        </Box>
      </Box>
    </Box>
  )
}

export default ListingCardSkeleton
