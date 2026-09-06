// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { MitumbaModal } from './MitumbaModal'
import type { HeadingLevel } from '../../../types/semantic'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

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

  it('omits titleLevel by default, rendering a non-heading title element', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaModal open onClose={() => {}} title="Test Modal">
          <div>Modal content</div>
        </MitumbaModal>
      </MitumbaThemeProvider>
    )
    const title = screen.getByText('Test Modal')
    expect(title.tagName).toBe('P')
    for (let level = 1 as HeadingLevel; level <= 6; level += 1) {
      expect(title.tagName).not.toBe(`H${level}`)
    }
  })

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])(
    'emits an h%s element when titleLevel is set',
    (level) => {
      render(
        <MitumbaThemeProvider>
          <MitumbaModal open onClose={() => {}} title="Test Modal" titleLevel={level}>
            <div>Modal content</div>
          </MitumbaModal>
        </MitumbaThemeProvider>
      )
      const title = screen.getByText('Test Modal')
      expect(title.tagName).toBe(`H${level}`)
    }
  )

  it('wires aria-labelledby to the title and aria-describedby to the subtitle', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaModal open onClose={() => {}} title="Test Modal" subtitle="A helpful subtitle">
          <div>Modal content</div>
        </MitumbaModal>
      </MitumbaThemeProvider>
    )
    const dialog = screen.getByRole('dialog')
    const labelledBy = dialog.getAttribute('aria-labelledby')
    const describedBy = dialog.getAttribute('aria-describedby')
    expect(labelledBy).toBeTruthy()
    expect(describedBy).toBeTruthy()
    expect(document.getElementById(labelledBy as string)).toHaveTextContent('Test Modal')
    expect(document.getElementById(describedBy as string)).toHaveTextContent('A helpful subtitle')
  })

  it('does not set aria-describedby when there is no subtitle', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaModal open onClose={() => {}} title="Test Modal">
          <div>Modal content</div>
        </MitumbaModal>
      </MitumbaThemeProvider>
    )
    expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-describedby')
  })

  it('closes on Escape', () => {
    const onClose = vi.fn()
    render(
      <MitumbaThemeProvider>
        <MitumbaModal open onClose={onClose} title="Test Modal">
          <div>Modal content</div>
        </MitumbaModal>
      </MitumbaThemeProvider>
    )
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape', code: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })

  it('restores focus to the trigger after closing', async () => {
    const trigger = document.createElement('button')
    trigger.textContent = 'Open'
    document.body.appendChild(trigger)
    trigger.focus()
    expect(document.activeElement).toBe(trigger)

    function Wrapper({ open }: { open: boolean }) {
      return (
        <MitumbaThemeProvider>
          <MitumbaModal open={open} onClose={() => {}} title="Test Modal">
            <div>Modal content</div>
          </MitumbaModal>
        </MitumbaThemeProvider>
      )
    }

    const { rerender } = render(<Wrapper open />)
    await waitFor(() => {
      expect(document.activeElement).not.toBe(trigger)
    })

    rerender(<Wrapper open={false} />)
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger)
    })
    trigger.remove()
  })

  it('inherits the host theme typography.fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <MitumbaModal open onClose={() => {}} title="Test Modal" titleLevel={2}>
          <div>Modal content</div>
        </MitumbaModal>
      </ThemeProvider>
    )
    const title = screen.getByText('Test Modal')
    expect(title.style.fontFamily).toBe('')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <MitumbaModal open onClose={() => {}} title="Test Modal" subtitle="Details" titleLevel={2}>
          <div>Modal content</div>
        </MitumbaModal>
      </MitumbaThemeProvider>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
