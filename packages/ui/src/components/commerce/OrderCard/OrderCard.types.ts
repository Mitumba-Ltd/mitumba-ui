import type { SxProps, Theme } from '@mui/material/styles'

export type OrderCardStatus =
  | 'pending'
  | 'paid'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'disputed'

export interface OrderCardProps {
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
  /** Called when the card / track button is clicked */
  onClick?: () => void
  /** Optional sx override */
  sx?: SxProps<Theme>
}
