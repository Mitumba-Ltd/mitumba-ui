import React from 'react'
import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import type { MitumbaGlassProps } from './MitumbaGlass.types'

/**
 * Premium "Extraordinary" Glass primitive.
 * Engineered for high-end optical depth with benchmarked blur and light-leak effects.
 * Reigned in for professional visual sanity while maintaining "out of this world" aesthetics.
 */
export function MitumbaGlass({
  children,
  blur = 24,
  opacity = 0.5,
  rounding = 'large',
  border = true,
  role,
  sx,
}: MitumbaGlassProps) {
  const radiusMap = {
    rounded: tokens.radius.md, // 8px
    large: tokens.radius.lg,   // 16px
    huge: tokens.radius.xl,    // 24px
    full: tokens.radius.full,
  }

  return (
    <Box
      role={role}
      sx={[
        {
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: `rgba(255, 255, 255, ${opacity})`,
          backdropFilter: `blur(${blur}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
          borderRadius: `${radiusMap[rounding]}px`,
          
          // High-end glass border: Ultra-thin, white, low-opacity
          border: border ? '1px solid rgba(255, 255, 255, 0.4)' : 'none',
          
          // Multi-layered shadow for realistic floating depth
          boxShadow: `
            0 4px 12px 0 rgba(0, 0, 0, 0.05),
            0 12px 32px 0 rgba(31, 38, 135, 0.1)
          `,
          
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          
          // Subtle light leak / shine effect
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.1) 100%)',
            pointerEvents: 'none',
          }
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  )
}

export default MitumbaGlass
