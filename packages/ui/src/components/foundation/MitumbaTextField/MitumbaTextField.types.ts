import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

export type TextFieldSize = 'small' | 'medium' | 'large'
export type TextFieldStatus = 'success' | 'warning' | 'error'

export interface MitumbaTextFieldProps {
  /** Optional label text displayed above the field. */
  label?: string
  /** Placeholder text shown when the field is empty. */
  hint: string
  /** Controlled value of the input. */
  value: string
  /** Callback fired when the value changes. */
  onChange: (value: string) => void
  /** Supporting text or error message displayed below the field. */
  helperText?: string
  /** Error message displayed below the field. If provided, sets status to 'error'. */
  error?: string
  
  /** Scale standard matching buttons/select. Defaults to 'medium'. */
  size?: TextFieldSize
  /** Validation status treatment. */
  status?: TextFieldStatus
  
  /** Leading icon or content. */
  prefix?: ReactNode
  /** Trailing icon or content. */
  suffix?: ReactNode
  /** Integrated button at the end of the input. */
  endButton?: ReactNode
  
  /** Input type (e.g. "text", "email", "password"). Defaults to "text". */
  type?: string
  /** Whether the field is disabled. */
  disabled?: boolean
  /** Renders a multi-line textarea instead of a single-line input. */
  multiline?: boolean
  /** Number of visible rows for a multi-line textarea. Defaults to 4 for multiline. */
  rows?: number
  
  /** Whether the field is read-only. */
  readOnly?: boolean
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
