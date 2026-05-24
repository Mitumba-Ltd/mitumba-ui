import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DirectionsBusOutlinedIcon from '@mui/icons-material/DirectionsBusOutlined'
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined'
import { tokens } from '@mitumba/tokens'
import type { DeliveryBadgeProps } from './DeliveryBadge.types'

export function DeliveryBadge({ type, estimatedDays, feeKes }: DeliveryBadgeProps) {
  const isSameCity = type === 'same-city'

  const LabelIcon = isSameCity ? DeliveryDiningOutlinedIcon : DirectionsBusOutlinedIcon
  const label = isSameCity ? 'Delivery today' : (estimatedDays ?? '3–5 business days')
  const color = isSameCity ? tokens.colors.success : tokens.colors.info

  let feeDisplay: string | null = null
  if (feeKes !== undefined && feeKes > 0) {
    feeDisplay = ` · KES ${feeKes.toLocaleString('en-KE')}`
  }

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        px: tokens.spacing.md,
        py: tokens.spacing.sm,
        borderRadius: tokens.radius.full,
        bgcolor: `${color}14`,
        border: `1px solid ${color}33`,
        width: 'fit-content',
      }}
      aria-label={`${label}${feeDisplay}`}
    >
      <LabelIcon
        sx={{
          fontSize: tokens.typography.fontSizes.md,
          color,
        }}
      />
      <Typography
        variant="body2"
        sx={{
          fontSize: tokens.typography.fontSizes.sm,
          fontWeight: tokens.typography.fontWeights.medium,
          color,
        }}
      >
        {label}
      </Typography>
      {feeDisplay && (
        <Typography
          variant="body2"
          sx={{
            fontSize: tokens.typography.fontSizes.sm,
            fontWeight: tokens.typography.fontWeights.medium,
            color: tokens.colors.textSecondary,
          }}
        >
          {feeDisplay}
        </Typography>
      )}
    </Box>
  )
}

export default DeliveryBadge
