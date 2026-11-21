import type { SxProps, Theme } from '@mui/material/styles'

export interface MitumbaSwitchProps {
  /** Whether the switch is on. */
  on?: boolean
  /** Called when the switch state changes. */
  onChange?: (on: boolean) => void
  /** Optional label displayed next to the switch. */
  label?: string
  /**
   * Accessible name for a switch shown without a visible `label` (e.g. a cell in a table whose
   * row and column headers say what it is). Ignored when `label` is set.
   */
  ariaLabel?: string
  /** Prevents user interaction. */
  disabled?: boolean
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
