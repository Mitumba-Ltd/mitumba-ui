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
        fontSize: isSmall
          ? tokens.typography.fontSizes.xs
          : tokens.typography.fontSizes.sm,
        fontWeight: tokens.typography.fontWeights.bold,
        gap: isSmall ? '2px' : '4px',
        letterSpacing: isSmall
          ? tokens.typography.letterSpacings.wider
          : tokens.typography.letterSpacings.normal,
        lineHeight: tokens.typography.lineHeights.tight,
        minHeight: isSmall ? 20 : 28,
        paddingInline: isSmall ? tokens.spacing.sm : tokens.spacing.base,
        paddingBlock: isSmall ? '2px' : tokens.spacing.xs,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
      role="status"
      aria-label="VAZI Featured"
    >
      <svg
        width={isSmall ? 10 : 14}
        height={isSmall ? 10 : 14}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 2L14.5 9H22L16 13.5L18.5 21L12 17L5.5 21L8 13.5L2 9H9.5L12 2Z"
          fill="currentColor"
        />
      </svg>
      VAZI Featured
    </Box>
  )
}

export default VAZIBadge
