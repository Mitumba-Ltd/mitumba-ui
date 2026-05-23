export interface TopNavProps {
  /** Called when the logo is clicked. */
  onLogoClick?: () => void
  /** Called when the user submits a search query. */
  onSearchSubmit?: (query: string) => void
  /** Current search input value. */
  searchValue?: string
  /** Called when search input changes. */
  onSearchChange?: (value: string) => void
  /** Whether the user is authenticated. */
  isAuthenticated?: boolean
  /** Authenticated user info. */
  user?: { name: string; avatarUrl?: string }
  /** Called when the auth/login button is clicked. */
  onAuthClick?: () => void
  /** Called when the profile avatar is clicked. */
  onProfileClick?: () => void
  /** Number of items in cart. */
  cartCount?: number
  /** Called when the cart icon is clicked. */
  onCartClick?: () => void
}
