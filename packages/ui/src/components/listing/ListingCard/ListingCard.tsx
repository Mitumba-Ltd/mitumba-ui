import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckIcon from '@mui/icons-material/Check';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { tokens } from '@mitumba/tokens';
import { ConditionBadge } from '../ConditionBadge';
import type { ListingCardProps } from './ListingCard.types';

function isVideo(url: string): boolean {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url);
}

/**
 * Listing card — Pinterest/Depop-style. Supports multi-image + video media,
 * wishlist toggle, add-to-cart, condition chip. No fixed height — image takes
 * natural aspect ratio. Works in CSS grid/masonry.
 */
export function ListingCard({
  id,
  title,
  price,
  media,
  storeName,
  condition,
  isSaved = false,
  onSaveToggle,
  onClick,
  onAddToCart,
  aspectRatio = '4/5',
}: ListingCardProps): React.ReactElement {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [cartAdded, setCartAdded] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const currentMedia = media[activeIndex] ?? media[0];

  // Reset loaded state when media changes
  React.useEffect(() => {
    if (!isVideo(currentMedia)) setImageLoaded(false);
  }, [currentMedia]);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSaveToggle?.(id);
  };

  const handleCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartAdded) return;
    setCartAdded(true);
    onAddToCart?.(id);
    setTimeout(() => setCartAdded(false), 1500);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : media.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev < media.length - 1 ? prev + 1 : 0));
  };

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setActiveIndex(idx);
  };

  const hasMultiple = media.length > 1;

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
        '@keyframes tickPop': {
          '0%': { transform: 'scale(0) rotate(-45deg)' },
          '60%': { transform: 'scale(1.3) rotate(0deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        '@keyframes shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        '&:hover': onClick ? {
          borderColor: tokens.colors.green,
          transform: 'translateY(-2px)',
        } : {},
      }}
    >
      {/* Media — reserved aspect ratio with shimmer, natural height after load */}
      <Box sx={{ position: 'relative', width: '100%', ...(!imageLoaded && !isVideo(currentMedia) ? { aspectRatio } : {}), overflow: 'hidden', bgcolor: tokens.colors.background }}>
        {/* Shimmer placeholder — visible until image loads */}
        {!isVideo(currentMedia) && !imageLoaded && (
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

        {isVideo(currentMedia) ? (
          <Box
            component="video"
            src={currentMedia}
            muted
            autoPlay
            loop
            playsInline
            sx={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
          />
        ) : (
          <Box
            component="img"
            src={currentMedia}
            alt={title}
            onLoad={() => setImageLoaded(true)}
            sx={{
              width: '100%',
              display: 'block',
              ...(imageLoaded
                ? { position: 'relative', height: 'auto', opacity: 1 }
                : { position: 'absolute', inset: 0, height: '100%', objectFit: 'cover', opacity: 0 }),
              transition: 'opacity 0.4s ease-in-out',
            }}
          />
        )}

        {/* Prev/Next arrows — visible on hover (desktop), always on mobile for multi-media */}
        {hasMultiple && (
          <>
            <IconButton
              aria-label="Previous image"
              onClick={handlePrev}
              size="small"
              sx={{
                position: 'absolute',
                top: '50%',
                left: `${tokens.spacing.xs}px`,
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(4px)',
                width: 28,
                height: 28,
                opacity: { xs: 0.9, md: 0 },
                transition: tokens.motion.transitions.interaction,
                '.MuiBox-root:hover &': { opacity: 1 },
                '&:hover': { bgcolor: tokens.colors.white },
              }}
            >
              <ChevronLeftIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton
              aria-label="Next image"
              onClick={handleNext}
              size="small"
              sx={{
                position: 'absolute',
                top: '50%',
                right: `${tokens.spacing.xs}px`,
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(4px)',
                width: 28,
                height: 28,
                opacity: { xs: 0.9, md: 0 },
                transition: tokens.motion.transitions.interaction,
                '.MuiBox-root:hover &': { opacity: 1 },
                '&:hover': { bgcolor: tokens.colors.white },
              }}
            >
              <ChevronRightIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </>
        )}

        {/* Carousel dots */}
        {hasMultiple && (
          <Box sx={{ position: 'absolute', bottom: `${tokens.spacing.sm}px`, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '4px' }}>
            {media.map((_, idx) => (
              <Box
                key={`dot-${String(idx)}`}
                onClick={(e) => handleDotClick(e, idx)}
                sx={{
                  width: activeIndex === idx ? 12 : 6,
                  height: 6,
                  borderRadius: tokens.radius.full,
                  bgcolor: tokens.colors.white,
                  opacity: activeIndex === idx ? 1 : 0.55,
                  transition: tokens.motion.transitions.interaction,
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                }}
              />
            ))}
          </Box>
        )}

        {/* Wishlist heart — top right */}
        {onSaveToggle && (
          <IconButton
            aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
            onClick={handleSave}
            size="small"
            sx={{
              position: 'absolute',
              top: `${tokens.spacing.sm}px`,
              right: `${tokens.spacing.sm}px`,
              bgcolor: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(4px)',
              color: isSaved ? tokens.colors.error : tokens.colors.textSecondary,
              '&:hover': { bgcolor: tokens.colors.white, transform: 'scale(1.1)' },
            }}
          >
            {isSaved ? <FavoriteIcon sx={{ fontSize: 18 }} /> : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}
          </IconButton>
        )}

        {/* Condition badge — bottom left */}
        {condition && (
          <Box
            sx={{
              position: 'absolute',
              bottom: hasMultiple ? `${tokens.spacing.xl}px` : `${tokens.spacing.sm}px`,
              left: `${tokens.spacing.sm}px`,
            }}
          >
            <ConditionBadge grade={condition} />
          </Box>
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

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
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
                  mt: '2px',
                }}
              >
                {storeName}
              </Typography>
            )}
          </Box>

          {/* Add to cart — animates to tick on click */}
          {onAddToCart && (
            <IconButton
              aria-label={cartAdded ? 'Added to cart' : 'Add to cart'}
              onClick={handleCart}
              size="small"
              sx={{
                bgcolor: cartAdded ? tokens.colors.green : tokens.colors.green,
                color: tokens.colors.white,
                width: 32,
                height: 32,
                transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s',
                transform: cartAdded ? 'scale(1.15)' : 'scale(1)',
                '&:hover': { bgcolor: tokens.colors.greenDark, transform: cartAdded ? 'scale(1.15)' : 'scale(1.05)' },
              }}
            >
              {cartAdded
                ? <CheckIcon sx={{ fontSize: 18, animation: 'tickPop 0.3s ease' }} />
                : <AddShoppingCartIcon sx={{ fontSize: 16 }} />
              }
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ListingCard;
