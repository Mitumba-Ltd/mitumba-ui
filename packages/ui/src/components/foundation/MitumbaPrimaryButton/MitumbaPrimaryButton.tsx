import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { tokens } from '@mitumba/tokens'
import { Box } from '@mui/material'
import type { MitumbaPrimaryButtonProps } from './MitumbaPrimaryButton.types'

/**
 * Premium primary button with tactile transitions and sane proportions.
 */
export function MitumbaPrimaryButton({
  label,
  onClick,
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
  size = 'medium',
  variant = 'primary',
  sx,
}: MitumbaPrimaryButtonProps) {
  const isDisabled = disabled || loading
  const muiVariant = variant === 'ghost' ? 'outlined' : 'contained'
  const color = variant === 'earth' ? 'secondary' : 'primary'

  return (
    <Button
      aria-busy={loading || undefined}
      color={color}
      disabled={isDisabled}
      fullWidth={fullWidth}
      onClick={onClick}
      size={size}
      variant={muiVariant}
      sx={sx}
    >
      {/* Content wrapper for perfect centering and transition effects */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: loading ? 0 : 1,
          transform: loading ? 'scale(0.9)' : 'scale(1)',
          transition: 'all 0.2s ease',
          gap: tokens.spacing.sm,
        }}
      >
        {!loading && icon}
        {label}
      </Box>

      {loading && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress 
            size={size === 'small' ? 16 : 20} 
            color="inherit" 
            aria-label={`${label} loading`}
          />
        </Box>
      )}
    </Button>
  )
}

export default MitumbaPrimaryButton
