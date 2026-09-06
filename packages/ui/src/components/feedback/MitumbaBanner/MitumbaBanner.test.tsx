// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { MitumbaBanner } from './MitumbaBanner'
import type { HeadingLevel } from '../../../types/semantic'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

describe('MitumbaBanner', () => {
  afterEach(cleanup)

  it('renders title and children', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaBanner title="Hello">This is a message</MitumbaBanner>
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('This is a message')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(
      <MitumbaThemeProvider>
        <MitumbaBanner title="Closable" onClose={onClose} />
      </MitumbaThemeProvider>,
    )

    fireEvent.click(screen.getByRole('button'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders action element', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaBanner title="Actionable" action={<button type="button">Retry</button>} />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Retry')).toBeInTheDocument()
  })

  it('supports different severities', () => {
    const { rerender } = render(
      <MitumbaThemeProvider>
        <MitumbaBanner title="Success" severity="success" />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByTestId('CheckCircleIcon')).toBeInTheDocument()

    rerender(
      <MitumbaThemeProvider>
        <MitumbaBanner title="Error" severity="error" />
      </MitumbaThemeProvider>,
    )
    expect(screen.getByTestId('ErrorIcon')).toBeInTheDocument()
  })

  it('uses role="alert" for urgent severities and role="status" otherwise', () => {
    const { rerender } = render(
      <MitumbaThemeProvider>
        <MitumbaBanner title="Boom" severity="error" />
      </MitumbaThemeProvider>,
    )
    expect(screen.getByRole('alert')).toBeInTheDocument()

    rerender(
      <MitumbaThemeProvider>
        <MitumbaBanner title="Careful" severity="warning" />
      </MitumbaThemeProvider>,
    )
    expect(screen.getByRole('alert')).toBeInTheDocument()

    rerender(
      <MitumbaThemeProvider>
        <MitumbaBanner title="FYI" severity="info" />
      </MitumbaThemeProvider>,
    )
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('names the dismiss action after the banner title', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaBanner title="Payment failed" severity="error" onClose={() => {}} />
      </MitumbaThemeProvider>,
    )
    expect(screen.getByRole('button', { name: 'Dismiss Payment failed' })).toBeInTheDocument()
  })

  it('omits titleLevel by default, rendering a non-heading title element', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaBanner title="Hello" />
      </MitumbaThemeProvider>,
    )
    expect(screen.getByText('Hello').tagName).toBe('P')
  })

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])(
    'emits an h%s element when titleLevel is set, keeping the visual weight',
    (level) => {
      render(
        <MitumbaThemeProvider>
          <MitumbaBanner title="Hello" titleLevel={level} />
        </MitumbaThemeProvider>,
      )
      const title = screen.getByText('Hello')
      expect(title.tagName).toBe(`H${level}`)
      expect(title).toHaveStyle({ fontWeight: '800' })
    },
  )

  it('inherits the host theme typography.fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <MitumbaBanner title="Hello" titleLevel={2}>Message</MitumbaBanner>
      </ThemeProvider>,
    )
    expect(screen.getByText('Hello').style.fontFamily).toBe('')
    expect(screen.getByText('Message').style.fontFamily).toBe('')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <MitumbaBanner title="Heads up" severity="info" titleLevel={2} onClose={() => {}}>
          A helpful message
        </MitumbaBanner>
      </MitumbaThemeProvider>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
