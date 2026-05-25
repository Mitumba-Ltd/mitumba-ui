import type { SxProps, Theme } from '@mui/material/styles'

export interface MitumbaSwitchProps {
  /** Whether the switch is on. */
  on?: boolean
  /** Called when the switch state changes. */
  onChange?: (on: boolean) => void
  /** Optional label displayed next to the switch. */
  label?: string
  /** Prevents user interaction. */
  disabled?: boolean
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
