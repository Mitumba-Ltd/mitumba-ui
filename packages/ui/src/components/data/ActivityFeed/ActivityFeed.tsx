import React, { useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import StarIcon from '@mui/icons-material/Star'
import PaymentsIcon from '@mui/icons-material/Payments'
import RateReviewIcon from '@mui/icons-material/RateReview'
import SettingsIcon from '@mui/icons-material/Settings'
import type { SxProps, Theme } from '@mui/material/styles'
import { tokens } from '@mitumba/tokens'
import { MitumbaGlass } from '../../foundation/MitumbaGlass'
import { MitumbaSkeleton } from '../../feedback/MitumbaSkeleton'
import { EmptyState } from '../../feedback/EmptyState'
import type { ActivityFeedProps, ActivityType } from './ActivityFeed.types'

/**
 * Premium "Living" ActivityFeed primitive.
 * Engineered for high-fidelity event streams with timeline physics and tactile depth.
 */
export function ActivityFeed({ 
  events, 
  loading = false, 
  emptyMessage = 'No recent activity',
  variant = 'standard',
  showTimeline = true,
  sx
}: ActivityFeedProps) {
  const isGlass = variant === 'glass'
  const isElevated = variant === 'elevated'

  const typeConfig = useMemo(() => {
    const config: Record<ActivityType, { icon: React.ReactNode; color: string }> = {
      order: { icon: <ShoppingCartIcon />, color: tokens.colors.green },
      sti_change: { icon: <StarIcon />, color: tokens.colors.info },
      payout: { icon: <PaymentsIcon />, color: tokens.colors.earth },
      review: { icon: <RateReviewIcon />, color: tokens.colors.warning },
      system: { icon: <SettingsIcon />, color: tokens.colors.textSecondary },
    }
    return config
  }, [])

  if (loading) {
    return (
      <Stack spacing={2} sx={sx}>
        {[...Array(4)].map((_, i) => (
          <Box key={`feed-skeleton-${i + 1}`} sx={{ display: 'flex', gap: 2 }}>
            <MitumbaSkeleton variant="circular" width={40} height={40} />
            <Box sx={{ flexGrow: 1, pt: 1 }}>
              <MitumbaSkeleton variant="rectangular" width="60%" height={16} sx={{ mb: 1, borderRadius: 1 }} />
              <MitumbaSkeleton variant="rectangular" width="30%" height={10} sx={{ borderRadius: 1 }} />
            </Box>
          </Box>
        ))}
      </Stack>
    )
  }

  if (events.length === 0) {
    return (
      <EmptyState 
        variant="compact"
        title={emptyMessage}
        subtitle="New marketplace updates will appear here in real-time."
      />
    )
  }

  return (
    <Box sx={[{ position: 'relative', width: '100%' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      {/* Timeline Vertical Axis */}
      {showTimeline && (
        <Box 
          sx={{ 
            position: 'absolute', 
            left: 20, 
            top: 20, 
            bottom: 20, 
            width: 2, 
            backgroundColor: tokens.colors.divider,
            zIndex: 0,
            opacity: 0.6,
          }} 
        />
      )}

      <Stack spacing={isElevated ? 2 : 1}>
        {events.map((event) => {
          const config = typeConfig[event.type]
          const color = event.color || config.color

          const itemContent = (
            <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start', width: '100%' }}>
              {/* Icon Container */}
              <Box
                className="icon-node"
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: tokens.radius.full,
                  backgroundColor: tokens.colors.surface,
                  color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  zIndex: 1,
                  boxShadow: tokens.shadows.card,
                  border: `1px solid ${tokens.colors.divider}`,
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  '& svg': { fontSize: 20 }
                }}
              >
                {event.icon || config.icon}
              </Box>

              {/* Text Content */}
              <Box sx={{ flexGrow: 1, pt: 0.5, minWidth: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                  <Typography
                    sx={{
                      fontSize: tokens.typography.fontSizes.base,
                      fontWeight: 800,
                      color: tokens.colors.textPrimary,
                      fontFamily: tokens.typography.fontFamily,
                      lineHeight: 1.2,
                    }}
                  >
                    {event.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 10,
                      color: tokens.colors.textDisabled,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      mt: 0.2,
                      flexShrink: 0,
                    }}
                  >
                    {event.timestamp}
                  </Typography>
                </Box>
                {event.subtitle && (
                  <Typography
                    sx={{
                      fontSize: tokens.typography.fontSizes.sm,
                      color: tokens.colors.textSecondary,
                      fontFamily: tokens.typography.fontFamily,
                      mt: 0.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {event.subtitle}
                  </Typography>
                )}
              </Box>
            </Box>
          )

          const itemStyles: SxProps<Theme> = {
            p: 2,
            borderRadius: tokens.radius.lg,
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            cursor: 'default',
            '&:hover': {
              backgroundColor: isElevated || isGlass ? 'transparent' : `${tokens.colors.background}`,
              transform: 'translateX(4px)',
              '& .icon-node': { 
                transform: 'scale(1.1) rotate(10deg)',
                boxShadow: tokens.shadows.deep,
                borderColor: color,
              }
            }
          }

          if (isGlass) {
            return (
              <MitumbaGlass key={event.id} rounding="large" sx={{ ...itemStyles, p: 2 }}>
                {itemContent}
              </MitumbaGlass>
            )
          }

          if (isElevated) {
            return (
              <Box 
                key={event.id}
                sx={{
                  ...itemStyles,
                  backgroundColor: tokens.colors.surface,
                  boxShadow: tokens.shadows.card,
                  border: `1px solid ${tokens.colors.divider}`,
                  '&:hover': {
                    ...(itemStyles['&:hover'] as object),
                    boxShadow: tokens.shadows.deep,
                    borderColor: tokens.colors.green,
                  }
                }}
              >
                {itemContent}
              </Box>
            )
          }

          return (
            <Box key={event.id} sx={itemStyles}>
              {itemContent}
            </Box>
          )
        })}
      </Stack>
    </Box>
  )
}

export default ActivityFeed
