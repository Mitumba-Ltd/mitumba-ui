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
        borderRadius: tokens.radius.sm,
        color: config.color,
        display: 'inline-flex',
        fontSize: tokens.typography.fontSizes.xs,
        fontWeight: tokens.typography.fontWeights.bold,
        gap: tokens.spacing.xs,
        height: '24px',
        paddingInline: tokens.spacing.sm,
        transition: 'all 200ms ease',
        boxShadow: tokens.shadows.card,
      }}
      role="status"
      aria-label={`Condition: ${config.label}`}
    >
      <Box
        component="span"
        sx={{
          fontSize: tokens.typography.fontSizes.xs,
          fontWeight: tokens.typography.fontWeights.extrabold,
          lineHeight: 1,
        }}
      >
        {grade}
      </Box>
      {showLabel && (
        <Box
          component="span"
          sx={{
            fontSize: tokens.typography.fontSizes.xs,
            fontWeight: tokens.typography.fontWeights.semibold,
            lineHeight: 1,
            borderLeft: `1px solid ${config.color}40`,
            paddingLeft: tokens.spacing.xs,
            marginLeft: '2px',
          }}
        >
          {config.label}
        </Box>
      )}
    </Box>
  )
}

export default ConditionBadge
