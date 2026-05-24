// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaModal } from './MitumbaModal'

afterEach(() => {
  cleanup()
})

describe('MitumbaModal', () => {
  it('renders when open', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaModal open onClose={() => {}} title="Test Modal">
          <div>Modal content</div>
        </MitumbaModal>
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaModal open={false} onClose={() => {}} title="Test Modal">
          <div>Modal content</div>
        </MitumbaModal>
      </MitumbaThemeProvider>
    )
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(
      <MitumbaThemeProvider>
        <MitumbaModal open onClose={onClose} title="Test Modal">
          <div>Modal content</div>
        </MitumbaModal>
      </MitumbaThemeProvider>
    )
    const closeButton = screen.getByLabelText('Close modal')
    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalled()
  })

  it('renders actions when provided', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaModal open onClose={() => {}} title="Test Modal" actions={<button type="button">Confirm</button>}>
          <div>Modal content</div>
        </MitumbaModal>
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })
})
