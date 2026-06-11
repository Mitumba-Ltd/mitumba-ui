export interface VAZIShowcaseItem {
  /** Listing ID */
  id: string;
  /** Item title */
  title: string;
  /** Price in KES */
  price: number;
  /** Listing thumbnail URL */
  imageUrl: string;
}

export interface VAZIShowcaseOutfit {
  /** Unique outfit ID */
  id: string;
  /** Model media URL — .webm (alpha) for video, .png for image */
  modelMediaUrl: string;
  /** Media type */
  modelMediaType: 'video' | 'image';
  /** Model description for accessibility */
  modelAlt: string;
  /** Items that make up this outfit */
  items: VAZIShowcaseItem[];
  /** Total outfit price in KES */
  totalPrice: number;
}

export interface VAZIShowcaseProps {
  /** Array of outfits to display in the showcase */
  outfits: VAZIShowcaseOutfit[];
  /** Currently focused outfit index */
  activeIndex?: number;
  /** Called when the active outfit changes (scroll/click) */
  onIndexChange?: (index: number) => void;
  /** Called when a listing item is tapped */
  onItemClick?: (listingId: string) => void;
  /** Called when "Shop this look" is tapped */
  onShopAll?: (outfitId: string) => void;
}
