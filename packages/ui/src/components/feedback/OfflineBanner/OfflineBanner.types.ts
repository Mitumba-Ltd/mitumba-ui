import type { SxProps, Theme } from '@mui/material/styles'

/**
 * Props for the OfflineBanner component.
 */
export interface OfflineBannerProps {
  /** Called when the retry button is clicked. */
  onRetry?: () => void
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
