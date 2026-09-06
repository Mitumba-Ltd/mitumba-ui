import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { tokens } from '@mitumba/tokens'
import { SemanticSurface } from '../../../internal/SemanticSurface'
import { SemanticTitle } from '../../../internal/SemanticTitle'
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
  titleLevel,
  href,
  linkComponent,
}: StoreCardProps) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const isInteractive = Boolean(href) || Boolean(onClick)
  // Unique accessible name so multiple StoreCards are distinguishable.
  const accessibleName = subtitle ? `${name}, ${subtitle}` : name

  return (
    <SemanticSurface
      href={href}
      linkComponent={linkComponent}
      onClick={onClick}
      aria-label={isInteractive ? accessibleName : undefined}
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          gap: `${tokens.spacing.base}px`,
          p: `${tokens.spacing.lg}px`,
          width: '100%',
          textAlign: 'left',
          boxSizing: 'border-box',
          bgcolor: tokens.colors.surface,
          borderRadius: `${tokens.radius.lg}px`,
          border: `1px solid ${tokens.colors.divider}`,
          boxShadow: tokens.shadows.card,
          color: 'inherit',
          textDecoration: 'none',
          appearance: 'none',
          cursor: isInteractive ? 'pointer' : 'default',
          transition: tokens.motion.transitions.interaction,
          '&:hover': isInteractive ? {
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
        }}
      >
        {initials}
      </Avatar>

      {/* Info */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <SemanticTitle
          titleLevel={titleLevel}
          sx={{
            fontSize: tokens.typography.fontSizes.base,
            fontWeight: tokens.typography.fontWeights.bold,
            color: tokens.colors.textPrimary,
            lineHeight: 1.2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </SemanticTitle>
        {subtitle && (
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.xs,
              color: tokens.colors.textSecondary,
              mt: '2px',
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Chevron */}
      {isInteractive && (
        <ChevronRightIcon sx={{ fontSize: 20, color: tokens.colors.textDisabled }} />
      )}
    </SemanticSurface>
  )
}

export default StoreCard
