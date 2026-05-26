import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

export interface SectionHeaderProps {
  /** Main section title. */
  title: string
  /** Supporting descriptive text. */
  subtitle?: string
  /** Secondary small label displayed above the title. */
  overline?: string
  /** Primary action element (e.g., "See All" button). */
  action?: ReactNode
  
  /** Horizontal alignment. Defaults to 'left'. */
  align?: 'left' | 'center'
  /** Visual scale. Defaults to 'standard'. */
  variant?: 'standard' | 'large'
  
  /** Optional style overrides. */
  sx?: SxProps<Theme>
  
  /** Legacy props for backward compatibility. */
  actionLabel?: string
  onAction?: () => void
}
