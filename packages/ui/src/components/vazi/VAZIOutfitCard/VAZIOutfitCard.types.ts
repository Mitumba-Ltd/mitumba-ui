import type { HeadingLevel, SemanticDestinationProps } from '../../../types/semantic'

/**
 * One item in an outfit. Pass `price` (whole major units of the `MitumbaFormatProvider`
 * currency). `priceKes` is the deprecated name; when both are set, `price` wins.
 */
export type VAZIOutfitItem = {
  /** Unique identifier for the listing. */
  listingId: string
  /** URL of the item's image. */
  imageUrl: string
  /** Type of garment in the outfit. */
  garmentType: 'top' | 'bottom' | 'shoes' | 'accessory'
  /** Display name of the seller. */
  sellerName: string
} & (
  | {
      /** Price in whole major units. */
      price: number
      /** @deprecated Use `price`. */
      priceKes?: number
    }
  | {
      price?: number
      /** @deprecated Use `price`. */
      priceKes: number
    }
)

export interface VAZIOutfitCardBaseProps extends SemanticDestinationProps {
  /** Name of the outfit (e.g. "Weekend Chill"). */
  outfitName: string
  /** Items that make up the outfit (2-4 items). */
  items: VAZIOutfitItem[]
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

/**
 * Props for VAZIOutfitCard. Pass `totalPrice` (whole major units of the `MitumbaFormatProvider`
 * currency). `totalPriceKes` is the deprecated name; when both are set, `totalPrice` wins.
 */
export type VAZIOutfitCardProps = VAZIOutfitCardBaseProps &
  (
    | {
        /** Total price of all items, in whole major units. */
        totalPrice: number
        /** @deprecated Use `totalPrice`. */
        totalPriceKes?: number
      }
    | {
        totalPrice?: number
        /** @deprecated Use `totalPrice`. */
        totalPriceKes: number
      }
  )
