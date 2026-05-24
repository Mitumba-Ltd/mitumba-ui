import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import type { VAZIBadgeProps } from './VAZIBadge.types'

export function VAZIBadge({ size = 'medium' }: VAZIBadgeProps) {
  const isSmall = size === 'small'

  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: tokens.colors.earth,
        borderRadius: tokens.radius.sm,
        color: tokens.colors.textOnEarth,
        display: 'inline-flex',
        fontSize: isSmall ? 10 : 12,
        fontWeight: tokens.typography.fontWeights.extrabold,
        gap: isSmall ? '4px' : '6px',
        height: isSmall ? '20px' : '28px',
        paddingInline: isSmall ? tokens.spacing.sm : tokens.spacing.base,
        textTransform: 'uppercase',
        letterSpacing: tokens.typography.letterSpacings.wider,
        whiteSpace: 'nowrap',
        boxShadow: tokens.shadows.card,
        transition: 'all 200ms ease',
      }}
      role="status"
      aria-label="VAZI Featured"
    >
      <svg
        width={isSmall ? 12 : 14}
        height={isSmall ? 12 : 14}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
      VAZI Featured
    </Box>
  )
}

export default VAZIBadge
