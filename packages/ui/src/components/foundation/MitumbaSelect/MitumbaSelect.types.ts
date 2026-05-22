export interface Option {
  /** Unique value for the option — submitted as the select value. */
  value: string
  /** Human-readable label displayed to the user. */
  label: string
}

export interface MitumbaSelectProps {
  /** Label displayed above the select field. */
  label: string
  /** Available options to choose from. */
  options: Option[]
  /** Currently selected value. */
  value: string
  /** Called when the user selects a new option. */
  onChange: (value: string) => void
  /** Error message displayed below the field when present. */
  error?: string
  /** Whether the select is disabled. */
  disabled?: boolean
}
