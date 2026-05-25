import type { SxProps, Theme } from '@mui/material/styles'

export type ChipVariant = 'solid' | 'outline' | 'shaded' | 'dashed'
export type ChipRounding = 'pill' | 'rounded' | 'square'
export type ChipElevation = 'flat' | 'tiny' | 'elevated'
export type ChipSize = 'small' | 'medium'

export interface MitumbaChipProps {
  /** Text label displayed inside the chip. */
  label: string
  /** Called when the chip is clicked. */
  onClick?: () => void
  /** Called when the delete icon is clicked. */
  onDelete?: () => void
  /** Whether the chip is in a selected/active state. */
  selected?: boolean
  /** Prevents user interaction. */
  disabled?: boolean
  
  /** Leading icon or avatar. */
  icon?: React.ReactElement
  /** Custom avatar element (overrides icon if provided). */
  avatar?: React.ReactElement
  /** Numeric or text badge appended to the end. */
  badge?: string | number
  
  /** Visual treatment. Defaults to 'solid'. */
  variant?: ChipVariant
  /** Corner geometry. Defaults to 'pill'. */
  rounding?: ChipRounding
  /** Visual depth. Defaults to 'flat'. */
  elevation?: ChipElevation
  /** Overall scale. Defaults to 'medium'. */
  size?: ChipSize
  /** Color theme. Defaults to 'primary'. */
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'earth'
  
  /** Optional style overrides using MUI sx prop. */
  sx?: SxProps<Theme>
}
