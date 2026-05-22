import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { tokens } from '@mitumba/tokens'
import type { MitumbaPrimaryButtonProps } from './MitumbaPrimaryButton.types'

const spinnerSizeByButtonSize: Record<NonNullable<MitumbaPrimaryButtonProps['size']>, number> = {
  small: tokens.spacing.base,
  medium: tokens.spacing.lg,
  large: tokens.spacing.lg,
}

export function MitumbaPrimaryButton({
  label,
  onClick,
  loading = false,
  disabled = false,
  icon,
  fullWidth = true,
  size = 'medium',
  variant = 'primary',
}: MitumbaPrimaryButtonProps) {
  const isDisabled = disabled || loading
  const muiVariant = variant === 'ghost' ? 'outlined' : 'contained'
  const color = variant === 'earth' ? 'earth' : 'primary'

  return (
    <Button
      aria-busy={loading || undefined}
      color={color}
      disabled={isDisabled}
      fullWidth={fullWidth}
      onClick={onClick}
      size={size}
      startIcon={
        loading ? (
          <CircularProgress
            aria-label={`${label} loading`}
            color="inherit"
            size={spinnerSizeByButtonSize[size]}
          />
        ) : (
          icon
        )
      }
      variant={muiVariant}
      sx={{
        justifyContent: 'center',
        textAlign: 'center',
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        ...(variant === 'ghost' && {
          bgcolor: tokens.colors.surface,
          color: tokens.colors.green,
          borderColor: tokens.colors.border,
          '&:hover': {
            bgcolor: tokens.colors.greenLight,
            borderColor: tokens.colors.green,
          },
        }),
      }}
    >
      {label}
    </Button>
  )
}

export default MitumbaPrimaryButton
