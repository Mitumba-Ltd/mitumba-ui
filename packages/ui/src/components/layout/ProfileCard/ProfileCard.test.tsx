// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { ProfileCard } from './ProfileCard'

afterEach(cleanup)

describe('ProfileCard', () => {
  it('renders name', () => {
    render(<MitumbaThemeProvider><ProfileCard name="Stanley" /></MitumbaThemeProvider>)
    expect(screen.getByText('Stanley')).toBeInTheDocument()
  })

  it('renders role chips', () => {
    render(<MitumbaThemeProvider><ProfileCard name="Stanley" roles={[{ label: 'Buyer' }, { label: 'Seller' }]} /></MitumbaThemeProvider>)
    expect(screen.getByText('Buyer')).toBeInTheDocument()
    expect(screen.getByText('Seller')).toBeInTheDocument()
  })

  it('renders action button and calls onAction', () => {
    const onAction = vi.fn()
    render(<MitumbaThemeProvider><ProfileCard name="Stanley" actionLabel="Edit" onAction={onAction} /></MitumbaThemeProvider>)
    fireEvent.click(screen.getByRole('button', { name: /edit/i }))
    expect(onAction).toHaveBeenCalled()
  })

  it('renders subtitle', () => {
    render(<MitumbaThemeProvider><ProfileCard name="Stanley" subtitle="Since 2024" /></MitumbaThemeProvider>)
    expect(screen.getByText('Since 2024')).toBeInTheDocument()
  })
})
