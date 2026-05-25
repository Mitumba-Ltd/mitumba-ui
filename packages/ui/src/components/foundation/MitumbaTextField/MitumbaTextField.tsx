import { useId } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { tokens } from '@mitumba/tokens'
import type { MitumbaTextFieldProps } from './MitumbaTextField.types'

/**
 * Highly refined text input with token-driven sizing and professional focus states.
 * Styling is centrally managed by the MUI Theme Engine.
 */
export function MitumbaTextField({
  label,
  hint,
  value,
  onChange,
  error,
  prefix,
  suffix,
  type = 'text',
  disabled = false,
  multiline = false,
  rows,
}: MitumbaTextFieldProps) {
  const id = useId()

  return (
    <TextField
      id={id}
      label={label ?? undefined}
      placeholder={hint}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={Boolean(error)}
      helperText={error ?? undefined}
      type={type}
      disabled={disabled}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      fullWidth
      slotProps={{
        input: {
          startAdornment: prefix ? (
            <Box
              sx={{
                mr: tokens.spacing.sm,
                display: 'flex',
                alignItems: 'center',
                color: tokens.colors.textSecondary,
                opacity: 0.8,
              }}
            >
              {prefix}
            </Box>
          ) : undefined,
          endAdornment: suffix ? (
            <Box
              sx={{
                ml: tokens.spacing.sm,
                display: 'flex',
                alignItems: 'center',
                color: tokens.colors.textSecondary,
                opacity: 0.8,
              }}
            >
              {suffix}
            </Box>
          ) : undefined,
        },
      }}
      sx={{
        width: '100%',
      }}
    />
  )
}

export default MitumbaTextField
