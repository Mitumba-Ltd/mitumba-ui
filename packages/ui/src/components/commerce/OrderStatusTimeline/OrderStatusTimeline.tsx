import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PaymentIcon from '@mui/icons-material/Payment'
import InventoryIcon from '@mui/icons-material/Inventory'
import HandshakeIcon from '@mui/icons-material/Handshake'
import CancelIcon from '@mui/icons-material/Cancel'
import GavelIcon from '@mui/icons-material/Gavel'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import ScheduleIcon from '@mui/icons-material/Schedule'
import { tokens } from '@mitumba/tokens'
import type { OrderStatusTimelineProps, OrderStatus } from './OrderStatusTimeline.types'

const HAPPY_PATH: OrderStatus[] = [
  'CREATED',
  'PAYMENT_PENDING',
  'PAID',
  'SELLER_CONFIRMED',
  'SHIPPED',
  'DELIVERED',
  'COMPLETED',
]

const STATUS_META: Record<OrderStatus, { label: string; icon: React.ReactNode; color: string }> = {
  CREATED: { label: 'Order Placed', icon: <InventoryIcon sx={{ fontSize: 'inherit' }} />, color: tokens.colors.info },
  PAYMENT_PENDING: { label: 'Awaiting Payment', icon: <ScheduleIcon sx={{ fontSize: 'inherit' }} />, color: tokens.colors.warning },
  PAID: { label: 'Payment Confirmed', icon: <PaymentIcon sx={{ fontSize: 'inherit' }} />, color: tokens.colors.green },
  SELLER_CONFIRMED: { label: 'Seller Confirmed', icon: <HandshakeIcon sx={{ fontSize: 'inherit' }} />, color: tokens.colors.green },
  SHIPPED: { label: 'Shipped', icon: <LocalShippingIcon sx={{ fontSize: 'inherit' }} />, color: tokens.colors.info },
  DELIVERED: { label: 'Delivered', icon: <CheckCircleIcon sx={{ fontSize: 'inherit' }} />, color: tokens.colors.green },
  COMPLETED: { label: 'Completed', icon: <CheckCircleIcon sx={{ fontSize: 'inherit' }} />, color: tokens.colors.success },
  CANCELLED: { label: 'Cancelled', icon: <CancelIcon sx={{ fontSize: 'inherit' }} />, color: tokens.colors.error },
  DISPUTED: { label: 'Disputed', icon: <GavelIcon sx={{ fontSize: 'inherit' }} />, color: tokens.colors.warning },
}

