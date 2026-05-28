// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaBanner } from './MitumbaBanner'

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
})
