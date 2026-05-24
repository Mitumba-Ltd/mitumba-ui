import { useState, useCallback } from 'react'
import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import type { PhoneInputProps } from './PhoneInput.types'

const PREFIX = '+254'
const MAX_DIGITS = 9

/**
 * Kenya-specific phone number input with +254 prefix.
 * Formats as +254 7XX XXX XXX on blur.
 */
function getBorderColor(error: string | undefined, isFocused: boolean): string {
  if (error) return tokens.colors.error
  if (isFocused) return tokens.colors.green
  return tokens.colors.border
}

export function PhoneInput({ value, onChange, error, disabled = false }: PhoneInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, '').slice(0, MAX_DIGITS)
      onChange(raw)
    },
    [onChange]
  )

  const handleBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  const handleFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const formatDisplay = useCallback((val: string) => {
    if (!val) return ''
    const groups = val.match(/(\d{3})(\d{3})?(\d{3})?/)
    if (!groups) return val
    return [groups[1], groups[2], groups[3]].filter(Boolean).join(' ')
  }, [])

  const displayValue = isFocused ? value : formatDisplay(value)

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid',
          borderColor: error ? tokens.colors.error : (isFocused ? tokens.colors.green : tokens.colors.border),
          borderWidth: isFocused ? '2px' : '1px',
          borderRadius: tokens.radius.md,
          backgroundColor: tokens.colors.surface,
          paddingInline: tokens.spacing.base,
          paddingBlock: isFocused ? '11px' : '12px',
          gap: tokens.spacing.sm,
          transition: 'all 200ms ease',
          boxShadow: isFocused && !error ? tokens.shadows.focus : 'none',
          '&:hover': {
            borderColor: error ? tokens.colors.error : (isFocused ? tokens.colors.green : tokens.colors.textDisabled),
          },
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <Box
          component="span"
          sx={{
            color: tokens.colors.textSecondary,
            fontWeight: tokens.typography.fontWeights.bold,
            fontSize: tokens.typography.fontSizes.base,
            userSelect: 'none',
            borderRight: `1px solid ${tokens.colors.divider}`,
            paddingRight: tokens.spacing.sm,
            marginRight: '2px',
          }}
        >
          {PREFIX}
        </Box>
        <Box
          component="input"
          type="tel"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder="7XX XXX XXX"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'phone-error' : undefined}
          sx={{
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            fontSize: tokens.typography.fontSizes.base,
            fontFamily: tokens.typography.fontFamily,
            color: tokens.colors.textPrimary,
            width: '100%',
            height: '24px',
            '&::placeholder': {
              color: tokens.colors.textDisabled,
              opacity: 1,
            },
          }}
        />
      </Box>
      {error && (
        <Box
          component="p"
          id="phone-error"
          sx={{
            color: tokens.colors.error,
            fontSize: tokens.typography.fontSizes.sm,
            fontFamily: tokens.typography.fontFamily,
            marginLeft: 0,
            marginTop: tokens.spacing.xs,
          }}
        >
          {error}
        </Box>
      )}
    </Box>
  )
}

export default PhoneInput
