import type { ReactNode } from 'react'

export interface MitumbaAvatarProps {
  /** Display name used for initials fallback when no image is provided. */
  name: string
  /** URL of the profile image. Falls back to initials if not provided. */
  imageUrl?: string
  /** Size of the avatar. Defaults to 'md'. */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Optional element rendered as a badge on the bottom-right corner. */
  badge?: ReactNode
}
