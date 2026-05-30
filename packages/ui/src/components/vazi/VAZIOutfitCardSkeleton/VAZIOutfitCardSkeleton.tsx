import React from 'react'
import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import { MitumbaSkeleton } from '../../feedback/MitumbaSkeleton'

/**
 * Premium VAZI Outfit Card Skeleton.
 * Perfectly mirrors the new high-depth collage architecture.
 */
export function VAZIOutfitCardSkeleton() {
  return (
    <Box
      sx={{
        borderRadius: `${tokens.radius.lg}px`,
        overflow: 'hidden',
        backgroundColor: tokens.colors.surface,
        boxShadow: tokens.shadows.card,
        width: '100%',
      }}
    >
      {/* Collage Area Skeleton */}
      <Box
        sx={{
          height: 280,
          backgroundColor: tokens.colors.background,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'relative', width: 140, height: 180 }}>
           {/* Main Stack Item */}
           <MitumbaSkeleton 
             variant="rectangular" 
             sx={{ 
               position: 'absolute', 
               inset: 0, 
               borderRadius: 2, 
               border: `2px solid ${tokens.colors.white}` 
             }} 
           />
           {/* Peeking Stack Item */}
           <MitumbaSkeleton 
             variant="rectangular" 
             sx={{ 
               position: 'absolute', 
               top: 4, 
               left: -12, 
               width: '100%', 
               height: '100%', 
               borderRadius: 2, 
               zIndex: -1, 
               transform: 'rotate(-4deg)',
               opacity: 0.5
             }} 
           />
        </Box>
      </Box>

      {/* Content Area Skeleton */}
      <Box sx={{ p: 2.5 }}>
        <MitumbaSkeleton 
          variant="rectangular" 
          width="70%" 
          height={24} 
          sx={{ mb: 1, borderRadius: 1 }} 
        />
        <MitumbaSkeleton 
          variant="rectangular" 
          width="40%" 
          height={12} 
          sx={{ mb: 3, borderRadius: 1 }} 
        />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <MitumbaSkeleton variant="rectangular" width={60} height={10} sx={{ mb: 0.5, borderRadius: 0.5 }} />
            <MitumbaSkeleton variant="rectangular" width={100} height={28} sx={{ borderRadius: 0.5 }} />
          </Box>
          <MitumbaSkeleton 
            variant="rounded" 
            width={120} 
            height={36} 
            sx={{ borderRadius: 100 }} 
          />
        </Box>
      </Box>
    </Box>
  )
}

export default VAZIOutfitCardSkeleton
