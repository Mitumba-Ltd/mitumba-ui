import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Stack from '@mui/material/Stack'
import { tokens } from '@mitumba/tokens'
import type { CartItemProps } from './CartItem.types'
import { MitumbaSelect } from '../../foundation/MitumbaSelect'

/**
 * Premium "Pinterest-Level" Cart Item primitive.
 * Fulfills high-end 'CART 02' benchmark standards with systematic columns and airy spacing.
 */
export function CartItem({
  imageUrl,
  title,
  subtitle,
  status = 'IN STOCK',
  priceKes,
  size = 'M',
  quantity = 1,
  maxQuantity = 10,
  onRemove,
  onQuantityChange,
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
          p: { xs: 2, md: 3 },
          boxShadow: `
            0 2px 4px 0 rgba(0, 0, 0, 0.05),
            0 8px 16px -4px rgba(0, 0, 0, 0.1)
          `,
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          position: 'relative',
          border: `1px solid ${tokens.colors.divider}`,
          
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: tokens.shadows.deep,
          }
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/* Product Image */}
      <Box
        sx={{
          width: { xs: 80, sm: 120, md: 140 },
          height: { xs: 80, sm: 120, md: 140 },
          borderRadius: `${tokens.radius.md}px`,
          overflow: 'hidden',
          backgroundColor: tokens.colors.background,
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

      {/* Info & Columns Section */}
      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,
          ml: { xs: 1.5, sm: 3, md: 4 },
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', lg: 'center' },
          gap: { xs: 1.5, lg: 4 },
        }}
      >
        {/* Basic Metadata */}
        <Box sx={{ flex: 1.5, minWidth: 0, width: '100%' }}>
          <Typography
            sx={{
              fontSize: { xs: tokens.typography.fontSizes.base, md: tokens.typography.fontSizes.lg },
              fontWeight: 900,
              color: tokens.colors.textPrimary,
              fontFamily: tokens.typography.fontFamily,
              textTransform: 'uppercase',
              lineHeight: 1.1,
              mb: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                color: tokens.colors.textSecondary,
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: 10,
              }}
            >
              {subtitle}
            </Typography>
          )}
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              color: tokens.colors.green,
              fontWeight: 800,
              fontSize: 9,
              mt: 1,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {status}
          </Typography>
        </Box>

        {/* Dynamic Selectors Columns */}
        <Stack direction="row" spacing={{ xs: 1.5, sm: 4, md: 6 }} alignItems="center" sx={{ width: '100%', flexWrap: 'wrap', rowGap: 1.5 }}>
          
          {/* SIZE COLUMN */}
          <Box sx={{ minWidth: 60 }}>
            <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 700, color: tokens.colors.textDisabled, fontSize: 10 }}>
              SIZE
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: tokens.typography.fontSizes.sm, color: tokens.colors.textPrimary, fontFamily: tokens.typography.fontFamily }}>
              {size}
            </Typography>
          </Box>

          {/* QUANTITY COLUMN */}
          <Box sx={{ minWidth: 60 }}>
            <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 700, color: tokens.colors.textDisabled, fontSize: 10 }}>
              QTY
            </Typography>
            <MitumbaSelect
              value={quantity}
              size="small"
              onChange={(val) => onQuantityChange?.(Number(val))}
              options={Array.from({ length: maxQuantity }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }))}
              rounding="rounded"
              sx={{ minWidth: 56 }}
            />
          </Box>

          {/* PRICE COLUMN */}
          <Box sx={{ textAlign: 'right', ml: 'auto' }}>
            <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 700, color: tokens.colors.textDisabled, fontSize: 10 }}>
              PRICE
            </Typography>
            <Typography sx={{ fontWeight: 900, color: tokens.colors.textPrimary, fontSize: tokens.typography.fontSizes.base, fontFamily: tokens.typography.fontFamily }}>
              KES {priceKes.toLocaleString()}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Remove Button (Absolute Position top right) */}
      <IconButton
        aria-label="Remove item from cart"
        onClick={onRemove}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: tokens.colors.textDisabled,
          '&:hover': {
            color: tokens.colors.error,
            backgroundColor: tokens.colors.errorLight,
            transform: 'rotate(90deg)',
          },
          transition: 'all 0.3s ease',
        }}
        size="small"
      >
        <CloseIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Box>
  )
}

export default CartItem
