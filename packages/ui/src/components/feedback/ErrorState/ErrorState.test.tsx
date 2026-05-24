// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { ErrorState } from './ErrorState'

afterEach(() => {
  cleanup()
})

describe('ErrorState', () => {
  it('renders default title and subtitle', () => {
    render(
      <MitumbaThemeProvider>
        <ErrorState />
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Please try again')).toBeInTheDocument()
  })

  it('renders custom title and subtitle', () => {
    render(
      <MitumbaThemeProvider>
        <ErrorState title="Error" subtitle="Failed to load" />
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Failed to load')).toBeInTheDocument()
  })

  it('renders retry button when onRetry is provided', () => {
    render(
      <MitumbaThemeProvider>
        <ErrorState onRetry={() => {}} />
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('Try Again')).toBeInTheDocument()
  })

  it('calls onRetry when retry button is clicked', () => {
    const onRetry = vi.fn()
    render(
      <MitumbaThemeProvider>
        <ErrorState onRetry={onRetry} />
      </MitumbaThemeProvider>
    )
    const button = screen.getByText('Try Again')
    button.click()
    expect(onRetry).toHaveBeenCalled()
  })
})
