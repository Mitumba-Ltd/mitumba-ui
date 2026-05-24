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
            <Box
              sx={{
                mr: tokens.spacing.sm,
                display: 'flex',
                color: tokens.colors.textSecondary,
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
                color: tokens.colors.textSecondary,
              }}
            >
              {suffix}
            </Box>
          ) : undefined,
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: tokens.radius.md,
          backgroundColor: tokens.colors.surface,
          transition: 'all 200ms ease',
          fontFamily: tokens.typography.fontFamily,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.border,
            borderWidth: '1px',
            transition: 'all 200ms ease',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.textDisabled,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.green,
            borderWidth: '2px',
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.error,
          },
          '&.Mui-disabled': {
            backgroundColor: tokens.colors.background,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: tokens.colors.divider,
            },
          },
        },
        '& .MuiInputLabel-root': {
          color: tokens.colors.textSecondary,
          fontFamily: tokens.typography.fontFamily,
          fontSize: tokens.typography.fontSizes.base,
          '&.Mui-focused': {
            color: tokens.colors.green,
          },
          '&.Mui-error': {
            color: tokens.colors.error,
          },
        },
        '& .MuiFormHelperText-root': {
          marginLeft: 0,
          marginRight: 0,
          marginTop: tokens.spacing.xs,
          fontSize: tokens.typography.fontSizes.sm,
          fontFamily: tokens.typography.fontFamily,
          '&.Mui-error': {
            color: tokens.colors.error,
          },
        },
        '& .MuiInputBase-input': {
          paddingBlock: '12px',
          height: 'auto',
          fontSize: tokens.typography.fontSizes.base,
          color: tokens.colors.textPrimary,
          '&::placeholder': {
            color: tokens.colors.textDisabled,
            opacity: 1,
          },
        },
      }}
    />
  )
}

export default MitumbaTextField
