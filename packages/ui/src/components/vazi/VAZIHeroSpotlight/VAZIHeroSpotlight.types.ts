import type { VAZIShowcaseItem } from '../VAZIShowcase/VAZIShowcase.types';

export interface VAZIHeroOutfit {
  /** Unique outfit ID */
  id: string;
  /** Model media URL — .webm (alpha) or image */
  modelMediaUrl: string;
  /** Media type */
  modelMediaType: 'video' | 'image';
  /** Accessibility description */
  modelAlt: string;
  /** Outfit name / style title */
  name: string;
  /** Items in this outfit */
  items: VAZIShowcaseItem[];
  /** Total price KES */
  totalPrice: number;
}

export interface VAZIHeroSpotlightProps {
  /** Featured outfits to rotate through (3-5 recommended) */
  outfits: VAZIHeroOutfit[];
  /** Auto-rotate interval in ms — defaults to 8000 */
  autoAdvanceMs?: number;
  /** Called when "Shop this look" is tapped */
  onShopLook?: (outfitId: string) => void;
  /** Called when an item thumbnail is tapped */
  onItemClick?: (listingId: string) => void;
  /** Called when "See all" is tapped */
  onSeeAll?: () => void;
}
