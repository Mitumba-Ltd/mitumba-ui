// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { StoreCard } from './StoreCard'

afterEach(cleanup)

describe('StoreCard', () => {
  it('renders store name', () => {
    render(<MitumbaThemeProvider><StoreCard name="KisumuKicks" /></MitumbaThemeProvider>)
    expect(screen.getByText('KisumuKicks')).toBeInTheDocument()
  })

  it('renders subtitle', () => {
    render(<MitumbaThemeProvider><StoreCard name="KisumuKicks" subtitle="24 listings" /></MitumbaThemeProvider>)
    expect(screen.getByText('24 listings')).toBeInTheDocument()
  })

  it('renders initials in avatar', () => {
    render(<MitumbaThemeProvider><StoreCard name="Kisumu Kicks" /></MitumbaThemeProvider>)
    expect(screen.getByText('KK')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<MitumbaThemeProvider><StoreCard name="KisumuKicks" onClick={onClick} /></MitumbaThemeProvider>)
    fireEvent.click(screen.getByText('KisumuKicks'))
    expect(onClick).toHaveBeenCalled()
  })
})
