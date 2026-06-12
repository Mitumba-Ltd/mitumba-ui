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
  /** Outfit name */
  name: string;
  /** Items in this outfit */
  items: VAZIShowcaseItem[];
  /** Total price KES */
  totalPrice: number;
}

export interface VAZIHeroSpotlightProps {
  /** Outfits to display as standing models */
  outfits: VAZIHeroOutfit[];
  /** Called when "Shop" is tapped in the popover */
  onShopLook?: (outfitId: string) => void;
  /** Called when an item in the popover is tapped */
  onItemClick?: (listingId: string) => void;
  /** Called when "See all" is tapped */
  onSeeAll?: () => void;
}
