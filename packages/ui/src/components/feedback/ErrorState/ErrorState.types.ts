import type { ReactNode } from 'react'

export type ErrorType = 'general' | '404' | '500' | 'network' | 'forbidden'
export type ErrorVariant = 'standard' | 'elevated' | 'compact'

/**
 * Props for the ErrorState component.
 */
export interface ErrorStateProps {
  /** Main error heading. Defaults to "Something went wrong". */
  title?: string
  /** Detailed error message. Defaults to "Please try again". */
  subtitle?: string
  /** Error archetype for icon/color mapping. Defaults to "general". */
  type?: ErrorType
  /** Visual container treatment. Defaults to "standard". */
  variant?: ErrorVariant
  /** Called when the primary action (Retry) is clicked. */
  onRetry?: () => void
  /** Label for the retry button. Defaults to "Try Again". */
  retryLabel?: string
  /** Called when the secondary action (Go Back) is clicked. */
  onBack?: () => void
  /** Custom illustration or icon. Overrides automatic type-based icon. */
  illustration?: ReactNode
  /** Whether to show the decorative background blob. Defaults to true. */
  showBlob?: boolean
}
