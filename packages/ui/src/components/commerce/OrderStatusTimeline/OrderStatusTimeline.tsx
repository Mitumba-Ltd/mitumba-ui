import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined'
import { tokens } from '@mitumba/tokens'
import type { OrderStatusTimelineProps, OrderStatus } from './OrderStatusTimeline.types'

const ORDER_STATUS_ORDER: OrderStatus[] = [
  'CREATED',
  'PAYMENT_PENDING',
  'PAID',
  'SELLER_CONFIRMED',
  'SHIPPED',
  'DELIVERED',
  'COMPLETED',
]

const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  CREATED: 'Order Created',
  PAYMENT_PENDING: 'Payment Pending',
  PAID: 'Paid',
  SELLER_CONFIRMED: 'Seller Confirmed',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  DISPUTED: 'Disputed',
}

export function OrderStatusTimeline({ currentStatus, events }: OrderStatusTimelineProps) {
  const currentIndex = ORDER_STATUS_ORDER.indexOf(currentStatus)

  const lastEvent = events.length > 0 ? events[events.length - 1] : null
  const currentNote = lastEvent?.note

  return (
    <Box
      sx={{
        p: tokens.spacing.base,
        borderRadius: tokens.radius.lg,
        bgcolor: tokens.colors.surface,
        boxShadow: tokens.shadows.card,
        border: `1px solid ${tokens.colors.divider}`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm, mb: tokens.spacing.lg }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: tokens.typography.fontWeights.semibold,
            fontSize: tokens.typography.fontSizes.md,
            color: tokens.colors.textPrimary,
          }}
        >
          Order Status
        </Typography>
        <Box
          sx={{
            px: tokens.spacing.md,
            py: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            bgcolor: `${tokens.colors.green}14`,
            color: tokens.colors.green,
            fontSize: tokens.typography.fontSizes.sm,
            fontWeight: tokens.typography.fontWeights.bold,
          }}
        >
          {ORDER_STATUS_LABELS[currentStatus]}
        </Box>
      </Box>

      {currentNote && (
        <Typography
          variant="body2"
          sx={{
            color: tokens.colors.textSecondary,
            fontSize: tokens.typography.fontSizes.sm,
            mb: tokens.spacing.lg,
          }}
        >
          {currentNote}
        </Typography>
      )}

      <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0 }}>
        {ORDER_STATUS_ORDER.map((status, index) => {
          const isCompleted = index <= currentIndex
          const isCurrent = status === currentStatus
          const statusEvents = events.filter((e) => e.status === status)
          const latestEvent = statusEvents.length > 0 ? statusEvents[statusEvents.length - 1] : null

          return (
            <Box
              component="li"
              key={status}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: tokens.spacing.base,
                position: 'relative',
                pb: index < ORDER_STATUS_ORDER.length - 1 ? tokens.spacing.md : 0,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: tokens.spacing.lg,
                }}
              >
                {isCompleted ? (
                  <CheckCircleOutlinedIcon
                    sx={{
                      fontSize: tokens.typography.fontSizes.lg,
                      color: isCurrent ? tokens.colors.green : tokens.colors.textDisabled,
                    }}
                  />
                ) : (
                  <RadioButtonUncheckedOutlinedIcon
                    sx={{
                      fontSize: tokens.typography.fontSizes.lg,
                      color: tokens.colors.divider,
                    }}
                  />
                )}
                {index < ORDER_STATUS_ORDER.length - 1 && (
                  <Box
                    sx={{
                      width: '2px',
                      flex: 1,
                      minHeight: tokens.spacing.base,
                      bgcolor: index < currentIndex ? tokens.colors.green : tokens.colors.divider,
                      mt: tokens.spacing.xs,
                    }}
                  />
                )}
              </Box>
              <Box sx={{ pt: tokens.spacing.xs }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: isCurrent ? tokens.typography.fontWeights.semibold : tokens.typography.fontWeights.medium,
                    fontSize: tokens.typography.fontSizes.base,
                    color: isCompleted ? tokens.colors.textPrimary : tokens.colors.textDisabled,
                  }}
                >
                  {ORDER_STATUS_LABELS[status]}
                </Typography>
                {latestEvent && (
                  <Typography
                    variant="caption"
                    sx={{ color: tokens.colors.textSecondary, fontSize: tokens.typography.fontSizes.sm }}
                  >
                    {latestEvent.timestamp}
                  </Typography>
                )}
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default OrderStatusTimeline
