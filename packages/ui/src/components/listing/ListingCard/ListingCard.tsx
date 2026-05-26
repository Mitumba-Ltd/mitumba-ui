import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import { tokens } from '@mitumba/tokens'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'
import type { ListingCardProps } from './ListingCard.types'

/**
 * Premium "Pinterest-Level" Listing Card primitive.
 * Fulfills high-fidelity standards with image carousels and tactile action areas.
 */
export function ListingCard({
  images,
  title,
  price,
  originalPrice,
  brand,
  size,
  badge,
  brandLogoUrl,
  onClick,
  onBuyClick,
  isLiked = false,
  onLikeClick,
  sx,
}: ListingCardProps) {
  const [activeImage, setActiveImage] = useState(0)

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation()
    onBuyClick?.(e)
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    onLikeClick?.(e)
  }

  return (
    <Box
      onClick={onClick}
      sx={[
        {
          width: '100%',
          backgroundColor: tokens.colors.surface,
          borderRadius: tokens.radius.xl,
          overflow: 'hidden',
          boxShadow: tokens.shadows.card,
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          cursor: 'pointer',
          border: `1px solid ${tokens.colors.divider}`,
          
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: tokens.shadows.deep,
          }
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/* Image Container */}
      <Box sx={{ position: 'relative', width: '100%', pt: '100%', backgroundColor: tokens.colors.background }}>
        <Box
          component="img"
          src={images[activeImage]}
          alt={title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* Badge Overlay */}
        {badge && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              px: 1.5,
              py: 0.5,
              borderRadius: tokens.radius.full,
              fontSize: 10,
              fontWeight: 800,
              color: tokens.colors.textPrimary,
              fontFamily: tokens.typography.fontFamily,
              textTransform: 'uppercase',
              boxShadow: tokens.shadows.card,
            }}
          >
            {badge}
          </Box>
        )}

        {/* Brand Logo Overlay */}
        {brandLogoUrl && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 32,
              height: 32,
              backgroundColor: tokens.colors.white,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: tokens.shadows.card,
              p: 0.5,
              '& img': { width: '100%', height: '100%', objectFit: 'contain' }
            }}
          >
            <img src={brandLogoUrl} alt="brand" />
          </Box>
        )}

        {/* Like Button */}
        <IconButton
          onClick={handleLike}
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: tokens.shadows.card,
            color: isLiked ? tokens.colors.error : tokens.colors.textSecondary,
            '&:hover': { backgroundColor: tokens.colors.white, transform: 'scale(1.1)' }
          }}
        >
          {isLiked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
        </IconButton>

        {/* Carousel Dots */}
        {images.length > 1 && (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1,
            }}
          >
            {images.map((img, i) => (
              <Box
                key={img} // Use image URL as key to satisfy ESLint
                onClick={(e) => { e.stopPropagation(); setActiveImage(i); }}
                sx={{
                  width: activeImage === i ? 16 : 6,
                  height: 6,
                  borderRadius: tokens.radius.full,
                  backgroundColor: tokens.colors.white,
                  opacity: activeImage === i ? 1 : 0.6,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
              />
            ))}
          </Stack>
        )}
      </Box>

      {/* Content Section */}
      <Box sx={{ p: 3 }}>
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.lg,
            fontWeight: 900,
            color: tokens.colors.textPrimary,
            fontFamily: tokens.typography.fontFamily,
            lineHeight: 1.1,
            mb: 0.5,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </Typography>

        {(brand || size) && (
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.xs,
              color: tokens.colors.textSecondary,
              fontFamily: tokens.typography.fontFamily,
              fontWeight: 600,
              mb: 1.5,
            }}
          >
            {brand}{brand && size ? ' • ' : ''}{size}
          </Typography>
        )}

        {/* Action Row */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
          <Box
            sx={{
              backgroundColor: tokens.colors.background,
              px: 2,
              py: 0.8,
              borderRadius: tokens.radius.full,
              fontSize: tokens.typography.fontSizes.base,
              fontWeight: 800,
              color: tokens.colors.textPrimary,
              fontFamily: tokens.typography.fontFamily,
            }}
          >
            KES {price.toLocaleString()}
            {originalPrice && (
              <Typography
                component="span"
                sx={{
                  ml: 1,
                  fontSize: 10,
                  color: tokens.colors.textDisabled,
                  textDecoration: 'line-through',
                }}
              >
                KES {originalPrice.toLocaleString()}
              </Typography>
            )}
          </Box>

          <MitumbaPrimaryButton
            label="Buy Now"
            variant="primary"
            size="small"
            onClick={handleBuy}
            icon={<ArrowOutwardIcon />}
            iconPosition="right"
            sx={{ borderRadius: tokens.radius.full, px: 3 }}
          />
        </Stack>
      </Box>
    </Box>
  )
}

export default ListingCard
