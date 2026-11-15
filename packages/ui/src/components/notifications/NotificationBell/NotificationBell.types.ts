import type { ElementType } from 'react'

export interface NotificationBellProps {
  /** Unread notifications. 0 hides the badge; above 99 shows "99+". */
  count: number
  /** Renders the bell as a link. */
  href?: string
  /** Renders the bell as a button. Ignored when `href` is set. */
  onClick?: () => void
  /** Accessible label. Default "Notifications"; ", N unread" is appended when count > 0. */
  label?: string
  size?: 'small' | 'medium'
  /** Element used for the link, e.g. a router's Link. Default: an anchor. */
  linkComponent?: ElementType
}
