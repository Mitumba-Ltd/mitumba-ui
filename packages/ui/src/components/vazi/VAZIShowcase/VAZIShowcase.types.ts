import type { HeadingLevel } from '../../../types/semantic';

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
  /** Called when user saves/likes a look */
  onSaveLook?: (outfitId: string) => void;
  /** Called when "Share" is tapped — copies link to clipboard, not video export */
  onShare?: (outfitId: string) => void;
  /** Whether the showcase is loading (shows skeleton silhouettes) */
  loading?: boolean;
  /** Auto-advance to next outfit every N ms. Set to 0 or undefined to disable. */
  autoAdvanceMs?: number;
  /** Background audio URL — royalty-free fashion/lifestyle ambient track */
  audioUrl?: string;
  /** Whether audio is muted — defaults to true (user must opt-in) */
  muted?: boolean;
  /**
   * Emits the primary showcase title ("LOOK NN") as an h1-h6 heading when
   * provided; omission preserves the existing non-heading markup.
   */
  titleLevel?: HeadingLevel;
  /**
   * Emits the per-panel section titles ("This look") as an h1-h6 heading when
   * provided; omission preserves the existing non-heading markup.
   */
  sectionTitleLevel?: HeadingLevel;
}
