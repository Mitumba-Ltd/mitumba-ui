// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { StoreCard } from './StoreCard'
import type { HeadingLevel } from '../../../types/semantic'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

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

  it('calls onClick when clicked (button surface)', () => {
    const onClick = vi.fn()
    render(<MitumbaThemeProvider><StoreCard name="KisumuKicks" onClick={onClick} /></MitumbaThemeProvider>)
    fireEvent.click(screen.getByRole('button', { name: /KisumuKicks/ }))
    expect(onClick).toHaveBeenCalled()
  })

  it('renders a link surface with unique accessible name when href is provided', () => {
    render(<MitumbaThemeProvider><StoreCard name="KisumuKicks" subtitle="24 listings" href="/stores/kk" /></MitumbaThemeProvider>)
    expect(screen.getByRole('link', { name: 'KisumuKicks, 24 listings' })).toHaveAttribute('href', '/stores/kk')
  })

  it('renders a noninteractive article when neither href nor onClick provided', () => {
    render(<MitumbaThemeProvider><StoreCard name="KisumuKicks" /></MitumbaThemeProvider>)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  it('exposes the surface as a native, keyboard-operable button', () => {
    const onClick = vi.fn()
    render(<MitumbaThemeProvider><StoreCard name="KisumuKicks" onClick={onClick} /></MitumbaThemeProvider>)
    const button = screen.getByRole('button', { name: /KisumuKicks/ })
    expect(button.tagName).toBe('BUTTON')
    button.focus()
    expect(button).toHaveFocus()
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('omits titleLevel by default, rendering a non-heading name element', () => {
    render(<MitumbaThemeProvider><StoreCard name="KisumuKicks" /></MitumbaThemeProvider>)
    expect(screen.getByText('KisumuKicks').tagName).toBe('P')
  })

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])('emits an h%s element when titleLevel is set', (level) => {
    render(<MitumbaThemeProvider><StoreCard name="KisumuKicks" titleLevel={level} /></MitumbaThemeProvider>)
    expect(screen.getByText('KisumuKicks').tagName).toBe(`H${level}`)
  })

  it('inherits the host theme typography.fontFamily on the name (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <StoreCard name="KisumuKicks" subtitle="24 listings" titleLevel={2} />
      </ThemeProvider>,
    )
    expect(screen.getByText('KisumuKicks').style.fontFamily).toBe('')
    expect(screen.getByText('24 listings').style.fontFamily).toBe('')
  })

  it('has no axe violations as a link', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <StoreCard name="KisumuKicks" subtitle="24 listings" href="/stores/kk" titleLevel={2} />
      </MitumbaThemeProvider>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
