import type { SxProps, Theme } from '@mui/material/styles'

export type SelectSize = 'small' | 'medium' | 'large'
export type SelectRounding = 'pill' | 'rounded' | 'square'

export interface MitumbaSelectOption {
  /** Technical value for the option. */
  value: string | number
  /** Primary display text. */
  label: string
  /** Secondary supporting text. */
  subtitle?: string
  /** Leading icon, flag, or avatar. */
  icon?: React.ReactElement
  /** Optional grouping label. */
  group?: string
  /** Whether the option is disabled. */
  disabled?: boolean
}

export interface MitumbaSelectProps {
  /** Selected value(s). */
  value: string | number | (string | number)[]
  /** Technical field name. */
  name?: string
  /** Label text displayed above or inside the select. */
  label?: string
  /** Placeholder when no value is selected. */
  placeholder?: string
  /** Array of selectable options. */
  options: MitumbaSelectOption[]
  /** Called when the selection changes. */
  onChange: (value: string | number | (string | number)[]) => void
  
  /** Scale standard matching buttons. Defaults to 'medium'. */
  size?: SelectSize
  /** Corner geometry. Defaults to 'rounded'. */
  rounding?: SelectRounding
  
  /** Whether multiple values can be selected. */
  multiple?: boolean
  /** Shows a loading indicator. */
  loading?: boolean
  /** Shows an error state. */
  error?: string
  /** Prevents user interaction. */
  disabled?: boolean
  /** Support for a search field inside the menu. */
  showSearch?: boolean
  /** Support for a high-contrast dark menu. */
  inverted?: boolean
  
  /** Leading icon for the collapsed state. */
  startIcon?: React.ReactElement
  /** Manual override for the value display (e.g. "3 items selected"). */
  displayValue?: string
  
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
