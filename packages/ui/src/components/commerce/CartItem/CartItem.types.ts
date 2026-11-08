import type { SxProps, Theme } from '@mui/material/styles'
import type { HeadingLevel } from '../../../types/semantic'

interface CartItemBaseProps {
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
  
  /** Selected size metadata. */
  size?: string
  /** Available sizes for the dropdown. If not provided, size shows as text only. */
  availableSizes?: string[]
  /** Current quantity. */
  quantity?: number
  /** Maximum selectable quantity (e.g. from stock_quantity). @default 10 */
  maxQuantity?: number
  
  /** Called when the item should be removed. */
  onRemove?: () => void
  /** Called when the quantity is updated. */
  onQuantityChange?: (newQuantity: number) => void
  /** Called when the size is updated. */
  onSizeChange?: (newSize: string) => void
  
  /** Optional style overrides. */
  sx?: SxProps<Theme>
  /**
   * Emits an h1-h6 element for the item title when provided. When omitted the
   * title keeps its current non-heading paragraph element and unchanged visual
   * size/weight/truncation.
   */
  titleLevel?: HeadingLevel
}

/**
 * Props for CartItem. Pass `price` (whole major units, shown in the `MitumbaFormatProvider`
 * currency). `priceKes` is the deprecated name for the same value; when both are set, `price` wins.
 */
export type CartItemProps = CartItemBaseProps &
  (
    | {
        /** Current price in whole major units of the formatting currency. */
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
