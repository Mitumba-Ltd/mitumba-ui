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
  const borderColor = getBorderColor(error, isFocused)

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: `${tokens.spacing.xs / tokens.spacing.xs}px solid ${borderColor}`,
          borderRadius: tokens.radius.md,
          backgroundColor: tokens.colors.surface,
          paddingInline: tokens.spacing.base,
          paddingBlock: tokens.spacing.md,
          gap: tokens.spacing.sm,
          transition: 'border-color 0.2s',
          '&:hover': {
            borderColor: error ? tokens.colors.error : tokens.colors.green,
          },
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <Box
          component="span"
          sx={{
            color: tokens.colors.textSecondary,
            fontWeight: tokens.typography.fontWeights.medium,
            fontSize: tokens.typography.fontSizes.base,
            userSelect: 'none',
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
            '&::placeholder': {
              color: tokens.colors.textDisabled,
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
            marginInlineStart: tokens.spacing.sm,
            marginTop: tokens.spacing.sm,
          }}
        >
          {error}
        </Box>
      )}
    </Box>
  )
}

export default PhoneInput
