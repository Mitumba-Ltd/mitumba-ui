import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import { tokens } from '@mitumba/tokens'
import { STIScoreChip } from '../STIScoreChip'
import { MitumbaAvatar } from '../../foundation'
import type { SellerCardProps } from './SellerCard.types'

export function SellerCard({
  name,
  avatarUrl,
  city,
  stiScore,
  totalListings,
  isVaziFeatured = false,
  onTap,
}: SellerCardProps) {
  return (
    <Box
      onClick={onTap}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onTap?.()
        }
      }}
      role="button"
      tabIndex={onTap ? 0 : -1}
      aria-label={`${name} storefront, ${totalListings} listings`}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacing.base,
        p: tokens.spacing.base,
        borderRadius: tokens.radius.lg,
        bgcolor: tokens.colors.surface,
        boxShadow: tokens.shadows.card,
        border: `1px solid ${tokens.colors.divider}`,
        cursor: onTap ? 'pointer' : 'default',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        '&:hover': onTap
          ? {
              boxShadow: tokens.shadows.elevated,
              transform: 'translateY(-2px)',
            }
          : undefined,
        '&:focus-visible': {
          outline: `${tokens.spacing.xs}px solid transparent`,
          boxShadow: tokens.shadows.focus,
        },
      }}
    >
      <MitumbaAvatar name={name} imageUrl={avatarUrl} size="md" />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: tokens.typography.fontWeights.semibold,
              fontSize: tokens.typography.fontSizes.md,
              color: tokens.colors.textPrimary,
              lineHeight: tokens.typography.lineHeights.tight,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </Typography>
          {isVaziFeatured && (
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                bgcolor: tokens.colors.earthLight,
                color: tokens.colors.earth,
                fontSize: tokens.typography.fontSizes.xs,
                fontWeight: tokens.typography.fontWeights.bold,
                px: tokens.spacing.sm,
                py: tokens.spacing.xs,
                borderRadius: tokens.radius.full,
              }}
            >
              <StarOutlinedIcon sx={{ fontSize: 12 }} />
              VAZI
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm, mt: tokens.spacing.xs }}>
          <STIScoreChip score={stiScore} compact />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Inventory2OutlinedIcon sx={{ fontSize: 14, color: tokens.colors.textSecondary }} />
            <Typography
              variant="caption"
              sx={{ color: tokens.colors.textSecondary, fontSize: tokens.typography.fontSizes.sm }}
            >
              {totalListings} listings
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs }}>
            <LocationOnOutlinedIcon sx={{ fontSize: 14, color: tokens.colors.textSecondary }} />
            <Typography
              variant="caption"
              sx={{ color: tokens.colors.textSecondary, fontSize: tokens.typography.fontSizes.sm }}
            >
              {city}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default SellerCard
