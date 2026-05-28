import React from 'react'
import Typography from '@mui/material/Typography'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { tokens } from '@mitumba/tokens'
import { MitumbaGlass } from '../../foundation/MitumbaGlass'
import type { VAZIBadgeProps } from './VAZIBadge.types'

/**
 * Extraordinary VAZI Status Badge.
 * Engineered for high-end optical depth with animated AI-inspired flair.
 */
export function VAZIBadge({ size = 'small' }: VAZIBadgeProps) {
  const isLarge = size === 'medium'

  return (
    <MitumbaGlass
      rounding="full"
      blur={8}
      opacity={0.9}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.8,
        px: isLarge ? 2 : 1.5,
        py: 0.6,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 2px 8px rgba(160, 98, 53, 0.15)',
        border: `1px solid rgba(160, 98, 53, 0.2)`,
      }}
      role="status"
    >
      <AutoAwesomeIcon 
        sx={{ 
          fontSize: isLarge ? 18 : 14, 
          color: tokens.colors.earth,
          animation: 'vazi-pulse 3s infinite ease-in-out',
          '@keyframes vazi-pulse': {
            '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: 1 },
            '50%': { transform: 'scale(1.2) rotate(10deg)', opacity: 0.8 },
          }
        }} 
      />
      <Typography
        sx={{
          fontSize: isLarge ? 12 : 10,
          fontWeight: 900,
          color: tokens.colors.earth,
          fontFamily: tokens.typography.fontFamily,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          lineHeight: 1,
        }}
      >
        VAZI
      </Typography>
    </MitumbaGlass>
  )
}

export default VAZIBadge
