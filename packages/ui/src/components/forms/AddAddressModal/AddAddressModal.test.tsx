// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { AddAddressModal } from './AddAddressModal'
import type { HeadingLevel } from '../../../types/semantic'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

afterEach(cleanup)

function renderModal(props: Partial<Parameters<typeof AddAddressModal>[0]> = {}) {
  const onClose = props.onClose ?? vi.fn()
  const onSave = props.onSave ?? vi.fn()
  return { onClose, onSave, ...render(
    <MitumbaThemeProvider>
      <AddAddressModal
        open={props.open ?? true}
        onClose={onClose}
        onSave={onSave}
        saving={props.saving}
        error={props.error}
        isFirstAddress={props.isFirstAddress}
        titleLevel={props.titleLevel}
      />
    </MitumbaThemeProvider>,
  ) }
}

describe('AddAddressModal', () => {
  it('renders title and subtitle', () => {
    renderModal()
    expect(screen.getByText('Add Delivery Address')).toBeInTheDocument()
    expect(screen.getByText('Where should we deliver your items?')).toBeInTheDocument()
  })

  it('renders all required form fields', () => {
    renderModal()
    expect(screen.getByLabelText(/label/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/address line 1/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument()
  })

  it('renders save button', () => {
    renderModal()
    expect(screen.getByRole('button', { name: /save address/i })).toBeInTheDocument()
  })

  it('shows error message via role=alert when provided', () => {
    renderModal({ error: 'Something went wrong' })
    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Something went wrong')
  })

  it('has dialog role with accessible name', () => {
    renderModal()
    expect(screen.getByRole('dialog')).toHaveAccessibleName(/Add Delivery Address/i)
  })

  it('omits titleLevel by default (non-heading title)', () => {
    renderModal()
    expect(screen.getByText('Add Delivery Address').tagName).toBe('P')
  })

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])(
    'emits an h%s title when titleLevel is set',
    (level) => {
      renderModal({ titleLevel: level })
      expect(screen.getByText('Add Delivery Address').tagName).toBe(`H${level}`)
    }
  )

  it('closes on Escape', () => {
    const onClose = vi.fn()
    renderModal({ onClose })
    screen.getByRole('dialog').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(onClose).toHaveBeenCalled()
  })

  it('restores focus to the trigger after closing', async () => {
    const trigger = document.createElement('button')
    document.body.appendChild(trigger)
    trigger.focus()

    function Wrapper({ open }: { open: boolean }) {
      return (
        <MitumbaThemeProvider>
          <AddAddressModal open={open} onClose={() => {}} onSave={() => {}} />
        </MitumbaThemeProvider>
      )
    }

    const { rerender } = render(<Wrapper open />)
    await waitFor(() => expect(document.activeElement).not.toBe(trigger))
    rerender(<Wrapper open={false} />)
    await waitFor(() => expect(document.activeElement).toBe(trigger))
    trigger.remove()
  })

  it('inherits host theme fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <AddAddressModal open onClose={() => {}} onSave={() => {}} titleLevel={2} />
      </ThemeProvider>
    )
    expect(screen.getByText('Add Delivery Address').style.fontFamily).toBe('')
  })

  it('has no axe violations', async () => {
    const { container } = renderModal({ titleLevel: 2, error: 'Oops' })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('shows default checkbox checked for first address', () => {
    renderModal({ isFirstAddress: true })
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn()
    renderModal({ onClose })
    fireEvent.click(screen.getByLabelText('Close modal'))
    expect(onClose).toHaveBeenCalled()
  })
})
