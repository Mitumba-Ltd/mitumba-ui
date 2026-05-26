import type { SxProps, Theme } from '@mui/material/styles'

export interface CartItemProps {
  /** Technical ID of the item. */
  id: string
  /** URL of the item's image. */
  imageUrl: string
  /** Primary product title (e.g., ARTICLE 42453). */
  title: string
  /** Secondary detail (e.g., COLOR GREEN). */
  subtitle?: string
  /** Availability status (e.g., IN STOCK). */
  status?: string
  
  /** Current price in Kenyan Shillings. */
  priceKes: number
  /** Selected size metadata. */
  size?: string
  /** Current quantity. */
  quantity?: number
  
  /** Called when the item should be removed. */
  onRemove?: () => void
  /** Called when the quantity is updated. */
  onQuantityChange?: (newQuantity: number) => void
  /** Called when the size is updated. */
  onSizeChange?: (newSize: string) => void
  
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
