export interface MobileBottomNavProps {
  /** Currently active tab. */
  activeTab: 'home' | 'search' | 'vazi' | 'orders' | 'profile'
  /** Called when a tab is selected. */
  onTabChange: (tab: string) => void
  /** Shows a pulsing dot on the VAZI tab when true. */
  vaziDotActive?: boolean
}
