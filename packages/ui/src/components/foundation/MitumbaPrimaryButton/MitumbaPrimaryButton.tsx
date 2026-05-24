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

  const variantStyles = {
    primary: {
      backgroundColor: tokens.colors.green,
      color: tokens.colors.white,
      '&:hover': {
        backgroundColor: tokens.colors.greenDark,
      },
    },
    earth: {
      backgroundColor: tokens.colors.earth,
      color: tokens.colors.white,
      '&:hover': {
        backgroundColor: tokens.colors.earthDark,
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: tokens.colors.textPrimary,
      border: `1px solid ${tokens.colors.border}`,
      '&:hover': {
        backgroundColor: tokens.colors.background,
        borderColor: tokens.colors.textDisabled,
      },
    },
  }

  const sizeStyles = {
    small: {
      height: '32px',
      paddingInline: tokens.spacing.base,
      fontSize: tokens.typography.fontSizes.sm,
    },
    medium: {
      height: '44px',
      paddingInline: tokens.spacing.lg,
      fontSize: tokens.typography.fontSizes.base,
    },
    large: {
      height: '56px',
      paddingInline: tokens.spacing.xl,
      fontSize: tokens.typography.fontSizes.md,
    },
  }

  return (
    <Button
      aria-busy={loading || undefined}
      disabled={isDisabled}
      fullWidth={fullWidth}
      onClick={onClick}
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
      disableElevation
      sx={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        borderRadius: tokens.radius.md,
        fontFamily: tokens.typography.fontFamily,
        fontWeight: tokens.typography.fontWeights.semibold,
        textTransform: 'none',
        transition: 'all 200ms ease',
        '&:active': {
          transform: 'scale(0.98)',
        },
        '&.Mui-disabled': {
          backgroundColor: tokens.colors.divider,
          color: tokens.colors.textDisabled,
          border: variant === 'ghost' ? `1px solid ${tokens.colors.divider}` : 'none',
        },
        '&:focus-visible': {
          outline: `2px solid ${tokens.colors.greenLight}`,
          outlineOffset: '2px',
        },
      }}
    >
      {label}
    </Button>
  )
}

export default MitumbaPrimaryButton
