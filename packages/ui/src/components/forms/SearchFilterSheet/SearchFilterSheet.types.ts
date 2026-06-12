export interface FilterState {
  categories: string[];
  conditions: string[];
  priceRange: [number, number] | null;
  city: string | null;
  sort: 'relevant' | 'newest' | 'price_asc' | 'price_desc';
  vaziOnly: boolean;
}

export interface SearchFilterSheetProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onApply: () => void;
  onClear: () => void;
  onClose: () => void;
  open: boolean;
  resultCount?: number;
}
