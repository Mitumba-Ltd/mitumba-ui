import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { tokens } from '@mitumba/tokens'
import type { CartItemProps } from './CartItem.types'
import { MitumbaSelect } from '../../foundation/MitumbaSelect'

/**
 * Cart Item — responsive, overflow-safe at any container width.
 * Image + details always side by side. Selectors below details on narrow, inline on wide.
 */
export function CartItem({
  imageUrl,
  title,
  subtitle,
  status = 'IN STOCK',
  priceKes,
  size = 'M',
  availableSizes,
  quantity = 1,
  maxQuantity = 10,
  onRemove,
  onQuantityChange,
  onSizeChange,
  sx,
}: CartItemProps) {
  return (
    <Box
      sx={[
        {
          display: 'flex',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: tokens.colors.surface,
          borderRadius: `${tokens.radius.lg}px`,
          p: `${tokens.spacing.lg}px`,
          boxShadow: tokens.shadows.card,
          position: 'relative',
          border: `1px solid ${tokens.colors.divider}`,
          transition: tokens.motion.transitions.interaction,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: tokens.shadows.elevated,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/* Image */}
      <Box
        sx={{
          width: { xs: 80, sm: 120, md: 140 },
          height: { xs: 80, sm: 120, md: 140 },
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

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0, ml: `${tokens.spacing.base}px` }}>
        {/* Title row */}
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
            pr: 3,
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.xs,
              color: tokens.colors.textSecondary,
              fontFamily: tokens.typography.fontFamily,
              mt: '2px',
            }}
          >
            {subtitle}
          </Typography>
        )}

        <Typography
          sx={{
            fontSize: 10,
            fontWeight: tokens.typography.fontWeights.bold,
            color: tokens.colors.green,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            mt: '4px',
          }}
        >
          {status}
        </Typography>

        {/* Details row — always inline, wraps naturally */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: `${tokens.spacing.lg}px`,
            flexWrap: 'wrap',
            mt: `${tokens.spacing.base}px`,
          }}
        >
          {/* Size */}
          <Box>
            <Typography sx={{ fontSize: 10, fontWeight: 700, color: tokens.colors.textDisabled, mb: '2px' }}>
              SIZE
            </Typography>
            <MitumbaSelect
              value={size}
              size="small"
              onChange={(val) => onSizeChange?.(val as string)}
              options={(availableSizes || [size]).map((s) => ({ label: s, value: s }))}
              rounding="rounded"
              sx={{ minWidth: 52 }}
            />
          </Box>

          {/* Qty */}
          <Box>
            <Typography sx={{ fontSize: 10, fontWeight: 700, color: tokens.colors.textDisabled, mb: '2px' }}>
              QTY
            </Typography>
            <MitumbaSelect
              value={quantity}
              size="small"
              onChange={(val) => onQuantityChange?.(Number(val))}
              options={Array.from({ length: maxQuantity }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }))}
              rounding="rounded"
              sx={{ minWidth: 52 }}
            />
          </Box>

          {/* Price — pushed right */}
          <Box sx={{ ml: 'auto', textAlign: 'right' }}>
            <Typography sx={{ fontSize: tokens.typography.fontSizes.md, fontWeight: 900, color: tokens.colors.textPrimary, fontFamily: tokens.typography.fontFamily }}>
              KES {priceKes.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Remove */}
      <IconButton
        aria-label="Remove item from cart"
        onClick={onRemove}
        size="small"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: tokens.colors.textDisabled,
          transition: 'all 0.3s ease',
          '&:hover': {
            color: tokens.colors.error,
            bgcolor: tokens.colors.errorLight,
            transform: 'rotate(90deg)',
          },
        }}
      >
        <CloseIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Box>
  )
}

export default CartItem
