/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '@mitumba/tokens';
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton';
import { SemanticTitle } from '../../../internal/SemanticTitle';
import type { HeadingLevel } from '../../../types/semantic';
import type { VAZIShowcaseProps, VAZIShowcaseOutfit, VAZIShowcaseItem } from './VAZIShowcase.types';

/**
 * VAZIShowcase — the VAZI AI stylist feed.
 * Desktop: 3D perspective runway carousel with glassmorphism outfit panel.
 * Mobile: Vertical swipe feed with bottom sheet outfit overlay.
 *
 * Accessibility: the feed is a keyboard-focusable region; ArrowUp/ArrowDown
 * (and Left/Right) move between looks. Carousel models and item rows are native
 * `<button>`s, and the mobile sheet toggle is a native button that reports its
 * expanded state. Typography is inherited from the host theme (no local
 * font-family override).
 */
export function VAZIShowcase({
  outfits,
  activeIndex = 0,
  onIndexChange,
  onItemClick,
  onShopAll,
  titleLevel,
  sectionTitleLevel,
}: VAZIShowcaseProps): React.ReactElement {
  const [current, setCurrent] = React.useState(activeIndex);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [sheetExpanded, setSheetExpanded] = React.useState(false);
  const touchStartY = React.useRef<number | null>(null);

  React.useEffect(() => { setCurrent(activeIndex); }, [activeIndex]);

  const navigateTo = (index: number) => {
    if (index < 0 || index >= outfits.length || index === current || isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setSheetExpanded(false);
    onIndexChange?.(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) < 30) return;
    if (e.deltaY > 0) navigateTo(current + 1);
    else navigateTo(current - 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    touchStartY.current = null;
    if (Math.abs(diff) < 60) return;
    if (diff > 0) navigateTo(current + 1); // swipe up = next
    else navigateTo(current - 1); // swipe down = prev
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      navigateTo(current + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      navigateTo(current - 1);
    }
  };

  const activeOutfit = outfits[current];
  if (!activeOutfit) return <Box />;

  return (
    <Box
      role="region"
      aria-label="VAZI outfit showcase"
      aria-roledescription="carousel"
      tabIndex={0}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      sx={{
        width: '100%',
        height: '100vh',
        bgcolor: '#e8f0f2',
        background: '#e8f0f2',
        overflow: 'hidden',
        position: 'relative',
        '&:focus-visible': { outline: `2px solid ${tokens.colors.green}`, outlineOffset: -2 },
      }}
    >
      {/* ═══ DESKTOP LAYOUT ═══ */}
      <Box sx={{ display: { xs: 'none', md: 'grid' }, gridTemplateColumns: '1fr 1.6fr 1fr', width: '100%', height: '100%' }}>

        {/* Left — Collection info */}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', py: '40px', pl: '60px', zIndex: 10 }}>
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 400, letterSpacing: '2px', color: '#888', textTransform: 'uppercase', mb: '16px' }}>
              VAZI Collection
            </Typography>
            <Typography sx={{ fontSize: 11, lineHeight: 1.6, color: '#999', fontWeight: 300, maxWidth: 280 }}>
              AI-curated outfit combinations from verified Mitumba sellers. Each look is assembled from real listings you can shop instantly.
            </Typography>
          </Box>
          <Box>
            <SemanticTitle titleLevel={titleLevel} sx={{ fontSize: 48, fontWeight: 300, letterSpacing: '4px', color: '#333' }}>
              LOOK {String(current + 1).padStart(2, '0')}
            </SemanticTitle>
            <Typography sx={{ fontSize: 10, letterSpacing: '3px', color: '#aaa', textTransform: 'uppercase' }}>
              {current + 1} of {outfits.length}
            </Typography>
          </Box>
        </Box>

        {/* Center — 3D Carousel */}
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1200px', perspectiveOrigin: 'center center' }}>
          <Box sx={{ position: 'relative', width: '100%', height: '100vh', transformStyle: 'preserve-3d' }}>
            {outfits.map((outfit, i) => (
              <DesktopModelItem key={outfit.id} outfit={outfit} diff={i - current} lookNumber={i + 1} onClick={() => navigateTo(i)} />
            ))}
          </Box>
        </Box>

        {/* Right — Outfit panel */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', py: '80px', pr: '60px', zIndex: 10 }}>
          <DesktopOutfitPanel outfit={activeOutfit} sectionTitleLevel={sectionTitleLevel} onItemClick={onItemClick} onShopAll={onShopAll} />
        </Box>
      </Box>

      {/* ═══ MOBILE LAYOUT ═══ */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', width: '100%', height: '100vh', position: 'relative' }}>

        {/* Look counter pill */}
        <Box sx={{ position: 'absolute', top: `${tokens.spacing.lg}px`, left: `${tokens.spacing.lg}px`, zIndex: 20, bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', borderRadius: `${tokens.radius.full}px`, px: `${tokens.spacing.md}px`, py: `${tokens.spacing.xs}px` }}>
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#444' }}>
            {current + 1} / {outfits.length}
          </Typography>
        </Box>

        {/* VAZI pill */}
        <Box sx={{ position: 'absolute', top: `${tokens.spacing.lg}px`, right: `${tokens.spacing.lg}px`, zIndex: 20, bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', borderRadius: `${tokens.radius.full}px`, px: `${tokens.spacing.md}px`, py: `${tokens.spacing.xs}px` }}>
          <Typography sx={{ fontSize: 10, fontWeight: 700, color: tokens.colors.earth, letterSpacing: 1.5, textTransform: 'uppercase' }}>VAZI</Typography>
        </Box>

        {/* Model — full viewport */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          {outfits.map((outfit, i) => (
            <Box
              key={outfit.id}
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                opacity: i === current ? 1 : 0,
                transform: (() => {
                  if (i === current) return 'translateY(0) scale(1)';
                  if (i < current) return 'translateY(-30%) scale(0.9)';
                  return 'translateY(30%) scale(0.9)';
                })(),
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                pointerEvents: i === current ? 'auto' : 'none',
              }}
            >
              {outfit.modelMediaType === 'video' ? (
                <Box component="video" src={outfit.modelMediaUrl} autoPlay muted loop playsInline sx={{ height: '75vh', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.08))' }} />
              ) : (
                <Box component="img" src={outfit.modelMediaUrl} alt={outfit.modelAlt} sx={{ height: '75vh', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.08))' }} />
              )}
            </Box>
          ))}
        </Box>

        {/* Bottom sheet — outfit items */}
        <Box
          component="section"
          aria-label={`This look — ${activeOutfit.items.length} items (mobile)`}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 30,
            bgcolor: 'rgba(255, 255, 255, 0.35)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.4)',
            borderRadius: `${tokens.radius.xl}px ${tokens.radius.xl}px 0 0`,
            boxShadow: '0 -4px 24px rgba(0,0,0,0.06)',
            px: `${tokens.spacing.xl}px`,
            pt: `${tokens.spacing.lg}px`,
            pb: `${tokens.spacing.xl}px`,
            maxHeight: sheetExpanded ? '70vh' : '180px',
            transition: 'max-height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            overflowY: sheetExpanded ? 'auto' : 'hidden',
          }}
        >
          {/* Sheet toggle — native button covering the handle + header */}
          <Box
            component="button"
            type="button"
            onClick={() => setSheetExpanded(!sheetExpanded)}
            aria-expanded={sheetExpanded}
            aria-label={sheetExpanded ? 'Collapse outfit details' : 'Expand outfit details'}
            sx={{
              all: 'unset',
              display: 'block',
              width: '100%',
              cursor: 'pointer',
              '&:focus-visible': { outline: `2px solid ${tokens.colors.green}`, outlineOffset: 2, borderRadius: `${tokens.radius.sm}px` },
            }}
          >
            {/* Handle */}
            <Box sx={{ width: 36, height: 4, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.15)', mx: 'auto', mb: `${tokens.spacing.md}px` }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: `${tokens.spacing.md}px` }}>
              <SemanticTitle titleLevel={sectionTitleLevel} sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', color: '#555', textTransform: 'uppercase' }}>
                This look · {activeOutfit.items.length} items
              </SemanticTitle>
              <Typography component="span" sx={{ fontSize: 14, fontWeight: 800, color: '#222' }}>
                KES {activeOutfit.totalPrice.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          {/* Items horizontal scroll (collapsed) / vertical list (expanded) */}
          <Box sx={{ display: 'flex', flexDirection: sheetExpanded ? 'column' : 'row', gap: `${tokens.spacing.md}px`, overflowX: sheetExpanded ? 'visible' : 'auto', pb: `${tokens.spacing.sm}px` }}>
            {activeOutfit.items.map((item: VAZIShowcaseItem) => (
              <Box
                key={item.id}
                component="button"
                type="button"
                onClick={(e) => { e.stopPropagation(); onItemClick?.(item.id); }}
                aria-label={`View ${item.title}`}
                sx={{
                  all: 'unset',
                  display: 'flex',
                  alignItems: 'center',
                  gap: `${tokens.spacing.sm}px`,
                  flexShrink: 0,
                  cursor: 'pointer',
                  minWidth: sheetExpanded ? undefined : 140,
                  p: `${tokens.spacing.xs}px`,
                  borderRadius: `${tokens.radius.sm}px`,
                  '&:active': { bgcolor: 'rgba(0,0,0,0.04)' },
                  '&:focus-visible': { outline: `2px solid ${tokens.colors.green}`, outlineOffset: 2 },
                }}
              >
                <Box component="img" src={item.imageUrl} alt={item.title} sx={{ width: 40, height: 40, borderRadius: `${tokens.radius.sm}px`, objectFit: 'cover', flexShrink: 0, border: '1px solid rgba(0,0,0,0.06)' }} />
                <Box sx={{ minWidth: 0, textAlign: 'left' }}>
                  <Typography component="span" sx={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: sheetExpanded ? 200 : 80 }}>
                    {item.title}
                  </Typography>
                  <Typography component="span" sx={{ display: 'block', fontSize: 10, color: '#888' }}>
                    KES {item.price.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {sheetExpanded && (
            <Box sx={{ mt: `${tokens.spacing.lg}px` }}>
              <MitumbaPrimaryButton fullWidth label="Shop this look" onClick={() => onShopAll?.(activeOutfit.id)} />
            </Box>
          )}
        </Box>

        {/* Swipe hint */}
        {!sheetExpanded && current < outfits.length - 1 && (
          <Box sx={{ position: 'absolute', bottom: 190, left: '50%', transform: 'translateX(-50%)', zIndex: 20, opacity: 0.5 }}>
            <Typography sx={{ fontSize: 10, color: '#888', textAlign: 'center' }}>↑ swipe for next</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

// ═══ DESKTOP SUBCOMPONENTS ═══

function DesktopModelItem({ outfit, diff, lookNumber, onClick }: { outfit: VAZIShowcaseOutfit; diff: number; lookNumber: number; onClick: () => void }): React.ReactElement {
  const isActive = diff === 0;
  const absDiff = Math.abs(diff);

  if (absDiff > 4) return <Box sx={{ display: 'none' }} />;

  const getTransform = (): string => {
    if (isActive) return 'translate(-50%, -50%) translateZ(200px) scale(1)';
    const xShift = diff * 120;
    const z = -200 * absDiff;
    const scale = Math.max(0.4, 1 - absDiff * 0.25);
    return `translate(calc(-50% + ${xShift}%), -50%) translateZ(${z}px) scale(${scale})`;
  };

  const sharedSx = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transformOrigin: 'center bottom',
    transform: getTransform(),
    opacity: isActive ? 1 : Math.max(0.1, 0.6 - (absDiff - 1) * 0.25),
    filter: `blur(${isActive ? 0 : Math.min(10, absDiff * 3)}px) saturate(${isActive ? 1 : 0.7})`,
    zIndex: isActive ? 100 : Math.max(1, 50 - absDiff * 10),
    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    pointerEvents: absDiff > 2 ? 'none' : 'auto',
  } as const;

  const media = outfit.modelMediaType === 'video' ? (
    <Box component="video" src={outfit.modelMediaUrl} autoPlay muted loop playsInline sx={{ height: '85vh', width: 'auto', objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))' }} />
  ) : (
    <Box component="img" src={outfit.modelMediaUrl} alt={outfit.modelAlt} sx={{ height: '85vh', width: 'auto', objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))' }} />
  );

  // Active model is presentational; inactive models are native buttons that
  // move the carousel to that look.
  if (isActive) {
    return <Box sx={{ ...sharedSx, cursor: 'default' }}>{media}</Box>;
  }

  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-label={`Go to look ${String(lookNumber).padStart(2, '0')}`}
      sx={{ ...sharedSx, all: 'unset', cursor: 'pointer', '&:focus-visible': { outline: `2px solid ${tokens.colors.green}`, outlineOffset: 2 } }}
    >
      {media}
    </Box>
  );
}

function DesktopOutfitPanel({ outfit, sectionTitleLevel, onItemClick, onShopAll }: { outfit: VAZIShowcaseOutfit; sectionTitleLevel?: HeadingLevel; onItemClick?: (id: string) => void; onShopAll?: (outfitId: string) => void }): React.ReactElement {
  return (
    <Box
      component="section"
      aria-label={`This look — ${outfit.items.length} items (desktop)`}
      sx={{
        position: 'relative',
        width: 300,
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
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '50%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
          borderRadius: `${tokens.radius.md}px ${tokens.radius.md}px 0 0`,
          pointerEvents: 'none',
        },
      }}
    >
      <SemanticTitle titleLevel={sectionTitleLevel} sx={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', color: '#666', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>
        This look · {outfit.items.length} items
      </SemanticTitle>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.md}px`, flex: 1, position: 'relative', zIndex: 1 }}>
        {outfit.items.map((item: VAZIShowcaseItem) => (
          <Box
            key={item.id}
            component="button"
            type="button"
            onClick={() => onItemClick?.(item.id)}
            aria-label={`View ${item.title}`}
            sx={{ all: 'unset', display: 'flex', alignItems: 'center', gap: `${tokens.spacing.md}px`, p: `${tokens.spacing.sm}px`, borderRadius: `${tokens.radius.sm}px`, cursor: onItemClick ? 'pointer' : 'default', transition: tokens.motion.transitions.interaction, '&:hover': onItemClick ? { bgcolor: 'rgba(0,0,0,0.04)' } : {}, '&:focus-visible': { outline: `2px solid ${tokens.colors.green}`, outlineOffset: 2 } }}
          >
            <Box component="img" src={item.imageUrl} alt={item.title} sx={{ width: 44, height: 44, borderRadius: `${tokens.radius.sm}px`, objectFit: 'cover', flexShrink: 0, border: '1px solid rgba(0,0,0,0.06)' }} />
            <Box sx={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
              <Typography component="span" sx={{ display: 'block', fontSize: 12, color: '#333', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</Typography>
              <Typography component="span" sx={{ display: 'block', fontSize: 11, color: '#888' }}>KES {item.price.toLocaleString()}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.06)', pt: `${tokens.spacing.lg}px`, position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: `${tokens.spacing.md}px` }}>
          <Typography sx={{ fontSize: 11, color: '#888' }}>Total</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 800, color: '#222' }}>KES {outfit.totalPrice.toLocaleString()}</Typography>
        </Box>
        <MitumbaPrimaryButton fullWidth label="Shop this look" onClick={() => onShopAll?.(outfit.id)} />
      </Box>
    </Box>
  );
}

export default VAZIShowcase;
