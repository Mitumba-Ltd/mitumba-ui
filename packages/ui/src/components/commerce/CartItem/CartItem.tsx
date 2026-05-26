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
          backgroundColor: tokens.colors.surface,
          borderRadius: `${tokens.radius.lg}px`, // 16px (Serious Standard)
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
          ml: { xs: 2, sm: 3, md: 4 },
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', lg: 'center' },
          gap: { xs: 2, lg: 4 },
        }}
      >
        {/* Basic Metadata */}
        <Box sx={{ flex: 1.5 }}>
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.lg,
              fontWeight: 900,
              color: tokens.colors.textPrimary,
              fontFamily: tokens.typography.fontFamily,
              textTransform: 'uppercase',
              lineHeight: 1.1,
              mb: 0.5,
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

        {/* Dynamic Selectors Columns (Desktop) */}
        <Stack direction="row" spacing={{ xs: 2, sm: 4, md: 6 }} alignItems="center" sx={{ width: { xs: '100%', lg: 'auto' } }}>
          
          {/* SIZE COLUMN */}
          <Box sx={{ width: 80 }}>
            <Typography variant="caption" sx={{ display: 'block', mb: 1.5, fontWeight: 700, color: tokens.colors.textDisabled, fontSize: 10 }}>
              SIZE
            </Typography>
            <MitumbaSelect
              value={size}
              size="small"
              onChange={(val) => onSizeChange?.(val as string)}
              options={[{ label: size, value: size }]} // Simplified for now
              rounding="rounded"
              sx={{ minWidth: 60 }}
            />
          </Box>

          {/* QUANTITY COLUMN */}
          <Box sx={{ width: 80 }}>
            <Typography variant="caption" sx={{ display: 'block', mb: 1.5, fontWeight: 700, color: tokens.colors.textDisabled, fontSize: 10 }}>
              QUANTITY
            </Typography>
            <MitumbaSelect
              value={quantity}
              size="small"
              onChange={(val) => onQuantityChange?.(Number(val))}
              options={[{ label: `${quantity}`, value: quantity }]} // Simplified for now
              rounding="rounded"
              sx={{ minWidth: 60 }}
            />
          </Box>

          {/* PRICE COLUMN */}
          <Box sx={{ textAlign: 'right', minWidth: 100 }}>
            <Typography variant="caption" sx={{ display: 'block', mb: 1.5, fontWeight: 700, color: tokens.colors.textDisabled, fontSize: 10 }}>
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
