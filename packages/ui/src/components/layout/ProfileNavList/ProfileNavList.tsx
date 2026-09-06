import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import type { BoxProps } from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import type { ProfileNavListProps, ProfileNavItem } from './ProfileNavList.types'

function NavRow({ item, isLast }: { item: ProfileNavItem; isLast: boolean }): React.ReactElement {
  const isInteractive = Boolean(item.href) || Boolean(item.onClick)
  const current: 'page' | undefined = item.active ? 'page' : undefined

  const rowSx: BoxProps['sx'] = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: `${tokens.spacing.base}px`,
    px: `${tokens.spacing.lg}px`,
    py: `${tokens.spacing.base}px`,
    textAlign: 'left',
    appearance: 'none',
    border: 'none',
    background: 'transparent',
    color: 'inherit',
    textDecoration: 'none',
    cursor: isInteractive ? 'pointer' : 'default',
    boxSizing: 'border-box',
    borderBottom: !isLast ? `1px solid ${tokens.colors.divider}` : 'none',
    transition: tokens.motion.transitions.interaction,
    '&:hover': isInteractive ? { bgcolor: tokens.colors.background } : {},
  }

  const inner = (
    <>
      {/* Icon */}
      <Box aria-hidden sx={{ color: tokens.colors.textSecondary, display: 'flex', fontSize: 22 }}>
        {item.icon}
      </Box>

      {/* Label */}
      <Typography
        component="span"
        sx={{
          flex: 1,
          fontSize: tokens.typography.fontSizes.base,
          fontWeight: tokens.typography.fontWeights.semibold,
          color: tokens.colors.textPrimary,
        }}
      >
        {item.label}
      </Typography>

      {/* Badge */}
      {item.badge != null && item.badge > 0 && (
        <Badge
          badgeContent={item.badge}
          color="primary"
          aria-label={`${item.badge} unread`}
          sx={{ '& .MuiBadge-badge': { fontSize: 10, minWidth: 18, height: 18 } }}
        />
      )}

      {/* Chevron */}
      {isInteractive && (
        <ChevronRightIcon aria-hidden sx={{ fontSize: 18, color: tokens.colors.textDisabled }} />
      )}
    </>
  )

  if (item.href) {
    const LinkComponent = item.linkComponent
    if (LinkComponent) {
      return (
        <LinkComponent href={item.href}>
          <Box component="span" onClick={item.onClick} sx={rowSx} aria-current={current}>
            {inner}
          </Box>
        </LinkComponent>
      )
    }
    return (
      <Box component="a" href={item.href} onClick={item.onClick} sx={rowSx} aria-current={current}>
        {inner}
      </Box>
    )
  }

  if (item.onClick) {
    return (
      <Box component="button" type="button" onClick={item.onClick} sx={rowSx} aria-current={current}>
        {inner}
      </Box>
    )
  }

  return (
    <Box sx={rowSx}>
      {inner}
    </Box>
  )
}

/**
 * ProfileNavList — navigation list with icons, labels, and optional badges.
 * Matches CartItem card design: tokens.radius.lg, border, shadow.
 * Rendered as a labelled <nav> landmark wrapping a <ul>; each row is an
 * <li> containing a native anchor (href) or button (callback) so keyboard
 * support and `aria-current` come from the platform.
 */
export function ProfileNavList({ items, ariaLabel = 'Account', sx }: ProfileNavListProps) {
  return (
    <Box
      component="nav"
      aria-label={ariaLabel}
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
      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
        {items.map((item, index) => (
          <Box component="li" key={item.label}>
            <NavRow item={item} isLast={index === items.length - 1} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ProfileNavList
