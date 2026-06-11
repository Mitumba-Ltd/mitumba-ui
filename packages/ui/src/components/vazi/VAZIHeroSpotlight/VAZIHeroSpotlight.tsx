/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '@mitumba/tokens';
import { AuthSubmitButton } from '../../foundation/AuthSubmitButton';
import type { VAZIHeroSpotlightProps, VAZIHeroOutfit } from './VAZIHeroSpotlight.types';
import type { VAZIShowcaseItem } from '../VAZIShowcase/VAZIShowcase.types';

/**
 * VAZIHeroSpotlight — embeddable hero section for the home page.
 * Shows one featured model at a time with outfit items, auto-rotates.
 * Not full-page — sits inside a scrollable page alongside other content.
 */
export function VAZIHeroSpotlight({
  outfits,
  autoAdvanceMs = 8000,
  onShopLook,
  onItemClick,
  onSeeAll,
}: VAZIHeroSpotlightProps): React.ReactElement {
  const [current, setCurrent] = React.useState(0);

  // Auto-rotate
  React.useEffect(() => {
    if (!autoAdvanceMs || outfits.length <= 1) return undefined;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % outfits.length);
    }, autoAdvanceMs);
    return () => clearInterval(timer);
  }, [autoAdvanceMs, outfits.length]);

  const outfit = outfits[current];
  if (!outfit) return <Box />;

  return (
    <Box sx={{ mb: `${tokens.spacing.huge}px` }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: `${tokens.spacing.lg}px` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.sm}px` }}>
          <Typography sx={{ fontSize: tokens.typography.fontSizes.lg, fontWeight: 800, color: tokens.colors.textPrimary, fontFamily: tokens.typography.fontFamily, letterSpacing: '-0.02em' }}>
            VAZI
          </Typography>
          <Box sx={{ bgcolor: tokens.colors.earthLight, color: tokens.colors.earth, fontSize: 10, fontWeight: 700, px: `${tokens.spacing.sm}px`, py: '2px', borderRadius: `${tokens.radius.sm}px` }}>AI</Box>
        </Box>
        {onSeeAll && (
          <Typography
            onClick={onSeeAll}
            sx={{ color: tokens.colors.green, fontWeight: 600, fontSize: 14, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
          >
            See all
          </Typography>
        )}
      </Box>

      {/* Main spotlight area */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, borderRadius: `${tokens.radius.xl}px`, overflow: 'hidden', bgcolor: '#f0f4f5', position: 'relative', minHeight: { xs: 420, md: 400 } }}>

        {/* Model area */}
        <Box sx={{ flex: { xs: 'none', md: 1 }, height: { xs: 300, md: '100%' }, position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', background: 'linear-gradient(160deg, #e8f0f2 0%, #dce8ec 100%)' }}>
          {outfits.map((o, i) => (
            <Box
              key={o.id}
              sx={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: `translateX(-50%) scale(${i === current ? 1 : 0.9})`,
                opacity: i === current ? 1 : 0,
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                height: '95%',
                pointerEvents: i === current ? 'auto' : 'none',
              }}
            >
              {o.modelMediaType === 'video' ? (
                <Box component="video" src={o.modelMediaUrl} autoPlay muted loop playsInline sx={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.1))' }} />
              ) : (
                <Box component="img" src={o.modelMediaUrl} alt={o.modelAlt} sx={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.1))' }} />
              )}
            </Box>
          ))}

          {/* Dots */}
          {outfits.length > 1 && (
            <Box sx={{ position: 'absolute', bottom: `${tokens.spacing.lg}px`, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 5 }}>
              {outfits.map((o, i) => (
                <Box
                  key={o.id}
                  onClick={() => setCurrent(i)}
                  sx={{
                    width: i === current ? 16 : 6,
                    height: 6,
                    borderRadius: `${tokens.radius.full}px`,
                    bgcolor: i === current ? tokens.colors.green : 'rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    transition: tokens.motion.transitions.interaction,
                  }}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* Outfit panel — desktop: right side, mobile: below */}
        <OutfitCard outfit={outfit} onItemClick={onItemClick} onShopLook={onShopLook} />
      </Box>
    </Box>
  );
}

function OutfitCard({ outfit, onItemClick, onShopLook }: { outfit: VAZIHeroOutfit; onItemClick?: (id: string) => void; onShopLook?: (id: string) => void }): React.ReactElement {
  return (
    <Box sx={{
      width: { xs: '100%', md: 280 },
      p: `${tokens.spacing.xl}px`,
      display: 'flex',
      flexDirection: 'column',
      gap: `${tokens.spacing.md}px`,
      bgcolor: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(12px)',
      borderLeft: { xs: 'none', md: '1px solid rgba(255,255,255,0.5)' },
      borderTop: { xs: '1px solid rgba(255,255,255,0.5)', md: 'none' },
    }}>
      <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', color: '#888', textTransform: 'uppercase' }}>
        Today&apos;s look
      </Typography>
      <Typography sx={{ fontSize: tokens.typography.fontSizes.base, fontWeight: 700, color: tokens.colors.textPrimary }}>
        {outfit.name}
      </Typography>

      {/* Items */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.sm}px`, flex: 1 }}>
        {outfit.items.map((item: VAZIShowcaseItem) => (
          <Box
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.sm}px`, cursor: onItemClick ? 'pointer' : 'default', py: `${tokens.spacing.xs}px`, borderRadius: `${tokens.radius.sm}px`, transition: tokens.motion.transitions.interaction, '&:hover': onItemClick ? { bgcolor: 'rgba(0,0,0,0.03)' } : {} }}
          >
            <Box component="img" src={item.imageUrl} alt={item.title} sx={{ width: 36, height: 36, borderRadius: `${tokens.radius.sm}px`, objectFit: 'cover', flexShrink: 0 }} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</Typography>
            </Box>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#555', flexShrink: 0 }}>KES {item.price.toLocaleString()}</Typography>
          </Box>
        ))}
      </Box>

      {/* Total + CTA */}
      <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.06)', pt: `${tokens.spacing.md}px` }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: `${tokens.spacing.sm}px` }}>
          <Typography sx={{ fontSize: 11, color: '#888' }}>{outfit.items.length} items</Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 800, color: tokens.colors.textPrimary }}>KES {outfit.totalPrice.toLocaleString()}</Typography>
        </Box>
        <AuthSubmitButton fullWidth label="Shop this look" onClick={() => onShopLook?.(outfit.id)} />
      </Box>
    </Box>
  );
}

export default VAZIHeroSpotlight;
