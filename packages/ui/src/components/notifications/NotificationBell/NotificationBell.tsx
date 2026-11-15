import React from 'react'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { tokens } from '@mitumba/tokens'
import type { NotificationBellProps } from './NotificationBell.types'

/** "99+" above 99, else the number. */
export function badgeText(count: number): string {
  return count > 99 ? '99+' : String(count)
}

/** The notifications bell with its unread badge. */
export function NotificationBell({ count, href, onClick, label = 'Notifications', size = 'medium', linkComponent }: NotificationBellProps): React.ReactElement {
  const unread = Math.max(0, Math.floor(count))
  const accessible = unread > 0 ? `${label}, ${unread} unread` : label
  const icon = (
    <Badge
      badgeContent={badgeText(unread)}
      invisible={unread === 0}
      sx={{ '& .MuiBadge-badge': { bgcolor: tokens.colors.error, color: tokens.colors.white, fontWeight: tokens.typography.fontWeights.semibold } }}
    >
      <NotificationsNoneIcon fontSize={size === 'small' ? 'small' : 'medium'} />
    </Badge>
  )

  return (
    <>
      {href !== undefined
        ? <IconButton color="inherit" size={size} aria-label={accessible} component={linkComponent ?? 'a'} href={href}>{icon}</IconButton>
        : <IconButton color="inherit" size={size} aria-label={accessible} onClick={onClick}>{icon}</IconButton>}
      {/* Announces count changes without moving focus. */}
      <Box component="span" aria-live="polite" sx={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }}>
        {unread > 0 ? `${unread} unread notifications` : ''}
      </Box>
    </>
  )
}

export default NotificationBell
