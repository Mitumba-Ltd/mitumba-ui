/**
 * Props for the ErrorState component.
 */
export interface ErrorStateProps {
  /** Title text. Defaults to "Something went wrong". */
  title?: string
  /** Subtitle text. Defaults to "Please try again". */
  subtitle?: string
  /** Called when the retry button is clicked. */
  onRetry?: () => void
}
