export interface ListingCardProps {
  /** Unique listing identifier */
  id: string;
  /** Listing title — truncated to 2 lines */
  title: string;
  /** Price in KES */
  price: number;
  /** Media URLs — first is shown by default, swipeable. Supports images and video (mp4) */
  media: string[];
  /** Seller/store name shown as caption */
  storeName?: string;
  /** Item condition */
  condition?: 'new' | 'like_new' | 'good' | 'fair';
  /** Whether the buyer has saved/wishlisted this item */
  isSaved?: boolean;
  /** Called when the heart icon is toggled */
  onSaveToggle?: (id: string) => void;
  /** Called when the card is tapped/clicked */
  onClick?: (id: string) => void;
  /** Called when "Add to cart" is tapped */
  onAddToCart?: (id: string) => void;
}
