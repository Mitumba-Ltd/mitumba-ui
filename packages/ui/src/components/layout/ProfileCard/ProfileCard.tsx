import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { tokens } from '@mitumba/tokens'
import { MitumbaChip } from '../../foundation/MitumbaChip'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'
import { SemanticTitle } from '../../../internal/SemanticTitle'
import type { ProfileCardProps } from './ProfileCard.types'

/**
 * ProfileCard — user identity card with avatar, name, role chips, and action button.
 * Matches CartItem design language: tokens.radius.lg, shadows.card, hover-lift.
 */
export function ProfileCard({
  name,
  avatarUrl,
  roles = [],
  actionLabel,
  onAction,
  subtitle,
  sx,
  titleLevel,
}: ProfileCardProps) {
  return (
    <Box
      sx={[
        {
          bgcolor: tokens.colors.surface,
          borderRadius: `${tokens.radius.lg}px`,
          border: `1px solid ${tokens.colors.divider}`,
          boxShadow: tokens.shadows.card,
          p: `${tokens.spacing.xxl}px`,
          textAlign: 'center',
          transition: tokens.motion.transitions.interaction,
          '&:hover': {
            boxShadow: tokens.shadows.elevated,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/* Avatar — the initials fallback carries an accessible name for the image role */}
      <Avatar
        src={avatarUrl}
        alt={name}
        aria-label={name}
        sx={{
          width: 96,
          height: 96,
          mx: 'auto',
          mb: `${tokens.spacing.lg}px`,
          bgcolor: tokens.colors.green,
          fontSize: 36,
          fontWeight: tokens.typography.fontWeights.extrabold,
        }}
      >
        {name[0]?.toUpperCase()}
      </Avatar>

      {/* Name */}
      <SemanticTitle
        titleLevel={titleLevel}
        sx={{
          fontSize: tokens.typography.fontSizes.xl,
          fontWeight: tokens.typography.fontWeights.extrabold,
          color: tokens.colors.textPrimary,
          lineHeight: 1.2,
        }}
      >
        {name}
      </SemanticTitle>

      {/* Subtitle */}
      {subtitle && (
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.sm,
            color: tokens.colors.textSecondary,
            mt: '4px',
          }}
        >
          {subtitle}
        </Typography>
      )}

      {/* Role chips */}
      {roles.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: `${tokens.spacing.sm}px`, mt: `${tokens.spacing.base}px`, flexWrap: 'wrap' }}>
          {roles.map((role) => (
            <MitumbaChip
              key={role.label}
              label={role.label}
              icon={role.icon as React.ReactElement | undefined}
              size="small"
              variant="solid"
              rounding="pill"
              status={role.color === 'secondary' ? 'special' : 'active'}
            />
          ))}
        </Box>
      )}

      {/* Action */}
      {actionLabel && onAction && (
        <Box sx={{ mt: `${tokens.spacing.xl}px` }}>
          <MitumbaPrimaryButton
            label={actionLabel}
            variant="outline"
            onClick={onAction}
            fullWidth
          />
        </Box>
      )}
    </Box>
  )
}

export default ProfileCard
