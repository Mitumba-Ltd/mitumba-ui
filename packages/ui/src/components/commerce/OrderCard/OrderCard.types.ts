import type { SxProps, Theme } from '@mui/material/styles'
import type { HeadingLevel, SemanticDestinationProps } from '../../../types/semantic'

export type OrderCardStatus =
  | 'pending'
  | 'paid'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'disputed'

export interface OrderCardProps extends SemanticDestinationProps {
  /** Order short ID (e.g. first 8 chars) */
  orderShortId: string
  /** Listing/item title */
  title: string
  /** Item image URL */
  imageUrl?: string
  /** Total order amount in KES */
  totalKes: number
  /** Delivery fee in KES */
  deliveryFeeKes?: number
  /** Current order status */
  status: OrderCardStatus
  /** Order creation date string */
  createdAt: string
  /** Called when the card surface is activated (open the order). */
  onClick?: () => void
  /**
   * Called when the Track action is activated. Fires independently of the card
   * surface (activation is isolated via stopPropagation). The Track action only
   * renders when the card is interactive (href or onClick present).
   */
  onTrack?: () => void
  /** Optional sx override */
  sx?: SxProps<Theme>
  /**
   * Emits an h1-h6 element for the order title when provided. When omitted the
   * title keeps its current non-heading paragraph element and unchanged visual
   * size/weight/truncation.
   */
  titleLevel?: HeadingLevel
}
