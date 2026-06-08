import React from 'react'
import Button from '@mui/material/Button'
import { tokens } from '@mitumba/tokens'
import type { AuthSubmitButtonProps } from './AuthSubmitButton.types'

/**
 * Submit button for auth forms. Uses native type="submit" so form onSubmit fires correctly.
 * Not a general-purpose button — use MitumbaPrimaryButton for everything else.
 */
export const AuthSubmitButton: React.FC<AuthSubmitButtonProps> = ({
  label,
  loading = false,
  disabled = false,
  fullWidth = false,
  sx,
}) => (
  <Button
    type="submit"
    variant="contained"
    color="primary"
    disabled={disabled || loading}
    fullWidth={fullWidth}
    disableElevation
    sx={[
      {
        height: 42,
        borderRadius: tokens.radius.md,
        fontSize: tokens.typography.fontSizes.base,
        fontWeight: 600,
        fontFamily: tokens.typography.fontFamily,
        textTransform: 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': { transform: 'translateY(-2px) scale(1.02)' },
        '&:active': { transform: 'translateY(0) scale(0.98)' },
      },
      ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
    ]}
  >
    {label}
  </Button>
)

export default AuthSubmitButton
