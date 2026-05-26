import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

export type ChipVariant = 'solid' | 'outline' | 'soft' | 'ghost'
export type ChipRounding = 'rounded' | 'pill' | 'square'
export type ChipStatus = 'default' | 'active' | 'incomplete' | 'danger' | 'success' | 'common' | 'special'

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
  
  /** Leading icon or dot. */
  icon?: ReactNode
  /** Custom avatar element. */
  avatar?: React.ReactElement
  /** Numeric or text badge appended to the end. */
  badge?: string | number
  
  /** Visual treatment. Defaults to 'outline' as per new benchmark. */
  variant?: ChipVariant
  /** Category archetype for auto-styling. */
  status?: ChipStatus
  /** Corner geometry. Defaults to 'rounded' (8px). */
  rounding?: ChipRounding
  /** Size standard. */
  size?: 'small' | 'medium'
  /** Base color theme. */
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'earth' | 'purple' | 'blue'
  
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
