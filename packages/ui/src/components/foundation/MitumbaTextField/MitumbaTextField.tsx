import React, { useId } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import WarningIcon from '@mui/icons-material/Warning'
import { tokens } from '@mitumba/tokens'
import type { MitumbaTextFieldProps } from './MitumbaTextField.types'

/**
 * Premium "Living" Text Field primitive with precision scaling and tactile states.
 * Fulfills the 32/42/52 height standard and supports rich status feedback.
 */
export function MitumbaTextField({
  label,
  hint,
  value,
  onChange,
  helperText,
  error,
  size = 'medium',
  status,
  prefix,
  suffix,
  endButton,
  type = 'text',
  disabled = false,
  multiline = false,
  rows = 4,
  readOnly = false,
  sx,
}: MitumbaTextFieldProps) {
  const id = useId()
  const currentStatus = error ? 'error' : status

  // Scale Mapping (Fulfilling Button/Select standard)
  const sizeConfig = {
    small: { height: 32, fontSize: tokens.typography.fontSizes.sm, iconSize: 18 },
    medium: { height: 42, fontSize: tokens.typography.fontSizes.base, iconSize: 20 },
    large: { height: 52, fontSize: tokens.typography.fontSizes.md, iconSize: 24 },
  }

  const currentSize = sizeConfig[size]

  // Status Color & Icon Mapping
  const statusConfig = {
    success: { color: tokens.colors.success, icon: <CheckCircleIcon /> },
    error: { color: tokens.colors.error, icon: <ErrorIcon /> },
    warning: { color: tokens.colors.warning, icon: <WarningIcon /> },
  }

  const activeStatus = currentStatus ? statusConfig[currentStatus] : null

  return (
    <Box sx={{ width: '100%' }}>
      {label && (
        <Typography
          variant="caption"
          component="label"
          htmlFor={id}
          sx={{
            mb: 0.5,
            display: 'block',
            fontWeight: 700,
            color: currentStatus ? statusConfig[currentStatus].color : tokens.colors.textSecondary,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          {label}
        </Typography>
      )}

      <TextField
        id={id}
        placeholder={hint}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        disabled={disabled}
        multiline={multiline}
        rows={multiline ? rows : undefined}
        fullWidth
        error={currentStatus === 'error'}
        slotProps={{
          input: {
            readOnly,
            startAdornment: prefix && (
              <InputAdornment position="start" sx={{ color: tokens.colors.textSecondary }}>
                {React.isValidElement(prefix) ? React.cloneElement(prefix as React.ReactElement, { sx: { fontSize: currentSize.iconSize } }) : prefix}
              </InputAdornment>
            ),
            endAdornment: (suffix || activeStatus || endButton) && (
              <InputAdornment position="end">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {suffix && (
                    <Box sx={{ color: tokens.colors.textSecondary, display: 'flex' }}>
                      {React.isValidElement(suffix) ? React.cloneElement(suffix as React.ReactElement, { sx: { fontSize: currentSize.iconSize } }) : suffix}
                    </Box>
                  )}
                  {activeStatus && (
                    <Box sx={{ color: activeStatus.color, display: 'flex' }}>
                      {React.cloneElement(activeStatus.icon as React.ReactElement, { sx: { fontSize: currentSize.iconSize } })}
                    </Box>
                  )}
                  {endButton && (
                    <Box sx={{ ml: 1, mr: -1.5 }}>
                      {endButton}
                    </Box>
                  )}
                </Box>
              </InputAdornment>
            ),
          },
        }}
        sx={[
          {
            '& .MuiOutlinedInput-root': {
              height: multiline ? 'auto' : currentSize.height,
              borderRadius: `${tokens.radius.md}px`,
              bgcolor: tokens.colors.surface,
              fontSize: currentSize.fontSize,
              fontWeight: 600,
              fontFamily: tokens.typography.fontFamily,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: currentStatus ? statusConfig[currentStatus].color : tokens.colors.divider,
                borderWidth: currentStatus ? '2px' : '1px',
                transition: 'inherit',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: currentStatus ? statusConfig[currentStatus].color : tokens.colors.textDisabled,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: currentStatus ? statusConfig[currentStatus].color : tokens.colors.green,
                borderWidth: '2px',
              },
              '&.Mui-focused': {
                boxShadow: currentStatus ? 'none' : tokens.shadows.focus,
              },
              '&.Mui-disabled': {
                bgcolor: tokens.colors.background,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: tokens.colors.divider,
                },
              },
            },
            '& .MuiInputBase-input': {
              py: 0,
              height: '100%',
              '&::placeholder': {
                color: tokens.colors.textDisabled,
                opacity: 1,
              },
            },
            '& .MuiInputBase-inputMultiline': {
              py: 1.5,
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      />

      {(helperText || error) && (
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            ml: 1,
            display: 'block',
            fontWeight: 600,
            color: currentStatus ? statusConfig[currentStatus].color : tokens.colors.textSecondary,
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          {error || helperText}
        </Typography>
      )}
    </Box>
  )
}

export default MitumbaTextField
