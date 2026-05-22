import { useId } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { tokens } from '@mitumba/tokens'
import type { MitumbaTextFieldProps } from './MitumbaTextField.types'

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
            <Box sx={{ mr: tokens.spacing.sm }}>{prefix}</Box>
          ) : undefined,
          endAdornment: suffix ? (
            <Box sx={{ ml: tokens.spacing.sm }}>{suffix}</Box>
          ) : undefined,
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: tokens.radius.md,
          backgroundColor: tokens.colors.surface,
          paddingInline: tokens.spacing.base,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.border,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.green,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.green,
            borderWidth: `${tokens.spacing.xs}px`,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.error,
          },
          '&.Mui-disabled': {
            backgroundColor: tokens.colors.background,
            color: tokens.colors.textDisabled,
          },
        },
        '& .MuiInputLabel-root': {
          color: tokens.colors.textSecondary,
          '&.Mui-focused': {
            color: tokens.colors.green,
          },
          '&.Mui-error': {
            color: tokens.colors.error,
          },
        },
        '& .MuiFormHelperText-root': {
          marginInline: tokens.spacing.sm,
          fontSize: tokens.typography.fontSizes.sm,
          '&.Mui-error': {
            color: tokens.colors.error,
          },
        },
      }}
    />
  )
}

export default MitumbaTextField
