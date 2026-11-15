/** Where a notification or one of its actions leads: an app route, or an https URL. */
export type NotificationLink = { route: string } | { url: string }

export interface NotificationAction {
  label: string
  link: NotificationLink
}

export type NotificationCategory = 'account' | 'orders' | 'payments' | 'messages' | 'store' | 'deals' | 'announcements' | 'operations'

export interface NotificationItemProps {
  title: string
  body: string
  /** ISO timestamp. Shown relative ("5 min ago"); the absolute time is the element's title. */
  createdAt: string
  unread: boolean
  /** Picks the leading icon (a NotificationCategory). Unknown or omitted: a bell. */
  category?: string
  /** At most two are shown; extra entries are ignored. Rendered as text buttons under the body. */
  actions?: NotificationAction[]
  /** Makes the whole row a link. Omitted or null: the row is not clickable. */
  link?: NotificationLink | null
  /** Shown as "×N" next to the title when greater than 1. Default 1. */
  count?: number
  /** Called with the row's or the chosen action's link, so the app can route or open it. */
  onNavigate?: (link: NotificationLink) => void
  /** Reference time for the relative label. Default: now. For stable stories and tests. */
  now?: Date
}
