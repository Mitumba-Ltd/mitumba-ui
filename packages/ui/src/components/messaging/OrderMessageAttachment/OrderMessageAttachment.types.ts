export interface OrderMessageAttachmentProps {
  /** Full order ID */
  orderId: string
  /** Short display ID e.g. "a9331769" */
  orderShortId: string
  /** Title of the listing purchased */
  listingTitle: string
  /** Thumbnail URL (48x48) */
  listingImageUrl: string | null
  /** Amount in KES */
  amount: number
  /** Current order status e.g. "shipped" */
  status: string
  /** Order creation date */
  createdAt: string
}
