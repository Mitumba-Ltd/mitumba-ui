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
  const baseColor = isSameCity ? tokens.colors.success : tokens.colors.info

  let feeDisplay: string | null = null
  if (feeKes !== undefined && feeKes > 0) {
    feeDisplay = ` · KES ${feeKes.toLocaleString('en-KE')}`
  }

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: tokens.spacing.xs,
        height: '28px',
        px: tokens.spacing.md,
        borderRadius: tokens.radius.full,
        bgcolor: `${baseColor}14`,
        border: `1px solid ${baseColor}40`,
        width: 'fit-content',
        transition: 'all 200ms ease',
      }}
      aria-label={`${label}${feeDisplay || ''}`}
    >
      <LabelIcon
        sx={{
          fontSize: 16,
          color: baseColor,
        }}
      />
      <Typography
        sx={{
          fontSize: tokens.typography.fontSizes.xs,
          fontWeight: tokens.typography.fontWeights.bold,
          color: baseColor,
          lineHeight: 1,
        }}
      >
        {label}
      </Typography>
      {feeDisplay && (
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.xs,
            fontWeight: tokens.typography.fontWeights.medium,
            color: tokens.colors.textSecondary,
            lineHeight: 1,
          }}
        >
          {feeDisplay}
        </Typography>
      )}
    </Box>
  )
}

export default DeliveryBadge
