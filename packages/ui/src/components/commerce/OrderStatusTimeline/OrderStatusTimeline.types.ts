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
  status: OrderStatus
  timestamp: string
  note?: string
}

export interface OrderStatusTimelineProps {
  /** The current order status. */
  currentStatus: OrderStatus
  /** Array of order event entries. */
  events: OrderEvent[]
}
