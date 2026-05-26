// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { EmptyState } from './EmptyState'

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
})
