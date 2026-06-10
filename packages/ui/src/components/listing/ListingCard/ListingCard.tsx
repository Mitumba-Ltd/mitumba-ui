import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { tokens } from '@mitumba/tokens';
import type { ListingCardProps } from './ListingCard.types';

const CONDITION_LABELS: Record<string, string> = {
  new: 'New',
  like_new: 'Like New',
  good: 'Good',
  fair: 'Fair',
};

/**
 * Listing card — Pinterest/Depop-style. No fixed height, image takes natural
 * aspect ratio. Works in CSS grid or masonry without breaking.
 */
export function ListingCard({
  id,
  title,
  price,
  imageUrl,
  storeName,
  condition,
  isSaved = false,
  onSaveToggle,
  onClick,
}: ListingCardProps): React.ReactElement {
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSaveToggle?.(id);
  };

  return (
    <Box
      onClick={() => onClick?.(id)}
      sx={{
        width: '100%',
        borderRadius: `${tokens.radius.lg}px`,
        border: `1px solid ${tokens.colors.border}`,
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        bgcolor: tokens.colors.surface,
        transition: tokens.motion.transitions.interaction,
        '&:hover': onClick ? {
          borderColor: tokens.colors.green,
          transform: 'translateY(-2px)',
        } : {},
      }}
    >
      {/* Image — natural aspect ratio, no fixed height */}
      <Box sx={{ position: 'relative', width: '100%', lineHeight: 0 }}>
        <Box
          component="img"
          src={imageUrl}
          alt={title}
          sx={{
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'cover',
          }}
        />

        {/* Wishlist heart — top right overlay */}
        {onSaveToggle && (
          <IconButton
            aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
            onClick={handleSave}
            size="small"
            sx={{
              position: 'absolute',
              top: `${tokens.spacing.sm}px`,
              right: `${tokens.spacing.sm}px`,
              bgcolor: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(4px)',
              color: isSaved ? tokens.colors.error : tokens.colors.textSecondary,
              '&:hover': { bgcolor: tokens.colors.white, transform: 'scale(1.1)' },
            }}
          >
            {isSaved ? <FavoriteIcon sx={{ fontSize: 18 }} /> : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}
          </IconButton>
        )}

        {/* Condition chip — bottom left overlay */}
        {condition && (
          <Chip
            label={CONDITION_LABELS[condition]}
            size="small"
            sx={{
              position: 'absolute',
              bottom: `${tokens.spacing.sm}px`,
              left: `${tokens.spacing.sm}px`,
              bgcolor: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(4px)',
              fontWeight: 600,
              fontSize: tokens.typography.fontSizes.xs,
              height: 22,
            }}
          />
        )}
      </Box>

      {/* Content */}
      <Box sx={{ p: `${tokens.spacing.base}px` }}>
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.base,
            fontWeight: 600,
            color: tokens.colors.textPrimary,
            fontFamily: tokens.typography.fontFamily,
            lineHeight: tokens.typography.lineHeights.snug,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: `${tokens.spacing.xs}px`,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.md,
            fontWeight: 800,
            color: tokens.colors.textPrimary,
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          KES {price.toLocaleString()}
        </Typography>

        {storeName && (
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.xs,
              color: tokens.colors.textSecondary,
              fontFamily: tokens.typography.fontFamily,
              mt: `${tokens.spacing.xs}px`,
            }}
          >
            {storeName}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default ListingCard;
