import type { SxProps, Theme } from '@mui/material/styles'

export interface StoreCardProps {
  /** Store display name */
  name: string
  /** Store avatar/logo URL */
  avatarUrl?: string
  /** Subtitle line (e.g. "12 listings · Fashion") */
  subtitle?: string
  /** Called when card is clicked */
  onClick?: () => void
  /** Optional sx override */
  sx?: SxProps<Theme>
}
