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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm, mb: tokens.spacing.base }}>
        <Typography
          sx={{
            fontWeight: tokens.typography.fontWeights.bold,
            fontSize: tokens.typography.fontSizes.md,
            color: tokens.colors.textPrimary,
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          Order Tracking
        </Typography>
        <Box
          sx={{
            px: tokens.spacing.sm,
            py: '2px',
            borderRadius: tokens.radius.sm,
            bgcolor: tokens.colors.greenLight,
            color: tokens.colors.greenDark,
            fontSize: 10,
            fontWeight: tokens.typography.fontWeights.extrabold,
            textTransform: 'uppercase',
            letterSpacing: tokens.typography.letterSpacings.wide,
          }}
        >
          {ORDER_STATUS_LABELS[currentStatus]}
        </Box>
      </Box>

      {currentNote && (
        <Box
          sx={{
            p: tokens.spacing.sm,
            borderRadius: tokens.radius.sm,
            bgcolor: tokens.colors.background,
            borderLeft: `3px solid ${tokens.colors.info}`,
            mb: tokens.spacing.lg,
          }}
        >
          <Typography
            sx={{
              color: tokens.colors.textPrimary,
              fontSize: tokens.typography.fontSizes.sm,
              fontFamily: tokens.typography.fontFamily,
              fontStyle: 'italic',
            }}
          >
            &quot;{currentNote}&quot;
          </Typography>
        </Box>
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
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '24px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    zIndex: 1,
                    backgroundColor: tokens.colors.surface,
                  }}
                >
                  {isCompleted ? (
                    <CheckCircleOutlinedIcon
                      sx={{
                        fontSize: 20,
                        color: isCurrent ? tokens.colors.green : tokens.colors.textDisabled,
                      }}
                    />
                  ) : (
                    <RadioButtonUncheckedOutlinedIcon
                      sx={{
                        fontSize: 18,
                        color: tokens.colors.divider,
                      }}
                    />
                  )}
                </Box>
                {index < ORDER_STATUS_ORDER.length - 1 && (
                  <Box
                    sx={{
                      width: '2px',
                      flex: 1,
                      minHeight: tokens.spacing.lg,
                      bgcolor: index < currentIndex ? tokens.colors.green : tokens.colors.divider,
                      marginBlock: '2px',
                    }}
                  />
                )}
              </Box>
              <Box sx={{ pt: '2px', pb: tokens.spacing.lg }}>
                <Typography
                  sx={{
                    fontWeight: isCurrent ? tokens.typography.fontWeights.bold : tokens.typography.fontWeights.medium,
                    fontSize: tokens.typography.fontSizes.sm,
                    fontFamily: tokens.typography.fontFamily,
                    color: isCompleted ? tokens.colors.textPrimary : tokens.colors.textDisabled,
                    lineHeight: 1,
                  }}
                >
                  {ORDER_STATUS_LABELS[status]}
                </Typography>
                {latestEvent && (
                  <Typography
                    sx={{ 
                      color: tokens.colors.textSecondary, 
                      fontSize: 10,
                      fontFamily: tokens.typography.fontFamily,
                      mt: '4px',
                    }}
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
