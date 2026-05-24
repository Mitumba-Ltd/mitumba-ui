import { useRef, useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import type { OTPInputProps } from './OTPInput.types'

const DIGIT_COUNT = 6

/**
 * 6-digit OTP entry field with auto-advance and paste support.
 */
export function OTPInput({ value, onChange, onComplete, error = false, loading = false }: OTPInputProps) {
  const digitIds = useRef(Array(DIGIT_COUNT).fill(null).map(() => Math.random()))
  const filled = value.split('')
  const digits = filled.concat(Array(DIGIT_COUNT - filled.length).fill('')).slice(0, DIGIT_COUNT)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [shake, setShake] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    if (error) {
      setShake(true)
      timer = setTimeout(() => setShake(false), 500)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [error])

  const updateValue = useCallback(
    (newDigits: string[]) => {
      const newValue = newDigits.join('')
      onChange(newValue)
      if (newValue.length === DIGIT_COUNT) {
        onComplete(newValue)
      }
    },
    [onChange, onComplete]
  )

  const handleChange = useCallback(
    (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value.replace(/\D/g, '').slice(0, 1)
      const newDigits = [...digits]
      newDigits[index] = inputValue
      updateValue(newDigits)

      if (inputValue && index < DIGIT_COUNT - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    },
    [digits, updateValue]
  )

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        if (!digits[index] && index > 0) {
          inputRefs.current[index - 1]?.focus()
        } else if (digits[index]) {
          const newDigits = [...digits]
          newDigits[index] = ''
          updateValue(newDigits)
          if (index > 0) {
            inputRefs.current[index - 1]?.focus()
          }
        }
      }
    },
    [digits, updateValue]
  )

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pastedText = e.clipboardData.getData('text')
      const pasted = pastedText.replace(/\D/g, '').slice(0, DIGIT_COUNT)
      const newDigits = pasted.split('').concat(Array(DIGIT_COUNT - pasted.length).fill('')).slice(0, DIGIT_COUNT)
      updateValue(newDigits)
      inputRefs.current[Math.min(pasted.length, DIGIT_COUNT - 1)]?.focus()
    },
    [updateValue]
  )

  return (
    <Box
      sx={{
        display: 'flex',
        gap: tokens.spacing.sm,
        justifyContent: 'center',
        animation: shake ? 'shake 500ms cubic-bezier(.36,.07,.19,.97) both' : 'none',
        '@keyframes shake': {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
      }}
    >
      {digits.map((digit, digitIdx) => (
        <Box
          key={digitIds.current[digitIdx]}
          component="input"
          ref={(el) => { inputRefs.current[digitIdx] = el as HTMLInputElement | null }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(digitIdx, e)}
          onKeyDown={(e) => handleKeyDown(digitIdx, e)}
          onPaste={handlePaste}
          disabled={loading}
          aria-label={`OTP digit ${digitIdx + 1}`}
          sx={{
            width: 44,
            height: 48,
            textAlign: 'center',
            fontSize: tokens.typography.fontSizes.xl,
            fontFamily: tokens.typography.fontFamily,
            fontWeight: tokens.typography.fontWeights.bold,
            border: '1px solid',
            borderColor: error ? tokens.colors.error : tokens.colors.border,
            borderRadius: tokens.radius.md,
            backgroundColor: tokens.colors.surface,
            color: tokens.colors.textPrimary,
            outline: 'none',
            transition: 'all 200ms ease',
            '&:focus': {
              borderColor: tokens.colors.green,
              borderWidth: '2px',
              boxShadow: tokens.shadows.focus,
              paddingInline: 'calc(8px - 1px)', // Adjust for border width change
            },
            '&:hover': {
              borderColor: tokens.colors.green,
            },
            opacity: loading ? 0.6 : 1,
          }}
        />
      ))}
    </Box>
  )
}

export default OTPInput
