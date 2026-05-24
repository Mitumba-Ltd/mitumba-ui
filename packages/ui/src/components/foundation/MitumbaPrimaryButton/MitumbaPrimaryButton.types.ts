import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

export interface MitumbaPrimaryButtonProps {
  /** Button text label. */
  label: string
  /** Called when the button is clicked. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** Shows a spinner and prevents clicks while work is in progress. */
  loading?: boolean
  /** Prevents user interaction. */
  disabled?: boolean
  /** Optional leading icon shown before the label. */
  icon?: ReactNode
  /** Whether the button spans the full available width. Defaults to true. */
  fullWidth?: boolean
  /** Button size. Defaults to medium. */
  size?: 'small' | 'medium' | 'large'
  /** Visual treatment. Defaults to primary. */
  variant?: 'primary' | 'earth' | 'ghost'
  /** Optional style overrides using MUI sx prop. */
  sx?: SxProps<Theme>
}
