import type { ReactNode } from 'react'

export interface MitumbaPrimaryButtonProps {
  /** Button text label. */
  label: string
  /** Called when the button is clicked. */
  onClick?: () => void
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
}
