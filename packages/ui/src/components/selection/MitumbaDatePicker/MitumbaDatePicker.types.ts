import type { SxProps, Theme } from '@mui/material/styles'

export interface MitumbaDatePickerProps {
  /** Selected date value. */
  value: Date | null
  /** Called when a date is selected. */
  onChange: (date: Date | null) => void
  /** Optional label text. */
  label?: string
  /** Placeholder hint. */
  hint?: string
  /** Prevents user interaction. */
  disabled?: boolean
  /** Scale standard matching TextField/Button. */
  size?: 'small' | 'medium' | 'large'
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
