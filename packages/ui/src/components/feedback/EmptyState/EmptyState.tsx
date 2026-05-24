import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import type { EmptyStateProps } from './EmptyState.types'

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
        padding: tokens.spacing.xl,
        gap: tokens.spacing.base,
      }}
    >
      <Box
        role="img"
        aria-label="empty state icon"
        sx={{
          color: tokens.colors.textSecondary,
          fontSize: 48,
          display: 'flex',
        }}
      >
        {icon}
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
      {action && (
        <Box
          component="button"
          onClick={action.onClick}
          sx={{
            marginTop: tokens.spacing.base,
            paddingInline: tokens.spacing.lg,
            paddingBlock: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            backgroundColor: tokens.colors.green,
            color: tokens.colors.textOnGreen,
            fontSize: tokens.typography.fontSizes.base,
            fontWeight: tokens.typography.fontWeights.bold,
            fontFamily: tokens.typography.fontFamily,
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            '&:hover': {
              backgroundColor: tokens.colors.greenDark,
            },
          }}
        >
          {action.label}
        </Box>
      )}
    </Box>
  )
}

export default EmptyState
