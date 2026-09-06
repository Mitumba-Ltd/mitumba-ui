/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Fade from '@mui/material/Fade';
import { tokens } from '@mitumba/tokens';
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton';
import { SemanticTitle } from '../../../internal/SemanticTitle';
import type { VAZIHeroSpotlightProps, VAZIHeroOutfit } from './VAZIHeroSpotlight.types';
import type { VAZIShowcaseItem } from '../VAZIShowcase/VAZIShowcase.types';

/**
 * VAZIHeroSpotlight — row of living models standing side by side.
 * Tap/click a model → floating popover shows outfit details + "Shop" CTA.
 * Clean, no clutter — just the models alive on a subtle background.
 *
 * Accessibility: each model is a native `<button>` so keyboard activation
 * (Enter/Space) comes for free. The popover is a labelled dialog that closes
 * on Escape or an outside click and returns focus to the triggering model.
 */
export function VAZIHeroSpotlight({
  outfits,
  title = 'VAZI Featured',
  onShopLook,
  onItemClick,
  onSeeAll,
  titleLevel,
  seeAllHref,
}: VAZIHeroSpotlightProps): React.ReactElement {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  const handleModelClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    if (activeId === id) {
      setActiveId(null);
      setAnchorEl(null);
    } else {
      triggerRef.current = e.currentTarget;
      setActiveId(id);
      setAnchorEl(e.currentTarget);
    }
  };

  const handleClose = () => {
    setActiveId(null);
    setAnchorEl(null);
    // Return focus to the model that opened the popover.
    triggerRef.current?.focus();
  };

  const handlePopoverKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      handleClose();
    }
  };

  const activeOutfit = outfits.find((o) => o.id === activeId);
  const titleId = 'vazi-hero-popover-title';

  return (
    <Box sx={{ mb: `${tokens.spacing.huge}px` }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: `${tokens.spacing.lg}px` }}>
        <SemanticTitle
          titleLevel={titleLevel}
          sx={{ fontSize: tokens.typography.fontSizes.lg, fontWeight: 800, color: tokens.colors.textPrimary, letterSpacing: '-0.02em' }}
        >
          {title}
        </SemanticTitle>
        {onSeeAll && (
          <SeeAllControl href={seeAllHref} onClick={onSeeAll} />
        )}
      </Box>

      {/* Models row — evenly spaced, contained */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: `repeat(${outfits.length}, 200px)`, md: `repeat(${outfits.length}, 1fr)` },
          gap: { xs: `${tokens.spacing.sm}px`, md: `${tokens.spacing.md}px` },
          overflowX: { xs: 'auto', md: 'hidden' },
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          minHeight: { xs: 320, md: 420 },
          background: 'linear-gradient(180deg, #f0f4f5 0%, #e8eef0 100%)',
          borderRadius: `${tokens.radius.xl}px`,
          position: 'relative',
          p: { xs: `${tokens.spacing.md}px`, md: `${tokens.spacing.lg}px` },
        }}
      >
        {outfits.map((outfit) => (
          <ModelFigure
            key={outfit.id}
            outfit={outfit}
            isActive={activeId === outfit.id}
            onClick={(e) => handleModelClick(e, outfit.id)}
          />
        ))}
      </Box>

      {/* Floating popover */}
      <Popper open={!!activeOutfit} anchorEl={anchorEl} placement="bottom-start" transition sx={{ zIndex: 1300 }}>
        {({ TransitionProps }) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Fade {...TransitionProps} timeout={200}>
            <Box>
              <ClickAwayListener onClickAway={handleClose}>
                <Box>
                  {activeOutfit ? (
                    <Box
                      role="dialog"
                      aria-modal={false}
                      aria-labelledby={titleId}
                      onKeyDown={handlePopoverKeyDown}
                    >
                      <OutfitPopover outfit={activeOutfit} titleId={titleId} onItemClick={onItemClick} onShopLook={onShopLook} />
                    </Box>
                  ) : null}
                </Box>
              </ClickAwayListener>
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}

/**
 * "See all" affordance — a native anchor when `href` is supplied, otherwise a
 * native button. Both fire the supplied `onClick`.
 */
