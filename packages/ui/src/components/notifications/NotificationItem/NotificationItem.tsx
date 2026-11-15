import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { tokens } from '@mitumba/tokens'
import type { NotificationItemProps, NotificationLink } from './NotificationItem.types'

const ICONS: Record<string, React.ElementType> = {
  account: ShieldOutlinedIcon,
  orders: ShoppingBagOutlinedIcon,
  payments: PaymentsOutlinedIcon,
  messages: ChatBubbleOutlineIcon,
  store: StorefrontOutlinedIcon,
  deals: LocalOfferOutlinedIcon,
  announcements: CampaignOutlinedIcon,
  operations: AssignmentOutlinedIcon,
}

const MAX_ACTIONS = 2
/** WCAG 2.5.5 target size, so actions stay tappable on phones. */
const MIN_TAP_TARGET = 44

/** "just now", "5 min ago", "3 h ago", "2 d ago", then the date. */
export function relativeTime(iso: string, now: Date): string {
  const at = new Date(iso)
  const seconds = Math.round((now.getTime() - at.getTime()) / 1000)
  if (Number.isNaN(seconds)) return ''
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
  if (seconds < 86_400) return `${Math.floor(seconds / 3600)} h ago`
  if (seconds < 7 * 86_400) return `${Math.floor(seconds / 86_400)} d ago`
  return at.toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })
}

/** One notification in a feed: icon, title, body, time, and up to two actions. */
export function NotificationItem({ title, body, createdAt, unread, category, actions = [], link, count = 1, onNavigate, now }: NotificationItemProps): React.ReactElement {
  const Icon = (category && ICONS[category]) || NotificationsNoneIcon
  const shown = actions.slice(0, MAX_ACTIONS)
  const clickable = Boolean(link)
  const go = (target: NotificationLink) => onNavigate?.(target)

  return (
    <Box
      // A link row is a div: role="link" is not allowed on <article>.
      component={clickable ? 'div' : 'article'}
      role={clickable ? 'link' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? title : undefined}
      data-unread={unread ? 'true' : 'false'}
      onClick={clickable ? () => go(link!) : undefined}
      onKeyDown={clickable ? (event: React.KeyboardEvent) => { if (event.key === 'Enter' && event.target === event.currentTarget) go(link!) } : undefined}
      sx={{
        display: 'flex',
        gap: `${tokens.spacing.base}px`,
        p: `${tokens.spacing.lg}px`,
        borderRadius: `${tokens.radius.lg}px`,
        border: `1px solid ${unread ? tokens.colors.green : tokens.colors.divider}`,
        bgcolor: unread ? tokens.colors.greenLight : tokens.colors.surface,
        cursor: clickable ? 'pointer' : 'default',
        outline: 'none',
        '&:focus-visible': { boxShadow: `0 0 0 ${tokens.spacing.xxs}px ${tokens.colors.green}` },
        '&:hover': clickable ? { borderColor: tokens.colors.border } : undefined,
      }}
    >
      <Box aria-hidden sx={{ color: unread ? tokens.colors.greenDark : tokens.colors.textSecondary, pt: `px`, flexShrink: 0, display: 'flex' }}>
        <Icon fontSize="small" />
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.sm}px`, minWidth: 0 }}>
          <Typography variant="body2" noWrap sx={{ fontWeight: tokens.typography.fontWeights.semibold, color: tokens.colors.textPrimary, minWidth: 0 }}>
            {title}
          </Typography>
          {count > 1 && (
            <Typography variant="caption" sx={{ color: tokens.colors.textSecondary, flexShrink: 0 }}>{`×${count}`}</Typography>
          )}
          {unread && (
            <Box component="span" role="status" aria-label="Unread" sx={{ width: tokens.spacing.md, height: tokens.spacing.md, borderRadius: `${tokens.radius.full}px`, bgcolor: tokens.colors.green, flexShrink: 0 }} />
          )}
        </Box>
        <Typography variant="body2" sx={{ color: tokens.colors.textSecondary, mt: `${tokens.spacing.xxs}px`, lineHeight: tokens.typography.lineHeights.normal, overflowWrap: 'anywhere' }}>
          {body}
        </Typography>
        <Typography component="time" dateTime={createdAt} title={new Date(createdAt).toLocaleString('en-KE')} variant="caption" sx={{ display: 'block', color: tokens.colors.textDisabled, mt: `${tokens.spacing.xs}px` }}>
          {relativeTime(createdAt, now ?? new Date())}
        </Typography>
        {shown.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: `${tokens.spacing.md}px`, mt: `${tokens.spacing.md}px` }}>
            {shown.map((action) => (
              <Button
                key={action.label}
                size="small"
                variant="text"
                onClick={(event) => { event.stopPropagation(); go(action.link) }}
                onKeyDown={(event) => event.stopPropagation()}
                sx={{ minHeight: MIN_TAP_TARGET, px: `${tokens.spacing.md}px`, textTransform: 'none', fontWeight: tokens.typography.fontWeights.semibold, color: tokens.colors.greenDark }}
              >
                {action.label}
              </Button>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default NotificationItem
