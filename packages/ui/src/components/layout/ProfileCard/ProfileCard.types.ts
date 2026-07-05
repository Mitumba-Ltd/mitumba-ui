import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

export interface ProfileCardProps {
  /** Display name */
  name: string
  /** Avatar image URL */
  avatarUrl?: string
  /** Role chips (e.g. "Buyer", "Seller") */
  roles?: { label: string; icon?: ReactNode; color?: 'primary' | 'secondary' }[]
  /** Action button label (e.g. "Edit Profile") */
  actionLabel?: string
  /** Called when action button is clicked */
  onAction?: () => void
  /** Optional subtitle below the name (e.g. member since, county) */
  subtitle?: string
  /** Optional sx override */
  sx?: SxProps<Theme>
}
