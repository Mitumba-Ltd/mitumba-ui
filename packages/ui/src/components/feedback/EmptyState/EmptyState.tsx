import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import type { EmptyStateProps } from './EmptyState.types'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'

/**
 * Empty state component for when there is no data to display.
 */
export function EmptyState({ icon, title, subtitle, action }: EmptyStateProps) {
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
        backgroundColor: tokens.colors.background,
        borderRadius: tokens.radius.lg,
        border: `1px dashed ${tokens.colors.border}`,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Box
        role="img"
        aria-label="empty state icon"
        sx={{
          color: tokens.colors.textDisabled,
          fontSize: 64,
          display: 'flex',
          mb: tokens.spacing.sm,
          backgroundColor: tokens.colors.surface,
          p: tokens.spacing.lg,
          borderRadius: tokens.radius.full,
          boxShadow: tokens.shadows.card,
        }}
      >
        {icon}
      </Box>
      <Typography
        sx={{
          fontSize: tokens.typography.fontSizes.xl,
          fontWeight: tokens.typography.fontWeights.bold,
          color: tokens.colors.textPrimary,
          fontFamily: tokens.typography.fontFamily,
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: tokens.typography.fontSizes.base,
          color: tokens.colors.textSecondary,
          fontFamily: tokens.typography.fontFamily,
          maxWidth: 320,
          marginInline: 'auto',
        }}
      >
        {subtitle}
      </Typography>
      {action && (
        <Box sx={{ mt: tokens.spacing.lg, width: { xs: '100%', sm: 'auto' } }}>
          <MitumbaPrimaryButton
            label={action.label}
            onClick={action.onClick}
            variant="primary"
            size="medium"
            fullWidth={false}
          />
        </Box>
      )}
    </Box>
  )
}

export default EmptyState
