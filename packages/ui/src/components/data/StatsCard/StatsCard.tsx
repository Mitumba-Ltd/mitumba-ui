import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import { tokens } from '@mitumba/tokens'
import type { StatsCardProps } from './StatsCard.types'

/**
 * Card component for displaying statistics in the seller dashboard.
 */
export function StatsCard({ label, value, unit, trend, icon }: StatsCardProps) {
  return (
    <Box
      sx={{
        backgroundColor: tokens.colors.surface,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.base,
        boxShadow: tokens.shadows.card,
        border: `${tokens.spacing.xs / tokens.spacing.xs}px solid ${tokens.colors.divider}`,
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing.sm,
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: tokens.shadows.elevated,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.sm,
            color: tokens.colors.textSecondary,
            fontWeight: tokens.typography.fontWeights.medium,
            textTransform: 'uppercase',
            letterSpacing: tokens.typography.letterSpacings.wider,
          }}
        >
          {label}
        </Typography>
        {icon && (
          <Box
            sx={{
              color: tokens.colors.textSecondary,
              display: 'flex',
              alignItems: 'center',
              fontSize: 24,
            }}
          >
            {icon}
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          gap: tokens.spacing.xs,
        }}
      >
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.xxxl,
            fontWeight: tokens.typography.fontWeights.bold,
            color: tokens.colors.textPrimary,
            lineHeight: tokens.typography.lineHeights.tight,
          }}
        >
          {value}
        </Typography>
        {unit && (
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.md,
              color: tokens.colors.textSecondary,
              fontWeight: tokens.typography.fontWeights.medium,
            }}
          >
            {unit}
          </Typography>
        )}
      </Box>
      {trend && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            color: trend.direction === 'up' ? tokens.colors.green : tokens.colors.error,
          }}
        >
          {trend.direction === 'up' ? (
            <TrendingUpIcon sx={{ fontSize: 16 }} />
          ) : (
            <TrendingDownIcon sx={{ fontSize: 16 }} />
          )}
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.sm,
              fontWeight: tokens.typography.fontWeights.medium,
            }}
          >
            {trend.percent}%
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default StatsCard
