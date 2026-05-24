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
        padding: tokens.spacing.lg,
        boxShadow: tokens.shadows.card,
        border: `1px solid ${tokens.colors.divider}`,
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing.xs,
        transition: 'all 200ms ease',
        '&:hover': {
          boxShadow: tokens.shadows.elevated,
          borderColor: tokens.colors.border,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: tokens.spacing.xs,
        }}
      >
        <Typography
          sx={{
            fontSize: 10,
            color: tokens.colors.textSecondary,
            fontWeight: tokens.typography.fontWeights.bold,
            textTransform: 'uppercase',
            letterSpacing: tokens.typography.letterSpacings.wider,
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          {label}
        </Typography>
        {icon && (
          <Box
            sx={{
              color: tokens.colors.textDisabled,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: tokens.colors.background,
              p: '6px',
              borderRadius: tokens.radius.sm,
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
          gap: '4px',
        }}
      >
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.xxxl,
            fontWeight: tokens.typography.fontWeights.extrabold,
            color: tokens.colors.textPrimary,
            lineHeight: 1,
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          {value}
        </Typography>
        {unit && (
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.sm,
              color: tokens.colors.textSecondary,
              fontWeight: tokens.typography.fontWeights.bold,
              fontFamily: tokens.typography.fontFamily,
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
            gap: '4px',
            mt: tokens.spacing.sm,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              paddingInline: tokens.spacing.sm,
              paddingBlock: '2px',
              borderRadius: tokens.radius.full,
              backgroundColor: trend.direction === 'up' ? `${tokens.colors.green}14` : `${tokens.colors.error}14`,
              color: trend.direction === 'up' ? tokens.colors.green : tokens.colors.error,
              border: `1px solid ${trend.direction === 'up' ? tokens.colors.green : tokens.colors.error}40`,
            }}
          >
            {trend.direction === 'up' ? (
              <TrendingUpIcon sx={{ fontSize: 14 }} />
            ) : (
              <TrendingDownIcon sx={{ fontSize: 14 }} />
            )}
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: tokens.typography.fontWeights.extrabold,
                lineHeight: 1,
              }}
            >
              {trend.percent}%
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: 10,
              color: tokens.colors.textDisabled,
              fontWeight: tokens.typography.fontWeights.medium,
            }}
          >
            vs last month
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default StatsCard
