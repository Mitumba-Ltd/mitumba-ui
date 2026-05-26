import type { SxProps, Theme } from '@mui/material/styles'

export interface MitumbaSkeletonProps {
  /** Width of the skeleton block. */
  width?: string | number
  /** Height of the skeleton block. */
  height?: string | number
  /** Override the default border radius. */
  borderRadius?: number
  /** Visual variant. Defaults to 'rounded' (8px). */
  variant?: 'rectangular' | 'rounded' | 'circular'
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
