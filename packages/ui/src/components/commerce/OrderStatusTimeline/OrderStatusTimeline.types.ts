import type { SxProps, Theme } from '@mui/material/styles'

export type OrderStatus =
  | 'CREATED'
  | 'PAYMENT_PENDING'
  | 'PAID'
  | 'SELLER_CONFIRMED'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DISPUTED'

export interface OrderEvent {
  /** Which status this event corresponds to. */
  status: OrderStatus
  /** Human-readable timestamp (e.g. "Jan 4, 2024 at 9:15 AM"). */
  timestamp: string
  /** Optional note — tracking number, cancellation reason, etc. */
  note?: string
}

export interface OrderStatusTimelineProps {
  /** The current order status. */
  currentStatus: OrderStatus
  /** Array of order event entries. */
  events: OrderEvent[]
  /** Layout direction. @default 'vertical' */
  orientation?: 'vertical' | 'horizontal'
  /** Compact mode — hides timestamps and notes, shrinks node size. @default false */
  compact?: boolean
  /** Show estimated delivery date string below the Delivered step. */
  estimatedDelivery?: string
  /** Optional title override. @default 'Order Tracking' */
  title?: string
  /** Hide the card wrapper (for embedding inside other cards). @default false */
  bare?: boolean
  /** MUI sx override. */
  sx?: SxProps<Theme>
}