export function OrderStatusTimeline({
  currentStatus,
  events,
  orientation = 'vertical',
  compact = false,
  estimatedDelivery,
  title = 'Order Tracking',
  bare = false,
  sx,
}: OrderStatusTimelineProps) {
  const isCancelled = currentStatus === 'CANCELLED'
  const isDisputed = currentStatus === 'DISPUTED'
  const isTerminal = isCancelled || isDisputed

  // Build visible steps: happy path up to current + terminal if applicable
  const currentHappyIndex = HAPPY_PATH.indexOf(currentStatus)
  const steps = isTerminal
    ? [...HAPPY_PATH.slice(0, HAPPY_PATH.indexOf(events.length > 1 ? events[events.length - 2]?.status ?? 'CREATED' : 'CREATED') + 1), currentStatus]
    : HAPPY_PATH

  const activeIndex = isTerminal
    ? steps.length - 1
    : currentHappyIndex

  const isHorizontal = orientation === 'horizontal'
  const nodeSize = compact ? 28 : 36

  const content = (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      {!compact && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: `${tokens.spacing.lg}px` }}>
          <Typography
            sx={{
              fontWeight: tokens.typography.fontWeights.bold,
              fontSize: tokens.typography.fontSizes.md,
              color: tokens.colors.textPrimary,
              fontFamily: tokens.typography.fontFamily,
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              px: `${tokens.spacing.sm}px`,
              py: '3px',
              borderRadius: `${tokens.radius.full}px`,
              bgcolor: `${STATUS_META[currentStatus].color}18`,
              color: STATUS_META[currentStatus].color,
              fontSize: tokens.typography.fontSizes.xs,
              fontWeight: tokens.typography.fontWeights.extrabold,
              textTransform: 'uppercase',
              letterSpacing: tokens.typography.letterSpacings.wider,
              border: `1px solid ${STATUS_META[currentStatus].color}30`,
            }}
          >
            {STATUS_META[currentStatus].label}
          </Box>
        </Box>
      )}

      {/* Timeline */}
      <Box
        component="ol"
        role="list"
        aria-label="Order status timeline"
        sx={{
          listStyle: 'none',
          p: 0,
          m: 0,
          display: 'flex',
          flexDirection: isHorizontal ? 'row' : 'column',
          ...(isHorizontal && { alignItems: 'flex-start', justifyContent: 'space-between' }),
        }}
      >
        {steps.map((status, index) => {
          const isCompleted = index < activeIndex
          const isCurrent = index === activeIndex
          const isPending = index > activeIndex
          const meta = STATUS_META[status]
          const statusEvents = events.filter((e) => e.status === status)
          const latestEvent = statusEvents.length > 0 ? statusEvents[statusEvents.length - 1] : null
          const isLast = index === steps.length - 1

          const nodeColor = isCompleted
            ? tokens.colors.green
            : isCurrent
              ? meta.color
              : tokens.colors.divider

          const connectorColor = isCompleted ? tokens.colors.green : tokens.colors.divider

          return (
            <Box
              component="li"
              key={status}
              sx={{
                display: 'flex',
                flexDirection: isHorizontal ? 'column' : 'row',
                alignItems: isHorizontal ? 'center' : 'flex-start',
                ...(isHorizontal ? { flex: 1, position: 'relative' } : {}),
              }}
            >
              {/* Node + Connector */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: isHorizontal ? 'row' : 'column',
                  alignItems: 'center',
                  ...(isHorizontal ? { width: '100%' } : { minWidth: `${nodeSize}px` }),
                }}
              >
                {/* Connector before (horizontal only) */}
                {isHorizontal && index > 0 && (
                  <Box
                    sx={{
                      flex: 1,
                      height: '2px',
                      bgcolor: index <= activeIndex ? tokens.colors.green : tokens.colors.divider,
                      borderRadius: '1px',
                      transition: `background-color ${tokens.motion.durations.normal} ${tokens.motion.easings.standard}`,
                    }}
                  />
                )}

                {/* Node */}
                <Box
                  sx={{
                    width: nodeSize,
                    height: nodeSize,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: compact ? 14 : 18,
                    flexShrink: 0,
                    color: (isCompleted || isCurrent) ? tokens.colors.white : tokens.colors.textDisabled,
                    bgcolor: (isCompleted || isCurrent) ? nodeColor : tokens.colors.background,
                    border: isPending ? `2px solid ${tokens.colors.divider}` : 'none',
                    boxShadow: isCurrent ? `0 0 0 4px ${nodeColor}25` : 'none',
                    transition: `all ${tokens.motion.durations.normal} ${tokens.motion.easings.spring}`,
                    ...(isCurrent && {
                      transform: 'scale(1.1)',
                    }),
                  }}
                >
                  {isCompleted ? (
                    <CheckCircleIcon sx={{ fontSize: 'inherit' }} />
                  ) : isCurrent ? (
                    meta.icon
                  ) : (
                    <RadioButtonUncheckedIcon sx={{ fontSize: compact ? 12 : 14, color: tokens.colors.textDisabled }} />
                  )}
                </Box>

                {/* Connector after (horizontal only) */}
                {isHorizontal && !isLast && (
                  <Box
                    sx={{
                      flex: 1,
                      height: '2px',
                      bgcolor: connectorColor,
                      borderRadius: '1px',
                      transition: `background-color ${tokens.motion.durations.normal} ${tokens.motion.easings.standard}`,
                    }}
                  />
                )}

                {/* Vertical connector */}
                {!isHorizontal && !isLast && (
                  <Box
                    sx={{
                      width: '2px',
                      flex: 1,
                      minHeight: compact ? 16 : 24,
                      bgcolor: connectorColor,
                      borderRadius: '1px',
                      my: '4px',
                      transition: `background-color ${tokens.motion.durations.normal} ${tokens.motion.easings.standard}`,
                      ...(isPending && { borderStyle: 'dashed' }),
                    }}
                  />
                )}
              </Box>

              {/* Label */}
              <Box
                sx={{
                  ...(isHorizontal
                    ? { mt: `${tokens.spacing.sm}px`, textAlign: 'center', minWidth: 0 }
                    : { ml: `${tokens.spacing.base}px`, pt: '6px', pb: compact ? `${tokens.spacing.sm}px` : `${tokens.spacing.xl}px` }),
                }}
              >
                <Typography
                  sx={{
                    fontWeight: isCurrent ? tokens.typography.fontWeights.bold : tokens.typography.fontWeights.medium,
                    fontSize: compact ? tokens.typography.fontSizes.xs : tokens.typography.fontSizes.sm,
                    fontFamily: tokens.typography.fontFamily,
                    color: isPending ? tokens.colors.textDisabled : tokens.colors.textPrimary,
                    lineHeight: 1.2,
                    transition: `color ${tokens.motion.durations.fast} ${tokens.motion.easings.standard}`,
                  }}
                >
                  {meta.label}
                </Typography>

                {!compact && latestEvent && (
                  <Typography
                    sx={{
                      color: tokens.colors.textSecondary,
                      fontSize: tokens.typography.fontSizes.xs,
                      fontFamily: tokens.typography.fontFamily,
                      mt: '2px',
                    }}
                  >
                    {latestEvent.timestamp}
                  </Typography>
                )}

                {!compact && latestEvent?.note && (
                  <Box
                    sx={{
                      mt: '4px',
                      px: `${tokens.spacing.sm}px`,
                      py: '2px',
                      borderRadius: `${tokens.radius.xs}px`,
                      bgcolor: `${meta.color}10`,
                      borderLeft: `2px solid ${meta.color}`,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: tokens.typography.fontSizes.xs,
                        fontFamily: tokens.typography.fontFamily,
                        color: tokens.colors.textSecondary,
                        fontStyle: 'italic',
                      }}
                    >
                      {latestEvent.note}
                    </Typography>
                  </Box>
                )}

                {!compact && status === 'DELIVERED' && estimatedDelivery && isPending && (
                  <Typography
                    sx={{
                      fontSize: tokens.typography.fontSizes.xs,
                      color: tokens.colors.info,
                      fontWeight: tokens.typography.fontWeights.semibold,
                      mt: '2px',
                    }}
                  >
                    Est. {estimatedDelivery}
                  </Typography>
                )}
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )

  if (bare) return <Box sx={sx}>{content}</Box>

  return (
    <Box
      sx={[
        {
          p: `${tokens.spacing.lg}px`,
          borderRadius: `${tokens.radius.xl}px`,
          bgcolor: tokens.colors.surface,
          boxShadow: tokens.shadows.card,
          border: `1px solid ${tokens.colors.divider}`,
          transition: `box-shadow ${tokens.motion.durations.normal} ${tokens.motion.easings.standard}`,
          '&:hover': { boxShadow: tokens.shadows.elevated },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {content}
    </Box>
  )
}

export default OrderStatusTimeline
