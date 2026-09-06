import type { ReactNode } from 'react'
import type { HeadingLevel } from '../../../types/semantic'

export interface FloatingChatDockProps {
  /** Whether the dock is rendered at all */
  open: boolean
  /** Partner/store name shown in the header */
  title: string
  /**
   * Emits the header title as an h1-h6 element for document outline wiring.
   * Changes only the emitted element, never its visual styling. When omitted
   * the title keeps its existing non-heading paragraph markup.
   */
  titleLevel?: HeadingLevel
  /**
   * Controlled announcement text surfaced once through a single polite live
   * region (e.g. "3 new messages"). Update this string when a new event should
   * be announced; passing the same value will not re-announce.
   */
  announcement?: string
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
  /** When set, shows a back chevron in the header */
  onBack?: () => void
  /** The chat UI (e.g. ChatThread) rendered in the expanded body */
  children: ReactNode
}
