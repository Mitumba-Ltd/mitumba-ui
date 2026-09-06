import React, { useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import type { SxProps, Theme } from '@mui/material/styles'
import { tokens } from '@mitumba/tokens'
import { MitumbaGlass } from '../../foundation/MitumbaGlass'
import type { StatsCardProps } from './StatsCard.types'

/**
 * Premium "Living" StatsCard primitive.
 * Engineered for high-end dashboard data visualization with tactile depth.
 */
export function StatsCard({ 
  label, 
  value, 
  unit, 
  unitPosition = 'suffix',
  trend, 
  icon,
  variant = 'standard',
  color = 'primary',
  sx
}: StatsCardProps) {
  const isGlass = variant === 'glass'
  const isElevated = variant === 'elevated'
  const isCompact = variant === 'compact'

  const themeColor = useMemo(() => {
    if (color === 'primary') return tokens.colors.green
    return tokens.colors[color as keyof typeof tokens.colors] || tokens.colors.green
  }, [color])

  const renderTrend = () => {
    if (!trend) return null

    const isUp = trend.direction === 'up'
    const isDown = trend.direction === 'down'
    
    let trendColor: string = tokens.colors.textDisabled
    if (isUp) {
      trendColor = tokens.colors.green
    } else if (isDown) {
      trendColor = tokens.colors.error
    }

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 1.5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.2,
            px: 1,
            py: 0.2,
            borderRadius: tokens.radius.full,
            backgroundColor: `${trendColor}15`,
            color: trendColor,
          }}
        >
          {isUp && <TrendingUpIcon sx={{ fontSize: 14 }} />}
          {isDown && <TrendingDownIcon sx={{ fontSize: 14 }} />}
          {!isUp && !isDown && <HorizontalRuleIcon sx={{ fontSize: 14 }} />}
          <Typography sx={{ fontSize: 11, fontWeight: 900, lineHeight: 1 }}>
            {trend.percent}%
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: tokens.colors.textDisabled, fontWeight: 700, fontSize: 10 }}>
          {trend.label || 'vs last month'}
        </Typography>
      </Box>
    )
  }

  const cardContent = (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
        {/* dl holds only dt/dd so the term/value semantics stay valid */}
        <Box component="dl" sx={{ m: 0 }}>
          <Typography
            component="dt"
            sx={{
              fontSize: 10,
              color: tokens.colors.textSecondary,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {label}
          </Typography>

          <Box component="dd" sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, m: 0, mt: 2 }}>
            {unit && unitPosition === 'prefix' && (
              <Typography component="span" sx={{ fontSize: 12, fontWeight: 900, color: tokens.colors.textSecondary, mr: 0.2 }}>
                {unit}
              </Typography>
            )}
            <Typography
              component="span"
              sx={{
                fontSize: tokens.typography.fontSizes.xxxl,
                fontWeight: 900,
                color: tokens.colors.textPrimary,
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              {value}
            </Typography>
            {unit && unitPosition === 'suffix' && (
              <Typography component="span" sx={{ fontSize: tokens.typography.fontSizes.sm, fontWeight: 800, color: tokens.colors.textSecondary, ml: 0.2 }}>
                {unit}
              </Typography>
            )}
          </Box>
        </Box>

        {icon && (
          <Box
            aria-hidden
            sx={{
              width: 32,
              height: 32,
              borderRadius: tokens.radius.md,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: `${themeColor}15`,
              color: themeColor,
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              '& svg': { fontSize: 18 },
            }}
          >
            {icon}
          </Box>
        )}
      </Stack>

      {renderTrend()}
    </Box>
  )

  const baseStyles: SxProps<Theme> = {
    p: 3,
    width: '100%',
    boxSizing: 'border-box',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    position: 'relative',
    '&:hover': {
      transform: 'translateY(-4px) scale(1.02)',
      '& .icon-wrapper': { transform: 'rotate(10deg) scale(1.1)' }
    }
  }

  if (isCompact) {
    return (
      <Box
        component="dl"
        sx={[
          {
            p: `${tokens.spacing.lg}px`,
            width: '100%',
            m: 0,
            textAlign: 'center',
            backgroundColor: tokens.colors.surface,
            borderRadius: `${tokens.radius.lg}px`,
            border: `1px solid ${tokens.colors.divider}`,
            boxShadow: tokens.shadows.card,
            transition: tokens.motion.transitions.interaction,
            '&:hover': { boxShadow: tokens.shadows.elevated },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Typography
          component="dd"
          sx={{
            fontSize: tokens.typography.fontSizes.display,
            fontWeight: tokens.typography.fontWeights.extrabold,
            color: tokens.colors.textPrimary,
            lineHeight: 1,
            m: 0,
            mb: '4px',
          }}
        >
          {unit && unitPosition === 'prefix' ? `${unit} ` : ''}{value}{unit && unitPosition === 'suffix' ? ` ${unit}` : ''}
        </Typography>
        <Typography
          component="dt"
          sx={{
            fontSize: tokens.typography.fontSizes.xs,
            fontWeight: tokens.typography.fontWeights.semibold,
            color: tokens.colors.textSecondary,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {label}
        </Typography>
      </Box>
    )
  }

  if (isGlass) {
    return (
      <MitumbaGlass rounding="large" sx={[baseStyles, ...(Array.isArray(sx) ? sx : [sx])]}>
        {cardContent}
      </MitumbaGlass>
    )
  }

  return (
    <Box
      sx={[
        baseStyles,
        {
          backgroundColor: tokens.colors.surface,
          borderRadius: `${tokens.radius.lg}px`,
          boxShadow: isElevated ? tokens.shadows.deep : tokens.shadows.card,
          border: isElevated ? 'none' : `1px solid ${tokens.colors.divider}`,
          '&:hover': {
            ...(baseStyles['&:hover'] as object),
            boxShadow: tokens.shadows.deep,
            borderColor: tokens.colors.green,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {cardContent}
    </Box>
  )
}

export default StatsCard
