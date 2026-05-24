import type { VAZIOutfitCardProps } from '../VAZIOutfitCard/VAZIOutfitCard.types'

export interface VAZIFeedSectionProps {
  /** VAZI outfits to display in the section. */
  outfits: VAZIOutfitCardProps[]
  /** Whether the outfits are still loading. Shows skeleton cards when true. */
  loading?: boolean
  /** Called when the user presses "See all". */
  onSeeAll?: () => void
}
