import type { SxProps, Theme } from '@mui/material/styles'

export type EscrowStatus = 'FUNDED' | 'SHIPPED' | 'TIMEOUT_WARNING' | 'RELEASED' | 'REFUNDED'

export interface EscrowStatusBannerProps {
  /** Current escrow status. */
  status: EscrowStatus
  /** Amount in KES currently in escrow. */
  amountKes: number
  /** Hours remaining for timeout warning. */
  hoursRemaining?: number
  /** Called when the user confirms delivery. */
  onConfirmDelivery?: () => void
  /** Called when the user raises a dispute. */
  onRaiseDispute?: () => void
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
