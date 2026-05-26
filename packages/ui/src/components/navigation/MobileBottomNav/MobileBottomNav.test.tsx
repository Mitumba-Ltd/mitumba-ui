// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MobileBottomNav } from './MobileBottomNav'

afterEach(() => {
  cleanup()
})

describe('MobileBottomNav', () => {
  it('renders default items', () => {
    render(
      <MitumbaThemeProvider>
        <MobileBottomNav activeTab="home" onTabChange={() => {}} />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
    expect(screen.getByText('VAZI')).toBeInTheDocument()
  })

  it('calls onTabChange when an item is clicked', () => {
    const onTabChange = vi.fn()
    render(
      <MitumbaThemeProvider>
        <MobileBottomNav activeTab="home" onTabChange={onTabChange} />
      </MitumbaThemeProvider>,
    )

    fireEvent.click(screen.getByText('Search'))
    expect(onTabChange).toHaveBeenCalledWith('search')
  })

  it('supports multiple variants', () => {
    const { rerender } = render(
      <MitumbaThemeProvider>
        <MobileBottomNav activeTab="home" onTabChange={() => {}} variant="m3" />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Home')).toBeInTheDocument()

    rerender(
      <MitumbaThemeProvider>
        <MobileBottomNav activeTab="home" onTabChange={() => {}} variant="expansive" />
      </MitumbaThemeProvider>,
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})
