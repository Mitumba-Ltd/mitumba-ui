export interface MitumbaChipProps {
  /** Text label displayed inside the chip. */
  label: string
  /** Visual variant of the chip. Defaults to 'filled'. */
  variant?: 'filled' | 'outlined'
  /** Color theme. Defaults to 'green'. */
  color?: 'green' | 'earth' | 'neutral'
  /** Called when the delete icon is clicked. Shows the delete icon when provided. */
  onDelete?: () => void
  /** Called when the chip itself is clicked. */
  onClick?: () => void
  /** Size of the chip. Defaults to 'medium'. */
  size?: 'small' | 'medium'
}
