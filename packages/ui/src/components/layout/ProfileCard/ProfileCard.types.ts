import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'
import type { HeadingLevel } from '../../../types/semantic'

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
  /**
   * Emits an h1-h6 element for the profile name when provided. When omitted the
   * name keeps its current non-heading paragraph element and unchanged visual
   * size/weight.
   */
  titleLevel?: HeadingLevel
}
