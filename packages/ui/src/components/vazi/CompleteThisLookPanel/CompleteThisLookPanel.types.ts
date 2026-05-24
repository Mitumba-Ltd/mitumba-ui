import type { VAZIOutfitCardProps } from '../VAZIOutfitCard/VAZIOutfitCard.types'

export interface CompleteThisLookPanelProps {
  /** VAZI outfit suggestions seeded from the current listing. */
  outfits: VAZIOutfitCardProps[]
  /** Whether the outfits are still loading. Shows skeleton cards when true. */
  loading?: boolean
}
