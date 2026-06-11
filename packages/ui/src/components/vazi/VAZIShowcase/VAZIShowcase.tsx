import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '@mitumba/tokens';
import { AuthSubmitButton } from '../../foundation/AuthSubmitButton';
import type { VAZIShowcaseProps, VAZIShowcaseOutfit, VAZIShowcaseItem } from './VAZIShowcase.types';

/**
 * VAZIShowcase — 3D perspective runway carousel with glassmorphism outfit panel.
 * Models are displayed left-to-right with CSS perspective/translateZ depth.
 * Active model is center-focused, adjacent models recede into depth.
 */
export function VAZIShowcase({
  outfits,
  activeIndex = 0,
  onIndexChange,
  onItemClick,
  onShopAll,
}: VAZIShowcaseProps): React.ReactElement {
  const [current, setCurrent] = React.useState(activeIndex);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => { setCurrent(activeIndex); }, [activeIndex]);

  const navigateTo = (index: number) => {
    if (index < 0 || index >= outfits.length || index === current || isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    onIndexChange?.(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) < 30) return;
    if (e.deltaY > 0) navigateTo(current + 1);
    else navigateTo(current - 1);
  };

  const activeOutfit = outfits[current];
  if (!activeOutfit) return <Box />;

  return (
    <Box
      onWheel={handleWheel}
      sx={{
        width: '100%',
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1.6fr 1fr' },
        bgcolor: '#e8f0f2',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: tokens.typography.fontFamily,
      }}
    >
      {/* LEFT — Collection info + look counter */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', justifyContent: 'space-between', py: '40px', pl: '60px', zIndex: 10 }}>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 400, letterSpacing: '2px', color: '#888', textTransform: 'uppercase', mb: '16px' }}>
            VAZI Collection
          </Typography>
          <Typography sx={{ fontSize: 11, lineHeight: 1.6, color: '#999', fontWeight: 300, maxWidth: 280 }}>
            AI-curated outfit combinations from verified Mitumba sellers. Each look is assembled from real listings you can shop instantly.
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 48, fontWeight: 300, letterSpacing: '4px', color: '#333' }}>
            LOOK {String(current + 1).padStart(2, '0')}
          </Typography>
          <Typography sx={{ fontSize: 10, letterSpacing: '3px', color: '#aaa', textTransform: 'uppercase' }}>
            {current + 1} of {outfits.length}
          </Typography>
        </Box>
      </Box>

      {/* CENTER — 3D Model Carousel */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1200px',
          perspectiveOrigin: 'center center',
          overflow: 'visible',
          gridColumn: { xs: '1', md: '2' },
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
          {outfits.map((outfit, i) => {
            const diff = i - current;
            return (
              <ModelItem
                key={outfit.id}
                outfit={outfit}
                diff={diff}
                onClick={() => navigateTo(i)}
              />
            );
          })}
        </Box>
      </Box>

      {/* RIGHT — Glassmorphism outfit panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', py: { xs: '20px', md: '80px' }, px: { xs: '16px', md: '60px' }, zIndex: 10 }}>
        <OutfitPanel outfit={activeOutfit} onItemClick={onItemClick} onShopAll={onShopAll} />
      </Box>

      {/* Mobile look counter */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'absolute', top: '16px', left: '16px', zIndex: 20 }}>
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
          Look {current + 1}/{outfits.length}
        </Typography>
      </Box>
    </Box>
  );
}

/**
 * Single model in the 3D carousel. Position determined by `diff` from active index.
 */
