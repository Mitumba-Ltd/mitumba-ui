// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import React from 'react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { ProfileNavList } from './ProfileNavList'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

afterEach(cleanup)

const items = [
  { label: 'My Orders', icon: <span>📦</span>, onClick: vi.fn() },
  { label: 'Settings', icon: <span>⚙️</span>, onClick: vi.fn() },
]

describe('ProfileNavList', () => {
  it('renders all items', () => {
    render(<MitumbaThemeProvider><ProfileNavList items={items} /></MitumbaThemeProvider>)
    expect(screen.getByText('My Orders')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('wraps items in a labelled nav and a list', () => {
    render(<MitumbaThemeProvider><ProfileNavList items={items} ariaLabel="Account" /></MitumbaThemeProvider>)
    expect(screen.getByRole('navigation', { name: 'Account' })).toBeInTheDocument()
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('calls onClick when a button item is clicked', () => {
    render(<MitumbaThemeProvider><ProfileNavList items={items} /></MitumbaThemeProvider>)
    fireEvent.click(screen.getByRole('button', { name: /My Orders/ }))
    expect(items[0].onClick).toHaveBeenCalled()
  })

  it('renders link items with aria-current on the active row', () => {
    render(
      <MitumbaThemeProvider>
        <ProfileNavList
          items={[
            { label: 'Orders', icon: <span>📦</span>, href: '/orders', active: true },
            { label: 'Settings', icon: <span>⚙️</span>, href: '/settings' },
          ]}
        />
      </MitumbaThemeProvider>,
    )
    const orders = screen.getByRole('link', { name: /Orders/ })
    expect(orders).toHaveAttribute('href', '/orders')
    expect(orders).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: /Settings/ })).not.toHaveAttribute('aria-current')
  })

  it('renders rows as native, keyboard-operable buttons', () => {
    const onClick = vi.fn()
    render(
      <MitumbaThemeProvider>
        <ProfileNavList items={[{ label: 'Orders', icon: <span>📦</span>, onClick }]} />
      </MitumbaThemeProvider>,
    )
    const button = screen.getByRole('button', { name: /Orders/ })
    expect(button.tagName).toBe('BUTTON')
    button.focus()
    expect(button).toHaveFocus()
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders badge when provided', () => {
    const withBadge = [{ label: 'Orders', icon: <span>📦</span>, onClick: vi.fn(), badge: 3 }]
    render(<MitumbaThemeProvider><ProfileNavList items={withBadge} /></MitumbaThemeProvider>)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('inherits the host theme typography.fontFamily on labels (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <ProfileNavList items={items} />
      </ThemeProvider>,
    )
    expect(screen.getByText('My Orders').style.fontFamily).toBe('')
  })

  it('has no axe violations with links, badges, and active state', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <ProfileNavList
          items={[
            { label: 'Orders', icon: <span>📦</span>, href: '/orders', active: true, badge: 3 },
            { label: 'Settings', icon: <span>⚙️</span>, onClick: vi.fn() },
          ]}
        />
      </MitumbaThemeProvider>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
