import type { SxProps, Theme } from '@mui/material/styles'

export interface MitumbaCheckboxProps {
  /** Whether the checkbox is checked. */
  checked?: boolean
  /** Called when the checked state changes. */
  onChange?: (checked: boolean) => void
  /** Optional label displayed next to the checkbox. */
  label?: string
  /** Prevents user interaction. */
  disabled?: boolean
  /** Shows the indeterminate state (dash). */
  indeterminate?: boolean
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
