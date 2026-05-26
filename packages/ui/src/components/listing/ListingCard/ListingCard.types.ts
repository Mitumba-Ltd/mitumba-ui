import type { SxProps, Theme } from '@mui/material/styles'

export interface ListingCardProps {
  /** Array of image URLs for the carousel. */
  images: string[]
  /** Product title. */
  title: string
  /** Current price. */
  price: number
  /** Original price for discount display. */
  originalPrice?: number
  /** Brand or seller name. */
  brand?: string
  /** Product size metadata. */
  size?: string
  /** Floating badge text (e.g., "Best Seller"). */
  badge?: string
  /** URL for the brand logo overlay. */
  brandLogoUrl?: string
  
  /** Called when the card is clicked. */
  onClick?: () => void
  /** Called when the "Buy Now" button is clicked. */
  onBuyClick?: (e: React.MouseEvent) => void
  
  /** Whether the user has liked this item. */
  isLiked?: boolean
  /** Called when the heart icon is clicked. */
  onLikeClick?: (e: React.MouseEvent) => void
  
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
