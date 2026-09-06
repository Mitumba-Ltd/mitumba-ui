import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { tokens } from '@mitumba/tokens'
import type { VAZIBadgeProps } from './VAZIBadge.types'

/**
 * VAZI chip badge — smooth, compact, inline.
 */
export function VAZIBadge({ size = 'small' }: VAZIBadgeProps) {
  const isLarge = size === 'medium'

  return (
    <Box
      role="status"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        px: isLarge ? 1.25 : 1,
        py: isLarge ? 0.4 : 0.25,
        height: isLarge ? 28 : 22,
        borderRadius: `${tokens.radius.full}px`,
        bgcolor: tokens.colors.earthLight,
        border: `1px solid ${tokens.colors.earth}25`,
      }}
    >
      <AutoAwesomeIcon sx={{ fontSize: isLarge ? 13 : 11, color: tokens.colors.earth }} />
      <Typography
        sx={{
          fontSize: isLarge ? 11 : 9,
          fontWeight: tokens.typography.fontWeights.extrabold,
          color: tokens.colors.earth,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          lineHeight: 1,
        }}
      >
        VAZI
      </Typography>
    </Box>
  )
}

export default VAZIBadge
