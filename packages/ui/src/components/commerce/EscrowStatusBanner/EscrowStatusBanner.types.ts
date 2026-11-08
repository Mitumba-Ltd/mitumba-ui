import type { SxProps, Theme } from '@mui/material/styles'

export type EscrowStatus = 'FUNDED' | 'SHIPPED' | 'TIMEOUT_WARNING' | 'RELEASED' | 'REFUNDED'

export interface EscrowStatusBannerBaseProps {
  /** Current escrow status. */
  status: EscrowStatus
  /** Hours remaining for timeout warning. */
  hoursRemaining?: number
  /** Called when the user confirms delivery. */
  onConfirmDelivery?: () => void
  /** Called when the user raises a dispute. */
  onRaiseDispute?: () => void
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}

/**
 * Props for EscrowStatusBanner. Pass `amount` (whole major units, shown in the
 * `MitumbaFormatProvider` currency). `amountKes` is the deprecated name; when both are set,
 * `amount` wins.
 */
export type EscrowStatusBannerProps = EscrowStatusBannerBaseProps &
  (
    | {
        /** Amount currently held in escrow, in whole major units. */
        amount: number
        /** @deprecated Use `amount`. */
        amountKes?: number
      }
    | {
        amount?: number
        /** @deprecated Use `amount`. */
        amountKes: number
      }
  )
