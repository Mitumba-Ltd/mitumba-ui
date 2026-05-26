import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

export interface MitumbaTabOption {
  /** Display label for the tab. */
  label: string
  /** Technical value for the tab. */
  value: string | number
  /** Optional leading icon. */
  icon?: ReactNode
  /** Whether the tab is disabled. */
  disabled?: boolean
}

export interface MitumbaTabsProps {
  /** The value of the currently selected tab. */
  value: string | number
  /** Callback fired when the value changes. */
  onChange: (value: string | number) => void
  /** Array of tab configurations. */
  tabs: MitumbaTabOption[]
  /** Visual variant. Defaults to 'primary'. */
  variant?: 'primary' | 'secondary'
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
