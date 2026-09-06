import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import { tokens } from '@mitumba/tokens'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'
import { SemanticTitle } from '../../../internal/SemanticTitle'
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
  titleLevel,
}: OrderSummaryCardProps) {
  const titleId = React.useId()
  return (
    <Box
      component="section"
      aria-labelledby={titleId}
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
      <SemanticTitle
        titleLevel={titleLevel}
        id={titleId}
        sx={{
          fontSize: tokens.typography.fontSizes.lg,
          fontWeight: tokens.typography.fontWeights.bold,
          color: tokens.colors.textPrimary,
          mb: `${tokens.spacing.xl}px`,
        }}
      >
        Order Summary
      </SemanticTitle>

      {/* Line items as a description list of monetary label/value pairs */}
      <Box
        component="dl"
        sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.base}px`, m: 0, mb: `${tokens.spacing.xl}px` }}
      >
        {items.map((item) => (
          <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              component="dt"
              sx={{
                fontSize: tokens.typography.fontSizes.sm,
                color: tokens.colors.textSecondary,
                fontWeight: tokens.typography.fontWeights.medium,
              }}
            >
              {item.label}
            </Typography>
            <Typography
              component="dd"
              sx={{
                m: 0,
                fontSize: tokens.typography.fontSizes.sm,
                fontWeight: tokens.typography.fontWeights.bold,
                color: item.isDiscount ? tokens.colors.green : tokens.colors.textPrimary,
              }}
            >
              {item.isDiscount ? '−' : ''}KES {item.amountKes.toLocaleString()}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Divider */}
      <Box sx={{ height: '1px', bgcolor: tokens.colors.divider, mb: `${tokens.spacing.xl}px` }} />

      {/* Total as its own label/value pair */}
      <Box
        component="dl"
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 0, mb: `${tokens.spacing.xxl}px` }}
      >
        <Typography
          component="dt"
          sx={{
            fontSize: tokens.typography.fontSizes.lg,
            fontWeight: tokens.typography.fontWeights.extrabold,
            color: tokens.colors.textPrimary,
          }}
        >
          Total
        </Typography>
        <Typography
          component="dd"
          sx={{
            m: 0,
            fontSize: tokens.typography.fontSizes.xl,
            fontWeight: tokens.typography.fontWeights.extrabold,
            color: tokens.colors.green,
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
