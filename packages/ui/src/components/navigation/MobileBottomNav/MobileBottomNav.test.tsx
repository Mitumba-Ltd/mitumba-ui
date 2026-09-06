// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { MobileBottomNav } from './MobileBottomNav'
import type { BottomNavVariant, MobileBottomNavItem } from './MobileBottomNav.types'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

const ALL_VARIANTS: BottomNavVariant[] = ['m3', 'expansive', 'bubble', 'pill', 'indicator', 'pill-horizontal']

const HREF_ITEMS: MobileBottomNavItem[] = [
  { id: 'home', label: 'Home', icon: <HomeIcon />, href: '/home' },
  { id: 'search', label: 'Search', icon: <SearchIcon />, href: '/search' },
]

afterEach(() => {
  cleanup()
})

describe('MobileBottomNav', () => {
  it('wraps the bar in a labelled nav landmark', () => {
    render(
      <MitumbaThemeProvider>
        <MobileBottomNav activeTab="home" onTabChange={() => {}} ariaLabel="Primary" />
      </MitumbaThemeProvider>,
    )
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument()
  })

  it('renders default items as buttons (callback mode)', () => {
    render(
      <MitumbaThemeProvider>
        <MobileBottomNav activeTab="home" onTabChange={() => {}} />
      </MitumbaThemeProvider>,
    )
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'VAZI' })).toBeInTheDocument()
  })

  it('calls onTabChange when a button item is clicked', () => {
    const onTabChange = vi.fn()
    render(
      <MitumbaThemeProvider>
        <MobileBottomNav activeTab="home" onTabChange={onTabChange} />
      </MitumbaThemeProvider>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Search' }))
    expect(onTabChange).toHaveBeenCalledWith('search')
  })

  it('renders items as anchors with aria-current when they have an href', () => {
    render(
      <MitumbaThemeProvider>
        <MobileBottomNav activeTab="home" onTabChange={() => {}} items={HREF_ITEMS} />
      </MitumbaThemeProvider>,
    )
    const home = screen.getByRole('link', { name: 'Home' })
    expect(home).toHaveAttribute('href', '/home')
    expect(home).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Search' })).not.toHaveAttribute('aria-current')
  })

  it('marks the active button item with aria-current', () => {
    render(
      <MitumbaThemeProvider>
        <MobileBottomNav activeTab="search" onTabChange={() => {}} />
      </MitumbaThemeProvider>,
    )
    expect(screen.getByRole('button', { name: 'Search' })).toHaveAttribute('aria-current', 'page')
  })

  it('exposes accessible badge text on a tab', () => {
    render(
      <MitumbaThemeProvider>
        <MobileBottomNav
          activeTab="home"
          onTabChange={() => {}}
          items={[{ id: 'inbox', label: 'Inbox', icon: <SearchIcon />, badgeCount: 3 }]}
        />
      </MitumbaThemeProvider>,
    )
    expect(screen.getByRole('button', { name: 'Inbox, 3 unread' })).toBeInTheDocument()
  })

  it('renders items as native, keyboard-operable buttons', () => {
    const onTabChange = vi.fn()
    render(
      <MitumbaThemeProvider>
        <MobileBottomNav activeTab="home" onTabChange={onTabChange} />
      </MitumbaThemeProvider>,
    )
    const search = screen.getByRole('button', { name: 'Search' })
    expect(search.tagName).toBe('BUTTON')
    search.focus()
    expect(search).toHaveFocus()
    fireEvent.click(search)
    expect(onTabChange).toHaveBeenCalledWith('search')
  })

  it.each(ALL_VARIANTS)('renders all items across the %s variant', (variant) => {
    render(
      <MitumbaThemeProvider>
        <MobileBottomNav activeTab="home" onTabChange={() => {}} variant={variant} />
      </MitumbaThemeProvider>,
    )
    // Accessible name is always present regardless of visible-label styling.
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'VAZI' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Orders' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Profile' })).toBeInTheDocument()
  })

  it.each(ALL_VARIANTS)('inherits host typography (no inline fontFamily) in the %s variant', (variant) => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <MobileBottomNav activeTab="home" onTabChange={() => {}} variant={variant} />
      </ThemeProvider>,
    )
    // The active item's visible label must have no inline fontFamily override.
    expect(screen.getByText('Home').style.fontFamily).toBe('')
  })

  it.each(ALL_VARIANTS)('has no axe violations in the %s variant', async (variant) => {
    const { container } = render(
      <MitumbaThemeProvider>
        <MobileBottomNav activeTab="home" onTabChange={() => {}} variant={variant} items={HREF_ITEMS} />
      </MitumbaThemeProvider>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
