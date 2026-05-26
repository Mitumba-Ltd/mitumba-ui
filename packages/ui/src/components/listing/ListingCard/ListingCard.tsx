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
 * Engineered for absolute geometric harmony and high-fidelity action states.
 * Reigned in for professional visual sanity (Very Serious standard).
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
          borderRadius: `${tokens.radius.lg}px`, // Standardized to 16px (Serious)
          overflow: 'hidden',
          // High-end layered shadow, no clunky borders
          boxShadow: `
            0 2px 4px 0 rgba(0, 0, 0, 0.05),
            0 8px 16px -4px rgba(0, 0, 0, 0.1)
          `,
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          cursor: 'pointer',
          position: 'relative',
          
          '&:hover': {
            transform: 'translateY(-6px)',
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
            transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        {/* Badge Overlay */}
        {badge && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(4px)',
              px: 1.5,
              py: 0.5,
              borderRadius: tokens.radius.full,
              fontSize: 10,
              fontWeight: 800,
              color: tokens.colors.textPrimary,
              fontFamily: tokens.typography.fontFamily,
              textTransform: 'uppercase',
              boxShadow: tokens.shadows.card,
              zIndex: 2,
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
              top: 12,
              right: 12,
              width: 32,
              height: 32,
              backgroundColor: tokens.colors.white,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: tokens.shadows.card,
              p: 0.5,
              zIndex: 2,
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
            bottom: 12,
            right: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            boxShadow: tokens.shadows.card,
            color: isLiked ? tokens.colors.error : tokens.colors.textSecondary,
            zIndex: 2,
            '&:hover': { backgroundColor: tokens.colors.white, transform: 'scale(1.1)' }
          }}
        >
          {isLiked ? <FavoriteIcon sx={{ fontSize: 18 }} /> : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}
        </IconButton>

        {/* Carousel Dots (Anime Style) */}
        {images.length > 1 && (
          <Stack
            direction="row"
            spacing={0.8}
            sx={{
              position: 'absolute',
              bottom: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 2,
            }}
          >
            {images.map((img, i) => (
              <Box
                key={img}
                onClick={(e) => { e.stopPropagation(); setActiveImage(i); }}
                sx={{
                  width: activeImage === i ? 12 : 6,
                  height: 6,
                  borderRadius: tokens.radius.full,
                  backgroundColor: tokens.colors.white,
                  opacity: activeImage === i ? 1 : 0.5,
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                }}
              />
            ))}
          </Stack>
        )}
      </Box>

      {/* Content Section */}
      <Box sx={{ p: 2.5 }}> {/* Optimized padding */}
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.base,
            fontWeight: 800,
            color: tokens.colors.textPrimary,
            fontFamily: tokens.typography.fontFamily,
            lineHeight: 1.2,
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
              mb: 2,
            }}
          >
            {brand}{brand && size ? ' • ' : ''}{size}
          </Typography>
        )}

        {/* Action Row */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Box
            sx={{
              backgroundColor: tokens.colors.background,
              px: 1.5,
              py: 0.8,
              borderRadius: tokens.radius.full,
              fontSize: tokens.typography.fontSizes.base,
              fontWeight: 800,
              color: tokens.colors.textPrimary,
              fontFamily: tokens.typography.fontFamily,
              display: 'flex',
              alignItems: 'baseline',
              gap: 0.5,
            }}
          >
            <Typography component="span" sx={{ fontSize: 10, fontWeight: 900 }}>KES</Typography>
            {price.toLocaleString()}
            {originalPrice && (
              <Typography
                component="span"
                sx={{
                  ml: 0.5,
                  fontSize: 10,
                  color: tokens.colors.textDisabled,
                  textDecoration: 'line-through',
                  fontWeight: 600,
                }}
              >
                {originalPrice.toLocaleString()}
              </Typography>
            )}
          </Box>

          <MitumbaPrimaryButton
            label="Buy Now"
            variant="primary"
            size="small"
            onClick={handleBuy}
            icon={<ArrowOutwardIcon sx={{ fontSize: 16 }} />}
            iconPosition="right"
            sx={{ 
              borderRadius: tokens.radius.full, 
              px: 2.5,
              height: 32, // Forced small height for density
              fontSize: 11,
              fontWeight: 900,
            }}
          />
        </Stack>
      </Box>
    </Box>
  )
}

export default ListingCard
