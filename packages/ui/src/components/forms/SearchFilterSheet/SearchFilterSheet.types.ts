import type { HeadingLevel } from '../../../types/semantic';

export interface FilterState {
  categories: string[];
  conditions: string[];
  priceRange: [number, number] | null;
  city: string | null;
  sort: 'relevant' | 'newest' | 'price_asc' | 'price_desc';
  vaziOnly?: boolean;
}

export interface SearchFilterSheetProps {
  /** Current filter selections. */
  filters: FilterState;
  /** Called whenever a control changes the filter state. */
  onFiltersChange: (filters: FilterState) => void;
  /** Called when the user applies the current filters. */
  onApply: () => void;
  /** Called when the user clears all filters. */
  onClear: () => void;
  /** Called when the mobile drawer requests to close. */
  onClose: () => void;
  /** Whether the mobile drawer is open (ignored in the desktop inline layout). */
  open: boolean;
  /** Optional result count shown on the mobile apply button. */
  resultCount?: number;
  /** When false, the "VAZI Eligible Only" toggle is not rendered. Defaults to true. */
  showVaziFilter?: boolean;
  /**
   * Optional visible sheet title. When provided it is also used as the region's
   * accessible name; when omitted the region falls back to a "Search filters"
   * label and no visible title is rendered (layout unchanged).
   */
  title?: string;
  /**
   * Emits h1-h6 for the optional sheet `title` when provided; omitting it
   * preserves the current non-heading title element. Has no effect when `title`
   * is not supplied. Visual size/weight are unaffected.
   */
  titleLevel?: HeadingLevel;
  /**
   * Emits h1-h6 for each section header ("Sort By", "Categories", etc.) when
   * provided; omitting it preserves the current non-heading section labels.
   * Visual size/weight are unaffected.
   */
  sectionTitleLevel?: HeadingLevel;
}
