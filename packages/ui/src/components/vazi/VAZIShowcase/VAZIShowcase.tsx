import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { tokens } from '@mitumba/tokens';
import { AuthSubmitButton } from '../../foundation/AuthSubmitButton';
import type { VAZIShowcaseProps, VAZIShowcaseOutfit, VAZIShowcaseItem } from './VAZIShowcase.types';

/**
 * Model spotlight — renders a single model (video or image) with depth-based
 * scale and opacity for the perspective queue effect.
 */
function ModelSpotlight({ outfit, depth }: { outfit: VAZIShowcaseOutfit; depth: number }): React.ReactElement {
  const scale = Math.max(0.4, 1 - depth * 0.18);
  const opacity = Math.max(0.3, 1 - depth * 0.25);
  const blur = depth * 1.5;
  const zIndex = 10 - depth;

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: `${depth * 12}%`,
        height: '90%',
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
        opacity,
        filter: depth > 0 ? `blur(${blur}px)` : 'none',
        zIndex,
        transition: 'all 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
        pointerEvents: depth === 0 ? 'auto' : 'none',
      }}
    >
      {outfit.modelMediaType === 'video' ? (
        <Box
          component="video"
          src={outfit.modelMediaUrl}
          autoPlay
          muted
          loop
          playsInline
          sx={{ height: '100%', width: 'auto', objectFit: 'contain', display: 'block' }}
        />
      ) : (
        <Box
          component="img"
          src={outfit.modelMediaUrl}
          alt={outfit.modelAlt}
          sx={{ height: '100%', width: 'auto', objectFit: 'contain', display: 'block' }}
        />
      )}
    </Box>
  );
}

/**
 * Outfit panel — glassmorphism card showing the items in the focused outfit.
 */
