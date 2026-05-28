import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

export type BannerSeverity = 'success' | 'error' | 'warning' | 'info' | 'neutral'

export interface MitumbaBannerProps {
  /** Primary heading of the banner. */
  title: string
  /** Detailed description or message. */
  children?: ReactNode
  /** Visual severity level. Defaults to 'info'. */
  severity?: BannerSeverity
  /** Optional leading icon. Defaults to severity-aware icons. */
  icon?: ReactNode
  /** Called when the close button is clicked. */
  onClose?: () => void
  /** Action element (e.g. Button) to show on the right. */
  action?: ReactNode
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
