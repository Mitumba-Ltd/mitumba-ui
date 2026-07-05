import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { tokens } from '@mitumba/tokens'
import type { ProfileNavListProps } from './ProfileNavList.types'

/**
 * ProfileNavList — navigation list with icons, labels, and optional badges.
 * Matches CartItem card design: tokens.radius.lg, border, shadow.
 */
export function ProfileNavList({ items, sx }: ProfileNavListProps) {
  return (
    <Box
      sx={[
        {
          bgcolor: tokens.colors.surface,
          borderRadius: `${tokens.radius.lg}px`,
          border: `1px solid ${tokens.colors.divider}`,
          boxShadow: tokens.shadows.card,
          overflow: 'hidden',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {items.map((item, index) => (
        <Box
          key={item.label}
          onClick={item.onClick}
          role={item.onClick ? 'button' : undefined}
          tabIndex={item.onClick ? 0 : undefined}
          onKeyDown={(e) => { if (item.onClick && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); item.onClick() } }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: `${tokens.spacing.base}px`,
            px: `${tokens.spacing.lg}px`,
            py: `${tokens.spacing.base}px`,
            cursor: item.onClick ? 'pointer' : 'default',
            borderBottom: index < items.length - 1 ? `1px solid ${tokens.colors.divider}` : 'none',
            transition: tokens.motion.transitions.interaction,
            '&:hover': item.onClick ? { bgcolor: tokens.colors.background } : {},
          }}
        >
          {/* Icon */}
          <Box sx={{ color: tokens.colors.textSecondary, display: 'flex', fontSize: 22 }}>
            {item.icon}
          </Box>

          {/* Label */}
          <Typography
            sx={{
              flex: 1,
              fontSize: tokens.typography.fontSizes.base,
              fontWeight: tokens.typography.fontWeights.semibold,
              color: tokens.colors.textPrimary,
              fontFamily: tokens.typography.fontFamily,
            }}
          >
            {item.label}
          </Typography>

          {/* Badge */}
          {item.badge != null && item.badge > 0 && (
            <Badge badgeContent={item.badge} color="primary" sx={{ '& .MuiBadge-badge': { fontSize: 10, minWidth: 18, height: 18 } }} />
          )}

          {/* Chevron */}
          {item.onClick && (
            <ChevronRightIcon sx={{ fontSize: 18, color: tokens.colors.textDisabled }} />
          )}
        </Box>
      ))}
    </Box>
  )
}

export default ProfileNavList
