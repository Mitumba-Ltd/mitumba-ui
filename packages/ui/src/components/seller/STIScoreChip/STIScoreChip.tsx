import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '@mitumba/tokens';
import type { STIScoreChipProps } from './STIScoreChip.types';

function getScoreConfig(score: number): { color: string; label: string } {
  if (score >= 80) return { color: tokens.colors.stiTrusted, label: 'Trusted' };
  if (score >= 60) return { color: tokens.colors.stiGood, label: 'Good' };
  if (score >= 40) return { color: tokens.colors.stiAtRisk, label: 'At risk' };
  if (score >= 20) return { color: tokens.colors.stiFlagged, label: 'Flagged' };
  return { color: tokens.colors.stiSuspended, label: 'Suspended' };
}

/**
 * STI Score Chip — compact trust indicator. Shows score number with
 * color-coded dot and optional label. Used on listing cards, seller cards,
 * and search results.
 */
export function STIScoreChip({
  score,
  compact = false,
  showLabel,
}: STIScoreChipProps): React.ReactElement {
  const clamped = Math.min(100, Math.max(0, score));
  const { color, label } = getScoreConfig(clamped);
  const shouldShowLabel = showLabel ?? !compact;

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${tokens.spacing.xs}px`,
        height: compact ? 22 : 28,
        px: compact ? `${tokens.spacing.sm}px` : `${tokens.spacing.md}px`,
        borderRadius: `${tokens.radius.full}px`,
        bgcolor: `${color}12`,
      }}
      aria-label={`STI Score: ${clamped}, ${label}`}
    >
      {/* Color dot */}
      <Box sx={{ width: compact ? 6 : 8, height: compact ? 6 : 8, borderRadius: '50%', bgcolor: color, flexShrink: 0 }} />

      {/* Score number */}
      <Typography
        component="span"
        sx={{
          fontSize: compact ? 11 : tokens.typography.fontSizes.sm,
          fontWeight: 700,
          color,
          lineHeight: 1,
        }}
      >
        {clamped}
      </Typography>

      {/* Label */}
      {shouldShowLabel && (
        <Typography
          component="span"
          sx={{
            fontSize: compact ? 10 : tokens.typography.fontSizes.xs,
            fontWeight: 600,
            color: tokens.colors.textSecondary,
            lineHeight: 1,
          }}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
}

export default STIScoreChip;
