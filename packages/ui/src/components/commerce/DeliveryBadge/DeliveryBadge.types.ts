export interface DeliveryBadgeProps {
  /** Type of delivery service. */
  type: 'same-city' | 'intercity'
  /** Estimated delivery time string (e.g., "Today", "3–5 business days"). */
  estimatedDays?: string
  /** Delivery fee in KES. */
  feeKes?: number
}
