import type { HeadingLevel, SemanticDestinationProps } from '../../../types/semantic'

export interface SellerCardProps extends SemanticDestinationProps {
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
  /**
   * Emits an h1-h6 element for the seller name when provided. When omitted the
   * name keeps its current non-heading paragraph element and unchanged visual
   * size/weight/truncation.
   */
  titleLevel?: HeadingLevel
}
