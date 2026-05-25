import type { SxProps, Theme } from '@mui/material/styles'

export interface MitumbaRadioProps {
  /** Whether the radio is selected. */
  selected?: boolean
  /** The value of the radio button. */
  value: string | number
  /** Optional label displayed next to the radio. */
  label?: string
  /** Called when the selection changes. */
  onChange?: (value: string | number) => void
  /** Prevents user interaction. */
  disabled?: boolean
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
