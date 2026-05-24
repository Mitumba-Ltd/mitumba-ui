import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import { tokens } from '@mitumba/tokens'
import type { EscrowStatusBannerProps } from './EscrowStatusBanner.types'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'

type StatusIcon = React.ComponentType<Record<string, unknown>>

type StatusConfig = {
  label: string
  message: string
  icon: StatusIcon
  color: string
  bg: string
}

const STATUS_CONFIG: Record<string, StatusConfig> = {
  FUNDED: {
    label: 'Payment in Escrow',
    message: 'Your payment is held securely. The seller will ship your item soon.',
    icon: ShieldOutlinedIcon as StatusIcon,
    color: tokens.colors.info,
    bg: `${tokens.colors.info}14`,
  },
  SHIPPED: {
    label: 'Item Shipped',
    message: 'Your item is on the way. Confirm delivery once received.',
    icon: LocalShippingOutlinedIcon as StatusIcon,
    color: tokens.colors.green,
    bg: `${tokens.colors.green}14`,
  },
  TIMEOUT_WARNING: {
    label: 'Action Required',
    message: 'Confirm delivery or raise a dispute before time runs out.',
    icon: AccessTimeOutlinedIcon as StatusIcon,
    color: tokens.colors.warning,
    bg: `${tokens.colors.warning}14`,
  },
  RELEASED: {
    label: 'Payment Released',
    message: 'Funds have been released to the seller. Transaction complete.',
    icon: CheckCircleOutlinedIcon as StatusIcon,
    color: tokens.colors.success,
    bg: `${tokens.colors.success}14`,
  },
  REFUNDED: {
    label: 'Refunded',
    message: 'Your payment has been refunded to your original payment method.',
    icon: WarningAmberOutlinedIcon as StatusIcon,
    color: tokens.colors.error,
    bg: `${tokens.colors.error}14`,
  },
}

/**
 * Banner displaying the current escrow/payment status with contextual actions.
 */
export function EscrowStatusBanner({
  status,
  hoursRemaining,
  onConfirmDelivery,
  onRaiseDispute,
}: EscrowStatusBannerProps) {
  const config = STATUS_CONFIG[status]
  const Icon = config.icon

  return (
    <Box
      sx={{
        p: tokens.spacing.base,
        borderRadius: tokens.radius.lg,
        bgcolor: config.bg,
        border: `1px solid ${config.color}40`,
        boxShadow: tokens.shadows.card,
      }}
      role="status"
      aria-label={`Escrow status: ${config.label}`}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.base }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            borderRadius: tokens.radius.md,
            bgcolor: config.color,
            color: tokens.colors.white,
            flexShrink: 0,
            boxShadow: tokens.shadows.card,
          }}
        >
          <Icon sx={{ fontSize: 24 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontWeight: tokens.typography.fontWeights.bold,
              fontSize: tokens.typography.fontSizes.base,
              color: config.color,
              lineHeight: 1.2,
              fontFamily: tokens.typography.fontFamily,
            }}
          >
            {config.label}
          </Typography>
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.sm,
              color: tokens.colors.textPrimary,
              mt: '2px',
              fontFamily: tokens.typography.fontFamily,
              opacity: 0.8,
            }}
          >
            {config.message}
          </Typography>
        </Box>
      </Box>

      {status === 'TIMEOUT_WARNING' && hoursRemaining !== undefined && (
        <Box
          sx={{
            mt: tokens.spacing.base,
            p: tokens.spacing.sm,
            borderRadius: tokens.radius.sm,
            bgcolor: tokens.colors.white,
            display: 'flex',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            border: `1px solid ${tokens.colors.warning}40`,
          }}
        >
          <AccessTimeOutlinedIcon sx={{ color: tokens.colors.warning, fontSize: 18 }} />
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.sm,
              fontWeight: tokens.typography.fontWeights.bold,
              color: tokens.colors.warning,
            }}
          >
            {hoursRemaining} hour{hoursRemaining === 1 ? '' : 's'} remaining
          </Typography>
        </Box>
      )}

      {(onConfirmDelivery || onRaiseDispute) && (
        <Box sx={{ display: 'flex', gap: tokens.spacing.sm, mt: tokens.spacing.base }}>
          {onConfirmDelivery && (
            <MitumbaPrimaryButton
              label="Confirm Delivery"
              onClick={onConfirmDelivery}
              size="medium"
              variant="primary"
            />
          )}
          {onRaiseDispute && (
            <MitumbaPrimaryButton
              label="Raise Dispute"
              onClick={onRaiseDispute}
              size="medium"
              variant="ghost"
              sx={{
                color: tokens.colors.error,
                borderColor: tokens.colors.error,
                '&:hover': {
                  bgcolor: tokens.colors.errorLight,
                  borderColor: tokens.colors.errorDark,
                },
              }}
            />
          )}
        </Box>
      )}
    </Box>
  )
}

export default EscrowStatusBanner
