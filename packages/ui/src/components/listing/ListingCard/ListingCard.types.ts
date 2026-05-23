export interface ListingCardProps {
  /** Unique identifier for the listing. */
  listingId: string
  /** URL of the listing's primary image. Used as `src` on the card's image. */
  imageUrl: string
  /** Title of the listing. Displayed below the image. */
  title: string
  /** Price in Kenyan Shillings. Displayed as "KES X,XXX" with comma separator. */
  priceKes: number
  /** Display name of the seller. */
  sellerName: string
  /** Seller Trust Index (STI) score — 0 to 100. */
  sellerSti: number
  /** City where the item is located. */
  city: string
  /** Condition grade of the item. Controls the ConditionBadge color and label. */
  conditionGrade: 'A' | 'B' | 'C'
  /** Whether this listing is eligible for VAZI styling. Shows a VAZI badge overlay when true. */
  isVaziEligible?: boolean
  /** Called when the user taps or clicks the card. */
  onTap?: () => void
}
