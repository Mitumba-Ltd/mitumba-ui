import type { SxProps, Theme } from '@mui/material/styles'
import type { HeadingLevel } from '../../../types/semantic'

export interface OrderSummaryLineItem {
  /** Label (e.g. "Subtotal", "Delivery", "Discount") */
  label: string
  /** Amount in KES */
  amountKes: number
  /** Whether this is a discount/deduction (renders in green/negative) */
  isDiscount?: boolean
}

export interface OrderSummaryCardProps {
  /** Line items (subtotal, delivery, discounts, etc.) */
  items: OrderSummaryLineItem[]
  /** Grand total in KES */
  totalKes: number
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
