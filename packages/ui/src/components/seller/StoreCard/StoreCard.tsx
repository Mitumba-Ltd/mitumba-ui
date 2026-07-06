import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { tokens } from '@mitumba/tokens'
import type { StoreCardProps } from './StoreCard.types'

/**
 * StoreCard — clickable store selector card for the seller dashboard.
 * Shows avatar (initials fallback), name, subtitle, and trailing chevron.
 * Matches CartItem materialness: tokens.radius.lg, shadows.card, hover-lift.
 */
export function StoreCard({
  name,
  avatarUrl,
  subtitle,
  onClick,
  sx,
}: StoreCardProps) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <Box
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => { if (onClick && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onClick() } }}
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          gap: `${tokens.spacing.base}px`,
          p: `${tokens.spacing.lg}px`,
          bgcolor: tokens.colors.surface,
          borderRadius: `${tokens.radius.lg}px`,
          border: `1px solid ${tokens.colors.divider}`,
          boxShadow: tokens.shadows.card,
          cursor: onClick ? 'pointer' : 'default',
          transition: tokens.motion.transitions.interaction,
          '&:hover': onClick ? {
            transform: 'translateY(-2px)',
            boxShadow: tokens.shadows.elevated,
            borderColor: tokens.colors.green,
          } : {},
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/* Avatar */}
      <Avatar
        src={avatarUrl}
        alt={name}
        sx={{
          width: 48,
          height: 48,
          bgcolor: tokens.colors.green,
          fontWeight: tokens.typography.fontWeights.bold,
          fontSize: tokens.typography.fontSizes.base,
          fontFamily: tokens.typography.fontFamily,
        }}
      >
        {initials}
      </Avatar>

      {/* Info */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.base,
            fontWeight: tokens.typography.fontWeights.bold,
            color: tokens.colors.textPrimary,
            fontFamily: tokens.typography.fontFamily,
            lineHeight: 1.2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </Typography>
        {subtitle && (
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.xs,
              color: tokens.colors.textSecondary,
              fontFamily: tokens.typography.fontFamily,
              mt: '2px',
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Chevron */}
      {onClick && (
        <ChevronRightIcon sx={{ fontSize: 20, color: tokens.colors.textDisabled }} />
      )}
    </Box>
  )
}

export default StoreCard
