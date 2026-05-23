import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'
import type { SectionHeaderProps } from './SectionHeader.types'

export function SectionHeader({
  title,
  subtitle,
  actionLabel,
  onAction,
}: SectionHeaderProps) {
  return (
    <Box
      sx={{
        alignItems: 'flex-start',
        display: 'flex',
        gap: tokens.spacing.base,
        justifyContent: 'space-between',
        mb: tokens.spacing.base,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography
          component="h2"
          sx={{
            color: tokens.colors.textPrimary,
            fontSize: tokens.typography.fontSizes.xl,
            fontWeight: tokens.typography.fontWeights.bold,
            lineHeight: tokens.typography.lineHeights.snug,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            sx={{
              color: tokens.colors.textSecondary,
              fontSize: tokens.typography.fontSizes.base,
              mt: tokens.spacing.xs,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      {actionLabel && (
        <MitumbaPrimaryButton
          fullWidth={false}
          label={actionLabel}
          onClick={onAction}
          size="small"
          variant="primary"
        />
      )}
    </Box>
  )
}

export default SectionHeader
