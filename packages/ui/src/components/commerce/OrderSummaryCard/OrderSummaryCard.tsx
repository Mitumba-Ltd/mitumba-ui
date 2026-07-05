import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import { tokens } from '@mitumba/tokens'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'
import type { OrderSummaryCardProps } from './OrderSummaryCard.types'

/**
 * OrderSummaryCard — sticky sidebar card for cart/checkout.
 * Matches CartItem design language: tokens.radius.lg, tokens.shadows.card, hover-lift.
 */
export function OrderSummaryCard({
  items,
  totalKes,
  actionLabel = 'Checkout',
  onAction,
  loading = false,
  disabled = false,
  trustLine,
  sx,
}: OrderSummaryCardProps) {
  return (
    <Box
      sx={[
        {
          bgcolor: tokens.colors.surface,
          borderRadius: `${tokens.radius.lg}px`,
          border: `1px solid ${tokens.colors.divider}`,
          boxShadow: tokens.shadows.card,
          p: `${tokens.spacing.xxl}px`,
          transition: tokens.motion.transitions.interaction,
          '&:hover': {
            boxShadow: tokens.shadows.elevated,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/* Title */}
      <Typography
        sx={{
          fontSize: tokens.typography.fontSizes.lg,
          fontWeight: tokens.typography.fontWeights.bold,
          color: tokens.colors.textPrimary,
          fontFamily: tokens.typography.fontFamily,
          mb: `${tokens.spacing.xl}px`,
        }}
      >
        Order Summary
      </Typography>

      {/* Line items */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.base}px`, mb: `${tokens.spacing.xl}px` }}>
        {items.map((item) => (
          <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              sx={{
                fontSize: tokens.typography.fontSizes.sm,
                color: tokens.colors.textSecondary,
                fontFamily: tokens.typography.fontFamily,
                fontWeight: tokens.typography.fontWeights.medium,
              }}
            >
              {item.label}
            </Typography>
            <Typography
              sx={{
                fontSize: tokens.typography.fontSizes.sm,
                fontWeight: tokens.typography.fontWeights.bold,
                color: item.isDiscount ? tokens.colors.green : tokens.colors.textPrimary,
                fontFamily: tokens.typography.fontFamily,
              }}
            >
              {item.isDiscount ? '−' : ''}KES {item.amountKes.toLocaleString()}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Divider */}
      <Box sx={{ height: '1px', bgcolor: tokens.colors.divider, mb: `${tokens.spacing.xl}px` }} />

      {/* Total */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: `${tokens.spacing.xxl}px` }}>
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.lg,
            fontWeight: tokens.typography.fontWeights.extrabold,
            color: tokens.colors.textPrimary,
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          Total
        </Typography>
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.xl,
            fontWeight: tokens.typography.fontWeights.extrabold,
            color: tokens.colors.green,
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          KES {totalKes.toLocaleString()}
        </Typography>
      </Box>

      {/* Action button */}
      {onAction && (
        <MitumbaPrimaryButton
          label={loading ? 'Processing...' : actionLabel}
          onClick={onAction}
          loading={loading}
          disabled={disabled || loading}
          fullWidth
          size="large"
        />
      )}

      {/* Trust line */}
      {trustLine && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: `${tokens.spacing.xs}px`, mt: `${tokens.spacing.base}px` }}>
          <ShieldOutlinedIcon sx={{ fontSize: 14, color: tokens.colors.textSecondary }} />
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.xs,
              color: tokens.colors.textSecondary,
              fontFamily: tokens.typography.fontFamily,
              fontWeight: tokens.typography.fontWeights.semibold,
            }}
          >
            {trustLine}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default OrderSummaryCard
