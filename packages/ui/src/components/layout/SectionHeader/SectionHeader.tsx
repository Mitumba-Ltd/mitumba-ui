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
        mb: tokens.spacing.lg,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography
          component="h2"
          sx={{
            color: tokens.colors.textPrimary,
            fontSize: tokens.typography.fontSizes.xxl,
            fontWeight: tokens.typography.fontWeights.extrabold,
            lineHeight: 1.1,
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            sx={{
              color: tokens.colors.textSecondary,
              fontSize: tokens.typography.fontSizes.base,
              mt: '4px',
              fontFamily: tokens.typography.fontFamily,
              maxWidth: 480,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      {actionLabel && (
        <Box sx={{ flexShrink: 0, mt: '2px' }}>
          <MitumbaPrimaryButton
            fullWidth={false}
            label={actionLabel}
            onClick={onAction}
            size="small"
            variant="ghost"
          />
        </Box>
      )}
    </Box>
  )
}

export default SectionHeader
