import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import RefreshIcon from '@mui/icons-material/Refresh'
import { tokens } from '@mitumba/tokens'
import type { ErrorStateProps } from './ErrorState.types'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'

/**
 * Error state component for displaying errors with an optional retry action.
 */
export function ErrorState({
  title = 'Something went wrong',
  subtitle = 'Please try again',
  onRetry,
}: ErrorStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: tokens.spacing.xxxl,
        gap: tokens.spacing.base,
        backgroundColor: tokens.colors.errorLight,
        borderRadius: tokens.radius.lg,
        border: `1px solid ${tokens.colors.error}40`,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          color: tokens.colors.white,
          backgroundColor: tokens.colors.error,
          fontSize: 32,
          display: 'flex',
          mb: tokens.spacing.sm,
          p: tokens.spacing.base,
          borderRadius: tokens.radius.full,
          boxShadow: tokens.shadows.card,
        }}
      >
        <RefreshIcon sx={{ fontSize: 32 }} />
      </Box>
      <Typography
        sx={{
          fontSize: tokens.typography.fontSizes.xl,
          fontWeight: tokens.typography.fontWeights.bold,
          color: tokens.colors.error,
          fontFamily: tokens.typography.fontFamily,
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: tokens.typography.fontSizes.base,
          color: tokens.colors.textPrimary,
          fontFamily: tokens.typography.fontFamily,
          maxWidth: 320,
          marginInline: 'auto',
          opacity: 0.8,
        }}
      >
        {subtitle}
      </Typography>
      {onRetry && (
        <Box sx={{ mt: tokens.spacing.lg, width: { xs: '100%', sm: 'auto' } }}>
          <MitumbaPrimaryButton
            label="Try Again"
            onClick={onRetry}
            variant="primary"
            size="medium"
            fullWidth={false}
            sx={{
              backgroundColor: tokens.colors.error,
              '&:hover': {
                backgroundColor: tokens.colors.errorDark,
              },
            }}
          />
        </Box>
      )}
    </Box>
  )
}

export default ErrorState
