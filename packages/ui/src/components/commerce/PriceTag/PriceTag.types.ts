export interface PriceTagProps {
  /** Price in Kenyan Shillings. */
  priceKes: number
  /** Visual size of the tag. */
  size?: 'small' | 'medium' | 'large'
  /** Color theme. */
  color?: 'green' | 'earth' | 'default'
  /** Whether to show as strikethrough (e.g. original price). */
  strikethrough?: boolean
}
