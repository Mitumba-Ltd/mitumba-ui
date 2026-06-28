import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { tokens } from '@mitumba/tokens'
import { MitumbaChip } from '../../foundation/MitumbaChip'
import type { ChipStatus } from '../../foundation/MitumbaChip/MitumbaChip.types'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'
import type { OrderCardProps, OrderCardStatus } from './OrderCard.types'

const STATUS_CONFIG: Record<OrderCardStatus, { label: string; chipStatus: ChipStatus }> = {
  pending: { label: 'Pending', chipStatus: 'incomplete' },
  paid: { label: 'Paid', chipStatus: 'active' },
  confirmed: { label: 'Confirmed', chipStatus: 'active' },
  shipped: { label: 'Shipped', chipStatus: 'active' },
  delivered: { label: 'Delivered', chipStatus: 'success' },
  completed: { label: 'Completed', chipStatus: 'success' },
  cancelled: { label: 'Cancelled', chipStatus: 'danger' },
  disputed: { label: 'Disputed', chipStatus: 'danger' },
}

/**
 * OrderCard — compact order summary card for order history lists.
 * Matches CartItem design language: image left, details right, natural wrapping.
 */
export function OrderCard({
  orderShortId,
  title,
  imageUrl,
  totalKes,
  deliveryFeeKes,
  status,
  createdAt,
  onClick,
  sx,
}: OrderCardProps) {
  const config = STATUS_CONFIG[status]

  return (
    <Box
      onClick={onClick}
      sx={[
        {
          display: 'flex',
          width: '100%',
          overflow: 'hidden',
          bgcolor: tokens.colors.surface,
          borderRadius: `${tokens.radius.lg}px`,
          p: `${tokens.spacing.lg}px`,
          boxShadow: tokens.shadows.card,
          border: `1px solid ${tokens.colors.divider}`,
          cursor: onClick ? 'pointer' : 'default',
          transition: tokens.motion.transitions.interaction,
          '&:hover': onClick ? {
            transform: 'translateY(-2px)',
            boxShadow: tokens.shadows.elevated,
          } : {},
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/* Image */}
      {imageUrl && (
        <Box
          sx={{
            width: { xs: 64, sm: 80 },
            height: { xs: 64, sm: 80 },
            borderRadius: `${tokens.radius.md}px`,
            overflow: 'hidden',
            bgcolor: tokens.colors.background,
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src={imageUrl}
            alt={title}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
      )}

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0, ml: imageUrl ? `${tokens.spacing.base}px` : 0 }}>
        {/* Top row: order ID + status */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: `${tokens.spacing.sm}px`, mb: '4px' }}>
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.xs,
              fontWeight: tokens.typography.fontWeights.bold,
              color: tokens.colors.textSecondary,
              fontFamily: tokens.typography.fontFamily,
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
            }}
          >
            Order #{orderShortId}
          </Typography>
          <MitumbaChip
            label={config.label}
            status={config.chipStatus}
            size="small"
            variant="solid"
            rounding="pill"
          />
        </Box>

        {/* Title */}
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.base,
            fontWeight: tokens.typography.fontWeights.bold,
            color: tokens.colors.textPrimary,
            fontFamily: tokens.typography.fontFamily,
            lineHeight: 1.2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mb: '4px',
          }}
        >
          {title}
        </Typography>

        {/* Date */}
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.xs,
            color: tokens.colors.textSecondary,
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          {createdAt}
        </Typography>

        {/* Bottom row: price + delivery + action */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: `${tokens.spacing.lg}px`,
            flexWrap: 'wrap',
            mt: `${tokens.spacing.base}px`,
          }}
        >
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.md,
              fontWeight: 900,
              color: tokens.colors.textPrimary,
              fontFamily: tokens.typography.fontFamily,
            }}
          >
            KES {totalKes.toLocaleString()}
          </Typography>

          {deliveryFeeKes != null && (
            <Typography
              sx={{
                fontSize: tokens.typography.fontSizes.xs,
                color: tokens.colors.textSecondary,
                fontFamily: tokens.typography.fontFamily,
              }}
            >
              +KES {deliveryFeeKes.toLocaleString()} delivery
            </Typography>
          )}

          {onClick && (
            <Box sx={{ ml: 'auto', display: 'flex', gap: 0 }}>
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MitumbaPrimaryButton
                  label="Track"
                  size="small"
                  icon={<LocalShippingIcon sx={{ fontSize: 14 }} />}
                  iconPosition="right"
                />
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <MitumbaPrimaryButton
                  label="Track Package"
                  size="small"
                  icon={<LocalShippingIcon sx={{ fontSize: 14 }} />}
                  iconPosition="right"
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default OrderCard
