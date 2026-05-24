import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import type { ActivityFeedProps } from './ActivityFeed.types'

const defaultIcons: Record<string, JSX.Element> = {
  order: <span role="img" aria-label="order">🛒</span>,
  sti_change: <span role="img" aria-label="sti change">⭐</span>,
  payout: <span role="img" aria-label="payout">💰</span>,
  review: <span role="img" aria-label="review">📝</span>,
}

const typeColors: Record<string, string> = {
  order: tokens.colors.green,
  sti_change: tokens.colors.info,
  payout: tokens.colors.earth,
  review: tokens.colors.warning,
}

/**
 * Vertical list of timestamped activity events.
 */
export function ActivityFeed({ events, loading = false, emptyMessage = 'No recent activity' }: ActivityFeedProps) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.base }}>
        {Array.from({ length: 4 }, (_, i) => (
          <Box key={`skeleton-${i}`} sx={{
              display: 'flex',
              gap: tokens.spacing.base,
              padding: tokens.spacing.base,
              borderRadius: tokens.radius.md,
              backgroundColor: tokens.colors.surface,
              boxShadow: tokens.shadows.card,
              border: `${tokens.spacing.xs / tokens.spacing.xs}px solid ${tokens.colors.divider}`,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: tokens.colors.divider,
                animation: 'pulse 1.5s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.5 },
                },
              }}
            />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: tokens.spacing.xs }}>
              <Box sx={{ width: '60%', height: 16, backgroundColor: tokens.colors.divider, borderRadius: tokens.radius.sm, animation: 'pulse 1.5s ease-in-out infinite' }} />
              <Box sx={{ width: '40%', height: 14, backgroundColor: tokens.colors.divider, borderRadius: tokens.radius.sm, animation: 'pulse 1.5s ease-in-out infinite' }} />
            </Box>
          </Box>
        ))}
      </Box>
    )
  }

  if (events.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: tokens.spacing.xl,
          color: tokens.colors.textSecondary,
          fontSize: tokens.typography.fontSizes.base,
          textAlign: 'center',
        }}
      >
        {emptyMessage}
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.sm }}>
      {events.map((event) => (
        <Box
          key={event.id}
          sx={{
            display: 'flex',
            gap: tokens.spacing.base,
            padding: tokens.spacing.base,
            borderRadius: tokens.radius.md,
            backgroundColor: tokens.colors.surface,
            boxShadow: tokens.shadows.card,
            border: `${tokens.spacing.xs / tokens.spacing.xs}px solid ${tokens.colors.divider}`,
            transition: 'box-shadow 0.2s',
            '&:hover': {
              boxShadow: tokens.shadows.elevated,
            },
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: event.color || typeColors[event.type],
              color: tokens.colors.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              flexShrink: 0,
            }}
          >
            {event.icon || defaultIcons[event.type]}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: tokens.typography.fontSizes.base,
                fontWeight: tokens.typography.fontWeights.semibold,
                color: tokens.colors.textPrimary,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {event.title}
            </Typography>
            {event.subtitle && (
              <Typography
                sx={{
                  fontSize: tokens.typography.fontSizes.sm,
                  color: tokens.colors.textSecondary,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {event.subtitle}
              </Typography>
            )}
            <Typography
              sx={{
                fontSize: tokens.typography.fontSizes.xs,
                color: tokens.colors.textDisabled,
                marginTop: tokens.spacing.xs,
              }}
            >
              {event.timestamp}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default ActivityFeed
