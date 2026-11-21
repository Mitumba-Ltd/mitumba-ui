import type { SxProps, Theme } from '@mui/material/styles'

/** A way to reach someone. */
export type NotificationChannel = 'in_app' | 'email' | 'push' | 'whatsapp' | 'telegram' | 'sms'

/** One category row: which channels it uses, and whether each is on. */
export interface NotificationPreferenceRow {
  /** Stable id, passed back in `onChange`. */
  id: string
  /** Row heading, e.g. "Orders". */
  label: string
  /** One line under the heading. */
  description?: string
  /** Some messages in this category always arrive: shows a lock and `requiredHint`. */
  required?: boolean
  /** Only these channels get a switch in this row. A channel not listed shows an empty cell. */
  channels: Array<{ channel: NotificationChannel; enabled: boolean }>
}

/** One switch that changed. */
export interface NotificationPreferenceChange {
  category: string
  channel: NotificationChannel
  enabled: boolean
}

export interface NotificationPreferencesGridProps {
  /** The rows, in display order. */
  categories: NotificationPreferenceRow[]
  /**
   * Column order and header labels. Default: In-app, Email, Push, WhatsApp, Telegram, SMS.
   * A column that no category uses is not shown.
   */
  columns?: Array<{ channel: NotificationChannel; label: string }>
  /** Channels that can't reach the person now: their switches are disabled but keep their value. Default none. */
  unavailable?: NotificationChannel[]
  /** Called once for each switch the person changes. */
  onChange: (change: NotificationPreferenceChange) => void
  /** Cells being saved: a spinner shows and the switch ignores input. */
  pending?: Array<{ category: string; channel: NotificationChannel }>
  /** Text for required rows. Default "Some messages here are required, such as security alerts." */
  requiredHint?: string
  /** Text for unavailable channels. Default "Not connected". */
  unavailableHint?: string
  /** Shows skeleton rows instead of the grid. */
  loading?: boolean
  /** Optional style overrides for the outer box. */
  sx?: SxProps<Theme>
}
