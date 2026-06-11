import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { tokens } from '@mitumba/tokens';
import type { STIBreakdownPanelProps } from './STIBreakdownPanel.types';

function getScoreColor(score: number): string {
  if (score >= 80) return tokens.colors.stiTrusted;
  if (score >= 60) return tokens.colors.stiGood;
  if (score >= 40) return tokens.colors.stiAtRisk;
  return tokens.colors.stiFlagged;
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Trusted';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'At Risk';
  return 'Flagged';
}

/**
 * STI Breakdown Panel — displays seller trust index with circular score ring,
 * factor progress bars, and recent event history.
 */
export function STIBreakdownPanel({
  score,
  fulfillmentRate,
  accuracyRate,
  avgResponseHours,
  daysActive,
  recentEvents,
}: STIBreakdownPanelProps): React.ReactElement {
  const scoreColor = getScoreColor(score);
  const scoreLabel = getScoreLabel(score);

  const factors = [
    { label: 'Order fulfillment', value: fulfillmentRate, display: `${Math.round(fulfillmentRate * 100)}%` },
    { label: 'Listing accuracy', value: accuracyRate, display: `${Math.round(accuracyRate * 100)}%` },
    { label: 'Avg. response time', value: null, display: `${avgResponseHours}h` },
    { label: 'Days active', value: null, display: `${daysActive}` },
  ];

  return (
    <Box
      sx={{
        borderRadius: `${tokens.radius.xl}px`,
        bgcolor: tokens.colors.surface,
        border: `1px solid ${tokens.colors.divider}`,
        overflow: 'hidden',
      }}
    >
      {/* Header — score ring */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.xl}px`, p: `${tokens.spacing.xl}px`, pb: `${tokens.spacing.lg}px` }}>
        {/* Circular score indicator */}
        <Box sx={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
          {/* Background ring */}
          <CircularProgress
            variant="determinate"
            value={100}
            size={72}
            thickness={4}
            sx={{ color: tokens.colors.background }}
          />
          {/* Score ring */}
          <CircularProgress
            variant="determinate"
            value={score}
            size={72}
            thickness={4}
            sx={{ color: scoreColor, position: 'absolute', left: 0 }}
          />
          {/* Center text */}
          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontSize: 20, fontWeight: 800, color: scoreColor, lineHeight: 1, fontFamily: tokens.typography.fontFamily }}>{score}</Typography>
            <Typography sx={{ fontSize: 9, fontWeight: 600, color: tokens.colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 }}>/ 100</Typography>
          </Box>
        </Box>

        <Box>
          <Typography sx={{ fontSize: tokens.typography.fontSizes.lg, fontWeight: 700, color: tokens.colors.textPrimary, fontFamily: tokens.typography.fontFamily }}>
            Seller Trust Index
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.xs}px`, mt: '2px' }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: scoreColor }} />
            <Typography sx={{ fontSize: tokens.typography.fontSizes.sm, color: scoreColor, fontWeight: 600 }}>
              {scoreLabel}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Factors */}
      <Box sx={{ px: `${tokens.spacing.xl}px`, pb: `${tokens.spacing.xl}px` }}>
        {factors.map((factor) => (
          <Box key={factor.label} sx={{ mb: `${tokens.spacing.md}px`, '&:last-child': { mb: 0 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: `${tokens.spacing.xs}px` }}>
              <Typography sx={{ fontSize: tokens.typography.fontSizes.sm, color: tokens.colors.textSecondary, fontFamily: tokens.typography.fontFamily }}>
                {factor.label}
              </Typography>
              <Typography sx={{ fontSize: tokens.typography.fontSizes.sm, fontWeight: 700, color: tokens.colors.textPrimary, fontFamily: tokens.typography.fontFamily }}>
                {factor.display}
              </Typography>
            </Box>
            {factor.value !== null && (
              <LinearProgress
                variant="determinate"
                value={factor.value * 100}
                aria-label={`${factor.label} ${factor.display}`}
                sx={{
                  height: 6,
                  borderRadius: `${tokens.radius.full}px`,
                  bgcolor: tokens.colors.background,
                  '& .MuiLinearProgress-bar': { bgcolor: scoreColor, borderRadius: `${tokens.radius.full}px` },
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      {/* Recent events */}
      {recentEvents.length > 0 && (
        <Box sx={{ borderTop: `1px solid ${tokens.colors.divider}`, px: `${tokens.spacing.xl}px`, py: `${tokens.spacing.lg}px` }}>
          <Typography sx={{ fontSize: tokens.typography.fontSizes.sm, fontWeight: 700, color: tokens.colors.textPrimary, fontFamily: tokens.typography.fontFamily, mb: `${tokens.spacing.md}px` }}>
            Recent activity
          </Typography>
          {recentEvents.map((event) => (
            <Box
              key={`${event.reason}-${event.timestamp}`}
              sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.sm}px`, py: `${tokens.spacing.sm}px`, '&:not(:last-child)': { borderBottom: `1px solid ${tokens.colors.divider}` } }}
            >
              <Box sx={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: event.type === 'positive' ? tokens.colors.successLight : tokens.colors.errorLight, flexShrink: 0 }}>
                {event.type === 'positive'
                  ? <TrendingUpIcon sx={{ fontSize: 14, color: tokens.colors.success }} />
                  : <TrendingDownIcon sx={{ fontSize: 14, color: tokens.colors.error }} />
                }
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: tokens.typography.fontSizes.sm, color: tokens.colors.textPrimary, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {event.reason}
                </Typography>
                <Typography sx={{ fontSize: tokens.typography.fontSizes.xs, color: tokens.colors.textSecondary }}>
                  {event.timestamp}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: tokens.typography.fontSizes.sm, fontWeight: 700, color: event.type === 'positive' ? tokens.colors.success : tokens.colors.error, flexShrink: 0 }}>
                {event.type === 'positive' ? '+' : ''}{event.pointsChange}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default STIBreakdownPanel;
