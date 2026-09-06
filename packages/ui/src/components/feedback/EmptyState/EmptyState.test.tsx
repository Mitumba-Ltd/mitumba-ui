// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { EmptyState } from './EmptyState'
import type { HeadingLevel } from '../../../types/semantic'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

afterEach(() => {
  cleanup()
})

describe('EmptyState', () => {
  it('renders title and subtitle', () => {
    render(
      <MitumbaThemeProvider>
        <EmptyState 
          title="No data" 
          subtitle="Try again later" 
        />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('No data')).toBeInTheDocument()
    expect(screen.getByText('Try again later')).toBeInTheDocument()
  })

  it('renders an action button and calls onClick', () => {
    const onClick = vi.fn()
    render(
      <MitumbaThemeProvider>
        <EmptyState
          title="No data"
          subtitle="Try again later"
          action={{
            label: 'Retry',
            onClick,
          }}
        />
      </MitumbaThemeProvider>,
    )

    const button = screen.getByRole('button', { name: /Retry/i })
    expect(button).toBeInTheDocument()
    
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('supports compact variant', () => {
    render(
      <MitumbaThemeProvider>
        <EmptyState 
          variant="compact"
          title="Small" 
          subtitle="Sub" 
        />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Small')).toBeInTheDocument()
  })

  it('omits titleLevel by default, rendering a non-heading title element', () => {
    render(
      <MitumbaThemeProvider>
        <EmptyState title="No data" subtitle="Try again later" />
      </MitumbaThemeProvider>,
    )
    const title = screen.getByText('No data')
    expect(title.tagName).toBe('P')
  })

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])(
    'emits an h%s element when titleLevel is set, keeping the visual size',
    (level) => {
      render(
        <MitumbaThemeProvider>
          <EmptyState title="No data" subtitle="Sub" titleLevel={level} />
        </MitumbaThemeProvider>,
      )
      const title = screen.getByText('No data')
      expect(title.tagName).toBe(`H${level}`)
      expect(title).toHaveStyle({ fontWeight: '700' })
    },
  )

  it.each(['standard', 'compact', 'elevated'] as const)(
    'applies titleLevel across the %s variant',
    (variant) => {
      render(
        <MitumbaThemeProvider>
          <EmptyState title="No data" subtitle="Sub" variant={variant} titleLevel={3} />
        </MitumbaThemeProvider>,
      )
      expect(screen.getByText('No data').tagName).toBe('H3')
    },
  )

  it('inherits the host theme typography.fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <EmptyState title="No data" subtitle="Sub" titleLevel={2} />
      </ThemeProvider>,
    )
    expect(screen.getByText('No data').style.fontFamily).toBe('')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <EmptyState title="No data" subtitle="Try again later" titleLevel={2} action={{ label: 'Retry', onClick: () => {} }} />
      </MitumbaThemeProvider>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
