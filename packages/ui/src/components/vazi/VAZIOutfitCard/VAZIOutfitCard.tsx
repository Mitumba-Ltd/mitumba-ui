import React, { useCallback } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { tokens } from '@mitumba/tokens'
import { MitumbaGlass } from '../../foundation/MitumbaGlass'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'
import { VAZIBadge } from '../VAZIBadge'
import type { VAZIOutfitCardProps } from './VAZIOutfitCard.types'

/**
 * Extraordinary "Pinterest-Level" VAZI Outfit Card.
 * Engineered with high-depth collage architecture and tactile spring physics.
 */
export function VAZIOutfitCard({
  outfitName,
  items,
  totalPriceKes,
  sellersCount,
  isMultiCity = false,
  onTap,
  onBuyAll,
}: VAZIOutfitCardProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onTap?.()
      }
    },
    [onTap],
  )

  return (
    <Box
      onClick={onTap}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={onTap ? 0 : -1}
      sx={{
        width: '100%',
        position: 'relative',
        cursor: onTap ? 'pointer' : 'default',
        borderRadius: `${tokens.radius.lg}px`,
        overflow: 'hidden',
        backgroundColor: tokens.colors.surface,
        boxShadow: `
          0 4px 12px 0 rgba(0, 0, 0, 0.05),
          0 12px 32px 0 rgba(31, 38, 135, 0.1)
        `,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.01)',
          boxShadow: tokens.shadows.deep,
          '& .collage-image-2': { transform: 'rotate(4deg) translate(8px, -4px)' },
          '& .collage-image-3': { transform: 'rotate(-4deg) translate(-8px, -4px)' },
        },
      }}
    >
      {/* VAZI Floating Header */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 10,
        }}
      >
        <VAZIBadge size="small" />
      </Box>

      {/* Collage Section (Extraordinary Architecture) */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 280,
          backgroundColor: tokens.colors.background,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          p: 3,
        }}
      >
        {/* Background Light Leak */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(160, 98, 53, 0.05) 0%, rgba(255,255,255,0) 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* The Stack */}
        <Box sx={{ position: 'relative', width: 140, height: 180 }}>
          {items.slice(0, 3).map((item, index) => {
            const isMain = index === 0
            
            let rotation = 0
            if (index === 1) rotation = -4
            if (index === 2) rotation = 4

            let leftOffset = 0
            if (index === 1) leftOffset = -12
            if (index === 2) leftOffset = 12

            return (
              <Box
                key={item.listingId}
                className={`collage-image-${index + 1}`}
                sx={{
                  position: 'absolute',
                  top: isMain ? 0 : 4,
                  left: isMain ? 0 : leftOffset,
                  width: '100%',
                  height: '100%',
                  borderRadius: `${tokens.radius.md}px`,
                  overflow: 'hidden',
                  zIndex: 3 - index,
                  boxShadow: tokens.shadows.card,
                  border: `2px solid ${tokens.colors.white}`,
                  transform: `rotate(${rotation}deg)`,
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  backgroundColor: tokens.colors.surface,
                }}
              >
                <Box
                  component="img"
                  src={item.imageUrl}
                  alt={item.garmentType}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            )
          })}
        </Box>

        {/* Counter Overlay (if > 3 items) */}
        {items.length > 3 && (
          <MitumbaGlass
            rounding="full"
            opacity={0.8}
            blur={12}
            sx={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              px: 1.5,
              py: 0.5,
              zIndex: 5,
            }}
          >
            <Typography sx={{ fontSize: 10, fontWeight: 900, color: tokens.colors.earth }}>
              +{items.length - 3} MORE
            </Typography>
          </MitumbaGlass>
        )}
      </Box>

      {/* Content Section */}
      <Box sx={{ p: 2.5 }}>
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.lg,
            fontWeight: 900,
            color: tokens.colors.textPrimary,
            fontFamily: tokens.typography.fontFamily,
            lineHeight: 1.1,
            mb: 1,
            letterSpacing: '-0.01em',
          }}
        >
          {outfitName}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2.5 }}>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 700,
              color: tokens.colors.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {sellersCount} Sellers
          </Typography>
          {isMultiCity && (
            <>
              <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: tokens.colors.divider }} />
              <Stack direction="row" spacing={0.5} alignItems="center">
                <LocalShippingIcon sx={{ fontSize: 14, color: tokens.colors.earth }} />
                <Typography
                  sx={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: tokens.colors.earth,
                    textTransform: 'uppercase',
                  }}
                >
                  Multi-City
                </Typography>
              </Stack>
            </>
          )}
        </Stack>

        {/* Footer Action Row */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
             <Typography sx={{ fontSize: 10, fontWeight: 800, color: tokens.colors.textDisabled, textTransform: 'uppercase', mb: 0.2 }}>
               Total Look
             </Typography>
             <Typography sx={{ fontSize: tokens.typography.fontSizes.xl, fontWeight: 900, color: tokens.colors.textPrimary, fontFamily: tokens.typography.fontFamily }}>
               KES {totalPriceKes.toLocaleString()}
             </Typography>
          </Box>

          {onBuyAll && (
            <MitumbaPrimaryButton
              label="Buy entire look"
              variant="earth"
              size="small"
              icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
              iconPosition="right"
              onClick={(e) => { e.stopPropagation(); onBuyAll(); }}
              sx={{ borderRadius: tokens.radius.full, height: 36, px: 3 }}
            />
          )}
        </Stack>
      </Box>
    </Box>
  )
}

export default VAZIOutfitCard
