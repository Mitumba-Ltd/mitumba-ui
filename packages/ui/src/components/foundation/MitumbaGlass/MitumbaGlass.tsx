import React from 'react'
import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import type { MitumbaGlassProps } from './MitumbaGlass.types'

/**
 * Premium "Extraordinary" Glass primitive.
 * Fulfills high-end backdrop filter standards with tactile visual depth.
 */
export function MitumbaGlass({
  children,
  blur = 20,
  opacity = 0.4,
  rounding = 'rounded',
  border = true,
  sx,
}: MitumbaGlassProps) {
  const radiusMap = {
    rounded: tokens.radius.md,
    large: tokens.radius.lg,
    huge: tokens.radius.xl,
    full: tokens.radius.full,
  }

  return (
    <Box
      sx={[
        {
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: `rgba(255, 255, 255, ${opacity})`,
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          borderRadius: `${radiusMap[rounding]}px`,
          border: border ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
          }
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  )
}

export default MitumbaGlass
