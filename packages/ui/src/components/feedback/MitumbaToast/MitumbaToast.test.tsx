// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaToast } from './MitumbaToast'

afterEach(() => {
  cleanup()
})

describe('MitumbaToast', () => {
  it('renders message when open', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaToast message="Success!" severity="success" open onClose={() => {}} />
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('Success!')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaToast message="Success!" severity="success" open={false} onClose={() => {}} />
      </MitumbaThemeProvider>
    )
    expect(screen.queryByText('Success!')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(
      <MitumbaThemeProvider>
        <MitumbaToast message="Success!" severity="success" open onClose={onClose} />
      </MitumbaThemeProvider>
    )
    const closeButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalled()
  })

  it('auto-closes after duration', async () => {
    const onClose = vi.fn()
    render(
      <MitumbaThemeProvider>
        <MitumbaToast message="Success!" severity="success" open onClose={onClose} duration={200} />
      </MitumbaThemeProvider>
    )
    await waitFor(() => expect(onClose).toHaveBeenCalled(), { timeout: 300 })
  })

  it('renders with correct severity color', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaToast message="Error!" severity="error" open onClose={() => {}} />
      </MitumbaThemeProvider>
    )
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardError')
  })
})
