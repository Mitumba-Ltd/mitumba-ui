import React from 'react'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import type { Theme } from '@mui/material/styles'
import { tokens } from '@mitumba/tokens'
import type { MitumbaPrimaryButtonProps } from './MitumbaPrimaryButton.types'

/**
 * Premium "Living" Button primitive with tactile interaction and precision scaling.
 * Fulfills the 32/42/52 height standard and incorporates benchmark spring physics.
 */
export function MitumbaPrimaryButton({
  label,
  onClick,
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  size = 'medium',
  variant = 'primary',
  sx,
}: MitumbaPrimaryButtonProps) {
  const isDisabled = disabled || loading
  const isIconOnly = !label && !!icon

  // Scale Mapping (Fulfilling Benchmark)
  const sizeConfig = {
    small: { height: 32, px: 4, fontSize: tokens.typography.fontSizes.sm },
    medium: { height: 42, px: 6, fontSize: tokens.typography.fontSizes.base },
    large: { height: 52, px: 8, fontSize: tokens.typography.fontSizes.md },
  }

  const currentSize = sizeConfig[size]

  // Variant Mapping
  const muiVariantMap: Record<string, 'contained' | 'outlined' | 'text'> = {
    primary: 'contained',
    secondary: 'contained',
    earth: 'contained',
    success: 'contained',
    error: 'contained',
    outline: 'outlined',
    ghost: 'text',
  }

  const muiColorMap: Record<string, 'primary' | 'secondary' | 'success' | 'error' | 'inherit'> = {
    primary: 'primary',
    secondary: 'secondary',
    earth: 'secondary',
    success: 'success',
    error: 'error',
    outline: 'primary',
    ghost: 'inherit',
  }

  return (
    <Button
      variant={muiVariantMap[variant]}
      color={muiColorMap[variant]}
      disabled={isDisabled}
      fullWidth={fullWidth}
      onClick={onClick}
      aria-busy={loading || undefined}
      disableElevation
      sx={[
        {
          height: currentSize.height,
          minWidth: isIconOnly ? currentSize.height : 'auto',
          paddingInline: isIconOnly ? 0 : (theme: Theme) => theme.spacing(currentSize.px),
          borderRadius: tokens.radius.md,
          fontSize: currentSize.fontSize,
          fontWeight: 600,
          fontFamily: tokens.typography.fontFamily,
          textTransform: 'none',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Inherited from benchmark
          
          '&:hover': {
            transform: 'translateY(-2px) scale(1.02)',
          },
          '&:active': {
            transform: 'translateY(0) scale(0.98)',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/* Centered Content Wrapper */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.sm,
          opacity: loading ? 0 : 1,
          transform: loading ? 'scale(0.9)' : 'scale(1)',
          transition: 'all 0.2s ease',
          width: '100%',
          flexDirection: iconPosition === 'left' ? 'row' : 'row-reverse',
        }}
      >
        {icon}
        {label}
      </Box>

      {/* Absolute Loading Overlay */}
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'inherit',
          }}
        >
          <CircularProgress
            size={currentSize.height * 0.4}
            color="inherit"
            aria-label={`${label || 'Button'} loading`}
          />
        </Box>
      )}
    </Button>
  )
}

export default MitumbaPrimaryButton
