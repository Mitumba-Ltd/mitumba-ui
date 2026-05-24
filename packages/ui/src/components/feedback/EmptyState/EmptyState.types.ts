import type { ReactNode } from 'react'

/**
 * Props for the EmptyState component.
 */
export interface EmptyStateProps {
  /** Icon or illustration to display. */
  icon: ReactNode
  /** Main title text. */
  title: string
  /** Subtitle or description text. */
  subtitle: string
  /** Optional action button configuration. */
  action?: {
    /** Label for the action button. */
    label: string
    /** Called when the action button is clicked. */
    onClick: () => void
  }
}
