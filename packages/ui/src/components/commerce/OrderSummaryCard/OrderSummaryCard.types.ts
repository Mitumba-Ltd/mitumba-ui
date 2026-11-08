import type { SxProps, Theme } from '@mui/material/styles'
import type { HeadingLevel } from '../../../types/semantic'

/**
 * One row of the summary. Pass `amount` (whole major units, shown in the `MitumbaFormatProvider`
 * currency). `amountKes` is the deprecated name; when both are set, `amount` wins.
 */
export type OrderSummaryLineItem = {
  /** Label (e.g. "Subtotal", "Delivery", "Discount") */
  label: string
  /** Whether this is a discount/deduction (renders in green/negative) */
  isDiscount?: boolean
} & (
  | {
      /** Amount in whole major units. */
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

export interface OrderSummaryCardBaseProps {
  /** Line items (subtotal, delivery, discounts, etc.) */
  items: OrderSummaryLineItem[]
  /** Primary action button label. @default "Checkout" */
  actionLabel?: string
  /** Called when the action button is clicked */
  onAction?: () => void
  /** Whether the action is in progress */
  loading?: boolean
  /** Disable the action button */
  disabled?: boolean
  /** Trust/security line below the button (e.g. "Secure Checkout · M-Pesa Escrow") */
  trustLine?: string
  /** Optional sx override */
  sx?: SxProps<Theme>
  /**
   * Emits an h1-h6 element for the "Order Summary" heading when provided. When
   * omitted the heading keeps its current non-heading paragraph element and
   * unchanged visual size/weight.
   */
  titleLevel?: HeadingLevel
}

/**
 * Props for OrderSummaryCard. Pass `total` (whole major units, shown in the
 * `MitumbaFormatProvider` currency). `totalKes` is the deprecated name; when both are set,
 * `total` wins.
 */
export type OrderSummaryCardProps = OrderSummaryCardBaseProps &
  (
    | {
        /** Grand total in whole major units. */
        total: number
        /** @deprecated Use `total`. */
        totalKes?: number
      }
    | {
        total?: number
        /** @deprecated Use `total`. */
        totalKes: number
      }
  )
