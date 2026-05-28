import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

export interface MitumbaGlassProps {
  /** Content to be rendered inside the glass pane. */
  children: ReactNode
  /** Blur intensity in pixels. Defaults to 20. */
  blur?: number
  /** Background opacity (0 to 1). Defaults to 0.4. */
  opacity?: number
  /** Corner geometry. Defaults to 'rounded' (8px). */
  rounding?: 'rounded' | 'large' | 'huge' | 'full'
  /** Optional border visibility. Defaults to true. */
  border?: boolean
  /** ARIA role for accessibility. */
  role?: string
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
