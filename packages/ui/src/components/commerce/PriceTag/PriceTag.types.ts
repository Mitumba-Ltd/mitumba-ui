interface PriceTagBaseProps {
  /** Visual size of the tag. */
  size?: 'small' | 'medium' | 'large'
  /** Color theme. */
  color?: 'green' | 'earth' | 'default'
  /** Whether to show as strikethrough (e.g. original price). */
  strikethrough?: boolean
}

/**
 * Props for PriceTag. Pass `price` (whole major units, shown in the `MitumbaFormatProvider`
 * currency). `priceKes` is the deprecated name for the same value; when both are set, `price` wins.
 */
export type PriceTagProps = PriceTagBaseProps &
  (
    | {
        /** Price in whole major units of the formatting currency (1850 reads `KES 1,850`). */
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
