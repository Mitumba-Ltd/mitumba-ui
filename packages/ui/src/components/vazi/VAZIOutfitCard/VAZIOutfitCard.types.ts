import type { HeadingLevel, SemanticDestinationProps } from '../../../types/semantic'

export interface VAZIOutfitItem {
  /** Unique identifier for the listing. */
  listingId: string
  /** URL of the item's image. */
  imageUrl: string
  /** Type of garment in the outfit. */
  garmentType: 'top' | 'bottom' | 'shoes' | 'accessory'
  /** Price in Kenyan Shillings. */
  priceKes: number
  /** Display name of the seller. */
  sellerName: string
}

export interface VAZIOutfitCardProps extends SemanticDestinationProps {
  /** Name of the outfit (e.g. "Weekend Chill"). */
  outfitName: string
  /** Items that make up the outfit (2–4 items). */
  items: VAZIOutfitItem[]
  /** Total price of all items in Kenyan Shillings. */
  totalPriceKes: number
  /** Number of unique sellers involved in this outfit. */
  sellersCount: number
  /** Whether items ship from multiple cities. */
  isMultiCity?: boolean
  /** Called when the card is tapped or clicked. */
  onTap?: () => void
  /** Called when the "Buy this look" button is clicked. */
  onBuyAll?: () => void
  /**
   * Emits an h1-h6 element for the outfit name when provided. When omitted the
   * name keeps its current non-heading paragraph element and unchanged visual
   * size/weight.
   */
  titleLevel?: HeadingLevel
}
