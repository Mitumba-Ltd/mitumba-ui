import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import type { STIScoreChipProps } from './STIScoreChip.types'

interface STIConfig {
  color: string
  label: string
}

function getSTIConfig(score: number): STIConfig {
  if (score >= 85) {
    return { color: tokens.colors.stiTrusted, label: 'Trusted ★' }
  }
  if (score >= 60) {
    return { color: tokens.colors.stiGood, label: 'Good' }
  }
  if (score >= 40) {
    return { color: tokens.colors.stiAtRisk, label: 'At risk' }
  }
  if (score >= 20) {
    return { color: tokens.colors.stiFlagged, label: 'Flagged' }
  }
  return { color: tokens.colors.stiSuspended, label: 'Suspended' }
}

export function STIScoreChip({
  score,
  compact = false,
  showLabel,
}: STIScoreChipProps) {
  const clampedScore = Math.min(100, Math.max(0, score))
  const { color, label } = getSTIConfig(clampedScore)
  const shouldShowLabel = showLabel ?? !compact

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: tokens.spacing.xs,
        height: compact ? '24px' : '32px',
        px: compact ? tokens.spacing.sm : tokens.spacing.md,
        borderRadius: tokens.radius.full,
        backgroundColor: `${color}14`,
        border: `1px solid ${color}40`,
        width: 'fit-content',
        transition: 'all 200ms ease',
      }}
      aria-label={`STI Score: ${clampedScore}, ${label}`}
    >
      {shouldShowLabel && (
        <Box
          component="span"
          sx={{
            color,
            fontSize: compact ? 10 : tokens.typography.fontSizes.xs,
            fontWeight: tokens.typography.fontWeights.bold,
            textTransform: 'uppercase',
            letterSpacing: tokens.typography.letterSpacings.wide,
            lineHeight: 1,
          }}
        >
          {label}
        </Box>
      )}
      <Box
        component="span"
        sx={{
          color,
          fontSize: compact ? tokens.typography.fontSizes.xs : tokens.typography.fontSizes.sm,
          fontWeight: tokens.typography.fontWeights.extrabold,
          lineHeight: 1,
          minWidth: '1.2em',
          textAlign: 'center',
          ...(shouldShowLabel && {
            borderLeft: `1px solid ${color}40`,
            paddingLeft: tokens.spacing.xs,
            marginLeft: '2px',
          }),
        }}
      >
        {clampedScore}
      </Box>
    </Box>
  )
}

export default STIScoreChip
