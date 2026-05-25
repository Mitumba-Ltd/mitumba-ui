import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

export type ButtonVariant = 'primary' | 'secondary' | 'earth' | 'success' | 'error' | 'outline' | 'ghost'
export type ButtonSize = 'small' | 'medium' | 'large'
export type IconPosition = 'left' | 'right'

export interface MitumbaPrimaryButtonProps {
  /** Button text label. If not provided and icon is present, becomes an Icon-Only button. */
  label?: string
  /** Called when the button is clicked. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** Shows a spinner and prevents clicks while work is in progress. */
  loading?: boolean
  /** Prevents user interaction. */
  disabled?: boolean
  /** Optional leading or trailing icon. */
  icon?: ReactNode
  /** Placement of the icon relative to the label. Defaults to 'left'. */
  iconPosition?: IconPosition
  /** Whether the button spans the full available width. Defaults to false. */
  fullWidth?: boolean
  /** Button height/scale. small(32px), medium(42px), large(52px). Defaults to 'medium'. */
  size?: ButtonSize
  /** Visual treatment. Defaults to 'primary'. */
  variant?: ButtonVariant
  /** Optional style overrides using MUI sx prop. */
  sx?: SxProps<Theme>
}
