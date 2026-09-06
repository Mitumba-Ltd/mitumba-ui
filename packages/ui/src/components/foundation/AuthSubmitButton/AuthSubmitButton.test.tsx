// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { AuthSubmitButton } from './AuthSubmitButton'

const HOST_FONT = '"Comic Sans MS", cursive'

afterEach(() => {
  cleanup()
})

describe('AuthSubmitButton', () => {
  it('renders the label as an accessible submit button', () => {
    render(
      <MitumbaThemeProvider>
        <AuthSubmitButton label="Sign in" />
      </MitumbaThemeProvider>,
    )

    const button = screen.getByRole('button', { name: 'Sign in' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('calls onClick when enabled', () => {
    const onClick = vi.fn()
    render(
      <MitumbaThemeProvider>
        <AuthSubmitButton label="Sign in" onClick={onClick} />
      </MitumbaThemeProvider>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled while loading', () => {
    render(
      <MitumbaThemeProvider>
        <AuthSubmitButton label="Sign in" loading />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByRole('button', { name: 'Sign in' })).toBeDisabled()
  })

  it('inherits the host theme typography.fontFamily (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <AuthSubmitButton label="Sign in" />
      </ThemeProvider>,
    )

    expect(screen.getByRole('button', { name: 'Sign in' }).style.fontFamily).toBe('')
  })
})
