import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import type { MitumbaSkeletonProps } from './MitumbaSkeleton.types'

const variantStyles = {
  rectangular: { borderRadius: `${tokens.radius.xs}px` },
  rounded: { borderRadius: `${tokens.radius.md}px` },
  circular: { borderRadius: '50%' },
}

/**
 * Generic animated skeleton block for loading states.
 */
export function MitumbaSkeleton({ width, height, borderRadius, variant = 'rounded' }: MitumbaSkeletonProps) {
  return (
    <Box
      sx={{
        width,
        height,
        borderRadius: borderRadius ? `${borderRadius}px` : variantStyles[variant].borderRadius,
        backgroundColor: tokens.colors.divider,
        animation: 'pulse 1.5s ease-in-out infinite',
        '@keyframes pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      }}
      aria-label="Loading..."
    />
  )
}

export default MitumbaSkeleton
