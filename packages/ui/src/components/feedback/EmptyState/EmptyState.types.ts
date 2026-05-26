import type { ReactNode } from 'react'

/**
 * Props for the EmptyState component.
 */
export interface EmptyStateProps {
  /** Icon, illustration, or custom SVG to display. */
  illustration?: ReactNode
  /** Main title text. */
  title: string
  /** Subtitle or description text. */
  subtitle: string
  /** Optional action configuration ('No Dead Ends'). */
  action?: {
    /** Label for the action button. */
    label: string
    /** Called when the action button is clicked. */
    onClick: () => void
    /** Visual variant of the button. Defaults to 'primary'. */
    variant?: 'primary' | 'earth' | 'outline'
  }
  /** Overall scale and container style. Defaults to 'standard'. */
  variant?: 'standard' | 'compact' | 'elevated'
  /** Whether to show a decorative background blob behind the illustration. Defaults to true. */
  showBlob?: boolean
  /** Legacy icon support. Map to illustration if provided. */
  icon?: ReactNode
}
