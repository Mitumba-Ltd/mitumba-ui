import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import RefreshIcon from '@mui/icons-material/Refresh'
import { tokens } from '@mitumba/tokens'
import type { ErrorStateProps } from './ErrorState.types'

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
        padding: tokens.spacing.xl,
        gap: tokens.spacing.base,
      }}
    >
      <Box
        sx={{
          color: tokens.colors.error,
          fontSize: 48,
          display: 'flex',
        }}
      >
        <RefreshIcon sx={{ fontSize: 48 }} />
      </Box>
      <Typography
        sx={{
          fontSize: tokens.typography.fontSizes.xl,
          fontWeight: tokens.typography.fontWeights.bold,
          color: tokens.colors.textPrimary,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: tokens.typography.fontSizes.base,
          color: tokens.colors.textSecondary,
          maxWidth: 300,
        }}
      >
        {subtitle}
      </Typography>
      {onRetry && (
        <Box
          component="button"
          onClick={onRetry}
          sx={{
            marginTop: tokens.spacing.base,
            paddingInline: tokens.spacing.lg,
            paddingBlock: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            backgroundColor: tokens.colors.error,
            color: tokens.colors.white,
            fontSize: tokens.typography.fontSizes.base,
            fontWeight: tokens.typography.fontWeights.bold,
            fontFamily: tokens.typography.fontFamily,
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            '&:hover': {
              backgroundColor: tokens.colors.error,
            },
          }}
        >
          <RefreshIcon sx={{ fontSize: 18 }} />
          Retry
        </Box>
      )}
    </Box>
  )
}

export default ErrorState
