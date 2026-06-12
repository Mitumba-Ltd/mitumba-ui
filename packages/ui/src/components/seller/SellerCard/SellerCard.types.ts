export interface SellerCardProps {
  /** Unique identifier for the seller. */
  sellerId: string
  /** Display name of the seller. */
  name: string
  /** Optional URL of the seller's avatar image. */
  avatarUrl?: string
  /** City where the seller is based. */
  city: string
  /** STI score (0–100). */
  stiScore: number
  /** Total number of listings the seller has. */
  totalListings: number
  /** Whether this seller is VAZI featured. Defaults to false. */
  isVaziFeatured?: boolean
  /** Called when the card is tapped/clicked. */
  onTap?: () => void
  /** Optional action button label (e.g. "Visit Store"). Renders a button at the bottom. */
  actionLabel?: string
  /** Called when the action button is clicked. Does NOT fire onTap. */
  onAction?: () => void
}
