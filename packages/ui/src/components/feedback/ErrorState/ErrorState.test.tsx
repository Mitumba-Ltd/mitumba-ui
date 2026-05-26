// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { ErrorState } from './ErrorState'

afterEach(() => {
  cleanup()
})

describe('ErrorState', () => {
  it('renders title and subtitle', () => {
    render(
      <MitumbaThemeProvider>
        <ErrorState 
          title="Custom Error" 
          subtitle="Something broke" 
        />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Custom Error')).toBeInTheDocument()
    expect(screen.getByText('Something broke')).toBeInTheDocument()
  })

  it('renders retry button and calls onRetry', () => {
    const onRetry = vi.fn()
    render(
      <MitumbaThemeProvider>
        <ErrorState onRetry={onRetry} retryLabel="Fix it" />
      </MitumbaThemeProvider>,
    )

    const btn = screen.getByRole('button', { name: /Fix it/i })
    fireEvent.click(btn)
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('renders back button and calls onBack', () => {
    const onBack = vi.fn()
    render(
      <MitumbaThemeProvider>
        <ErrorState onBack={onBack} />
      </MitumbaThemeProvider>,
    )

    const btn = screen.getByRole('button', { name: /Go Back/i })
    fireEvent.click(btn)
    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('supports 404 type specifically', () => {
    render(
      <MitumbaThemeProvider>
        <ErrorState type="404" title="Not found" />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Not found')).toBeInTheDocument()
  })
})
