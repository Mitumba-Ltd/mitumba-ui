import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { tokens } from '@mitumba/tokens'
import { MitumbaChip } from '../../foundation/MitumbaChip'
import type { ChipStatus } from '../../foundation/MitumbaChip/MitumbaChip.types'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'
import { SemanticSurface } from '../../../internal/SemanticSurface'
import { SemanticTitle } from '../../../internal/SemanticTitle'
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
  onTrack,
  sx,
  titleLevel,
  href,
  linkComponent,
}: OrderCardProps) {
  const config = STATUS_CONFIG[status]
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const isInteractive = Boolean(href) || Boolean(onClick)
  const accessibleName = `Order #${orderShortId}, ${title}`

  return (
    <Box
      component="article"
      aria-label={accessibleName}
      sx={[
        {
          position: 'relative',
          display: 'flex',
          width: '100%',
          overflow: 'hidden',
          bgcolor: tokens.colors.surface,
          borderRadius: `${tokens.radius.lg}px`,
          p: `${tokens.spacing.lg}px`,
          boxShadow: tokens.shadows.card,
          border: `1px solid ${tokens.colors.divider}`,
          transition: tokens.motion.transitions.interaction,
          '&:hover': isInteractive ? {
            transform: 'translateY(-2px)',
            boxShadow: tokens.shadows.elevated,
          } : {},
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/*
        Stretched primary surface (anchor/button/none). Rendered as a sibling
        overlay so the nested Track action stays a valid, non-nested control.
      */}
      {isInteractive && (
        <SemanticSurface
          href={href}
          linkComponent={linkComponent}
          onClick={onClick}
          aria-label={accessibleName}
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            display: 'block',
            width: '100%',
            height: '100%',
            p: 0,
            m: 0,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            appearance: 'none',
            color: 'inherit',
            textDecoration: 'none',
          }}
        />
      )}

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
            position: 'relative',
            '@keyframes shimmer': {
              '0%': { backgroundPosition: '-200% 0' },
              '100%': { backgroundPosition: '200% 0' },
            },
          }}
        >
          {!imageLoaded && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(90deg, ${tokens.colors.background} 25%, ${tokens.colors.divider} 50%, ${tokens.colors.background} 75%)`,
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s ease-in-out infinite',
              }}
            />
          )}
          <Box
            component="img"
            src={imageUrl}
            alt={title}
            onLoad={() => setImageLoaded(true)}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.4s ease-in-out',
            }}
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
        <SemanticTitle
          titleLevel={titleLevel}
          sx={{
            fontSize: tokens.typography.fontSizes.base,
            fontWeight: tokens.typography.fontWeights.bold,
            color: tokens.colors.textPrimary,
            lineHeight: 1.2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mb: '4px',
          }}
        >
          {title}
        </SemanticTitle>

        {/* Date */}
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.xs,
            color: tokens.colors.textSecondary,
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
            }}
          >
            KES {totalKes.toLocaleString()}
          </Typography>

          {deliveryFeeKes != null && (
            <Typography
              sx={{
                fontSize: tokens.typography.fontSizes.xs,
                color: tokens.colors.textSecondary,
              }}
            >
              +KES {deliveryFeeKes.toLocaleString()} delivery
            </Typography>
          )}

          {isInteractive && (
            <Box
              onClick={(e) => { e.stopPropagation() }}
              sx={{ ml: 'auto', display: 'flex', gap: 0, position: 'relative', zIndex: 2 }}
            >
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MitumbaPrimaryButton
                  label="Track"
                  size="small"
                  icon={<LocalShippingIcon sx={{ fontSize: 14 }} />}
                  iconPosition="right"
                  onClick={onTrack}
                />
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <MitumbaPrimaryButton
                  label="Track Package"
                  size="small"
                  icon={<LocalShippingIcon sx={{ fontSize: 14 }} />}
                  iconPosition="right"
                  onClick={onTrack}
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
