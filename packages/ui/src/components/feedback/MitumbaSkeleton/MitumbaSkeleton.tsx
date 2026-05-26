import React from 'react'
import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import type { MitumbaSkeletonProps } from './MitumbaSkeleton.types'

const variantStyles = {
  rectangular: { borderRadius: `${tokens.radius.xxs}px` },
  rounded: { borderRadius: `${tokens.radius.md}px` },
  circular: { borderRadius: '50%' },
}

/**
 * Premium "Shimmer" Skeleton primitive.
 * Fulfills high-end loading standards with smooth wave animations and precise geometry.
 */
export function MitumbaSkeleton({ 
  width, 
  height, 
  borderRadius, 
  variant = 'rounded' 
}: MitumbaSkeletonProps) {
  return (
    <Box
      sx={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: borderRadius ? `${borderRadius}px` : variantStyles[variant].borderRadius,
        backgroundColor: tokens.colors.background,
        
        // Base block
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: tokens.colors.divider,
          opacity: 0.5,
        },

        // Shimmer wave
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)`,
          transform: 'translateX(-100%)',
          animation: 'shimmer 2s infinite cubic-bezier(0.4, 0, 0.2, 1)',
        },

        '@keyframes shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
      }}
      aria-label="Loading content..."
    />
  )
}

export default MitumbaSkeleton