function OutfitPanel({
  outfit,
  onItemClick,
  onShopAll,
}: {
  outfit: VAZIShowcaseOutfit;
  onItemClick?: (id: string) => void;
  onShopAll?: (outfitId: string) => void;
}): React.ReactElement {
  return (
    <Box
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: `${tokens.radius.xl}px`,
        border: '1px solid rgba(255, 255, 255, 0.2)',
        p: `${tokens.spacing.xl}px`,
        display: 'flex',
        flexDirection: 'column',
        gap: `${tokens.spacing.lg}px`,
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <Typography sx={{ fontSize: tokens.typography.fontSizes.sm, fontWeight: 700, color: tokens.colors.white, textTransform: 'uppercase', letterSpacing: 1 }}>
        This outfit
      </Typography>

      {/* Item list */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.md}px`, flex: 1 }}>
        {outfit.items.map((item: VAZIShowcaseItem) => (
          <Box
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: `${tokens.spacing.md}px`,
              p: `${tokens.spacing.sm}px`,
              borderRadius: `${tokens.radius.md}px`,
              cursor: onItemClick ? 'pointer' : 'default',
              transition: tokens.motion.transitions.interaction,
              '&:hover': onItemClick ? { bgcolor: 'rgba(255,255,255,0.1)' } : {},
            }}
          >
            <Box
              component="img"
              src={item.imageUrl}
              alt={item.title}
              sx={{ width: 48, height: 48, borderRadius: `${tokens.radius.md}px`, objectFit: 'cover', flexShrink: 0 }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: tokens.typography.fontSizes.sm, color: tokens.colors.white, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.title}
              </Typography>
              <Typography sx={{ fontSize: tokens.typography.fontSizes.xs, color: 'rgba(255,255,255,0.7)' }}>
                KES {item.price.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Total + CTA */}
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.15)', pt: `${tokens.spacing.lg}px` }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: `${tokens.spacing.md}px` }}>
          <Typography sx={{ fontSize: tokens.typography.fontSizes.sm, color: 'rgba(255,255,255,0.7)' }}>
            {outfit.items.length} items
          </Typography>
          <Typography sx={{ fontSize: tokens.typography.fontSizes.md, fontWeight: 800, color: tokens.colors.white }}>
            KES {outfit.totalPrice.toLocaleString()}
          </Typography>
        </Box>
        <AuthSubmitButton
          fullWidth
          label="Shop this look"
          onClick={() => onShopAll?.(outfit.id)}
        />
      </Box>
    </Box>
  );
}

/**
 * VAZIShowcase — the full VAZI experience. Depth-perspective model queue on the
 * left, glassmorphism outfit panel on the right. Scroll/arrow-driven transitions.
 */
export function VAZIShowcase({
  outfits,
  activeIndex = 0,
  onIndexChange,
  onItemClick,
  onShopAll,
}: VAZIShowcaseProps): React.ReactElement {
  const [current, setCurrent] = React.useState(activeIndex);

  React.useEffect(() => { setCurrent(activeIndex); }, [activeIndex]);

  const goNext = () => {
    const next = Math.min(current + 1, outfits.length - 1);
    setCurrent(next);
    onIndexChange?.(next);
  };

  const goPrev = () => {
    const prev = Math.max(current - 1, 0);
    setCurrent(prev);
    onIndexChange?.(prev);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 30) goNext();
    if (e.deltaY < -30) goPrev();
  };

  const activeOutfit = outfits[current];
  if (!activeOutfit) return <Box />;

  // Build the visible queue — show current + next 3
  const visibleOutfits = outfits.slice(current, current + 4);

  return (
    <Box
      onWheel={handleWheel}
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        overflow: 'hidden',
        bgcolor: tokens.colors.textPrimary,
        position: 'relative',
      }}
    >
      {/* Left — model depth queue */}
      <Box sx={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
        {visibleOutfits.map((outfit, i) => (
          <ModelSpotlight key={outfit.id} outfit={outfit} depth={i} />
        ))}

        {/* Navigation arrows */}
        <Box sx={{ position: 'absolute', bottom: `${tokens.spacing.xl}px`, right: `${tokens.spacing.xl}px`, display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.sm}px`, zIndex: 20 }}>
          <IconButton
            aria-label="Previous outfit"
            onClick={goPrev}
            disabled={current === 0}
            size="small"
            sx={{ bgcolor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: tokens.colors.white, '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' }, '&:disabled': { opacity: 0.3 } }}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
          <IconButton
            aria-label="Next outfit"
            onClick={goNext}
            disabled={current === outfits.length - 1}
            size="small"
            sx={{ bgcolor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: tokens.colors.white, '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' }, '&:disabled': { opacity: 0.3 } }}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </Box>

        {/* Outfit counter */}
        <Box sx={{ position: 'absolute', top: `${tokens.spacing.xl}px`, left: `${tokens.spacing.xl}px`, zIndex: 20 }}>
          <Typography sx={{ fontSize: tokens.typography.fontSizes.sm, color: 'rgba(255,255,255,0.6)' }}>
            {current + 1} / {outfits.length}
          </Typography>
        </Box>

        {/* VAZI branding */}
        <Box sx={{ position: 'absolute', top: `${tokens.spacing.xl}px`, right: `${tokens.spacing.xl}px`, zIndex: 20 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.xs}px`, bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', borderRadius: `${tokens.radius.full}px`, px: `${tokens.spacing.md}px`, py: `${tokens.spacing.xs}px` }}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 14, color: tokens.colors.earth }} />
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: tokens.colors.white, letterSpacing: 1.5, textTransform: 'uppercase' }}>
              VAZI
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Right — outfit panel */}
      <Box sx={{ width: { xs: '100%', md: 320 }, p: `${tokens.spacing.xl}px`, display: 'flex' }}>
        <OutfitPanel outfit={activeOutfit} onItemClick={onItemClick} onShopAll={onShopAll} />
      </Box>
    </Box>
  );
}

export default VAZIShowcase;