function ModelItem({ outfit, diff, onClick }: { outfit: VAZIShowcaseOutfit; diff: number; onClick: () => void }): React.ReactElement {
  const isActive = diff === 0;
  const absDiff = Math.abs(diff);

  // Position, scale, opacity based on distance from center
  const getTransform = (): string => {
    if (isActive) return 'translate(-50%, -50%) translateZ(200px) scale(1)';
    const xShift = diff < 0 ? -120 * absDiff : 120 * absDiff;
    const z = -200 * absDiff;
    const scale = Math.max(0.4, 1 - absDiff * 0.25);
    return `translate(calc(-50% + ${xShift}%), -50%) translateZ(${z}px) scale(${scale})`;
  };

  const getOpacity = (): number => {
    if (isActive) return 1;
    if (absDiff === 1) return 0.6;
    return Math.max(0.1, 0.4 - absDiff * 0.15);
  };

  const getBlur = (): number => {
    if (isActive) return 0;
    if (absDiff === 1) return 2;
    return Math.min(10, absDiff * 4);
  };

  const getZIndex = (): number => {
    if (isActive) return 100;
    return Math.max(1, 50 - absDiff * 10);
  };

  // Hide models too far away
  if (absDiff > 4) return <Box sx={{ display: 'none' }} />;

  return (
    <Box
      onClick={!isActive ? onClick : undefined}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transformOrigin: 'center bottom',
        transform: getTransform(),
        opacity: getOpacity(),
        filter: `blur(${getBlur()}px) saturate(${isActive ? 1 : 0.7})`,
        zIndex: getZIndex(),
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        cursor: isActive ? 'default' : 'pointer',
        pointerEvents: absDiff > 2 ? 'none' : 'auto',
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
          sx={{
            height: '85vh',
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))',
          }}
        />
      ) : (
        <Box
          component="img"
          src={outfit.modelMediaUrl}
          alt={outfit.modelAlt}
          sx={{
            height: '85vh',
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))',
          }}
        />
      )}
    </Box>
  );
}

/**
 * Glassmorphism panel showing outfit items for the active model.
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
        position: 'relative',
        width: { xs: '100%', md: 300 },
        maxHeight: '80vh',
        bgcolor: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: `${tokens.radius.md}px`,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 32px rgba(0,0,0,0.05)',
        p: `${tokens.spacing.xl}px`,
        display: 'flex',
        flexDirection: 'column',
        gap: `${tokens.spacing.lg}px`,
        overflowY: 'auto',
        // Top gradient shine
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
          borderRadius: `${tokens.radius.md}px ${tokens.radius.md}px 0 0`,
          pointerEvents: 'none',
        },
      }}
    >
      <Typography sx={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', color: '#666', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>
        This look · {outfit.items.length} items
      </Typography>

      {/* Items */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.md}px`, flex: 1, position: 'relative', zIndex: 1 }}>
        {outfit.items.map((item: VAZIShowcaseItem) => (
          <Box
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: `${tokens.spacing.md}px`,
              p: `${tokens.spacing.sm}px`,
              borderRadius: `${tokens.radius.sm}px`,
              cursor: onItemClick ? 'pointer' : 'default',
              transition: tokens.motion.transitions.interaction,
              '&:hover': onItemClick ? { bgcolor: 'rgba(0,0,0,0.04)' } : {},
            }}
          >
            <Box
              component="img"
              src={item.imageUrl}
              alt={item.title}
              sx={{ width: 44, height: 44, borderRadius: `${tokens.radius.sm}px`, objectFit: 'cover', flexShrink: 0, border: '1px solid rgba(0,0,0,0.06)' }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 12, color: '#333', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.title}
              </Typography>
              <Typography sx={{ fontSize: 11, color: '#888' }}>
                KES {item.price.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Total + CTA */}
      <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.06)', pt: `${tokens.spacing.lg}px`, position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: `${tokens.spacing.md}px` }}>
          <Typography sx={{ fontSize: 11, color: '#888' }}>Total</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 800, color: '#222' }}>
            KES {outfit.totalPrice.toLocaleString()}
          </Typography>
        </Box>
        <AuthSubmitButton fullWidth label="Shop this look" onClick={() => onShopAll?.(outfit.id)} />
      </Box>
    </Box>
  );
}

export default VAZIShowcase;
