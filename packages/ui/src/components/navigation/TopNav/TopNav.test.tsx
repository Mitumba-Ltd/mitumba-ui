// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { TopNav } from './TopNav'

describe('TopNav', () => {
  afterEach(cleanup)

  it('renders logo', () => {
    render(
      <MitumbaThemeProvider>
        <TopNav />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText(/MITUMBA/i)).toBeInTheDocument()
  })

  it('calls onLogoClick when logo is clicked', () => {
    const onLogoClick = vi.fn()
    render(
      <MitumbaThemeProvider>
        <TopNav onLogoClick={onLogoClick} />
      </MitumbaThemeProvider>,
    )

    fireEvent.click(screen.getByText(/MITUMBA/i))

    expect(onLogoClick).toHaveBeenCalledTimes(1)
  })

  it('shows search input and calls onSearchChange', () => {
    const onSearchChange = vi.fn()
    const onSearchSubmit = vi.fn()
    render(
      <MitumbaThemeProvider>
        <TopNav 
          searchValue="shoes" 
          onSearchChange={onSearchChange} 
          onSearchSubmit={onSearchSubmit}
        />
      </MitumbaThemeProvider>,
    )

    const input = screen.getByPlaceholderText(/Search listings.../i)
    fireEvent.change(input, { target: { value: 'nike' } })

    expect(onSearchChange).toHaveBeenCalledWith('nike')
  })

  it('shows cart count', () => {
    render(
      <MitumbaThemeProvider>
        <TopNav cartCount={3} onCartClick={vi.fn()} />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('3')).toBeInTheDocument()
  })
})
