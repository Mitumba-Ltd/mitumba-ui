import type { ReactNode } from 'react'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface MitumbaAvatarProps {
  /** Display name for initials fallback and meta text. Isaac Stanley -> IS. */
  name?: string
  /** URL of the profile image. */
  imageUrl?: string
  /** Size of the avatar. xs(24), sm(32), md(44), lg(64), xl(80). Defaults to 'md'. */
  size?: AvatarSize
  
  /** Requirement 4: Presence status dot (bottom-right). */
  status?: 'online' | 'offline'
  /** Requirement 2: Action icon overlay (bottom-right). Overrides status if both provided. */
  actionIcon?: ReactNode
  /** Requirement 3: Numeric/text notification badge (top-right). */
  notificationCount?: number | string
  /** Custom color for notification badge. Defaults to error red. */
  notificationColor?: string
  
  /** Requirement 5 & 6: Alignment of name/subtitle text. */
  textAlignment?: 'side' | 'bottom'
  /** Supporting text for side-alignment metadata. */
  subtitle?: string
  
  /** Requirement 7: Trigger the "new event" spinning border animation. */
  hasNewEvent?: boolean
  /** Requirement 8: Value 0-100 for concentric progress stroke (e.g. profile completeness). */
  progress?: number
  /** Requirement 9: Show selected state with tick icon and high-contrast stroke. */
  selected?: boolean
  
  /** Requirement 10: internal prop for stacked styling. */
  isStacked?: boolean
  /** Requirement 11: internal prop for stacked CTA button. */
  isCTA?: boolean
  /** Requirement 12: internal prop for numeric overflow circle. */
  overflowCount?: number

  /** Called when the avatar/content is clicked. */
  onClick?: () => void
}

export interface MitumbaAvatarGroupProps {
  /** Collection of MitumbaAvatar components. */
  children: ReactNode
  /** Maximum number of avatars to display before adding overflow. Defaults to 5. */
  max?: number
  /** Manual total count if different from children.length. */
  total?: number
  /** Size for all avatars in the group. */
  size?: AvatarSize
  /** Requirement 11: Adds a CTA '+' button at the end of the stack. */
  onAdd?: () => void
}
