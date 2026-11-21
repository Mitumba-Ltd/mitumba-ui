import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import { MitumbaSwitch } from '../../selection/MitumbaSwitch/MitumbaSwitch'
import { MitumbaTextField } from '../../foundation/MitumbaTextField/MitumbaTextField'
import type { QuietHoursFieldProps } from './QuietHoursField.types'

const HHMM = /^([01]\d|2[0-3]):[0-5]\d$/

/** True when the window ends the next day (end earlier than start). */
export function isOvernight(start: string, end: string): boolean {
  return HHMM.test(start) && HHMM.test(end) && end < start
}

/** Quiet hours: an on/off switch and a start and end time. An end before the start is an overnight window. */
export function QuietHoursField({
  value,
  onChange,
  label = 'Quiet hours',
  description,
  timeZoneLabel,
  disabled = false,
  sx,
}: QuietHoursFieldProps): React.ReactElement {
  const timesOff = disabled || !value.enabled
  const setTime = (field: 'start' | 'end') => (next: string) => {
    if (HHMM.test(next)) onChange({ ...value, [field]: next })
  }

  return (
    <Box component="fieldset" sx={[{ m: 0, p: 0, border: 0, minWidth: 0 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Box component="legend" sx={{ p: 0, mb: `${tokens.spacing.sm}px`, position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }}>
        {label}
      </Box>
      <MitumbaSwitch label={label} on={value.enabled} disabled={disabled} onChange={(enabled) => onChange({ ...value, enabled })} />
      {description ? (
        <Typography sx={{ mt: `${tokens.spacing.xs}px`, fontSize: tokens.typography.fontSizes.sm, color: tokens.colors.textSecondary }}>
          {description}
        </Typography>
      ) : null}
      <Box sx={{ mt: `${tokens.spacing.base}px`, display: 'flex', flexWrap: 'wrap', gap: `${tokens.spacing.base}px` }}>
        <Box sx={{ flex: '1 1 140px' }}>
          <MitumbaTextField label="From" hint="HH:MM" type="time" value={value.start} onChange={setTime('start')} disabled={timesOff} />
        </Box>
        <Box sx={{ flex: '1 1 140px' }}>
          <MitumbaTextField
            label="To"
            hint="HH:MM"
            type="time"
            value={value.end}
            onChange={setTime('end')}
            disabled={timesOff}
            helperText={isOvernight(value.start, value.end) ? 'Overnight: ends the next day' : undefined}
          />
        </Box>
      </Box>
      {timeZoneLabel ? (
        <Typography sx={{ mt: `${tokens.spacing.sm}px`, fontSize: tokens.typography.fontSizes.xs, color: tokens.colors.textSecondary }}>
          {`Times are in ${timeZoneLabel}`}
        </Typography>
      ) : null}
    </Box>
  )
}

export default QuietHoursField
