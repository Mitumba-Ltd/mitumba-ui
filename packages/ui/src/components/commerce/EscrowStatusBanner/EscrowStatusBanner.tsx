import React from 'react'
import SecurityIcon from '@mui/icons-material/Security'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import HistoryIcon from '@mui/icons-material/History'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { MitumbaBanner } from '../../feedback/MitumbaBanner'
import type { EscrowStatusBannerProps } from './EscrowStatusBanner.types'

/**
 * Premium Escrow Status Banner.
 * Redefined using the high-fidelity 'Passive Alert' primitive for absolute benchmark consistency.
 */
export function EscrowStatusBanner({ status, amountKes, hoursRemaining, sx }: EscrowStatusBannerProps) {
  const config = {
    FUNDED: {
      severity: 'info' as const,
      icon: <SecurityIcon />,
      title: 'Payment in Escrow',
      message: `KES ${amountKes.toLocaleString()} is securely held. We'll release it once you confirm delivery.`,
    },
    SHIPPED: {
      severity: 'info' as const,
      icon: <LocalShippingIcon />,
      title: 'Item Shipped',
      message: 'The seller has dispatched your item. Track your package and confirm receipt to release funds.',
    },
    TIMEOUT_WARNING: {
      severity: 'warning' as const,
      icon: <HistoryIcon />,
      title: 'Action Required',
      message: `Only ${hoursRemaining || 24} hours left to confirm delivery before funds are automatically released.`,
    },
    RELEASED: {
      severity: 'success' as const,
      icon: <AccountBalanceWalletIcon />,
      title: 'Payment Released',
      message: `Funds have been successfully transferred to the seller's wallet. Thank you for shopping!`,
    },
    REFUNDED: {
      severity: 'error' as const,
      icon: <ErrorOutlineIcon />,
      title: 'Payment Refunded',
      message: `The escrow has been cancelled and KES ${amountKes.toLocaleString()} has been returned to your wallet.`,
    },
  }

  const { severity, icon, title, message } = config[status]

  return (
    <MitumbaBanner
      severity={severity}
      icon={icon}
      title={title}
      sx={sx}
    >
      {message}
    </MitumbaBanner>
  )
}

export default EscrowStatusBanner
