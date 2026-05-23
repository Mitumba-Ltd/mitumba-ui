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
        gap: tokens.spacing.sm,
        px: compact ? tokens.spacing.sm : tokens.spacing.md,
        py: compact ? tokens.spacing.xs : tokens.spacing.sm,
        borderRadius: tokens.radius.full,
        backgroundColor: `${color}14`,
        border: `1px solid ${color}33`,
        width: 'fit-content',
      }}
      aria-label={`STI Score: ${clampedScore}, ${label}`}
    >
      {shouldShowLabel && (
        <Box
          component="span"
          sx={{
            color,
            fontSize: tokens.typography.fontSizes.sm,
            fontWeight: tokens.typography.fontWeights.medium,
            lineHeight: tokens.typography.lineHeights.tight,
          }}
        >
          {label}
        </Box>
      )}
      <Box
        component="span"
        sx={{
          color,
          fontSize: compact
            ? tokens.typography.fontSizes.sm
            : tokens.typography.fontSizes.base,
          fontWeight: tokens.typography.fontWeights.bold,
          lineHeight: tokens.typography.lineHeights.tight,
          minWidth: tokens.spacing.lg,
          textAlign: 'center',
        }}
      >
        {clampedScore}
      </Box>
    </Box>
  )
}

export default STIScoreChip
