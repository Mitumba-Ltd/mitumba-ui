export interface CartItemProps {
  /** URL of the item's image. */
  imageUrl: string
  /** Title of the item. */
  title: string
  /** Price in Kenyan Shillings. */
  priceKes: number
  /** Item condition grade. */
  conditionGrade: 'A' | 'B' | 'C'
  /** Name of the seller. */
  sellerName: string
  /** Called when the remove button is clicked. */
  onRemove?: () => void
}
