// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import React from 'react'
import { MitumbaThemeProvider } from '../../../theme'
import { ProfileNavList } from './ProfileNavList'

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

  it('calls onClick when item clicked', () => {
    render(<MitumbaThemeProvider><ProfileNavList items={items} /></MitumbaThemeProvider>)
    fireEvent.click(screen.getByText('My Orders'))
    expect(items[0].onClick).toHaveBeenCalled()
  })

  it('renders badge when provided', () => {
    const withBadge = [{ label: 'Orders', icon: <span>📦</span>, onClick: vi.fn(), badge: 3 }]
    render(<MitumbaThemeProvider><ProfileNavList items={withBadge} /></MitumbaThemeProvider>)
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})
