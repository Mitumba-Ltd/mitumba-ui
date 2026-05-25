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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.sm }}>
        {Array.from({ length: 4 }, (_, i) => (
          <Box key={`skeleton-${i}`} sx={{
              display: 'flex',
              gap: tokens.spacing.base,
              padding: tokens.spacing.base,
              borderRadius: tokens.radius.lg,
              backgroundColor: tokens.colors.surface,
              border: `1px solid ${tokens.colors.divider}`,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: tokens.radius.full,
                backgroundColor: tokens.colors.background,
                animation: 'pulse 1.5s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.5 },
                },
              }}
            />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: tokens.spacing.xs, justifyContent: 'center' }}>
              <Box sx={{ width: '60%', height: 14, backgroundColor: tokens.colors.background, borderRadius: tokens.radius.xs, animation: 'pulse 1.5s ease-in-out infinite' }} />
              <Box sx={{ width: '30%', height: 10, backgroundColor: tokens.colors.background, borderRadius: tokens.radius.xs, animation: 'pulse 1.5s ease-in-out infinite' }} />
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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBlock: tokens.spacing.xxxl,
          color: tokens.colors.textDisabled,
          textAlign: 'center',
          backgroundColor: tokens.colors.background,
          borderRadius: tokens.radius.lg,
          border: `1px dashed ${tokens.colors.border}`,
        }}
      >
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.base,
            fontWeight: tokens.typography.fontWeights.medium,
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          {emptyMessage}
        </Typography>
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
            borderRadius: tokens.radius.lg,
            backgroundColor: tokens.colors.surface,
            boxShadow: tokens.shadows.card,
            border: `1px solid ${tokens.colors.divider}`,
            transition: 'all 200ms ease',
            '&:hover': {
              boxShadow: tokens.shadows.elevated,
              borderColor: tokens.colors.border,
              transform: 'translateY(-1px)',
            },
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: tokens.radius.full,
              backgroundColor: `${(event.color || typeColors[event.type])}14`,
              color: event.color || typeColors[event.type],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              flexShrink: 0,
              border: `1px solid ${(event.color || typeColors[event.type])}40`,
            }}
          >
            {event.icon || defaultIcons[event.type]}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Typography
                sx={{
                  fontSize: tokens.typography.fontSizes.base,
                  fontWeight: tokens.typography.fontWeights.bold,
                  color: tokens.colors.textPrimary,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
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
                  fontWeight: tokens.typography.fontWeights.bold,
                  textTransform: 'uppercase',
                  letterSpacing: tokens.typography.letterSpacings.wide,
                  ml: tokens.spacing.sm,
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
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontFamily: tokens.typography.fontFamily,
                  mt: '2px',
                }}
              >
                {event.subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default ActivityFeed
