import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { tokens } from '@mitumba/tokens';
import { STIScoreChip } from '../STIScoreChip';
import { MitumbaAvatar } from '../../foundation';
import { SemanticSurface } from '../../../internal/SemanticSurface';
import { SemanticTitle } from '../../../internal/SemanticTitle';
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
  actionLabel,
  onAction,
  titleLevel,
  href,
  linkComponent,
}: SellerCardProps): React.ReactElement {
  const accessibleName = `${name} — ${city}, ${totalListings} listings`;
  const isInteractive = Boolean(href) || Boolean(onTap);
  return (
    <Box
      component="article"
      aria-label={accessibleName}
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: `${tokens.spacing.base}px`,
        p: `${tokens.spacing.lg}px`,
        borderRadius: `${tokens.radius.lg}px`,
        bgcolor: tokens.colors.surface,
        border: `1px solid ${tokens.colors.divider}`,
        transition: tokens.motion.transitions.interaction,
        '&:hover': isInteractive ? { borderColor: tokens.colors.green, transform: 'translateY(-1px)' } : {},
        '&:focus-within': { outline: `2px solid ${tokens.colors.green}`, outlineOffset: 2 },
      }}
    >
      {/*
        Stretched primary surface (anchor/button/none). Rendered as a sibling
        overlay so the nested action button stays a valid, non-nested control.
      */}
      {isInteractive && (
        <SemanticSurface
          href={href}
          linkComponent={linkComponent}
          onClick={onTap}
          aria-label={accessibleName}
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            display: 'block',
            width: '100%',
            height: '100%',
            p: 0,
            m: 0,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            appearance: 'none',
            color: 'inherit',
            textDecoration: 'none',
          }}
        />
      )}

      {/* Avatar */}
      <MitumbaAvatar name={name} imageUrl={avatarUrl} size="md" />

      {/* Info */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.sm}px` }}>
          <SemanticTitle
            titleLevel={titleLevel}
            sx={{
              fontWeight: 700,
              fontSize: tokens.typography.fontSizes.base,
              color: tokens.colors.textPrimary,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              lineHeight: 1.3,
            }}
          >
            {name}
          </SemanticTitle>
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

      {/* Action button */}
      {actionLabel && (
        <Button
          variant="outlined"
          fullWidth
          onClick={(e) => { e.stopPropagation(); onAction?.(); }}
          sx={{
            mt: `${tokens.spacing.md}px`,
            position: 'relative',
            zIndex: 2,
            width: '100%',
            borderColor: tokens.colors.border,
            color: tokens.colors.textPrimary,
            fontWeight: 600,
            fontSize: tokens.typography.fontSizes.sm,
            textTransform: 'none',
            borderRadius: `${tokens.radius.md}px`,
            '&:hover': { borderColor: tokens.colors.green, color: tokens.colors.green },
          }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}

export default SellerCard;
