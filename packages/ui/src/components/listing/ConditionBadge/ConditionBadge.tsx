import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import type { ConditionBadgeProps } from './ConditionBadge.types'

const GRADE_MAP: Record<
  ConditionBadgeProps['grade'],
  { color: string; label: string; bgColor: string }
> = {
  A: {
    color: tokens.colors.textOnGreen,
    bgColor: tokens.colors.green,
    label: 'Like new',
  },
  B: {
    color: tokens.colors.white,
    bgColor: tokens.colors.info,
    label: 'Good',
  },
  C: {
    color: tokens.colors.white,
    bgColor: tokens.colors.warning,
    label: 'Fair',
  },
}

export function ConditionBadge({ grade, showLabel = false }: ConditionBadgeProps) {
  const config = GRADE_MAP[grade]

  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: config.bgColor,
        borderRadius: tokens.spacing.xs,
        color: config.color,
        display: 'flex',
        fontSize: tokens.typography.fontSizes.xs,
        fontWeight: tokens.typography.fontWeights.bold,
        gap: tokens.spacing.xs,
        justifyContent: 'center',
        lineHeight: tokens.typography.lineHeights.tight,
        minHeight: tokens.spacing.lg,
        paddingInline: tokens.spacing.sm,
        paddingBlock: tokens.spacing.xs,
        width: 'fit-content',
      }}
      role="status"
      aria-label={`Condition: ${config.label}`}
    >
      <Typography
        component="span"
        sx={{
          fontSize: tokens.typography.fontSizes.xs,
          fontWeight: tokens.typography.fontWeights.bold,
          lineHeight: tokens.typography.lineHeights.tight,
        }}
      >
        {grade}
      </Typography>
      {showLabel && (
        <Typography
          component="span"
          sx={{
            fontSize: tokens.typography.fontSizes.xs,
            fontWeight: tokens.typography.fontWeights.medium,
            lineHeight: tokens.typography.lineHeights.tight,
          }}
        >
          {config.label}
        </Typography>
      )}
    </Box>
  )
}

export default ConditionBadge
