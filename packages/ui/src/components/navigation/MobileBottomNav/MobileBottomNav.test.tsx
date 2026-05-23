// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MobileBottomNav } from './MobileBottomNav'

describe('MobileBottomNav', () => {
  afterEach(cleanup)

  it('renders all 5 tabs', () => {
    render(
      <MitumbaThemeProvider>
        <MobileBottomNav activeTab="home" onTabChange={vi.fn()} />,
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
    expect(screen.getByText('VAZI')).toBeInTheDocument()
    expect(screen.getByText('Orders')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
  })

  it('calls onTabChange when a tab is selected', () => {
    const onTabChange = vi.fn()
    render(
      <MitumbaThemeProvider>
        <MobileBottomNav activeTab="home" onTabChange={onTabChange} />,
      </MitumbaThemeProvider>,
    )

    fireEvent.click(screen.getByText('Orders'))

    expect(onTabChange).toHaveBeenCalledWith('orders')
  })
})
