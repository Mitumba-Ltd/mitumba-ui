import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

export interface TopNavLink {
  label: string
  href: string
  active?: boolean
}

export interface TopNavProps {
  /** Optional announcement bar content. */
  announcement?: ReactNode
  /** Main logo element. */
  logo?: ReactNode
  /** Navigation links. */
  links?: TopNavLink[]
  /** Right-side action elements (Icons, Buttons). */
  actions?: ReactNode
  /** Main CTA button (e.g., "Start Free Trial"). */
  cta?: ReactNode
  
  /** Whether the nav is sticky. Defaults to true. */
  sticky?: boolean
  /** Whether the background is transparent (until scroll). */
  transparent?: boolean
  
  /** Desktop/Tablet search value. */
  searchValue?: string
  /** Search change handler. */
  onSearchChange?: (value: string) => void
  /** Search submit handler. */
  onSearchSubmit?: (query: string) => void
  
  /** User object for profile display. */
  user?: { name: string; avatarUrl?: string }
  /** Authentication status. */
  isAuthenticated?: boolean
  
  /** Click handlers. */
  onLogoClick?: () => void
  onAuthClick?: () => void
  onProfileClick?: () => void
  onCartClick?: () => void
  /** Cart item count. */
  cartCount?: number
  
  /** Optional style overrides. */
  sx?: SxProps<Theme>
}
