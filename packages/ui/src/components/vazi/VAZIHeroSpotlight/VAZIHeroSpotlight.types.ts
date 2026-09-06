import type { VAZIShowcaseItem } from '../VAZIShowcase/VAZIShowcase.types';
import type { HeadingLevel } from '../../../types/semantic';

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
  /** Section title — defaults to "VAZI Featured" */
  title?: string;
  /** Called when "Shop" is tapped in the popover */
  onShopLook?: (outfitId: string) => void;
  /** Called when an item in the popover is tapped */
  onItemClick?: (listingId: string) => void;
  /** Called when "See all" is tapped */
  onSeeAll?: () => void;
  /**
   * Emits the section title as an h1-h6 heading when provided; omission
   * preserves the existing non-heading markup (backward compatible).
   */
  titleLevel?: HeadingLevel;
  /**
   * When supplied, the "See all" control renders as an anchor to this
   * destination (in addition to firing `onSeeAll`); omission keeps it a
   * native button.
   */
  seeAllHref?: string;
}
