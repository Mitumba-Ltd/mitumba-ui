import type { AlertColor } from '@mui/material/Alert'

/**
 * Props for the MitumbaToast component.
 */
export interface MitumbaToastProps {
  /** Toast message content. */
  message: string
  /** Severity level for styling. */
  severity: AlertColor
  /** Whether the toast is visible. */
  open: boolean
  /** Called when the toast should close. */
  onClose: () => void
  /** Duration in milliseconds before auto-close. Default: 4000. */
  duration?: number
}
