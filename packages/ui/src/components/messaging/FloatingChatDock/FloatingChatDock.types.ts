import type { ReactNode } from 'react'

export interface FloatingChatDockProps {
  /** Whether the dock is rendered at all */
  open: boolean
  /** Partner/store name shown in the header */
  title: string
  /** Status line e.g. "typing…", "online" */
  subtitle?: string
  /** Partner avatar URL */
  avatarUrl?: string
  /** Whether the dock is collapsed to just the header bar */
  minimized: boolean
  /** Toggle between minimized and expanded */
  onToggleMinimize: () => void
  /** Close the dock entirely */
  onClose: () => void
  /** Unread message count — shown as badge when minimized */
  unreadCount?: number
  /** The chat UI (e.g. ChatThread) rendered in the expanded body */
  children: ReactNode
}
