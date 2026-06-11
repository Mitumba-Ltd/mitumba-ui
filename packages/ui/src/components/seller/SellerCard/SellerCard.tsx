import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '@mitumba/tokens';
import { STIScoreChip } from '../STIScoreChip';
import { MitumbaAvatar } from '../../foundation';
import type { SellerCardProps } from './SellerCard.types';

/**
 * Seller card — compact seller profile preview. Shows avatar, name,
 * location, listing count, and STI trust score. Used in search results,
 * listing detail pages, and store browsing.
 */
export function SellerCard({
  name,
  avatarUrl,
  city,
  stiScore,
  totalListings,
  isVaziFeatured = false,
  onTap,
}: SellerCardProps): React.ReactElement {
  return (
    <Box
      onClick={onTap}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onTap) {
          e.preventDefault();
          onTap();
        }
      }}
      role={onTap ? 'button' : undefined}
      tabIndex={onTap ? 0 : undefined}
      aria-label={`${name} — ${city}, ${totalListings} listings`}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: `${tokens.spacing.base}px`,
        p: `${tokens.spacing.lg}px`,
        borderRadius: `${tokens.radius.lg}px`,
        bgcolor: tokens.colors.surface,
        border: `1px solid ${tokens.colors.divider}`,
        cursor: onTap ? 'pointer' : 'default',
        transition: tokens.motion.transitions.interaction,
        '&:hover': onTap ? { borderColor: tokens.colors.green, transform: 'translateY(-1px)' } : {},
        '&:focus-visible': { outline: `2px solid ${tokens.colors.green}`, outlineOffset: 2 },
      }}
    >
      {/* Avatar */}
      <MitumbaAvatar name={name} imageUrl={avatarUrl} size="md" />

      {/* Info */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.sm}px` }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: tokens.typography.fontSizes.base,
              color: tokens.colors.textPrimary,
              fontFamily: tokens.typography.fontFamily,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              lineHeight: 1.3,
            }}
          >
            {name}
          </Typography>
          {isVaziFeatured && (
            <Box sx={{ bgcolor: tokens.colors.earthLight, color: tokens.colors.earth, fontSize: 10, fontWeight: 700, px: `${tokens.spacing.xs}px`, py: '2px', borderRadius: `${tokens.radius.sm}px`, lineHeight: 1, flexShrink: 0 }}>
              VAZI
            </Box>
          )}
        </Box>

        {/* Meta row */}
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.sm,
            color: tokens.colors.textSecondary,
            fontFamily: tokens.typography.fontFamily,
            mt: '2px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {city} · {totalListings} {totalListings === 1 ? 'listing' : 'listings'}
        </Typography>
      </Box>

      {/* STI Score */}
      <STIScoreChip score={stiScore} compact />
    </Box>
  );
}

export default SellerCard;
