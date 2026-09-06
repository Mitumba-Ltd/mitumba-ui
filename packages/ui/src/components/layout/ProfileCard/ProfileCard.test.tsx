// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { ProfileCard } from './ProfileCard'
import type { HeadingLevel } from '../../../types/semantic'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

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

  it('gives the avatar an accessible name for the initials fallback', () => {
    render(<MitumbaThemeProvider><ProfileCard name="Stanley" /></MitumbaThemeProvider>)
    expect(screen.getByLabelText('Stanley')).toBeInTheDocument()
  })

  it('omits titleLevel by default, rendering a non-heading name element', () => {
    render(<MitumbaThemeProvider><ProfileCard name="Stanley" /></MitumbaThemeProvider>)
    expect(screen.getByText('Stanley').tagName).toBe('P')
  })

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])('emits an h%s element when titleLevel is set', (level) => {
    render(<MitumbaThemeProvider><ProfileCard name="Stanley" titleLevel={level} /></MitumbaThemeProvider>)
    expect(screen.getByText('Stanley').tagName).toBe(`H${level}`)
  })

  it('inherits the host theme typography.fontFamily on the name (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <ProfileCard name="Stanley" subtitle="Since 2024" titleLevel={2} />
      </ThemeProvider>,
    )
    expect(screen.getByText('Stanley').style.fontFamily).toBe('')
    expect(screen.getByText('Since 2024').style.fontFamily).toBe('')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <ProfileCard name="Stanley" subtitle="Since 2024" titleLevel={2} roles={[{ label: 'Buyer' }, { label: 'Seller' }]} actionLabel="Edit Profile" onAction={vi.fn()} />
      </MitumbaThemeProvider>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
