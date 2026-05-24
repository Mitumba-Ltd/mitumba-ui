import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { tokens } from '@mitumba/tokens'
import { STIScoreChip } from '../STIScoreChip'
import { MitumbaAvatar } from '../../foundation'
import { VAZIBadge } from '../../vazi/VAZIBadge'
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
        transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': onTap
          ? {
              boxShadow: tokens.shadows.elevated,
              transform: 'translateY(-2px)',
              borderColor: tokens.colors.border,
            }
          : undefined,
        '&:focus-visible': {
          outline: `2px solid ${tokens.colors.greenLight}`,
          boxShadow: tokens.shadows.focus,
        },
      }}
    >
      <MitumbaAvatar name={name} imageUrl={avatarUrl} size="md" />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Typography
            sx={{
              fontWeight: tokens.typography.fontWeights.bold,
              fontSize: tokens.typography.fontSizes.base,
              color: tokens.colors.textPrimary,
              lineHeight: 1.2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontFamily: tokens.typography.fontFamily,
            }}
          >
            {name}
          </Typography>
          {isVaziFeatured && <VAZIBadge size="small" />}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm, mt: tokens.spacing.xs }}>
          <STIScoreChip score={stiScore} compact />
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.7 }}>
            <Inventory2OutlinedIcon sx={{ fontSize: 14, color: tokens.colors.textSecondary }} />
            <Typography
              sx={{ 
                color: tokens.colors.textSecondary, 
                fontSize: 10,
                fontWeight: tokens.typography.fontWeights.semibold,
                textTransform: 'uppercase',
                letterSpacing: tokens.typography.letterSpacings.wide,
              }}
            >
              {totalListings}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.7 }}>
            <LocationOnOutlinedIcon sx={{ fontSize: 14, color: tokens.colors.textSecondary }} />
            <Typography
              sx={{ 
                color: tokens.colors.textSecondary, 
                fontSize: 10,
                fontWeight: tokens.typography.fontWeights.semibold,
                textTransform: 'uppercase',
                letterSpacing: tokens.typography.letterSpacings.wide,
              }}
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
