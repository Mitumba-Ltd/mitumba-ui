import type { SxProps, Theme } from '@mui/material/styles'

/** A daily quiet window. `start` and `end` are 24-hour `HH:MM`. */
export interface QuietHoursValue {
  enabled: boolean
  start: string
  end: string
}

export interface QuietHoursFieldProps {
  /** The current window. */
  value: QuietHoursValue
  /** Called with the whole new value when the switch or a time changes. Incomplete times are not reported. */
  onChange: (value: QuietHoursValue) => void
  /** Switch label. Default "Quiet hours". */
  label?: string
  /** One line under the switch saying what quiet hours do. */
  description?: string
  /** The time zone the times are in, shown under the fields, e.g. "Africa/Nairobi". */
  timeZoneLabel?: string
  /** Disables the switch and both times. */
  disabled?: boolean
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
