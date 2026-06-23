import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import type { DisputeStatus, DisputeEvent, DisputeStatusTimelineProps } from './DisputeStatusTimeline.types'

const STATUS_COLORS: Record<DisputeStatus, string> = {
  open: tokens.colors.warning,
  seller_responded: tokens.colors.info,
  under_review: tokens.colors.info,
  resolved_refund: tokens.colors.green,
  resolved_release: tokens.colors.textSecondary,
  resolved_partial: tokens.colors.info,
  withdrawn: tokens.colors.textSecondary,
}

const STATUS_LABELS: Record<DisputeStatus, string> = {
  open: 'Open',
  seller_responded: 'Seller Responded',
  under_review: 'Under Review',
  resolved_refund: 'Resolved — Refund',
  resolved_release: 'Resolved — Released',
  resolved_partial: 'Resolved — Partial',
  withdrawn: 'Withdrawn',
}

const ACTOR_COLORS: Record<DisputeEvent['actor_role'], string> = {
  buyer: tokens.colors.green,
  seller: tokens.colors.earth,
  admin: tokens.colors.info,
  system: tokens.colors.textDisabled,
}

export function DisputeStatusTimeline({ status, events }: DisputeStatusTimelineProps) {
  const statusColor = STATUS_COLORS[status]

  return (
    <Box
      sx={{
        p: `${tokens.spacing.lg}px`,
        borderRadius: `${tokens.radius.xl}px`,
        bgcolor: tokens.colors.surface,
        boxShadow: tokens.shadows.card,
        border: `1px solid ${tokens.colors.divider}`,
      }}
    >
      {/* Status chip */}
      <Box
        sx={{
          display: 'inline-block',
          px: `${tokens.spacing.sm}px`,
          py: '3px',
          borderRadius: `${tokens.radius.full}px`,
          bgcolor: `${statusColor}18`,
          color: statusColor,
          fontSize: tokens.typography.fontSizes.xs,
          fontWeight: tokens.typography.fontWeights.extrabold,
          textTransform: 'uppercase',
          letterSpacing: tokens.typography.letterSpacings.wider,
          border: `1px solid ${statusColor}30`,
          mb: `${tokens.spacing.lg}px`,
        }}
        data-testid="dispute-status-chip"
      >
        {STATUS_LABELS[status]}
      </Box>

      {/* Timeline */}
      <Box component="ol" role="list" aria-label="Dispute status timeline" sx={{ listStyle: 'none', p: 0, m: 0 }}>
        {events.map((event, index) => {
          const isLast = index === events.length - 1
          const actorColor = ACTOR_COLORS[event.actor_role]

          return (
            <Box component="li" key={`${event.created_at}-${event.action}-${event.actor_role}`} sx={{ display: 'flex', alignItems: 'flex-start' }}>
              {/* Node + connector */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: `${tokens.spacing.base}px` }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: actorColor,
                    flexShrink: 0,
                    mt: '6px',
                  }}
                />
                {!isLast && (
                  <Box sx={{ width: '2px', flex: 1, minHeight: 24, bgcolor: tokens.colors.divider, my: '4px' }} />
                )}
              </Box>

              {/* Content */}
              <Box sx={{ pb: isLast ? 0 : `${tokens.spacing.base}px`, pt: '2px' }}>
                {/* Actor badge */}
                <Box
                  component="span"
                  data-testid="actor-badge"
                  sx={{
                    display: 'inline-block',
                    px: `${tokens.spacing.xs}px`,
                    py: '1px',
                    borderRadius: `${tokens.radius.sm}px`,
                    bgcolor: `${actorColor}18`,
                    color: actorColor,
                    fontSize: tokens.typography.fontSizes.xs,
                    fontWeight: tokens.typography.fontWeights.semibold,
                    textTransform: 'capitalize',
                    mr: `${tokens.spacing.xs}px`,
                  }}
                >
                  {event.actor_role}
                </Box>

                {/* Action */}
                <Typography
                  component="span"
                  sx={{
                    fontWeight: tokens.typography.fontWeights.bold,
                    fontSize: tokens.typography.fontSizes.sm,
                    color: tokens.colors.textPrimary,
                    fontFamily: tokens.typography.fontFamily,
                  }}
                >
                  {event.action}
                </Typography>

                {/* Note */}
                {event.note && (
                  <Typography
                    sx={{
                      fontSize: tokens.typography.fontSizes.xs,
                      color: tokens.colors.textSecondary,
                      fontStyle: 'italic',
                      fontFamily: tokens.typography.fontFamily,
                      mt: '2px',
                    }}
                  >
                    {event.note}
                  </Typography>
                )}

                {/* Timestamp */}
                <Typography
                  sx={{
                    fontSize: tokens.typography.fontSizes.xs,
                    color: tokens.colors.textSecondary,
                    fontFamily: tokens.typography.fontFamily,
                    mt: '2px',
                  }}
                  data-testid="event-timestamp"
                >
                  {event.created_at}
                </Typography>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default DisputeStatusTimeline
