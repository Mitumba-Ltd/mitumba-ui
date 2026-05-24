/**
 * Props for the MitumbaSearchBar component.
 */
export interface MitumbaSearchBarProps {
  /** The current search query value. */
  value: string
  /** Called when the search query changes. */
  onChange: (value: string) => void
  /** Called when the search is submitted. */
  onSubmit: (query: string) => void
  /** Placeholder text for the input. */
  placeholder?: string
  /** Optional list of search suggestions. */
  suggestions?: string[]
  /** Called when a suggestion is clicked. */
  onSuggestionClick?: (suggestion: string) => void
}
