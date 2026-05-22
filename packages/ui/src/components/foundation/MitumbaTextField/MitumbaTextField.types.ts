import type { ReactNode } from 'react'

export interface MitumbaTextFieldProps {
  /** Optional label text displayed above the field. */
  label?: string
  /** Placeholder text shown when the field is empty. */
  hint: string
  /** Controlled value of the input. */
  value: string
  /** Callback fired when the value changes. */
  onChange: (value: string) => void
  /** Error message displayed below the field when present. */
  error?: string
  /** Optional element displayed inside the field before the input text. */
  prefix?: ReactNode
  /** Optional element displayed inside the field after the input text. */
  suffix?: ReactNode
  /** Input type (e.g. "text", "email", "password"). Defaults to "text". */
  type?: string
  /** Whether the field is disabled. */
  disabled?: boolean
  /** Renders a multi-line textarea instead of a single-line input. */
  multiline?: boolean
  /** Number of visible rows for a multi-line textarea. */
  rows?: number
}