function SeeAllControl({ href, onClick }: { href?: string; onClick: () => void }): React.ReactElement {
  const sx = {
    all: 'unset' as const,
    cursor: 'pointer',
    color: tokens.colors.green,
    fontWeight: 600,
    fontSize: 14,
    '&:hover': { textDecoration: 'underline' },
    '&:focus-visible': { outline: `2px solid ${tokens.colors.green}`, outlineOffset: 2, borderRadius: `${tokens.radius.sm}px` },
  };
  if (href) {
    return (
      <Box component="a" href={href} onClick={onClick} sx={sx}>
        See all
      </Box>
    );
  }
  return (
    <Box component="button" type="button" onClick={onClick} sx={sx}>
      See all
    </Box>
  );
}

/** Single model figure — a native button filling its grid cell, contained */
function ModelFigure({ outfit, isActive, onClick }: { outfit: VAZIHeroOutfit; isActive: boolean; onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }): React.ReactElement {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={isActive}
      aria-label={`View ${outfit.name}`}
      sx={{
        all: 'unset',
        cursor: 'pointer',
        height: { xs: 280, md: 380 },
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: `${tokens.radius.lg}px`,
        transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s',
        transform: isActive ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isActive ? '0 8px 24px rgba(0,0,0,0.1)' : 'none',
        '&:hover': { transform: 'scale(1.02)', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' },
        '&:focus-visible': { outline: `2px solid ${tokens.colors.green}`, outlineOffset: 2 },
      }}
    >
      {outfit.modelMediaType === 'video' ? (
        <Box component="video" src={outfit.modelMediaUrl} autoPlay muted loop playsInline sx={{ height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'contain', display: 'block' }} />
      ) : (
        <Box component="img" src={outfit.modelMediaUrl} alt={outfit.modelAlt} sx={{ height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'contain', display: 'block' }} />
      )}
    </Box>
  );
}

/** Floating outfit popover — appears near the tapped model */
function OutfitPopover({ outfit, titleId, onItemClick, onShopLook }: { outfit: VAZIHeroOutfit; titleId: string; onItemClick?: (id: string) => void; onShopLook?: (id: string) => void }): React.ReactElement {
  return (
    <Box
      sx={{
        width: 260,
        bgcolor: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.6)',
        borderRadius: `${tokens.radius.lg}px`,
        boxShadow: '0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)',
        p: `${tokens.spacing.lg}px`,
        mb: `${tokens.spacing.md}px`,
      }}
    >
      {/* Outfit name */}
      <Typography id={titleId} sx={{ fontSize: tokens.typography.fontSizes.base, fontWeight: 700, color: tokens.colors.textPrimary, mb: `${tokens.spacing.md}px` }}>
        {outfit.name}
      </Typography>

      {/* Item thumbnails row */}
      <Box sx={{ display: 'flex', gap: `${tokens.spacing.sm}px`, mb: `${tokens.spacing.lg}px`, overflowX: 'auto' }}>
        {outfit.items.map((item: VAZIShowcaseItem) => (
          <Box
            key={item.id}
            component="button"
            type="button"
            onClick={(e) => { e.stopPropagation(); onItemClick?.(item.id); }}
            aria-label={`View ${item.title}`}
            sx={{
              all: 'unset',
              width: 40,
              height: 40,
              flexShrink: 0,
              borderRadius: `${tokens.radius.sm}px`,
              overflow: 'hidden',
              cursor: onItemClick ? 'pointer' : 'default',
              border: '1px solid rgba(0,0,0,0.06)',
              '&:hover': { opacity: 0.8 },
              '&:focus-visible': { outline: `2px solid ${tokens.colors.green}`, outlineOffset: 2 },
            }}
          >
            <Box component="img" src={item.imageUrl} alt={item.title} sx={{ width: 40, height: 40, objectFit: 'cover', display: 'block' }} />
          </Box>
        ))}
      </Box>

      {/* Price + CTA */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontSize: 11, color: tokens.colors.textSecondary }}>{outfit.items.length} items</Typography>
          <Typography sx={{ fontSize: tokens.typography.fontSizes.md, fontWeight: 800, color: tokens.colors.textPrimary }}>KES {outfit.totalPrice.toLocaleString()}</Typography>
        </Box>
        <MitumbaPrimaryButton label="Shop" onClick={() => onShopLook?.(outfit.id)} />
      </Box>
    </Box>
  );
}

export default VAZIHeroSpotlight;
